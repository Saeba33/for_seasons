"use client";

import { AuthContext } from "@/utils/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./recipes.module.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { authToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const apiUrl = showFavorites ? "/api/favorites" : "/api/recipes";
    fetch(apiUrl, {
      ...(authToken && {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = showFavorites
          ? data.map((item) => item.recipe || item)
          : data;
        setRecipes(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [showFavorites, authToken]);

  return (
    <div className={styles.recipes}>
      <h1>Recettes</h1>
      {isLoggedIn ? (
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "Voir toutes les recettes" : "Voir mes favoris"}
        </button>
      ) : (
        <p>Connectez-vous pour voir vos favoris</p>
      )}
      <div className={styles.recipeList}>
        {recipes.map((recipe, index) =>
          recipe ? (
            <div key={recipe.recipe_id || index} className={styles.recipeCard}>
              <Link href={`/recipes/${recipe.recipe_id}`}>
                <div className="recipe-image">
                  <Image
                    src={recipe.photo || "/placeholder.jpg"}
                    alt={recipe.title}
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                </div>
                <div className={styles.recipeDetails}>
                  <h2>{recipe.title}</h2>
                  <p>Difficulté: {recipe.difficulty}</p>
                  <p>Temps de préparation: {recipe.duration}</p>
                  <p>Nombre de personnes: {recipe.number_persons}</p>
                  <p>Instructions: {recipe.instructions}</p>
                  <p>Ustensiles: {recipe.utensils}</p>
                  <p>Information: {recipe.information}</p>
                </div>
              </Link>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Recipes;
