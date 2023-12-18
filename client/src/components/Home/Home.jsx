import styles from './Home.module.css'
import PlayCarousel from '../../components/PlayCarousel/PlayCarousel';
import PlaysMap from '../../components/PlaysMap/PlaysMap';
import About from '../About/About';

export default function Home() {
  return (
    <div className="container mx-auto px-4 min-h-[90vh]">
      <p className={styles.welcomeTitle}>
        <img src="/slogan.png" alt="Sofia Park Theatre" />
      </p>

      <h2 className={styles.upcomingShowingsTitle}>Upcoming Shows:</h2>
    
      <PlayCarousel />

      <About />

      <PlaysMap />
     
    </div>
  );
}