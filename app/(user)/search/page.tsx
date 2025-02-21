import CourseCard from "@/components/courses/cards/CourseCard";

import { searchCourses } from "@/sanity/lib/courses/queries";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = (await searchParams).query;
  if (!query) {
    return redirect("/");
  }
  const decodedTerm = decodeURIComponent(query)
  const courses =
    await searchCourses(decodedTerm);

  return (
    <div className="h-full pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items center gap-4 mb-8">
          <Search className="size-8 text-primary" />
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">
            Found {courses?.length} result{courses?.length === 1 ? "" : "s"} for
            &quot;{decodedTerm}&quot;
          </p>
        </div>
      </div>

      {courses?.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Courses Found</h2>
          <p className="text-muted-foreground mb-8">
            Try searching different keywords
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses!.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              href={`/courses/${course.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchPage;
