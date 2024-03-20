export const fetchQueryTips = `*[_type == 'tips'] | order(_createdAt desc) {
    _id,
    title,
    mainImage {
      asset -> {
        url
      }
    },
    description,
    link,
    datetime,
  }`;
  