import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { adminClient } from "../adminClient";
interface CreateStudentProps {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}
export const getStudentByClerkId = async (clerkId: string) => {
  const SBCquery = defineQuery(`*[_type=="student" && clerkId == $clerkId][0]`);
  const student = await sanityFetch({ query: SBCquery, params: { clerkId } });
  return student.data;
};

export const isEnrolledInCourse = async (clerkId: string, courseId: string) => {
  try {
    const studentQuery = defineQuery(
      `*[_type=="student" && clerkId==$clerkId][0]._id`
    );
    const studentId = await sanityFetch({
      query: studentQuery,
      params: { clerkId },
    });
    if (!studentId) {
      console.log("No Student found with clerkId", clerkId);
      return false;
    }
    const enrollmentQuery = defineQuery(
      `*[_type=="enrollment" && student._ref==$studentId && course._ref == $courseId][0]`
    );
    const enrollment = await sanityFetch({
      query: enrollmentQuery,
      params: { studentId: studentId.data, courseId },
    });
    return !!enrollment.data;
  } catch (error) {
    console.error("Error checking enrollment status", error);
    return false;
  }
};
export const createUserIfNotExists = async ({
  clerkId,
  email,
  firstName,
  lastName,
  imageUrl,
}: CreateStudentProps) => {
const existingQuery = await sanityFetch({
  query: `*[_type=="student"&& clerkId == $clerkId][0]`,
  params: { clerkId },
});
if (existingQuery.data) {
    console.log("Student already exists",existingQuery.data);
    return existingQuery.data;
}
const newStudent = await adminClient.create({
  _type: "student",
  clerkId,
  email,
  firstName,
  lastName,
  imageUrl,
});
console.log("New Student Created",newStudent)
return newStudent;

};