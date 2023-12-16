import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './AddMovieAPIModal.module.css';
import { formatDateTimeForInput, genresToArray } from '../../utils/functions';
import MovieCard from '../MovieCard/MovieCard';
import * as movieService from '../../services/movieService'

export default function AddMovieAPIModal({ show, onClose, onSave }) {
    const [imdbID, setImdbID] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [movieDetails, setMovieDetails] = useState(null);
    const [price, setPrice] = useState(0);
    const [startTime, setStartTime] = useState(formatDateTimeForInput(null));
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovieDetails = async (e) => {
        try {
            e.preventDefault();
            setError('');
            setIsLoading(true);
            
            const data = await movieService.getMovieAPI(imdbID, title, year);

            if (data.Response === "True") {
                setMovieDetails(data);
            } else {
                setError('Movie not found');
            }
        } catch (error) {
            setError('Failed to fetch movie details');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (movieDetails) {
            const movieData = {
                title: movieDetails.Title,
                year: movieDetails.Year,
                description: movieDetails.Plot,
                genres: genresToArray(movieDetails.Genre),
                posterUrl: movieDetails.Poster,
                price,
                startTime
            }
            onSave(movieData);
            setImdbID('');
            setTitle('');
            setYear('');
            setPrice(0);
            setStartTime(formatDateTimeForInput(null));
            setMovieDetails(null);
        }
        else {
            setError('Choose a movie')
        }
    };

    if (!show) return null;

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <form onSubmit={handleSave}>
                    <label>
                        <a href="https://m.imdb.com/chart/top/?ref_=nv_mv_250" target="_blank" rel="noopener noreferrer">IMDb ID:</a>
                    </label>
                    <input
                        type="text"
                        value={imdbID}
                        onChange={(e) => setImdbID(e.target.value)}
                        className={styles.inputField}
                    />

                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.inputField}
                    />

                    <label>Year:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className={styles.inputField}
                    />

                    <button onClick={fetchMovieDetails} className={styles.checkButton}>
                        Check
                    </button>

                    {isLoading ? (
                        <Spinner />
                    ) : movieDetails ? (
                        <div className={styles.movieDetails}>
                            <MovieCard movie={{
                                title: movieDetails.Title,
                                posterUrl: movieDetails.Poster,
                                genres: genresToArray(movieDetails.Genre)
                            }} isInModal={true} />
                        </div>
                    ) : error ? (
                        <div className={styles.error}>{error}</div>
                    ) : null}

                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={styles.inputField}
                    />

                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className={styles.inputField}
                    />

                    <div className={styles.actions}>
                        <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                        <button type="submit" className={styles.saveButton}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}