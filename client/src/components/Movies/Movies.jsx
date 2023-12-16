import { useContext, useEffect, useState } from "react";
import * as movieService from "../../services/movieService";
import styles from "./Movies.module.css";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/authContext";
import useDeleteModal from "../../hooks/useDeleteModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import MovieModal from "../MovieModal/MovieModal";
import AddMovieAPIModal from "../AddMovieAPI/AddMovieAPIModal";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const { isAdmin } = useContext(AuthContext);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();
    const [modalShow, setModalShow] = useState(false);
    const [APImodalShow, setAPIModalShow] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        movieService.getAll()
            .then(result => {
                setMovies(result);
                setIsLoading(false);
            })
            .catch(err => {
                toast.error(err)
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setGenres(getDistinctGenres(movies))
    }, [movies])

    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGenre === '' || movie.genres.includes(selectedGenre));
    });

    const onAddAPIClick = () => {
        setAPIModalShow(true);
    }

    const onAddEditClick = (movie) => {
        setCurrentMovie(movie);
        setModalShow(true);
    };

    const onSave = async (movieData) => {
        try {
            if (currentMovie) {
                const result = await movieService.editMovie(currentMovie._id, movieData);
                setMovies(movies.map(movie => movie._id === result._id ? result : movie));
                toast.success('Movie edited successfully', { position: "top-center", autoClose: 4000 });
            } else {
                const result = await movieService.addMovie(movieData);
                setMovies([result, ...movies]);
                toast.success('Movie added successfully', { position: "top-center", autoClose: 4000 });
            }
        }
        catch (error) {
            toast.error('Error while updating movies: ' + error.message, { position: "top-center", autoClose: false });
        }
        setModalShow(false);
        setAPIModalShow(false);
        setSelectedGenre('');
    };

    const onRemoveMovie = async (movieId) => {
        if (movieId) {
            movieService.deleteMovie(movieId)
                .then(() => {
                    setMovies(movies.filter(movie => movie._id !== movieId));
                    setSelectedGenre('');
                    toast.success('Movie removed successfully');
                })
                .catch(error => toast.error(error));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.filtersAndButtonsContainer}>
                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <select
                        value={selectedGenre}
                        onChange={(e) => { setSelectedGenre(e.target.value); setSearchQuery('') }}
                        className={styles.genreSelect}
                    >
                        <option value="">All Genres</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
                {isAdmin && (
                    <div className={styles.buttonSide}>
                        <button
                            onClick={() => onAddEditClick(null)}
                            className={styles.addMovieButton}>
                            Add Movie
                        </button>
                        <button
                            onClick={() => onAddAPIClick()}
                            className={styles.addMovieButton}>
                            Add Movie API
                        </button>
                    </div>
                )}</div>

            {isLoading ? (
                <Spinner />
            ) : (
                filteredMovies.length ? (
                    <div className={styles.moviesContainer}>
                        {filteredMovies.map(movie => (
                            <div key={movie._id}>
                                <MovieCard movie={{ ...movie }} />
                                {isAdmin && (
                                    <div className={styles.adminActions}>
                                        <button onClick={() => onAddEditClick(movie, genres)} className={styles.editButton}>Edit</button>
                                        <button onClick={() => showDeleteModal(movie._id)} className={styles.deleteButton}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noMovies}>No movies match your criteria</div>
                )
            )}
            <MovieModal
                show={modalShow}
                onClose={() => setModalShow(false)}
                movie={currentMovie}
                allGenres={genres}
                onSave={onSave}
            />
            <AddMovieAPIModal
                show={APImodalShow}
                onClose={() => setAPIModalShow(false)}
                onSave={onSave}
            />
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(onRemoveMovie)}
                onCancel={hideDeleteModal}
            />
        </div>)
}

function getDistinctGenres(movies) {
    const allGenres = movies.map(movie => movie.genres).flat();
    return Array.from(new Set(allGenres));
}