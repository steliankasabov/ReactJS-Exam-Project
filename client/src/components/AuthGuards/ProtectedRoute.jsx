// Importing necessary hooks and components from React and react-router-dom
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import AuthContext from '../../contexts/authContext';

// ProtectedRoute component definition
// This component is used to protect certain routes that should only be accessible to authenticated users.
export default function ProtectedRoute({ children }) {
    // Using the useContext hook to access the authentication context.
    const { isAuthenticated } = useContext(AuthContext);

    // Conditional rendering based on the user's authentication status.
    // If the user is not authenticated, redirect them to the login page.
    if (!isAuthenticated) {
        return <Navigate to={PATHS.LOGIN} />;
    }

    // If the user is authenticated, render the children components.
    // These children are the components that are passed into the ProtectedRoute.
    return children;
}
