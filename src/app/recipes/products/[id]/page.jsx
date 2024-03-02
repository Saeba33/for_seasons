"use client";

import { frenchDifficulty } from "@/app/utils/translations";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./recipes-products.module.css";
import chaudron from "/public/chaudron.png";
import difficulty from "/public/difficulty.png";

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
      </h1>
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
                    <DifficultyImages
                      level={frenchDifficulty(recipe.difficulty)}
                    />
                    <p>Temps de préparation : {recipe.duration}</p>
                    <p>Nombre de personnes : {recipe.number_persons}</p>
                    <span className={styles.showRecipe}>
                      Voir la recette &#x2192;
                    </span>
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
