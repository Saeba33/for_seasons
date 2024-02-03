import { useEffect, useState } from "react";
import styles from "./heart-button.module.css";

const HeartButton = ({ recipeId, userId, authToken }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Ici, vous pourriez vérifier si la recette est déjà dans les favoris de l'utilisateur au chargement du composant
    // Cela nécessiterait une API supplémentaire ou un moyen de passer cet état initial
  }, [recipeId, userId]);

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);

    const url = isFavorited ? `/api/favorites/remove` : `/api/favorites/add`;
    const method = isFavorited ? "DELETE" : "POST";
    const body = JSON.stringify({ recipeId, userId });

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: body,
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return <button onClick={toggleFavorite}>{isFavorited ? "❤️" : "🤍"}</button>;
};

export default HeartButton;
