import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import styles from "./carousel.module.css";
import leftArrow from "/public/left_arrow.png";
import leftArrowHover from "/public/left_arrow_hover.png";
import rightArrow from "/public/right_arrow.png";
import rightArrowHover from "/public/right_arrow_hover.png";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLeftArrowHovered, setIsLeftArrowHovered] = useState(false);
  const [isRightArrowHovered, setIsRightArrowHovered] = useState(false);

  const { setSelectedProduct } = useContext(AuthContext);

  const handleProductClick = (productId) => {
    setSelectedProduct(productId);
  };

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

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  const renderCard = (item, isMainCard, index) => {
    if (!item || !item.picture) return null;
    return (
      <div
        className={`${styles.card} ${isMainCard ? styles.mainCard : ""}`}
        onClick={() => {
          handleProductClick(item.id);
          handleCardClick(index);
        }}
      >
        <Image
          src={item.picture}
          alt={item.name}
          className={styles.picture}
          width={500}
          height={500}
          layout="responsive"
        />
        <p className={styles.title}>{item.name}</p>
        {isMainCard && (
          <>
            <div className={styles.content}>
              <Link href={`/recipes/products/${item.id}/?type=type2`}>
                Voir les recettes &#x2192;
              </Link>
              <Link href={`/products/${item.id}/`}>
                Voir la fiche produit &#x2192;
              </Link>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {items.length > 2 && (
        <button
          onClick={goToPrevious}
          className={styles.arrow}
          onMouseEnter={() => handleLeftArrowHover(true)}
          onMouseLeave={() => handleLeftArrowHover(false)}
        >
          <Image
            src={isLeftArrowHovered ? leftArrowHover : leftArrow}
            alt="Left Arrow"
            width={50}
            height={50}
          />
        </button>
      )}
      <div className={styles.cards}>
        {items.length === 2 ? (
          items.map((item, index) =>
            renderCard(item, index === currentIndex, index)
          )
        ) : (
          <>
            {renderCard(
              items[(currentIndex + items.length - 1) % items.length],
              false,
              (currentIndex + items.length - 1) % items.length
            )}
            {renderCard(items[currentIndex], true, currentIndex)}
            {renderCard(
              items[(currentIndex + 1) % items.length],
              false,
              (currentIndex + 1) % items.length
            )}
          </>
        )}
      </div>
      {items.length > 2 && (
        <button
          onClick={goToNext}
          className={styles.arrow}
          onMouseEnter={() => handleRightArrowHover(true)}
          onMouseLeave={() => handleRightArrowHover(false)}
        >
          <Image
            src={isRightArrowHovered ? rightArrowHover : rightArrow}
            alt="Right Arrow"
            width={50}
            height={50}
          />
        </button>
      )}
    </div>
  );
};

export default Carousel;