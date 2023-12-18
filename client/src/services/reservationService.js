// Importing the API_BASE_URL constant from "../utils/constants".
// This constant holds the base URL for API requests.
import { API_BASE_URL } from "../utils/constants";

// Importing the request module from "../lib/request".
// This module likely handles HTTP requests in a centralized way.
import * as request from "../lib/request"

// Defining the base URL for the reservations-related API endpoints.
const baseUrl = `${API_BASE_URL}/reservations`;

// Asynchronous function to add a reservation.
// It takes reservationData as a parameter, which contains the details of the reservation to be added.
export const addReservation = async (reservationData) => {
    // Sending a POST request to add the reservation to the database.
    // The reservationData is sent in the body of the request.
    await request.post(baseUrl, reservationData);
};

// Asynchronous function to get seats for a specific play.
// It takes playId as a parameter to identify the specific play.
export const getPlaySeats = async (playId) => {
    // Sending a GET request to retrieve reservations for a specific play using its ID.
    const result = await request.get(`${baseUrl}?where=playId%3D"${playId}"`);

    // Processing the result to extract and accumulate all the reserved seats across different reservations.
    return result.reduce((acc, reservation) => {
        if (reservation.seats && Array.isArray(reservation.seats)) {
            // If the reservation has a seats array, accumulate these seats in the accumulator (acc).
            return acc.concat(reservation.seats);
        }
        return acc;
    }, []);
};

export const getReservations = async (userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `play=playId:plays`,
        sortBy: `_createdOn`,
    });
    return await request.get(`${baseUrl}?${query} desc`);
}

export const deleteReservation = async (reservationId) => {
    return await request.remove(`${baseUrl}/${reservationId}`);
}