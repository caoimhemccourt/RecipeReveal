export const fetchQuery = `*[_type == 'recipe'] | order(_createdAt desc) {
  _id,
  title,
  RecipeType,
  mainImage {
    asset -> {
      url
    }
  },
  Description,
  Description,
  categories[] -> {
    _id,
    title,
    mainImage {
      asset -> {
        url
      }
    },
    }
}`;

