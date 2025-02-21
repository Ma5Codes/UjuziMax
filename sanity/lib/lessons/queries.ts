import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export const getLessonCompletions =async(studentId:string,courseId:string)=>{
    const getCompletionsQuery = defineQuery(`{
        "completedLessons":*[_type == "lessonCompletion" && student._ref == $studentId && course._ref == $courseId] {
        ...,
        "lesson":lesson->{...},
        "module":module->{...}
        },
        "course": *[_type == "course" && _id == $courseId][0] {
        ...,
        "modules":modules[]->{
        ...,
        "lessons":lessons[]->{...}
        }
           }
        
           }`);
const result = await sanityFetch({
    query: getCompletionsQuery,
    params: {studentId,courseId}
})   
const { course, completedLessons } = result.data;

const totalLessons = course?.modules?.reduce(
    (acc,module)=>acc+(module?.lessons?.length || 0),0) ||0; 
    const totalCompleted = completedLessons.length ||0;
    const courseProgress =
      totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0;       
      return {
        completedLessons: completedLessons || [],
        courseProgress,
      };
}