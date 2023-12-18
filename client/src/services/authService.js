// Importing the request module from '../lib/request'.
// This module is likely handling HTTP requests in a centralized way.
import * as request from '../lib/request';

// Importing USERS_BASE_URL constant from '../utils/constants'.
// This constant holds the base URL for user-related API endpoints.
import { USERS_BASE_URL } from '../utils/constants';

// Asynchronous function to handle user login.
// It takes email and password as parameters for the login credentials.
export const login = async (email, password) => {
    // Sending a POST request to the login endpoint with the email and password.
    // The USERS_BASE_URL is concatenated with '/login' to form the full URL.
    const result = await request.post(`${USERS_BASE_URL}/login`, {
        email,
        password,
    });

    // Returning the result of the POST request.
    // This result likely contains user authentication data, like tokens.
    return result;
};

// Function to handle user registration.
// It takes username, email, and password as parameters for the new user's credentials.
export const register = (username, email, password) => 
    // Sending a POST request to the register endpoint with the username, email, and password.
    // The USERS_BASE_URL is concatenated with '/register' to form the full URL.
    request.post(`${USERS_BASE_URL}/register`, {
        username,
        email,
        password,
    });

// Function to handle user logout.
export const logout = () => 
    // Sending a GET request to the logout endpoint.
    // The USERS_BASE_URL is concatenated with '/logout' to form the full URL.
    request.get(`${USERS_BASE_URL}/logout`);
