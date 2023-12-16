import { useEffect, useState } from "react";
import styles from './MovieModal.module.css';
import { formatDateTimeForInput } from "../../utils/functions";

export default function MovieModal({ show, onClose, movie, onSave, allGenres }) {
    const [formData, setFormData] = useState({
        title: '',
        year: '1900',
        genres: [],
        description: '',
        posterUrl: '',
        price: '',
        startTime: ''
    });

    const [genres, setGenres] = useState([])
    const [showNewGenreInput, setShowNewGenreInput] = useState(false);
    const [newGenre, setNewGenre] = useState('');

    useEffect(() => {
        setGenres(allGenres)
    }, [allGenres]);

    useEffect(() => {
        if (movie) {
            setFormData({
                title: movie.title,
                year: movie.year,
                genres: movie.genres,
                description: movie.description,
                posterUrl: movie.posterUrl,
                price: movie.price,
                startTime: formatDateTimeForInput(movie.startTime),
            });
        } else {
            setFormData({
                title: '',
                year: '1900',
                genres: [],
                description: '',
                posterUrl: '',
                price: 0,
                startTime: formatDateTimeForInput(null)
            })
        }
    }, [movie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumericField = name === 'price';
        const formattedValue = isNumericField ? parseFloat(value) || 0 : value;

        setFormData({ ...formData, [name]: formattedValue });
    };

    const handleGenreChange = (genre) => {
        const updatedGenres = formData.genres.includes(genre)
            ? formData.genres.filter(g => g !== genre)
            : [...formData.genres, genre];
        setFormData({ ...formData, genres: updatedGenres });
    };

    const handleShowNewGenreInput = () => {
        setShowNewGenreInput(true);
    };

    const handleAddNewGenre = (e) => {
        e.preventDefault();
        if (newGenre && !allGenres.includes(newGenre)) {
            setGenres([...genres, newGenre]);
            handleGenreChange(newGenre);
        }
        setNewGenre('');
        setShowNewGenreInput(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!show) return null;
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input name="title" value={formData.title} onChange={handleChange} required/>

                    <label>Year:</label>
                    <input name="year" value={formData.year} onChange={handleChange} type="number" />

                    <label>Genres:</label>
                    <div className={styles.genresContainer}>
                        {genres.map(genre => (
                            <label key={genre} className={styles.genreLabel}>
                                {genre}
                                <input
                                    type="checkbox"
                                    checked={formData.genres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                    className={styles.genreCheckbox}
                                />
                            </label>
                        ))}
                        {showNewGenreInput ? (
                            <div className={styles.newGenreInputContainer}>
                                <input
                                    type="text"
                                    value={newGenre}
                                    onChange={(e) => setNewGenre(e.target.value)}
                                    className={styles.newGenreInput}
                                />
                                <button onClick={handleAddNewGenre} className={styles.addGenreButton}>Add</button>
                            </div>
                        ) : (
                            <button onClick={handleShowNewGenreInput} className={styles.addGenreButton}>+</button>
                        )}
                    </div>

                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />

                    <label>Poster URL:</label>
                    <input name="posterUrl" value={formData.posterUrl} onChange={handleChange} />

                    <label>Price:</label>
                    <input name="price" value={formData.price} onChange={handleChange} type="number" />

                    <label>Start Time:</label>
                    <input name="startTime" value={formData.startTime} onChange={handleChange} type="datetime-local" />

                    <div className={styles.actions}>
                        <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                        <button type="submit" className={styles.saveButton}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}