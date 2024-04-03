import { client, fetchUser } from "./sanity";

export const logFood = async (productName) => {
    try {
        const currentUser = await fetchUser();

        if (!currentUser) {
            throw new Error('No user logged in');
        }

        const foodQuery = `*[_type == 'food' && product == $productName][0]`;
        const food = await client.fetch(foodQuery, { productName });

        // Check if the food with the given product name exists
        if (!food) {
            throw new Error('Food not found');
        }

        const response = await client.patch(currentUser._id)
            .append('loggedFoods', [{ _type: 'reference', _ref: productName }]) 
            .commit();

        console.log('Food logged successfully:', response);
        return response;
    } catch (error) {
        console.error('Error logging food:', error)
        throw error;
    }
}