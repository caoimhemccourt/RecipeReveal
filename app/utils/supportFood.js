export const fetchQueryFood = `*[_type == 'food'] | order(_createdAt desc) {
    _id,
    product,
    foodID,
    foodCategory,
    price,
    quantity,
    useBy
  }`;
  