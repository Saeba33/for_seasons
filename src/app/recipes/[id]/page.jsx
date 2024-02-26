"use client";

import { frenchDifficulty } from "@/app/utils/translations";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./recipe-detail.module.css";
import favorite from "/public/favorite.png";
import unfavorite from "/public/not-favorite.png";

const RecipeDetails = () => {
  const { isLoggedIn, authToken } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(true);

  const checkIfFavorite = useCallback(
    async (recipeId) => {
      if (!isLoggedIn || !authToken) {
        setIsFavorite(false);
        return;
      }
      try {
        const response = await fetch(`/api/favorites/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setIsFavorite(response.ok);
      } catch (error) {
        console.error("Error checking favorite:", error);
        setIsFavorite(false);
      }
    },
    [authToken, isLoggedIn]
  );

  useEffect(() => {
    const fetchRecipeAndCheckFavorite = async () => {
      const recipeId = window.location.pathname.split("/").pop();
      try {
        const response = await fetch(`/api/recipes/${recipeId}/?type=type1`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
      await checkIfFavorite(recipeId);
      setIsLoadingFavorite(false);
    };
    fetchRecipeAndCheckFavorite();
  }, [checkIfFavorite]);

  const addFavorite = async () => {
    const recipeId = window.location.pathname.split("/").pop();
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (response.ok) {
        setIsFavorite(true);
      } else {
        console.error("Failed to add favorite");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFavorite = async () => {
    const recipeId = window.location.pathname.split("/").pop();
    try {
      const response = await fetch(`/api/favorites/${recipeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        setIsFavorite(false);
      } else {
        console.error("Failed to remove favorite");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          src={recipe.photo}
          alt={recipe.title}
          width={200}
          height={200}
          layout="responsive"
        />
        {isLoggedIn && (
          <div className={styles.favoriteContainer}>
            <button
              className={styles.favorite}
              onClick={isFavorite ? removeFavorite : addFavorite}
              disabled={isLoadingFavorite}
            >
              {isLoadingFavorite ? (
                "Chargement..."
              ) : isFavorite ? (
                <Image src={favorite} alt="Favorite" width={50} height={50} />
              ) : (
                <Image
                  src={unfavorite}
                  alt="Not Favorite"
                  width={50}
                  height={50}
                />
              )}
            </button>
          </div>
        )}

        <div className={styles.content}>
          <h2 className={styles.title}>{recipe.title}</h2>
          <p className={styles.difficulty}>
            Difficulté : {frenchDifficulty(recipe.difficulty)}
          </p>
          <p className={styles.duration}>
            Temps de préparation : {recipe.duration}
          </p>
          <p className={styles.persons}>
            Nombre de personnes : {recipe.number_persons}
          </p>
          <p className={styles.ustensils}>Ustensiles : {recipe.ustensils}</p>
          <p className={styles.informations}>
            Informations : {recipe.information}
          </p>
        </div>
        <p className={styles.instructions}>
          Instructions : {recipe.instructions}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;
