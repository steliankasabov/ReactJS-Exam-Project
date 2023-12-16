import * as request from "../lib/request"
import { API_BASE_URL } from "../utils/constants";

const baseUrl = `${API_BASE_URL}/reviews`;

export const getPlayReviews = async (playId, skip, take) => {
    const query = new URLSearchParams({
        where: `playId="${playId}"`,
        load: `owner=_ownerId:users`,
        offset: `${skip}`,
        pageSize: `${take}`,
        sortBy: `_createdOn`
    });
    const result = await request.get(`${baseUrl}?${query} desc`)
    return result;
}

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