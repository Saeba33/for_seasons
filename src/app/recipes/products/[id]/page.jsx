"use client";

import { frenchDifficulty } from "@/app/utils/translations";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./recipes-products.module.css";

const ProductsRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { authToken, selectedProduct } = useContext(AuthContext);

  useEffect(() => {
    if (!selectedProduct) return;
    const apiUrl = `/api/recipes/products/${selectedProduct}/?type=type2`;

    fetch(apiUrl, {
      headers: {
        ...(authToken && {
          Authorization: `Bearer ${authToken}`,
        }),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pas de données disponibles");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => item.recipe || item);
        setRecipes(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRecipes([]);
      });
  }, [authToken, selectedProduct]);

  return (
    <div className={styles.container}>
      <h1>Recettes</h1>
      {recipes.length > 0 ? (
        <div className={styles.cards}>
          {recipes.map((recipe, index) => (
            <div key={recipe.recipe_id || index} className={styles.card}>
              <Link href={`/recipes/${recipe.recipe_id}`}>
                <Image
                  src={recipe.photo || "/placeholder.jpg"}
                  alt={recipe.title}
                  width={500}
                  height={500}
                  layout="responsive"
                />
                <h3>{recipe.title}</h3>
                <div className={styles.content}>
                  <p>Difficulté : {frenchDifficulty(recipe.difficulty)}</p>
                  <p>Temps de préparation : {recipe.duration}</p>
                  <p>Nombre de personnes : {recipe.number_persons}</p>
                  <p>Ustensiles : {recipe.ustensils}</p>
                  <p>Instructions : {recipe.instructions}</p>
                  <p>Informations : {recipe.information}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noRecipe}>
          Aucune recette associée à ce produit pour le moment.
        </p>
      )}
    </div>
  );
};

export default ProductsRecipes;
