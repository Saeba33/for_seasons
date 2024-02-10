import Image from "next/image";
import { useState } from "react";
import styles from "./carousel.module.css";
import leftArrow from "/public/left_arrow.png";
import rightArrow from "/public/right_arrow.png";
import leftArrowHover from "/public/left_arrow_hover.png"; // Importez l'image de survol de la flèche gauche
import rightArrowHover from "/public/right_arrow_hover.png"; // Importez l'image de survol de la flèche droite

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLeftArrowHovered, setIsLeftArrowHovered] = useState(false);
  const [isRightArrowHovered, setIsRightArrowHovered] = useState(false);

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

  const handleLeftArrowHover = (isHovered) => {
    setIsLeftArrowHovered(isHovered);
  };

  const handleRightArrowHover = (isHovered) => {
    setIsRightArrowHovered(isHovered);
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
          className={styles.picture}
          width={500}
          height={500}
          layout="responsive"
        />
        {isMainCard && (
          <div>
            <h5 className={styles.name}>{item.name}</h5>
            <p className={styles.description}>{item.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <button
        onClick={goToPrevious}
        className={styles.arrow}
        onMouseEnter={() => handleLeftArrowHover(true)}
        onMouseLeave={() => handleLeftArrowHover(false)}
      >
        <Image
          src={isLeftArrowHovered ? leftArrowHover : leftArrow}
          alt="Left Arrow"
          width={32}
          height={32}
        />
      </button>
      <div className={styles.cards}>
        {renderCard(items[(currentIndex + items.length - 1) % items.length])}
        {renderCard(items[currentIndex], true)}
        {renderCard(items[(currentIndex + 1) % items.length])}
      </div>
      <button
        onClick={goToNext}
        className={styles.arrow}
        onMouseEnter={() => handleRightArrowHover(true)}
        onMouseLeave={() => handleRightArrowHover(false)}
      >
        <Image
          src={isRightArrowHovered ? rightArrowHover : rightArrow}
          alt="Right Arrow"
          width={32}
          height={32}
        />
      </button>
    </div>
  );
};

export default Carousel;
