"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./admin-recipes.module.css";

const AdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useContext(AuthContext);

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
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch("/api/admin/recipes");
    const data = await response.json();
    setRecipes(data);
  };

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
        'L\'URL de l\'image doit commencer par "/" ou "http://" ou "https://"'
      );
      return;
    }
    const recipeData = {
      ...formData,
      user_id: userId,
    };
    const method = selectedRecipe ? "PUT" : "POST";
    const url = selectedRecipe
      ? `/api/admin/recipes/${selectedRecipe}`
      : "/api/admin/recipes";
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      fetchRecipes();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe.recipe_id);
    setFormData({ ...recipe });
    setIsModalOpen(true);
  };

  const handleDelete = async (recipeId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette recette ?"
    );
    if (confirmDelete) {
      await fetch(`/api/admin/recipes/${recipeId}`, {
        method: "DELETE",
      });
      fetchRecipes();
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

  return (
    <div className={styles.container}>
      <h1>Gestion des recettes</h1>
      <button
        onClick={() => {
          setIsModalOpen(true);
          resetForm();
        }}
        className={`${styles.addButton} ${styles.buttons}`}
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
              placeholder="Titre"
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
              <option value="">Sélectionnez un niveau de difficulté</option>
              <option value="easy">Facile</option>
              <option value="medium">Intermédiaire</option>
              <option value="hard">Difficile</option>
            </select>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleFormChange}
              placeholder="Durée"
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
            <input
              type="text"
              name="utensils"
              value={formData.utensils}
              onChange={handleFormChange}
              placeholder="Ustensiles"
              required
            />
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleFormChange}
              placeholder="Instructions"
              required
            />
            <textarea
              name="information"
              value={formData.information}
              onChange={handleFormChange}
              placeholder="Informations supplémentaires"
            />
            <button type="submit">
              {selectedRecipe ? "Mettre à jour la recette" : "Créer la recette"}
            </button>
          </form>
        </>
      )}
      <div className={styles.cards}>
        {recipes.map((recipe) => (
          <div key={recipe.recipe_id} className={styles.card}>
            <div className={styles.header}>
              <h3>{recipe.title}</h3>
            </div>
            <div className={styles.content}>
              {recipe.photo && (
                <Image
                  src={recipe.photo}
                  alt={recipe.title}
                  width={200}
                  height={200}
                  layout="responsive"
                />
              )}
              <p>Difficulté: {recipe.difficulty}</p>
              <p>Durée: {recipe.duration}</p>
              <p>Nombre de personnes: {recipe.number_persons}</p>
              <p>Ustensiles: {recipe.utensils}</p>
              <p>Instructions: {recipe.instructions}</p>
              <p>Informations supplémentaires: {recipe.information}</p>
            </div>
            <div className={styles.buttons}>
              <button
                className={`${styles.editButton}`}
                onClick={() => handleEdit(recipe)}
              >
                Modifier
              </button>
              <button
                className={`${styles.deleteButton}`}
                onClick={() => handleDelete(recipe.recipe_id)}
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
