import { sanityFetch } from "../live";
import { defineQuery } from "groq";
import { adminClient } from "../adminClient";
import { getStudentByClerkId } from "../student/queries";
import { Module } from "@/sanity.types";
import { calculateCourseProgress } from "@/lib/utils";
export const getCourses = async () => {
  const GCquery = defineQuery(`*[_type=="course"] {
    ...,
        "slug": slug.current,
        "category": category->{...},
        "instructor":instructor->{...}
        }`);
  const courses = await sanityFetch({ query: GCquery });
  return courses.data;
};
export const searchCourses = async (query: string) => {
  if (!query || query === "") {
    return;
  }
  const searchQuery =
    defineQuery(`*[_type=="courses" && (title match $query + "*" || 
    description match $query + "*"||
    category->name match $query+"*")] 
    {
    ...,
    "slug":slug.current,
    "category":category->{...},
    "instructor":instructor->{...}
    }`);
  const CourseQuery = await sanityFetch({
    query: searchQuery,
    params: { query },
  });
  return CourseQuery.data;
};
export const getCourseBySlug = async (slug: string) => {
  const getCourseBySlugQuery =
    defineQuery(`*[_type=="course" && slug.current==$slug][0]{
    ...,
    "category":category->{...},
    "instructor": instructor->{...},
    "modules": modules[]->{...,
    "lessons":lessons[]->{...}},

    }`);
  const query = await sanityFetch({
    query: getCourseBySlugQuery,
    params: { slug },
  });
  return query.data;
};
export const getCourseById = async (id: string) => {
  const query = defineQuery(`*[_type=="course" && _id ==$id][0] {
    ...,
      "category":category->{...},
    "instructor": instructor->{...},
    "modules": modules[]->{...,
    "lessons":lessons[]->{...}},
    
    }`);
  const course = await sanityFetch({
    query,
    params: { id },
  });
  return course.data;
};
interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
  paymentId: string;
  amount: number;
}
export const createEnrollment = async ({
  studentId,
  courseId,
  paymentId,
  amount,
}: CreateEnrollmentParams) => {
  return adminClient.create({
    _type: "entrollment",
    student: {
      _type: "reference",
      _ref: studentId,
    },
    course: {
      _type: "reference",
      _ref: courseId,
    },
    paymentId,
    amount,
    enrolledAt: new Date().toISOString(),
  });
};
export const getEnrolledCourses = async(clerkId:string)=>{
  const getEnrolledCoursesQuery = defineQuery(`*[_type=="course" && clerkId==$clerkId][0]{
    "enrolledCourses": *[_type=="enrollment" && student._ref==^.id] {
    ...,
    "course": course->{
    ...,
    "slug":slug.current,
    "category":category->{...},
    "instructor":instructor->{...}
    }
    }
    }`)
    const result = await sanityFetch({
      query: getEnrolledCoursesQuery,
      params: {clerkId}
    })
    return result?.data?.enrolledCourses ||[]
}
export const getCourseProgress = async (clerkId: string, courseId: string) => {
    const student = await getStudentByClerkId(clerkId);
    if (!student) {
      throw new Error("Student not found")
    }
    const progressQuery = defineQuery(`{
      "completedLessons": *[_type == "lessonCompletion" && student._ref == $studentId && course._ref == $courseId] {
      ...,
      "lesson": lesson->{...},
      "module":module->{...}
      },
      "course": *[_type == "course" && _id == $courseId][0] {
      ...,
      "modules":modules[]-> {
      ...,
      "lessons":lessons[]->{...}
      }
    }
  }`);
    const result = await sanityFetch({
      query: progressQuery,
      params: { studentId: student._id, courseId },
    });    
    const {completedLessons=[],course}=result.data;
    const courseProgress = calculateCourseProgress(
      (course?.modules as unknown as Module[]) || null,
      completedLessons
    );
    return {
      completedLessons,
      courseProgress
    }
};