import { useState, useEffect, useContext } from 'react';
import * as favouriteService from '../../services/favouriteService';
import MovieCard from '../MovieCard/MovieCard';
import styles from './Favourites.module.css';
import { toast } from 'react-toastify';
import AuthContext from '../../contexts/authContext';
import DeleteModal from '../DeleteModal/DeleteModal';
import Spinner from '../Spinner/Spinner';
import useDeleteModal from '../../hooks/useDeleteModal';

export default function Favourites() {
    const { userId } = useContext(AuthContext);
    const [favourites, setFavourites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortCriterion, setSortCriterion] = useState('_createdOn');
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();

    useEffect(() => {
        setIsLoading(true);
        favouriteService.getFavourites(userId)
            .then(result => { setFavourites(result); setIsLoading(false) })
            .catch(error => { toast.error(error); setIsLoading(false) });
    }, [userId]);

    const onRemoveFavourite = async (favouriteId) => {
        if (favouriteId) {
            favouriteService.deleteFavourite(favouriteId)
                .then(() => {
                    setFavourites(favourites.filter(favourite => favourite._id !== favouriteId));
                    toast.success('Removed from favourites successfully');
                })
                .catch(error => toast.error(error));
        }
    };

    const sortedFavourites = [...favourites].sort((a, b) => {
        if (sortCriterion === '_createdOn') {
            return b._createdOn - a._createdOn;
        } else if (sortCriterion === 'title') {
            return a.movie.title.localeCompare(b.movie.title);
        } else if (sortCriterion === 'year') {
            return a.movie.year - b.movie.year;
        } else if (sortCriterion === 'startTime') {
            return new Date(a.movie.startTime) - new Date(b.movie.startTime);
        } else if (sortCriterion === 'price') {
            return a.movie.price - b.movie.price;
        }
    });

    return (
        <div className={styles.favouritesPage}>
            <h1 className={styles.title}>Your Favourites</h1>
            <div className={styles.sortContainer}>
                <label htmlFor="sortCriterion">Sort by </label>
                <select
                    name="sortCriterion"
                    id="sortCriterion"
                    value={sortCriterion}
                    onChange={(e) => setSortCriterion(e.target.value)}
                >
                    <option value="_createdOn">Added</option>
                    <option value="title">Title</option>
                    <option value="year">Year</option>
                    <option value="startTime">Start Time</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <div className={styles.moviesGrid}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    favourites.length === 0 ? (
                        <p className={styles.noFavourites}>You have no favourite movies.</p>
                    ) : (
                        sortedFavourites.map(favourite => (
                            <div key={favourite.movie._id} className={styles.movieCardWrapper}>
                                <MovieCard movie={favourite.movie} />
                                <button
                                    className={styles.removeFavouriteButton}
                                    onClick={() => showDeleteModal(favourite._id)}>
                                    Remove
                                </button>
                            </div>
                        ))
                    )
                )}
            </div>

            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(onRemoveFavourite)}
                onCancel={hideDeleteModal}
            />
        </div>
    );
}