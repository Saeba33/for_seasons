import { useState } from "react";
import Image from "next/image";
import styles from "./carousel.module.css";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderCard = (item, isMainCard) => {
    if (!item || !item.picture) {
      return null;
    }

    return (
      <div className={`${styles.card} ${isMainCard ? styles.mainCard : ""}`}>
        <Image
          src={item.picture}
          alt={item.name}
          width={200}
          height={200}
          layout="responsive"
        />
        {isMainCard && (
          <div>
            <h5>{item.name}</h5>
            <p>{item.description}</p>
          </div>
        )}
      </div>
    );
  };


  return (
    <div className={styles.container}>
      <button onClick={goToPrevious} className={styles.arrow}>
        &#9664;
      </button>
      <div className={styles.cards}>
        {renderCard(items[(currentIndex + items.length - 1) % items.length])}
        {renderCard(items[currentIndex], true)}
        {renderCard(items[(currentIndex + 1) % items.length])}
      </div>
      <button onClick={goToNext} className={styles.arrow}>
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
