"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/utils/AuthContext";

const RecipeDetails = ({ userId, authToken }) => {
  const [recipe, setRecipe] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const recipeId = window.location.pathname.split("/").pop();
    fetch(`/api/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Error fetching recipe:", error));
  }, []);

  const addFavorite = async () => {
    const recipeId = window.location.pathname.split("/").pop();

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ recipe_id: recipeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add favorite");
      }

      alert("Recette ajoutée aux favoris!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {recipe.photo && (
        <Image
          src={recipe.photo}
          alt={recipe.title}
          width={500}
          height={300}
          layout="responsive"
        />
      )}
      <h1>{recipe.title}</h1>
      <p>Difficulté: {recipe.difficulty}</p>
      <div>
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
      {isLoggedIn && <button onClick={addFavorite}>Ajouter aux favoris</button>}
    </div>
  );
};

export default RecipeDetails;
