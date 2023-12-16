import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import { genresToString } from '../../utils/functions';
import { PATHS } from '../../utils/constants';
export default function MovieCard({ movie, isInModal }) {
  const cardClassName = isInModal ? `${styles.card} ${styles.cardInModal}` : styles.card;
  const cardContent = (
    <div className={cardClassName}>
      <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.genre}>{genresToString(movie.genres)}</p>
      </div>
    </div>
  );

  return isInModal ? (
    cardContent
  ) : (
    <Link to={`${PATHS.MOVIES}/${movie._id}`} className={styles.cardLink}>
      {cardContent}
    </Link>
  );
}