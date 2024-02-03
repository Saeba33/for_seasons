import { useState } from "react";
import styles from "./carousel.module.css"; // Utilisez le nom du fichier correct ici

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastItem = currentIndex === items.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <button onClick={goToPrevious} className={styles.arrowLeft}>
          &#9664;
        </button>
        {items[currentIndex]}
        <button onClick={goToNext} className={styles.arrowRight}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
