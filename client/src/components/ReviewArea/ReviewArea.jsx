import { useContext, useEffect, useState } from "react";
import * as reviewService from "../../services/reviewService"
import { toast } from 'react-toastify';
import styles from "./ReviewArea.module.css"
import AuthContext from "../../contexts/authContext";
import ReviewList from "../ReviewList/ReviewList";
import { useParams } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import { REVIEWS_PER_PAGE } from "../../utils/constants";
import useDeleteModal from "../../hooks/useDeleteModal";

export default function ReviewArea() {
    const { movieId } = useParams();
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(REVIEWS_PER_PAGE);
    const { isAuthenticated, username } = useContext(AuthContext);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [updatePage, setUpdatePage] = useState(false);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();


    useEffect(() => {
        reviewService.getReviewsCount(movieId)
            .then(result => setReviewsCount(result))
            .catch(err => toast.error(err))
    }, [movieId])

    useEffect(() => {
        reviewService.getMovieReviews(movieId, (currentPage - 1) * reviewsPerPage, reviewsPerPage)
            .then(result => setReviews(result))
            .catch(err => toast.error(err))
    }, [movieId, currentPage, reviewsPerPage, updatePage])

    const onSubmitReview = async () => {
        if (!reviewText.trim()) {
            return;
        }
        try {
            const reviewData = {
                movieId: movieId,
                text: reviewText,
            };
            const review = await reviewService.addReview(reviewData);
            review.owner = { username };
            toast.success('Review added successfully', {
                position: "top-center",
                autoClose: 4000,
            });

            setReviews([review, ...reviews]);
            setReviewsCount(prevCount => prevCount + 1);
            setReviewText('');
            setCurrentPage(1);
            setUpdatePage(prev => !prev);
        } catch (error) {
            toast.error('Error adding review: ' + error.message, {
                position: "top-center",
                autoClose: false,
            });
        }
    };

    const onDeleteReview = async (reviewId) => {
        try {
            await reviewService.deleteReview(reviewId);
            setReviews(reviews.filter(review => review._id !== reviewId));
            setReviewsCount(prevCount => prevCount - 1);
            setCurrentPage(1);
            setUpdatePage(prev => !prev);
            toast.success('Review deleted successfully', {
                position: "top-center",
                autoClose: 4000,
            });
        } catch (error) {
            toast.error('Erorr deleting review: ' + error.message, {
                position: "top-center",
                autoClose: false,
            });
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reviewsCount / reviewsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.reviewArea}>
            {isAuthenticated ? (
                <>
                    <textarea className={styles.reviewTextarea} placeholder="Leave a review..." value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}></textarea>
                    <button onClick={onSubmitReview} className={styles.submitButton}>Send</button>
                </>) :  <p className={styles.noSignIn}>Sign in to leave a review.</p>}
            <div className={styles.reviewList}>
                <ReviewList reviews={reviews} onDeleteReview={showDeleteModal} />
                <DeleteModal
                    showModal={isModalVisible}
                    onConfirm={() => confirmDeletion(onDeleteReview)}
                    onCancel={hideDeleteModal}
                />
            </div>
            <nav>
                <ul className={styles.pagination}>
                    {pageNumbers.map(number => (
                        <li key={number} className={styles.pageItem}>
                            <a
                                onClick={() => setCurrentPage(number)}
                                className={`${styles.pageLink} ${number === currentPage ? styles.currentPageLink : ''}`}
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}