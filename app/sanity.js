import { createClient } from "@sanity/client"
import { fetchQuery } from "./utils/support";
import { fetchQueryTips } from "./utils/supportTips"
import { fetchQueryUser } from "./utils/supportUser";
import { fetchQueryFood } from "./utils/supportFood";

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
        console.error('Errot adding user:', error.message);
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
                mainImage,
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

