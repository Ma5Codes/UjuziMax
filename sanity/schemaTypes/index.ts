import { type SchemaTypeDefinition } from 'sanity'

import {studentType} from './studentType'
import {lessonType} from './lessonType'
import { instructorType } from './instructorType'
import { blockContent } from './blockContent'
import { enrollmentType } from './enrollmentType'
import { categoryType } from './categoryType'
import {courseType} from './courseType'
import {moduleType} from './moduleType'

import {lessonCompletionType} from './lessonCompletionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    studentType,
    courseType,
    moduleType,
    lessonType,
    instructorType,
    blockContent,
    enrollmentType,
    categoryType,
    lessonCompletionType,
  ],
};
