// Importing necessary modules from React and other libraries.
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authService from '../services/authService';
import usePersistedState from "../hooks/usePersistedState";
import { PATHS } from "../utils/constants";

// Creating a new context for authentication. 
// This context will be used to provide and consume authentication-related data throughout the app.
const AuthContext = createContext();

// The AuthProvider component that will wrap part or all of the application to provide access to the AuthContext.
export const AuthProvider = ({ children }) => {
    // useNavigate hook from react-router-dom for programmatically navigating the user.
    const navigate = useNavigate();

    // Using the custom hook usePersistedState to manage the 'auth' state.
    // This state will persist across browser sessions due to its synchronization with localStorage.
    const [auth, setAuth] = usePersistedState('auth', {});

    // Handler function for login submissions.
    const loginSubmitHandler = async (values) => {
        try {
            // Attempting to log in using the authService.
            const result = await authService.login(values.email, values.password);

            // Updating the auth state and storing the access token and admin status in localStorage.
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('isAdmin', result.isAdmin);

            // Navigating the user back to the previous page upon successful login.
            navigate(-1);
        } catch (error) {
            // Displaying an error message using toast if the login fails.
            toast.error(error.message || 'Login failed', {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };

    // Handler function for registration submissions.
    const registerSubmitHandler = async (values) => {
        try {
            // Attempting to register a new user using the authService.
            const result = await authService.register(values.username, values.email, values.password);

            // Updating the auth state and storing the access token in localStorage.
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);

            // Navigating the user to the home page upon successful registration.
            navigate(PATHS.HOME);
        } catch (error) {
            // Displaying an error message using toast if the registration fails.
            toast.error(error.message || 'Register failed', {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };

    // Handler function for logging out.
    const logoutHandler = () => {
        // Resetting the auth state and removing related items from localStorage.
        setAuth({});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isAdmin');
    };

    // Creating an object containing all the values (state and handlers) to be provided to the context.
    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.accessToken,
        isAdmin: auth.isAdmin
    };

    // Returning the AuthContext.Provider with the values object.
    // This will allow any child components to access these values using the useContext hook.
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

// Setting a display name for the AuthContext for easier debugging.
AuthContext.displayName = 'AuthContext';

// Exporting the AuthContext for use with useContext hook in other components.
export default AuthContext;