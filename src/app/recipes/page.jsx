"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./recipes.module.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className={styles.recipes}>
      <h1>Recettes</h1>
      <div className={styles.recipeList}>
        {recipes.map((recipe) => (
          <div key={recipe.recipe_id} className={styles.recipeCard}>
            <Link href={`/recipes/${recipe.recipe_id}`}>
              <div className="recipe-image">
                <Image
                  src={recipe.photo || "/placeholder.jpg"}
                  alt={recipe.title}
                  width={500}
                  height={500}
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
        ))}
      </div>
    </div>
  );
};

export default Recipes;
