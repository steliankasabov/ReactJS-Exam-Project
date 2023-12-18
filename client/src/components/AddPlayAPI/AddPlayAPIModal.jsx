// Importing necessary React hooks and components
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './AddPlayAPIModal.module.css';
import { formatDateTimeForInput, genresToArray } from '../../utils/functions';
import PlayCard from '../PlayCard/PlayCard';
import * as playService from '../../services/playService'

// AddPlayAPIModal component definition
export default function AddPlayAPIModal({ show, onClose, onSave }) {
    const [imdbID, setImdbID] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [playDetails, setPlayDetails] = useState(null);
    const [price, setPrice] = useState(0);
    const [startTime, setStartTime] = useState(formatDateTimeForInput(null));
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch play details from an external API
    const fetchPlayDetails = async (e) => {
        try {
            e.preventDefault();
            setError('');
            setIsLoading(true);
            
            const data = await playService.getPlayAPI(imdbID, title, year);

            if (data.Response === "True") {
                setPlayDetails(data);
            } else {
                setError('Play not found');
            }
        } catch (error) {
            setError('Failed to fetch play details');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle saving the new play
    const handleSave = (e) => {
        e.preventDefault();
        if (playDetails) {
            const playData = {
                title: playDetails.Title,
                year: playDetails.Year,
                description: playDetails.Plot,
                genres: genresToArray(playDetails.Genre),
                posterUrl: playDetails.Poster,
                price,
                startTime
            }
            onSave(playData);
            setImdbID('');
            setTitle('');
            setYear('');
            setPrice(0);
            setStartTime(formatDateTimeForInput(null));
            setPlayDetails(null);
        }
        else {
            setError('Choose a play')
        }
    };

    // Conditional rendering based on the modal's state
    if (!show) return null;

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <form onSubmit={handleSave}>
                    {/* Form fields for IMDb ID, title, year, price, and start time */}
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

                    <button onClick={fetchPlayDetails} className={styles.checkButton}>
                        Check
                    </button>

                    {/* Conditional rendering for loading spinner, play details, or error message */}
                    {isLoading ? (
                        <Spinner />
                    ) : playDetails ? (
                        <div className={styles.playDetails}>
                            <PlayCard play={{
                                title: playDetails.Title,
                                posterUrl: playDetails.Poster,
                                genres: genresToArray(playDetails.Genre)
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

                    {/* Action buttons for canceling and saving */}
                    <div className={styles.actions}>
                        <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                        <button type="submit" className={styles.saveButton}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}