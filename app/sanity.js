import { createClient } from "@sanity/client"
import { fetchQuery } from "./utils/support";

const client = createClient({
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