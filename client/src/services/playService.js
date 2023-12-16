import { API_BASE_URL, API_KEY } from "../utils/constants";
import * as request from "../lib/request"

const baseUrl = `${API_BASE_URL}/plays`;

export const getAll = async () => {
    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc`);
    return result;
};

export const getOne = async (playId) => {
    const result = await request.get(`${baseUrl}/${playId}`)
    return result;
};

export const deletePlay = async (playId) => {
    await request.remove(`${baseUrl}/${playId}`);
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

