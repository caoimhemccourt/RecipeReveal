import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'RecipeType',
      title: 'Recipe type',
      type: 'string',
      options: {
        list: [
          {title: 'Based On Your Food', value: 'basedOnYourFood'},
          {title: 'Trending Recipes', value: 'trendingRecipes'},
          {title: 'Breakfast', value: 'breakfast'},
          {title: 'Lunch', value: 'lunch'},
          {title: 'Dinner', value: 'dinner'},
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'Description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'Ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{type: "string"}],
    }),
    defineField({
      name: 'PreparationTime',
      title: 'Preparation Time',
      type: 'string',
    }),
    defineField({
      name: 'CookingTime',
      title: 'Cooking Time',
      type: 'string',
    }),
    defineField({
      name: 'Serving',
      title: 'Serving',
      type: 'string',
    }),
    defineField({
      name: 'NutritionalInformation',
      title: 'Nutritional Information',
      type: 'string',
    }),
    defineField({
      name: 'Method',
      title: 'Method',
      type: 'array',
      of: [{type: "string"}],
    }),
  ],
})
