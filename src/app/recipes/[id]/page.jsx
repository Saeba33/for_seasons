"use client";

import HeartButton from "@/components/heart-button/HeartButton";
import Image from "next/image";
import { useEffect, useState } from "react";

const RecipeDetails = ({ userId, authToken }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeId = window.location.pathname.split("/").pop();
    fetch(`/api/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Error fetching recipe:", error));
  }, []);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {recipe.photo && (
        <Image
          src={recipe.photo}
          alt={recipe.title}
          style={{ width: "100%", height: "auto", marginBottom: "20px" }}
        />
      )}
      <h1>{recipe.title}</h1>
      <p>Difficulté: {recipe.difficulty}</p>
      <div>
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
        <HeartButton
          recipeId={recipe.id}
          userId={userId}
          authToken={authToken}
        />
      </div>
    </div>
  );
};

export default RecipeDetails;
