// Importing the useState hook from React.
import { useState } from 'react';

// A custom hook named usePersistedState.
// This hook is designed to synchronize a piece of state with localStorage, allowing the state to persist across browser sessions.
export default function usePersistedState(key, defaultValue) {
    // Initializing the state with a function to check if there's already a value in localStorage.
    // This function is passed to useState, so it's only executed on the initial render.
    const [state, setState] = useState(() => {
        // Retrieving the persisted state from localStorage using the provided key.
        const persistedState = localStorage.getItem(key);

        // If there is persisted data, parse it and return as the initial state.
        // Otherwise, use the provided defaultValue.
        if (persistedState) {
            return JSON.parse(persistedState);
        }
        return defaultValue;
    });

    // Function to update both the state and the persisted value in localStorage.
    const setPersistedState = (value) => {
        // Updating the state.
        setState(value);

        // Serializing the new value for storage in localStorage.
        // If the value is a function, it's executed with the current state and the result is serialized.
        let serializedValue;
        if (typeof value === 'function') {
            serializedValue = JSON.stringify(value(state));
        } else {
            serializedValue = JSON.stringify(value);
        }

        // Storing the serialized value in localStorage.
        localStorage.setItem(key, serializedValue);
    };

    // Returning the state and the function to update it.
    // This is similar to the standard useState hook, but with the added persistence feature.
    return [
        state,
        setPersistedState,
    ];
}