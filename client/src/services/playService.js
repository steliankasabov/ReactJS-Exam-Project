// Importing constants from "../utils/constants".
// API_BASE_URL is the root URL for API requests.
// API_KEY might be used for authenticated API requests or external APIs.
import { API_BASE_URL, API_KEY } from "../utils/constants";

// Importing the request module from "../lib/request".
// This module likely handles HTTP requests in a centralized way.
import * as request from "../lib/request"

// Defining the base URL for the plays-related API endpoints.
const baseUrl = `${API_BASE_URL}/plays`;

// Asynchronous function to get all play records.
// This function makes a request to fetch all plays, sorted by creation date in descending order.
export const getAll = async () => {
    // Sending a GET request to the plays endpoint with a query parameter to sort the results.
    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

    // Returning the result of the GET request.
    // This result likely contains an array of play records.
    return result;
};

// Asynchronous function to get a single play record by its ID.
// It takes playId as a parameter to identify the specific play.
export const getOne = async (playId) => {
    // Sending a GET request to retrieve a specific play using its ID.
    const result = await request.get(`${baseUrl}/${playId}`)

    // Returning the result of the GET request.
    // This result likely contains the details of the requested play.
    return result;
};

// Asynchronous function to delete a play record.
// It takes playId as a parameter to identify the specific play to be deleted.
export const deletePlay = async (playId) => {
    // Sending a DELETE request to remove a specific play using its ID.
    await request.remove(`${baseUrl}/${playId}`);
    // There is no return statement, indicating this function might not return a value but just perform the deletion.
}

export const editPlay = async (playId, playData) => {
    const result = await request.put(`${baseUrl}/${playId}`, playData);
    return result;
};

export const addPlay = async (playData) => {
    const result = await request.post(`${baseUrl}`, playData);
    return result;
};

export const getPlayAPI = async (imdbID, title, year) => {
    const apiKey = API_KEY;
    const url = imdbID
        ? `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
        : `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=${apiKey}`;

    const response = await fetch(url);
    return await response.json();
}

