import { useContext, useEffect, useState } from "react";
import * as playService from "../../services/playService";
import styles from "./Plays.module.css";
import PlayCard from "../PlayCard/PlayCard";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/authContext";
import useDeleteModal from "../../hooks/useDeleteModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import PlayModal from "../PlayModal/PlayModal";
import AddPlayAPIModal from "../AddPlayAPI/AddPlayAPIModal";

export default function Plays() {
    const [plays, setPlays] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const { isAdmin } = useContext(AuthContext);
    const { isModalVisible, showDeleteModal, hideDeleteModal, confirmDeletion } = useDeleteModal();
    const [modalShow, setModalShow] = useState(false);
    const [APImodalShow, setAPIModalShow] = useState(false);
    const [currentPlay, setCurrentPlay] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        playService.getAll()
            .then(result => {
                setPlays(result);
                setIsLoading(false);
            })
            .catch(err => {
                toast.error(err)
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setGenres(getDistinctGenres(plays))
    }, [plays])

    const filteredPlays = plays.filter(play => {
        return play.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGenre === '' || play.genres.includes(selectedGenre));
    });

    const onAddAPIClick = () => {
        setAPIModalShow(true);
    }

    const onAddEditClick = (play) => {
        setCurrentPlay(play);
        setModalShow(true);
    };

    const onSave = async (playData) => {
        try {
            if (currentPlay) {
                const result = await playService.editPlay(currentPlay._id, playData);
                setPlays(plays.map(play => play._id === result._id ? result : play));
                toast.success('Play edited successfully', { position: "top-center", autoClose: 4000 });
            } else {
                const result = await playService.addPlay(playData);
                setPlays([result, ...plays]);
                toast.success('Play added successfully', { position: "top-center", autoClose: 4000 });
            }
        }
        catch (error) {
            toast.error('Error while updating plays: ' + error.message, { position: "top-center", autoClose: false });
        }
        setModalShow(false);
        setAPIModalShow(false);
        setSelectedGenre('');
    };

    const onRemovePlay = async (playId) => {
        if (playId) {
            playService.deletePlay(playId)
                .then(() => {
                    setPlays(plays.filter(play => play._id !== playId));
                    setSelectedGenre('');
                    toast.success('Play removed successfully');
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
                        placeholder="Search plays..."
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
                            className={styles.addPlayButton}>
                            Add Play
                        </button>
                        <button
                            onClick={() => onAddAPIClick()}
                            className={styles.addPlayButton}>
                            Add Play API
                        </button>
                    </div>
                )}</div>

            {isLoading ? (
                <Spinner />
            ) : (
                filteredPlays.length ? (
                    <div className={styles.playsContainer}>
                        {filteredPlays.map(play => (
                            <div key={play._id}>
                                <PlayCard play={{ ...play }} />
                                {isAdmin && (
                                    <div className={styles.adminActions}>
                                        <button onClick={() => onAddEditClick(play, genres)} className={styles.editButton}>Edit</button>
                                        <button onClick={() => showDeleteModal(mplay._id)} className={styles.deleteButton}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noPlays}>No plays match your criteria</div>
                )
            )}
            <PlayModal
                show={modalShow}
                onClose={() => setModalShow(false)}
                play={currentPlay}
                allGenres={genres}
                onSave={onSave}
            />
            <AddPlayAPIModal
                show={APImodalShow}
                onClose={() => setAPIModalShow(false)}
                onSave={onSave}
            />
            <DeleteModal
                showModal={isModalVisible}
                onConfirm={() => confirmDeletion(onRemovePlay)}
                onCancel={hideDeleteModal}
            />
        </div>)
}

function getDistinctGenres(plays) {
    const allGenres = plays.map(play => play.genres).flat();
    return Array.from(new Set(allGenres));
}