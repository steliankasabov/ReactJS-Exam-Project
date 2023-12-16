import { API_BASE_URL } from "../utils/constants";
import * as request from "../lib/request"

const baseUrl = `${API_BASE_URL}/favourites`;

export const getFavourite = async (userId, movieId) => {
    const query = new URLSearchParams({
        where: `movieId="${movieId}"`,
    });
    const result = await request.get(`${baseUrl}?${query} AND _ownerId%3D"${userId}"`);
    return result.length > 0 ? result[0] : null;
}

export const addFavourite = async (favouritesData) => {
    return await request.post(baseUrl, favouritesData);
}

export const deleteFavourite = async (favouriteId) => {
    return await request.remove(`${baseUrl}/${favouriteId}`);
}

export const getFavourites = async (userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
        load: `movie=movieId:movies`,
    });
    return await request.get(`${baseUrl}?${query}`);
}