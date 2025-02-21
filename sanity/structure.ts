import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Admin Dashboard")
    .items([
      S.listItem()
        .title("Course Content")
        .child(
          S.documentTypeList("course")
            .title("Courses")
            .child((courseId) =>
              S.list()
                .title("Course Options")
                .items([
                  S.listItem()
                    .title("Edit Course Content")
                    .child(
                      S.document().schemaType("course").documentId(courseId)
                    ),
                  S.listItem()
                    .title("View Students")
                    .child(
                      S.documentList()
                        .title("Course Enrollments")
                        .filter(
                          '_type=="enrollment" && course._ref == $courseId'
                        )
                        .params({ courseId })
                    ),
                ])
            )
        ),
      S.divider(),
      //Users
      S.listItem()
        .title("User Management")
        .child(
          S.list()
            .title("Select a Type of User")
            .items([
              S.listItem()
                .title("Instructor")
                .schemaType("instructor")
                .child(
                  S.documentTypeList("instructor")
                    .title("Instructors")
                    .child((instructorId) =>
                      S.list()
                        .title("Instructor Options")
                        .items([
                          S.listItem()
                            .title("Edit Instructor Details")
                            .child(
                              S.document()
                                .schemaType("instructor")
                                .documentId(instructorId)
                            ),
                          S.listItem()
                            .title("View Courses")
                            .child(
                              S.documentList()
                                .title("Instructor's Courses")
                                .filter(
                                  '_type=="course" && instructor._ref == $instructorId'
                                )
                                .params({ instructorId })
                            ),
                        ])
                    )
                ),
            ])
        ),
      S.listItem()
        .title("Students")
        .schemaType("student")
        .child(
          S.documentTypeList("student")
            .title("Students")
            .child((studentId) =>
              S.list()
                .title("Student Options")
                .items([
                  S.listItem()
                    .title("Edit Student Details")
                    .child(
                      S.document().schemaType("student").documentId(studentId)
                    ),
                  S.listItem()
                    .title("View Enrollments")
                    .child(
                      S.documentList()
                        .title("Student Enrollments")
                        .filter(
                          '_type=="enrollment" && student._ref == $studentId'
                        )
                        .params({ studentId })
                    ),
                  S.listItem()
                    .title("View Completed Lessons")
                    .child(
                      S.documentList()
                        .title("Completed Lessons")
                        .schemaType("lessonCompletion")
                        .filter(
                          '_type=="lessonCompletion" && student._ref==$studentId'
                        )
                        .params({ studentId })
                        .defaultOrdering([
                          {
                            field: "completedAt",
                            direction: "desc",
                          },
                        ])
                    ),
                ])
            )
        ),
      S.divider(),
      S.listItem()
        .title("System Management")
        .child(
          S.list()
            .title("System Management")
            .items([S.documentTypeListItem("category").title("Categories")])
        ),
    ]);
        