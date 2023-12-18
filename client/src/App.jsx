// Importing the necessary components from 'react-router-dom' to handle routing in your application.
// BrowserRouter as Router: A router that uses the HTML5 history API to keep your UI in sync with the URL.
// Routes: A component that renders the first Route that matches the location.
// Route: A component that renders some UI when its path matches the current URL.
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Importing various components used in your application.
// These components represent different pages or sections of your site.
import Home from './components/Home/Home';
import Plays from './components/Plays/Plays';
import NotFound from './components/NotFound/NotFound';
import PlayDetails from './components/PlayDetails/PlayDetails'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Booking from './components/Booking/Booking';
import { ToastContainer } from 'react-toastify';
import { PATHS } from './utils/constants';
import { AuthProvider } from './contexts/authContext';
import Logout from './components/Logout/Logout';
import ProtectedRoute from './components/AuthGuards/ProtectedRoute';
import Favourites from './components/Favourites/Favourites';
import Reservations from './components/Reservations/Reservations';
import GuestRoute from './components/AuthGuards/PublicRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.PLAYS} element={<Plays />} />
            <Route path={`${PATHS.PLAYS}/:playId`} element={<PlayDetails />} />
            <Route path={PATHS.RESERVATIONS} element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
            <Route path={PATHS.FAVOURITES} element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
            <Route path={`${PATHS.PLAYS}/:playId${PATHS.BOOKING}`} element={<ProtectedRoute><Booking /></ProtectedRoute>} />
            <Route path={PATHS.LOGIN} element={<GuestRoute><Login /></GuestRoute>} />
            <Route path={PATHS.REGISTER} element={<GuestRoute><Register /></GuestRoute>} />
            <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
