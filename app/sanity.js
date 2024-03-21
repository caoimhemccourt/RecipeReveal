import { createClient } from "@sanity/client"
import { fetchQuery } from "./utils/support";
import { fetchQueryTips } from "./utils/supportTips"
import { fetchQueryUser } from "./utils/supportUser";

export const client = createClient({
    projectId : 'w0j2uysp',
    dataset : "production",
    token : process.env.SANITY_AUTH_TOKEN,
    apiVersion : "2024-01-22",
    useCdn : true
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

export const fetchUser = async () => {
    let data = await client.fetch(fetchQueryUser).then((user) => {
        return user;
    });
    return data;
}