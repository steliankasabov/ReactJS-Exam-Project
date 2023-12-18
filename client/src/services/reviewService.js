// Importing the request module from "../lib/request".
// This module is used for handling HTTP requests in a centralized way.
import * as request from "../lib/request"

// Importing the API_BASE_URL constant from "../utils/constants".
// This constant holds the base URL for API requests.
import { API_BASE_URL } from "../utils/constants";

// Defining the base URL for the reviews-related API endpoints.
const baseUrl = `${API_BASE_URL}/reviews`;

// Asynchronous function to get reviews for a specific play.
// It takes playId, skip, and take as parameters to identify the specific play and handle pagination.
export const getPlayReviews = async (playId, skip, take) => {
    // Creating a query string for the request.
    // It includes filters for the playId and pagination details (offset and pageSize).
    const query = new URLSearchParams({
        where: `playId="${playId}"`,
        load: `owner=_ownerId:users`, // Loading additional data (like the owner of the review).
        offset: `${skip}`, // The number of records to skip (for pagination).
        pageSize: `${take}`, // The number of records to fetch.
        sortBy: `_createdOn` // Sorting the results by creation date.
    });

    // Sending a GET request to retrieve the reviews based on the query string.
    const result = await request.get(`${baseUrl}?${query} desc`)

    // Returning the result of the GET request, which contains the reviews for the specified play.
    return result;
};

export const addReview = async (reviewData) => {
    return await request.post(baseUrl, reviewData);
}

export const deleteReview = async (reviewId) => {
    await request.remove(`${baseUrl}/${reviewId}`)
}

export const getReviewsCount = async (playId) => {
    const query = new URLSearchParams({
        where: `playId="${playId}"`,
    });
    return await request.get(`${baseUrl}?${query}&count`)
}