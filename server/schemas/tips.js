import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'tips',
    title: 'Tips and Tricks',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'mainImage',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        }
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'string'
      }),
      defineField({
        name: 'link',
        title: 'Link',
        type: 'url',
      }),
      defineField({
        name: 'datetime',
        title: 'Date and Time',
        type: 'datetime',
      }),
    ],
  })
  