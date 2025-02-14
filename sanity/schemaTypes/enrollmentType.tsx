import { defineField, defineType } from 'sanity';
import Image from 'next/image';

export const enrollmentType = defineType({
    name: 'enrollment',
    title: 'Enrollment',
    type: 'document',
    fields: [
        defineField({
            name: 'student',
            title: 'Student',
            type: 'reference',
            to: [{ type: 'student' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'course',
            title: 'Course',
            type: 'reference',
            to: [{ type: 'course' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'amount',
            title: 'Amount',
            type: 'number',
            validation: (rule) => rule.required(),
            description: 'Amount paid for the enrollment course in USD',
        }),
        defineField({
            name: 'paymentId',
            title: 'Payment ID',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'The stripe payment/checkout session ID',
        }),
        defineField({
            name: 'enrolledAt',
            title: 'Enrolled At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            courseTitle: 'course.title',
            studentFirstName: 'student.firstName',
            studentLastName: 'student.lastName',
            studentImage: 'student.imageUrl',
        },
        prepare({ courseTitle, studentFirstName, studentLastName, studentImage }) {
            return {
                title: `${studentFirstName} ${studentLastName}`,
                subtitle: courseTitle,
                media: (
                    <Image
                        src={studentImage}
                        alt={`${studentFirstName} ${studentLastName}`}
                        width={100}
                        height={100}
                    />
                ),
            };
        },
    },
});