"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AdminIngredients from "../recipes/ingredients/page";
import styles from "./admin-recipes.module.css";
import {
  fetchProducts,
  fetchRecipes,
  handleAddRecipe,
  handleChangeRecipe,
  handleDeleteRecipe,
} from "./utils";
import retour from "/public/return.png";

const AdminRecipes = () => {
  const { userId } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    photo: "",
    difficulty: "",
    duration: "",
    number_persons: "",
    instructions: "",
    utensils: "",
    information: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const loadedRecipes = await fetchRecipes();
      setRecipes(loadedRecipes);
      const loadedProducts = await fetchProducts();
      setProducts(loadedProducts);
    };

    loadData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.photo &&
      !formData.photo.startsWith("/") &&
      !formData.photo.startsWith("http://") &&
      !formData.photo.startsWith("https://")
    ) {
      alert(
        'L\'URL de l\'image doit commencer par "/", "http://" ou "https://"'
      );
      return;
    }
    const recipeData = { ...formData, user_id: userId };
    try {
      if (selectedRecipe) {
        await handleChangeRecipe(selectedRecipe, recipeData);
      } else {
        await handleAddRecipe(recipeData);
      }
      await loadRecipes();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  const handleRecipeEdit = (recipe) => {
    setSelectedRecipe(recipe.recipe_id);
    setFormData(recipe);
    setIsModalOpen(true);
  };

  const handleRecipeDelete = async (recipeId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette recette ?"
    );
    if (confirmDelete) {
      await handleDeleteRecipe(recipeId);
      await loadRecipes();
    }
  };

  const resetForm = () => {
    setSelectedRecipe(null);
    setFormData({
      title: "",
      photo: "",
      difficulty: "",
      duration: "",
      number_persons: "",
      instructions: "",
      utensils: "",
      information: "",
    });
  };

  const loadRecipes = async () => {
    const loadedRecipes = await fetchRecipes();
    setRecipes(loadedRecipes);
  };

  return (
    <div className={styles.container}>
      <div className={styles.return}>
        <h1>Gestion des recettes</h1>
        <Link href="/admin">
          <Image src={retour} alt="retour" width={50} height={50} />
        </Link>
      </div>
      <button
        onClick={() => {
          setIsModalOpen(true);
          resetForm();
        }}
        className={styles.addButton}
      >
        Ajouter une recette
      </button>

      {isModalOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsModalOpen(false)}
          ></div>
          <form className={styles.modal} onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Titre de la recette"
              required
            />
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleFormChange}
              placeholder="Lien de la photo"
            />
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleFormChange}
              required
            >
              <option value="">Sélectionnez le niveau de difficulté</option>
              <option value="easy">Facile</option>
              <option value="medium">Intermédiaire</option>
              <option value="hard">Difficile</option>
            </select>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleFormChange}
              placeholder="Durée (ex: 30 minutes)"
              required
            />
            <input
              type="number"
              name="number_persons"
              value={formData.number_persons}
              onChange={handleFormChange}
              placeholder="Nombre de personnes"
              required
            />
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleFormChange}
              placeholder="Instructions de préparation"
              required
            />
            <textarea
              name="utensils"
              value={formData.utensils}
              onChange={handleFormChange}
              placeholder="Ustensiles nécessaires"
            />
            <textarea
              name="information"
              value={formData.information}
              onChange={handleFormChange}
              placeholder="Informations supplémentaires"
            />
            {selectedRecipe && (
              <AdminIngredients selectedRecipeId={selectedRecipe} />
            )}
            <button type="submit" className={styles.submitButton}>
              {selectedRecipe
                ? "Mettre à jour la recette"
                : "Ajouter la recette"}
            </button>
          </form>
        </>
      )}

      <div className={styles.recipesList}>
        {recipes.map((recipe) => (
          <div key={recipe.recipe_id} className={styles.recipeCard}>
            <div className={styles.recipeHeader}>
              <h3>{recipe.title}</h3>
              {recipe.photo && (
                <Image
                  src={recipe.photo}
                  alt={recipe.title}
                  width={100}
                  height={100}
                  layout="responsive"
                />
              )}
            </div>
            <div className={styles.recipeDetails}>
              <p>Difficulté: {recipe.difficulty}</p>
              <p>Durée: {recipe.duration}</p>
              <p>Pour {recipe.number_persons} personne(s)</p>
              <p>Ustensiles: {recipe.utensils}</p>
              <p>Instructions: {recipe.instructions}</p>
              <p>Informations supplémentaires: {recipe.information}</p>
            </div>
            <div className={styles.recipeActions}>
              <button
                onClick={() => handleRecipeEdit(recipe)}
                className={styles.editButton}
              >
                Modifier
              </button>
              <button
                onClick={() => handleRecipeDelete(recipe.recipe_id)}
                className={styles.deleteButton}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRecipes;
