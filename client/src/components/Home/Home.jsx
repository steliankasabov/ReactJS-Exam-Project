import styles from './Home.module.css'
import PlayCarousel from '../../components/PlayCarousel/PlayCarousel';

export default function Home() {
  return (
    <div className="container mx-auto px-4 min-h-[90vh]">
      <p className={styles.welcomeTitle}>
        <img src="/slogan.png" alt="Sofia Park Theatre" />
      </p>

      <h2 className={styles.upcomingShowingsTitle}>Upcoming Shows:</h2>
    
      <PlayCarousel />

      <div className={styles.descriptionHome}>

      <p><strong>The Sofia Park Theatre Festival is an innovative cultural event that marries the grandeur of theater with the serene beauty of Sofia's parks. </strong></p>
        <p>&nbsp;</p>
        <p>This distinctive festival showcases a wide array of scenic performances, not through live acts, but via large cinema screens strategically placed in various parks across the city. These screenings feature a diverse selection of plays, ranging from timeless Shakespearean classics to modern, cutting-edge productions, offering a cinematic twist to the traditional theater experience.</p>
        <p>&nbsp;</p>
        <p>The festival transforms the parks into open-air cinemas, where audiences gather under the canopy of stars and trees to enjoy high-definition broadcasts of renowned theatrical performances. This format allows for an intimate yet communal viewing experience, where the audience can appreciate the nuances of each performance in a relaxed outdoor setting.</p>
        <p>&nbsp;</p>
        <p>Apart from the screenings, the festival includes interactive workshops and discussion panels, where attendees can delve deeper into the themes of the plays, learn about the intricacies of theater production, and engage in conversations with experts in the field.</p>
        <p>&nbsp;</p>
        <p>These activities provide a comprehensive cultural experience, extending beyond just watching the performances. As dusk falls, the parks come alive with the glow of the big screens, creating a magical atmosphere. The fusion of nature's tranquility and the dynamic storytelling on screen offers a unique cultural experience.</p>
        <p>&nbsp;</p>
        <p>With the addition of local food vendors and artisanal markets, the "Sofia Park Theatre Festival" becomes more than just a viewing event; it's a celebration of art, community, and the great outdoors, bringing the splendor of theatrical performances into the heart of nature.</p>

      </div>
     
    </div>
  );
}