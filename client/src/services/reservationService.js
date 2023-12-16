import { API_BASE_URL } from "../utils/constants";
import * as request from "../lib/request"

const baseUrl = `${API_BASE_URL}/reservations`;

export const addReservation = async (reservationData) => {
    await request.post(baseUrl, reservationData);
};

export const getPlaySeats = async (playId) => {
    const result = await request.get(`${baseUrl}?where=playId%3D"${playId}"`);

    return result.reduce((acc, reservation) => {
        if (reservation.seats && Array.isArray(reservation.seats)) {
            return acc.concat(reservation.seats);
        }
        return acc;
    }, []);
}

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