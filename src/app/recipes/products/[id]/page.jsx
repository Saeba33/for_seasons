"use client";

import { frenchDifficulty } from "@/app/utils/translations";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import chaudron from "/public/chaudron.png";
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
    <>
      <h1 className={styles.title}>Recettes</h1>
      {recipes.length === 0 && (
        <div className={styles.noRecipe}>
          <p>Aucune recette associée à ce produit. Revenez plus tard.</p>
          <Image src={chaudron} alt={chaudron} width={50} height={50} />
        </div>
      )}
      <div className={styles.container}>
        {recipes.length > 0 && (
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
        )}
      </div>
    </>
  );
};

export default ProductsRecipes;