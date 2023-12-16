import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './ReviewList.module.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';


export default function ReviewList({ reviews, onDeleteReview }) {
    const { isAdmin, userId } = useContext(AuthContext);

    return (
        <div className={styles.reviewList}>
            {reviews.map(review => (
                <div key={review._id} className={styles.review}>
                    <p className={styles.author}>{review.owner.username}</p>
                    <p className={styles.content}>{review.text}</p>
                    {(userId === review._ownerId || isAdmin) && (
                        <button onClick={() => onDeleteReview(review._id)} className={styles.deleteButton}>
                            <FontAwesomeIcon icon={faTrashAlt} color="red" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
