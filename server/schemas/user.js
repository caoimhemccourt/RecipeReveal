import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      defineField({
        name: 'userID',
        title: 'User ID',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'username',
        title: 'Username',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'password',
        title: 'Password',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'favouriteRecipes',
        title: 'Favourite Recipes',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'recipe' }]}]
      }),
    ],
  })