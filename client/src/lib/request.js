// Function to build the options object for fetch requests.
const buildOptions = (data) => {
    const options = {};

    // If data is provided, convert it to JSON and add it to the options object.
    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    // Retrieve the accessToken from local storage and add it to the headers if it exists.
    // This is used for authenticated requests.
    const token = localStorage.getItem('accessToken');    
    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        };
    }

    // Check if the user is an admin and add a custom header for admin users.
    const admin = localStorage.getItem('isAdmin');
    if (admin) {
        options.headers = {
            ...options.headers,
            'X-Admin': ''
        };
    }

    return options;
};

// Generic request function that wraps the fetch API.
const request = async (method, url, data) => {
    // Sending a fetch request with the given URL, method, and options.
    const response = await fetch(url, {
        ...buildOptions(data),
        method,
    });

    // Handling 204 No Content response by returning an empty object.
    if (response.status === 204) {
        return {};
    }

    // Parsing the response body as JSON.
    const result = await response.json();

    // If the response is not ok (status code outside 200-299 range), throw the result as an error.
    if (!response.ok) {
        throw result;
    }

    // Return the parsed result.
    return result;
};

// Exporting HTTP methods as functions.
// These are partially applied versions of the request function, pre-filling the HTTP method.
export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');