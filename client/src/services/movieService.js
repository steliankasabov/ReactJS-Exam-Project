import { API_BASE_URL, API_KEY } from "../utils/constants";
import * as request from "../lib/request"

const baseUrl = `${API_BASE_URL}/movies`;

export const getAll = async () => {
    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc`);
    return result;
};

export const getOne = async (movieId) => {
    const result = await request.get(`${baseUrl}/${movieId}`)
    return result;
};

export const deleteMovie = async (movieId) => {
    await request.remove(`${baseUrl}/${movieId}`);
}

export const editMovie = async (movieId, movieData) => {
    const result = await request.put(`${baseUrl}/${movieId}`, movieData);
    return result;
};

export const addMovie = async (movieData) => {
    const result = await request.post(`${baseUrl}`, movieData);
    return result;
};

export const getMovieAPI = async (imdbID, title, year) => {
    const apiKey = API_KEY;
    const url = imdbID
        ? `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
        : `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=${apiKey}`;

    const response = await fetch(url);
    return await response.json();
}

