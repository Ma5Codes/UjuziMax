import {defineField, defineType} from 'sanity'

export const lessonType = defineType({
    name: 'lesson',
    title: 'Lesson',
    type: 'document',
    fields: [
       defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
      }),
      defineField({
        name: 'videoUrl',
        title: 'Video URL',
        type: 'url',
        description: ' The URL to the video player (eg. YouTube, Vimeo)',
      }),
      defineField({
        name: 'loomUrl',
        title: 'Loom Share URL',
        type: 'url',
        description: 'The URL to the Loom share URL(eg. https://www.loom.com/share/1234567890)',
        validation: (rule) => rule.custom((value) => {
            if (!value) return true;
            try {
                const url = new URL(value);
                if (!url.hostname.endsWith('loom.com')) {
                    return 'The URL must be a Loom share URL';
                }
                if (!url.pathname.startsWith('/share/')) {
                    return 'The URL must be a Loom share URL';
                }
                const videoId = url.pathname.split('/share')[1]
                 if (!/^[a-f0-9-]{32,36}/.test(videoId)) {
                    return 'Invalid Loom video ID in  the URL';
                 }
                 return true;
            } catch {
                return "Please enter a valid URL";
            }
          }),
    }),
    defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{type: 'block'}],
    }),
    ],
});