import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { categoryType } from './categoryType'
import { courseType } from './courseType'
import { enrollmentType } from './enrollmentType'
import { instructorType } from './instructorType'
import { lessonCompletionType } from './lessonCompletionType'
import { lessonType } from './lessonType'
import { moduleType } from './moduleType'
import { studentType } from './studentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    categoryType,
    courseType,
    enrollmentType,
    instructorType,
    lessonCompletionType,
    lessonType,
    moduleType,
    studentType
  ],
}
