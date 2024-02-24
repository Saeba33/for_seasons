"use client";

import { AuthContext, useAdminAccess } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import NotFound from "../../not-found";
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
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    photo: "",
    difficulty: "",
    duration: "",
    number_persons: "",
    instructions: "",
    ustensils: "",
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

  const isAdmin = useAdminAccess();
  if (!isAdmin) {
    return <NotFound />;
  }

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
      ustensils: "",
      information: "",
    });
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.photo.toLowerCase().includes(search.toLowerCase()) ||
      recipe.difficulty.toLowerCase().includes(search.toLowerCase()) ||
      recipe.duration.toLowerCase().includes(search.toLowerCase()) ||
      recipe.number_persons
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      recipe.instructions.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ustensils.toLowerCase().includes(search.toLowerCase()) ||
      recipe.information.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const loadRecipes = async () => {
    const loadedRecipes = await fetchRecipes();
    setRecipes(loadedRecipes);
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Gestion des recettes</h1>
        <Link className={styles.link} href="/admin">
          <Image
            className={styles.link}
            src={retour}
            alt="retour"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Rechercher une recette ..."
            value={search}
            onChange={handleSearch}
          />
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
                name="ustensils"
                value={formData.ustensils}
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
        <div className={styles.cards}>
          {filteredRecipes.length === 0 ? (
            <p>Aucun résultat pour cette recherche 😢 </p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div key={recipe.recipe_id} className={styles.card}>
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
                <div className={styles.content}>
                  <p>Difficulté: {recipe.difficulty}</p>
                  <p>Durée: {recipe.duration}</p>
                  <p>Pour {recipe.number_persons} personne(s)</p>
                  <p>Ustensiles: {recipe.ustensils}</p>
                  <p>Instructions: {recipe.instructions}</p>
                  <p>Informations supplémentaires: {recipe.information}</p>
                </div>
                <div className={styles.buttons}>
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AdminRecipes;
