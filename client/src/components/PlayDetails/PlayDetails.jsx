import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PlayDetails.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import * as playService from "../../services/playService";
import * as favouriteService from "../../services/favouriteService";
import { genresToString, formatIsoDate } from '../../utils/functions';
import { PATHS } from '../../utils/constants';
import Spinner from '../Spinner/Spinner';
import ReviewArea from '../ReviewArea/ReviewArea';
import AuthContext from '../../contexts/authContext';
import { toast } from 'react-toastify';
import NotFound from '../NotFound/NotFound';

export default function PlayDetails() {
    const { playId } = useParams();
    const [play, setPlay] = useState(null);
    const [favourite, setFavourite] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { isAuthenticated, userId } = useContext(AuthContext);

    useEffect(() => {
        favouriteService.getFavourite(userId, playId)
            .then(result => setFavourite(result))
            .catch(err => toast.error(err))
    }, [userId, playId])

    useEffect(() => {
        const fetchPlay = async () => {
            try {
                const result = await playService.getOne(playId)
                setPlay(result);
            }
            catch (err) {
                if (err.code == 404) {
                    setNotFound(true);
                }
            }
        }
        fetchPlay();
    }, [playId]);

    if (notFound) {
        return <NotFound />
    }
    if (!play) {
        return <Spinner />;
    }
    const handleFavouriteClick = async () => {
        if (favourite) {
            await favouriteService.deleteFavourite(favourite._id)
            toast.success("Removed from favourites")
            setFavourite(null);
        } else {
            const favouriteData = {
                playId: playId,
            };
            const favourite = await favouriteService.addFavourite(favouriteData);
            toast.success("Added to favourites")
            setFavourite(favourite);
        }
    };

    return (
        <div className={styles.playDetails}>
            <div className={styles.detailsContainer}>
                <img src={play.posterUrl} alt={play.title} className={styles.poster} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{play.title} ({play.year})</h1>
                    <p className={styles.genre}>{genresToString(play.genres)}</p>
                    <p className={styles.description}>{play.description}</p>
                    {isAuthenticated && <div className={styles.favouritesContainer}>
                        <p>Add to Favourites</p>
                        <button className={`${styles.favouritesButton} ${favourite ? styles.favouriteActive : ''}`}
                            onClick={handleFavouriteClick}>
                            <FontAwesomeIcon icon={faStar} />
                        </button>
                    </div>}
                </div>
            </div>
            <div className={styles.additionalInfo}>
                <p className={styles.startTime}>Showtime - {formatIsoDate(play.startTime)}</p>
                <ReactTooltip id="priceTooltip" place="top" effect="solid" />
                <Link to={`${PATHS.PLAYS}/${play._id}${PATHS.BOOKING}`} data-tooltip-content={`Price: $${play.price}`} data-tooltip-id="priceTooltip" className={`${styles.bookingButton}`}>
                    Book a Ticket
                </Link>
            </div>
            <ReviewArea />
        </div>
    );
}