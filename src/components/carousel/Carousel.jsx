import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
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
    console.log("productId", productId);
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

  const renderCard = (item, isMainCard) => {
    if (!item || !item.picture) {
      return null;
    }
    return (
      <div
        className={`${styles.card} ${isMainCard ? styles.mainCard : ""}`}
        onClick={() => item.id && handleProductClick(item.id)}
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
              <Link
                className={styles.seeRecipe}
                href={`/recipes/products/${item.id}/?type=type2`}
              >
                {" "}
                Voir la recette &#x2192;{" "}
              </Link>

              <span className={styles.seeProduct}>
                Voir la fiche produit &#x2192;{" "}
              </span>
            </div>
          </>
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
          width={50}
          height={50}
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
          width={50}
          height={50}
        />
      </button>
    </div>
  );
};

export default Carousel;
