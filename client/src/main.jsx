// Importing the ReactDOM package from 'react-dom/client', which is used for DOM rendering.
import ReactDOM from 'react-dom/client'

// Importing the App component from the 'App.jsx' file. 
// This is the root component that wraps all other components in your React application.
import App from './App.jsx'

// Importing global CSS styles. 
// This file likely contains styles that are applied across the entire application.
import './assets/styles/global.css'

// Importing CSS for 'react-toastify'.
// 'react-toastify' is a library used for showing notifications in a React app.
import 'react-toastify/dist/ReactToastify.css';

// Importing CSS for 'slick-carousel'.
// 'slick-carousel' is a library for creating carousels in React.
// These CSS files provide the default styling for the carousel.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Creating the root of your React application.
// ReactDOM.createRoot creates a root DOM node for the React component tree.
// 'document.getElementById('root')' gets the DOM element with the id 'root'.
// This is where your React app will be rendered on the page.
// The '<App />' is the root React component that gets rendered inside the 'root' DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

