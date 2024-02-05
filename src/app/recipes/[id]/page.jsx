"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";

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
        const response = await fetch(`/api/recipes/${recipeId}`);
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
        alert("Recette ajoutée aux favoris!");
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
        alert("Recette retirée des favoris!");
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
      {isLoggedIn && (
        <button
          onClick={isFavorite ? removeFavorite : addFavorite}
          disabled={isLoadingFavorite}
        >
          {isLoadingFavorite
            ? "Chargement..."
            : isFavorite
            ? "Retirer des favoris"
            : "Ajouter aux favoris"}
        </button>
      )}
    </div>
  );
};

export default RecipeDetails;
