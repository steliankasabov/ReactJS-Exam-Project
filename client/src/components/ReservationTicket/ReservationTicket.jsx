import styles from "./ReservationTicket.module.css";
import { formatIsoDate } from "../../utils/functions";
export default function ReservationTicket({ reservation, onCancelClick } ) {
    return (
        <div className={styles.ticket}>
            <div className={styles.ticketContent}>
                <img src={reservation.play.posterUrl} alt={reservation.play.title} className={styles.poster} />
                <div className={styles.details}>
                    <h3>{reservation.play.title}</h3>
                    <p>Seats: {reservation.seats.join(', ')}</p>
                    <p>Start Time: {formatIsoDate(reservation.play.startTime)}</p>
                    <p>Total Price: ${reservation.totalPrice}</p>
                </div>
            </div>
            <button
                className={styles.cancelButton}
                onClick={() => onCancelClick(reservation._id)}>
                Cancel
            </button>
        </div>
    );
}