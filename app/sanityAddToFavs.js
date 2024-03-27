import { client, fetchUser } from './sanity'; // Import your Sanity client


export const addToFavorites = async (userId,recipeID) => {
    try {
        // Fetch the user document
        const users = await fetchUser();
        const user = users.find(user => user.userID === userId);

        if (!user) {
            throw new Error('User not found');
        }

        const key = `${user._id}-${recipeID}`;

        if (user.favouriteRecipes.includes(recipeID)) {
            throw new Error('Recipe already in favorites');
        }


        // Update the user document to add the recipe to favorites
        const updatedUser = await client
            .patch(user._id)
            .setIfMissing({ favouriteRecipes: [] }) // Ensure favouriteRecipes field exists
            .insert('after', 'favouriteRecipes[-1]', [{ 
                _type: 'reference', 
                _ref: recipeID,
                _key: key // Assign a unique key using user ID and recipe ID
            }])           
            .commit();

        return updatedUser;
    } catch (error) {
        console.error('Error adding recipe to favorites:', error);
        throw new Error('Failed to add recipe to favorites');
    }
};