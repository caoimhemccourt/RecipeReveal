import { createClient } from "@sanity/client"
import { fetchQuery } from "./utils/support";
import { fetchQueryTips } from "./utils/supportTips"
import { fetchQueryUser } from "./utils/supportUser";
import { fetchQueryFood } from "./utils/supportFood";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const client = createClient({
    projectId: 'w0j2uysp',
    dataset: "production",
    token: "sk52gZN0zs50Y2tJq1RzPhCNo6v6JnSnIyWthvwPLbI72PbtWXPLX6kUqDHHnhY672zrO9rcpOGL3TWoykiOwKcmRjHPqlyy6HfhDTUvFO6OzKQl3ME6dU8evECJDIpxTylz25Th4XxMtwnGPvJzpS7ihNU7Cl7MDi24YGjV60Kxnq0tRuel",
    apiVersion: "2024-01-22",
    useCdn: true
});

export const fetchFeeds = async () => {
    let data = await client.fetch(fetchQuery).then((feeds) => {
        return feeds;
    });
    return data;
}

export const fetchTips = async () => {
    let data = await client.fetch(fetchQueryTips).then((tips) => {
        return tips;
    });
    return data;
}

export const fetchFood = async () => {
    let data = await client.fetch(fetchQueryFood).then((food) => {
        return food;
    });
    return data;
}

export const fetchUser = async () => {
    try {
        let data = await client.fetch(fetchQueryUser).then((user) => {
            return user;
        });
        return data;
    } catch (error) {
        console.error('Error fetching users:', error)
        return [];
    }
}

export const addUser = async (userData) => {
    try {
        const response = await client.create({
            _type: 'user',
            userID: userData.userID,
            username: userData.username,
            email: userData.email,
            password: userData.password,
        });

        const userID = response._id;

        const updatedResponse = await client.patch(response._id)
            .set({ userID })
            .commit()

        console.log('User added successfully: ', response);
        return updatedResponse;
    } catch (error) {
        console.error('Error adding user:', error.message);
        throw new Error('Failed to add user data')
    }
}

export const fetchFavouriteRecipes = async (userId) => {
    try {
        const query = `*[_type == "user" && userID == $userId] {
            userID,
            "favouriteRecipes": favouriteRecipes[]-> {
                _id,
                title,
                recipeID,
                  mainImage {
                    asset -> { 
                        url
                    }
                },
                RecipeType,
            }
        }`;

        const params = { userId };
        console.log('Fetching favourite recipes with userID:', userId);

        // Fetch data from Sanity
        const favouriteRecipes = await client.fetch(query, params);
        console.log('Fetched favourite recipes:', favouriteRecipes);

        return favouriteRecipes;
    } catch (error) {
        console.error('Error fetching favourite recipes:', error);
        throw error; // Rethrow the error to handle it outside the function
    }
}

export const addFood = async (foodData) => {
    try {
        const response = await client.create({
            _type: 'food',
            product: foodData.product,
            foodID: foodData.foodID,
            foodCategory: foodData.foodCategory,
            price: foodData.price,
            quantity: foodData.quantity,
            useBy: foodData.useBy,
        });

        const foodID = response._id;

        const updatedResponse = await client.patch(response._id)
            .set({ foodID })
            .commit()

        console.log('Food added successfully: ', response);
        return updatedResponse;
    } catch (error) {
        console.error('Error adding food: ', error.message);
        throw new Error('Failed to add food data')
    }
}

export const fetchCurrentUser = async () => {
    try {
        const userId = await AsyncStorage.getItem("@user_id");
        if (userId !== null) {
            // Fetch user details from the database using the stored user ID
            const users = await fetchUser();
            const currentUser = users.find(user => user.userID === userId);

            if (currentUser.shoppingList === null) {
                currentUser.shoppingList = [];
            }
            return currentUser;
        } else {
            console.log('User ID not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
}

export const updateUserShoppingList = async (user, foodID) => {
    try {
        const updatedShoppingList = [...user.shoppingList, foodID];

        // Update the user document in the database with the new shopping list
        const response = await client.patch(user._id)
            .set({ shoppingList: updatedShoppingList })
            .commit();

        console.log('Shopping list updated successfully:', response);
        
        // Return the updated user document
        return response;
    } catch (error) {
        console.error('Error updating shopping list:', error);
        throw error;
    }
}


export const searchFood = async (searchQuery) => {
    try {
        const query = `*[_type == "food" && product match "${searchQuery}"]`;
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error('Error fetching food:', error);
        throw error;
    }
}

export const updateFood = async (updatedData) => {
    try {
      // Use your sanity client to perform the update operation
      const response = await client
        .patch(updatedData._id) // Assuming _id is the ID field for your food item
        .set(updatedData) // Set the updated data
        .commit(); // Commit the changes
  
      console.log('Food data updated in the database:', response);
      return response;
    } catch (error) {
      console.error('Error updating food data in the database:', error);
      throw error; // Throw the error for handling in the component
    }
  };