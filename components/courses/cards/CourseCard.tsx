import Loader from "@/components/shared/Loader";
import { GCqueryResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image";
import { BookOpen } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import CourseProgess from "../CourseProgess";

interface CourseCardProps {
  course: GCqueryResult[number];
  progress?:number;
  href: string;
}
const CourseCard = ({ course, progress, href }: CourseCardProps) => {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group hover:no-underline flex"
    >
      <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border flex flex-col flex-1">
        <div className="relative h-52 w-full overflow-hidden">
          {course.image ? (
            <Image
              src={urlFor(course?.image).url() || ""}
              alt={course?.title || "Course Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <Loader size="lg" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-sm font-medium px-3 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm">
              {course.category?.name || "UnCateorgized"}
            </span>
            {"price" in course && typeof course.price === "number" && (
              <span className="text-white font-bold px-3 py-1 bg-black/50 dark:bg-white/20 rounded-full backdrop-blue-sm">
                {course.price === 0
                  ? "Free"
                  : `$${course.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`}
              </span>
            )}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {course.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>
          <div className="space-y-4 mt-auto">
            {course.instructor && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {course.instructor.photo ? (
                    <div className="size-8 mr-2 relative">
                      <Image
                        src={""}
                        alt={course.instructor.name || "Instructor"}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="size-8 mr-2 rounded-full bg-muted flex items-center justify-center">
                      <Loader size="sm" />
                    </div>
                  )}
                  <span className="text-sm text-muted-foreground">
                    by {course.instructor.name}
                  </span>
                </div>
                <BookOpen className="size-4 text-muted-foreground" />
              </div>
            )}
            {typeof progress === "number" && (
              <CourseProgess
                progress={progress}
                variant="default"
                size="sm"
                label="Course Progress"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard