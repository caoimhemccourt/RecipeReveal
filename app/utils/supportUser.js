export const fetchQueryUser = `*[_type == 'user'] | order(_createdAt desc) {
    _id,
    userID,
    username, 
    email,
    password,
    favouriteRecipes
  }`;
  
  