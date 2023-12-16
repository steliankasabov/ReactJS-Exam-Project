import styles from './PlayCard.module.css';
import { Link } from 'react-router-dom';
import { genresToString } from '../../utils/functions';
import { PATHS } from '../../utils/constants';
export default function PlayCard({ play, isInModal }) {
  const cardClassName = isInModal ? `${styles.card} ${styles.cardInModal}` : styles.card;
  const cardContent = (
    <div className={cardClassName}>
      <img src={play.posterUrl} alt={play.title} className={styles.poster} />
      <div className={styles.info}>
        <h3 className={styles.title}>{play.title}</h3>
        <p className={styles.genre}>{genresToString(play.genres)}</p>
      </div>
    </div>
  );

  return isInModal ? (
    cardContent
  ) : (
    <Link to={`${PATHS.PLAYS}/${play._id}`} className={styles.cardLink}>
      {cardContent}
    </Link>
  );
}