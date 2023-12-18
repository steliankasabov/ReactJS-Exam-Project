// Importing necessary modules and components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import styles from './Booking.module.css';
import { useState, useEffect, useRef } from 'react';
import { TOTAL_ROWS, SEATS_PER_ROW, MAX_SEATS, PATHS } from '../../utils/constants';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as reservationService from '../../services/reservationService'
import * as playService from '../../services/playService'
import Spinner from '../Spinner/Spinner';

// Booking component definition
export default function Booking() {
    // Extracting playId from the URL parameters
    const { playId } = useParams();
    // State variables for managing the booking process
    const [price, setPrice] = useState(0);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    // useNavigate hook for programmatically navigating the user
    const navigate = useNavigate();

    // useEffect hook to fetch play details (price) on component mount
    useEffect(() => {
        playService.getOne(playId)
            .then(result => setPrice(result.price))
            .catch(err => toast.error(err))
    }, [playId]);

    // useEffect hook to fetch reserved seats for the play
    useEffect(() => {
        setIsLoading(true)
        const fetchReservations = async () => {
            try {
                const distinctSeats = await reservationService.getPlaySeats(playId);
                setReservedSeats(distinctSeats);
                setIsLoading(false);
            } catch (error) {
                toast.error('Fail to fetch reservated seats: ' + error.message, {
                    position: "top-center",
                    autoClose: false,
                });
            }
        };

        fetchReservations();
    }, [playId]);

    // Function to check if a seat is reserved
    const isSeatReserved = (seatId) => reservedSeats.includes(seatId);
    
    // Function to check if a seat is selected
    const isSeatSelected = (seatId) => selectedSeats.includes(seatId);

    // Function to handle seat selection
    const handleSeatClick = (seatId) => {
        if (isSeatReserved(seatId)) return;

        setSelectedSeats((prevSelected) => {
            if (prevSelected.includes(seatId)) {
                const newSelected = prevSelected.filter(id => id !== seatId);
                setTotalPrice(newSelected.length * price);
                return newSelected;
            } else {
                if (prevSelected.length >= MAX_SEATS) {
                    showWarningToast();
                    return prevSelected;
                }
                const newSelected = [...prevSelected, seatId];
                setTotalPrice(newSelected.length * price);
                return newSelected;
            }
        });
    }

    const toastId = useRef(null);
    const showWarningToast = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.warn("You can select a maximum of 3 seats", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    // Function to create the seat layout
    const createSeatLayout = () => {
        let layout = [];
        // Looping through rows and seats to create the seat layout
        // Each seat is a clickable icon representing a seat in the theater
        for (let row = 0; row < TOTAL_ROWS; row++) {
            let seatRow = [];
            for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
                const seatId = `${row + 1}${String.fromCharCode(65 + seat)}`;
                seatRow.push(
                    <div
                        key={seatId}
                        className={`${styles.seat} ${isSeatReserved(seatId) ? styles.reservedSeat :
                            isSeatSelected(seatId) ? styles.selectedSeat : ''
                            }`}
                        onClick={() => handleSeatClick(seatId)}
                    >
                        <FontAwesomeIcon icon={faChair} style={{ fontSize: '30px' }} />
                    </div>
                );
            }
            layout.push(<div key={`row-${row}`} className={styles.seatRow}>{seatRow}</div>);
        }
        return layout;
    };

    // Function to handle reservation completion
    const handleReservation = async () => {
        try {
            const reservationData = {
                playId: playId,
                seats: selectedSeats,
                totalPrice: totalPrice
            };
            await reservationService.addReservation(reservationData);
            toast.success('Your Reservation is completed. For more information see Reservations', {
                position: "top-center",
                autoClose: 6000,
            });
        } catch (error) {
            toast.error('Reservation failed: ' + error.message);

        }
        navigate(PATHS.HOME);
    };

    // Rendering the booking component
    return (
        <div className={styles.bookingContainer}>
            <div className={styles.screenLabel}>Screen</div>
            <div className={styles.selectSeatsLabel}>Please select your seats</div>
            <div className={styles.seatsContainer}>
                {isLoading ? <Spinner /> : createSeatLayout()}
            </div>
            <div className={styles.priceLabel}>
                Total Price: ${totalPrice}
            </div>
            <button
                onClick={handleReservation}
                disabled={selectedSeats.length === 0}
                className={styles.reservationButton}
            >
                Finish Reservation
            </button>
        </div>
    );
}