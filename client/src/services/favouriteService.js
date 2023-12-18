// Importing the API_BASE_URL constant from "../utils/constants".
// This constant holds the base URL for API requests.
import { API_BASE_URL } from "../utils/constants";

// Importing the request module from "../lib/request".
// This module likely handles HTTP requests in a centralized way.
import * as request from "../lib/request"

// Defining the base URL for the favourites-related API endpoints.
const baseUrl = `${API_BASE_URL}/favourites`;

// Asynchronous function to get a favourite item.
// It takes userId and playId as parameters to identify the favourite item for a specific user and play.
export const getFavourite = async (userId, playId) => {
    // Creating a query string with the playId.
    const query = new URLSearchParams({
        where: `playId="${playId}"`,
    });

    // Sending a GET request to retrieve the favourite item.
    // The query string is used to filter the results by playId and _ownerId (userId).
    const result = await request.get(`${baseUrl}?${query} AND _ownerId%3D"${userId}"`);

    // Returning the first item if the result array has elements, else null.
    // This checks if the user has marked the play as a favourite.
    return result.length > 0 ? result[0] : null;
}

// Asynchronous function to add a favourite item.
// It takes favouritesData as a parameter, which contains the details of the favourite item to be added.
export const addFavourite = async (favouritesData) => {
    // Sending a POST request to add the favourite item to the database.
    // The favouritesData is sent in the body of the request.
    return await request.post(`${baseUrl}`, favouritesData);
}

export const deleteFavourite = async (favouriteId) => {
    return await request.remove(`${baseUrl}/${favouriteId}`);
}

export const getFavourites = async (userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `play=playId:plays`,
    });
    return await request.get(`${baseUrl}?${query}`);
}