import CourseCard from "@/components/courses/cards/CourseCard";
import {
  getCourseProgress,
  getEnrolledCourses,
} from "@/sanity/lib/courses/queries";
import { currentUser } from "@clerk/nextjs/server";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const MyCoursesPage = async () => {
  const user = await currentUser();
  if (!user?.id) {
    return redirect("/");
  }
  const enrolledCourses = await getEnrolledCourses(user.id);
  const coursesWithProgress = await Promise.all(
    enrolledCourses.map(async ({ course }) => {
      if (!course) return null;
      const progress = await getCourseProgress(user.id, course._id);
      return {
        course,
        progress: progress.courseProgress,
      };
    })
  );

  return (
    <div className="h-full pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <GraduationCap className="size-8 text-primary" />
          <h1 className="text-3xl font-bold">My Courses</h1>
        </div>
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No Courses Yet</h2>
            <p className="text-muted-foreround mb-8">
              You haven&apos;t enrolled in any courses yet. Browse our courses
              to get started!
            </p>
            <Link
              href="/"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transiton-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ap-8">
            {coursesWithProgress.map((item) => {
              if (!item || !item.course) return null;
              return (
                <CourseCard
                  key={item.course._id}
                  course={item.course}
                  progress={item.progress}
                  href={`/dashboard/courses/${item.course._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default MyCoursesPage;
