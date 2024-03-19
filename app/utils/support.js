export const fetchQuery = `*[_type == 'product'] | order(_createdAt desc) {
  _id,
  title,
  ProductType,
  mainImage {
    asset -> {
      url
    }
  },
  shortDescription,
  Description,
  Price,
  categories[] -> {
    _id,
    title,
    mainImage {
      asset -> {
        url
      }
    }
  }
}`;

