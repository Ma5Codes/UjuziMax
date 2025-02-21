import EnrollButton from "@/components/courses/buttons/EnrollButton";
import { getCourseBySlug } from "@/sanity/lib/courses/queries";
import { isEnrolledInCourse } from "@/sanity/lib/student/queries";
import { urlFor } from "@/sanity/lib/image";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CousePageProps {
  params: Promise<{ slug: string }>;
}
const CoursePage = async ({ params }: CousePageProps) => {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const { userId } = await auth();
  
    const isEnrolled =
      userId && course?._id
        ? await isEnrolledInCourse(userId, course._id)
        : false;
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold">Course not Found</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      {/**Hero Section */}
      <div className="relative w-full h-[60vh]">
        {course.image && (
          <Image
            src={urlFor(course.image).url() || ""}
            alt={course.title || "Course Title"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60" />
        <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12">
          <Link
            href="/"
            prefetch={false}
            className="text-white mb-8 items-center hover:text-primary transition-colors w-fit"
          >
            <ArrowLeft className="size-5 mr-2" />
            Back To Courses
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  {course.category?.name || "Uncategorized"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                {course.description}
              </p>
            </div>
            <div className="bg-white/10 backdrop-sm rounded-lg p-6 md:min-w-[300px]">
              <div className="text-3xl font-bold text-white mb-4">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </div>
              <EnrollButton courseId={course._id} isEnrolled={isEnrolled} />
            </div>
          </div>
        </div>
      </div>
      {/**Content Section */}
      <section className="container mx-auto px-4 py-12">
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/**Main Content */}
          <section className="lg:col-span-2">
            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.modules?.map((module, index) => (
                  <div
                    className="border border-border rounded-lg"
                    key={module._id}
                  >
                    <div className="p-4 border-b border-border">
                      <h3 className="font-medium">
                        Module {index + 1}: {module.title}
                      </h3>
                    </div>
                    <div className="divide-y divide-border">
                      {module.lessons?.map((lesson, lessonIndex) => (
                        <div
                          className="p-4 hover:bg-muted/50 transition-colors"
                          key={lesson._id}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                              {lessonIndex + 1}
                            </div>
                            <div className="flex items-center gap-3 text-foreground">
                              <BookOpen className="size-4 text-muted-foreground" />
                              <span className="font-medium">
                                {lesson.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/**Sidebar */}
        </article>
      </section>
    </div>
  );
};
export default CoursePage;
