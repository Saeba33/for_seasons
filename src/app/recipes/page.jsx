"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { frenchDifficulty } from "../utils/translations";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./recipes.module.css";
import difficulty from "/public/difficulty.png";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { authToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const apiUrl = showFavorites ? "/api/favorites" : "/api/recipes";
    fetch(apiUrl, {
      headers: {
        ...(authToken && {
          Authorization: `Bearer ${authToken}`,
        }),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = showFavorites
          ? data.map((item) => item.recipe || item)
          : data;
        setRecipes(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [showFavorites, authToken, isLoggedIn]);

  const DifficultyImages = ({ level }) => {
    return (
      <div className={styles.difficultyImagesContainer}>
        Difficulté :
        {Array.from({ length: level }, (_, i) => (
          <Image
            key={i}
            src={difficulty}
            alt="Niveau de difficulté"
            width={30}
            height={30}
            className={styles.difficultyImage}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <h1 className={styles.title}>
        Recette{recipes.length > 1 ? "s" : ""}
        {recipes.length > 1 ? ` (${recipes.length})` : ""}
      </h1>
      <p className={styles.description}>
        Sur cette page, plongez dans un univers de saveurs avec nos recettes qui
        célèbrent les fruits et légumes de saison. Chaque saison offre des
        produits uniques, et nos recettes sont ici pour vous aider à en tirer le
        meilleur parti. Des plats simples aux créations sophistiquées, trouvez
        l&apos;inspiration pour cuisiner frais et savoureux tout au long de
        l&apos;année. Embrassez la saisonnalité et enrichissez votre table avec
        des recettes qui mettent en valeur la fraîcheur et le goût des
        ingrédients de saison.
      </p>
      {!isLoggedIn && (
        <p className={styles.noRecipe}>
          <Link href="/login">Connectez-vous</Link> pour accéder à vos recettes
          préférées !
        </p>
      )}
      <div className={styles.container}>
        {isLoggedIn && (
          <>
            <button
              className={styles.favorites}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              {showFavorites ? "Voir toutes les recettes" : "Voir mes favoris"}
            </button>
            <div className={styles.cards}>
              {recipes.map((recipe, index) =>
                recipe ? (
                  <div key={recipe.recipe_id || index} className={styles.card}>
                    <Link href={`/recipes/${recipe.recipe_id}`} passHref>
                      <Image
                        src={recipe.photo || "/placeholder.jpg"}
                        alt={recipe.title}
                        width={500}
                        height={500}
                        layout="responsive"
                      />
                      <h3>{recipe.title}</h3>
                      <div className={styles.content}>
                        <DifficultyImages
                          level={frenchDifficulty(recipe.difficulty)}
                        />
                        <p>Temps de préparation : {recipe.duration}</p>
                        <p>Nombre de personnes : {recipe.number_persons}</p>
                        <span className={styles.showRecipe}>
                          Voir la recette
                        </span>
                      </div>
                    </Link>
                  </div>
                ) : null
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Recipes;
