// This function is used to format an ISO date string into a more readable format.
// The function takes an ISO date string (isoDate) as input.
export function formatIsoDate(isoDate) {
    // Creating a new Date object from the isoDate string.
    const date = new Date(isoDate);

    // Extracting and formatting individual date components.
    // padStart(2, '0') is used to ensure each part is two digits.
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns 0-11.
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Returning the formatted date string in 'hh:mm dd/mm/yyyy' format.
    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

// This function formats a date-time value for use in HTML input elements of type "datetime-local".
export function formatDateTimeForInput(dateTime) {
    // Creating a Date object. If dateTime is null, the current date and time are used.
    const dateObj = dateTime === null ? new Date() : new Date(dateTime);

    // Extracting and formatting individual components of the date and time.
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    // Returning the formatted date-time string suitable for use in "datetime-local" inputs.
    // The format is 'YYYY-MM-DDTHH:MM', conforming to the HTML standard for such inputs.
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function genresToString(genres) {
    return genres.join(", ");
}

export function genresToArray(genres) {
    return genres.split(', ');
}