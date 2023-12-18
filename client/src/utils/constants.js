// Defining base URLs for API calls.
// API_BASE_URL is the root URL for your data-related API requests.
// USERS_BASE_URL is the root URL specifically for user-related API requests.
export const API_BASE_URL = "http://localhost:3030/data";
export const USERS_BASE_URL = "http://localhost:3030/users";

// An object containing paths used in your application.
// This is helpful for managing routes in a centralized location, 
// making it easier to update paths across your app if needed.
export const PATHS = {
    HOME: "/",
    PLAYS: "/plays",
    RESERVATIONS: "/reservations",
    FAVOURITES: "/favourites",
    BOOKING: "/booking",
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout"
};

// Constants related to the functionality of your application.
// TOTAL_ROWS: The total number of rows in the seat reservation system.
// SEATS_PER_ROW: The number of seats per row in the seat reservation system.
// MAX_SEATS: The maximum number of seats a user can reserve at once.
// REVIEWS_PER_PAGE: The number of reviews to display per page.
// RESERVATIONS_PER_PAGE: The number of reservations to display per page.
export const TOTAL_ROWS = 3;
export const SEATS_PER_ROW = 5;
export const MAX_SEATS = 3;
export const REVIEWS_PER_PAGE = 5;
export const RESERVATIONS_PER_PAGE = 3;
export const API_KEY = 'e2c3c97d';