import Image from "next/image";
import { useEffect, useState } from "react";
import {
  fetchIngredients,
  fetchProducts,
  handleAddIngredient,
  handleChangeIngredient,
  handleDeleteIngredient,
} from "../utils";
import styles from "./ingredients.module.css";
import add from "/public/add.png";
import cancel from "/public/cancel.png";
import remove from "/public/delete.png";
import edit from "/public/edit.png";
import validate from "/public/validate.png";

const AdminIngredients = ({ selectedRecipeId }) => {
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    quantity: "",
    productId: "",
    label: "",
  });
  const [editingIngredientId, setEditingIngredientId] = useState(null);
  const [editingIngredient, setEditingIngredient] = useState({
    quantity: "",
    productId: "",
    label: "",
  });

  useEffect(() => {
    const loadIngredientsAndProducts = async () => {
      if (selectedRecipeId) {
        const loadedIngredients = await fetchIngredients(selectedRecipeId);
        setIngredients(loadedIngredients);
      }
      const loadedProducts = await fetchProducts();
      setProducts(loadedProducts);
      if (loadedProducts.length > 0 && !newIngredient.productId) {
        setNewIngredient((prev) => ({
          ...prev,
          productId: "",
        }));
      }
    };

    loadIngredientsAndProducts();
  }, [selectedRecipeId, newIngredient.productId]);

  const updateNewIngredient = (field, value) => {
    setNewIngredient((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNewIngredient = async () => {
    if (
      ingredients.some(
        (ingredient) =>
          ingredient.product_id.toString() === newIngredient.productId
      )
    ) {
      alert("Cet ingrédient est déjà ajouté à la recette.");
      return;
    }

    if (
      newIngredient.quantity &&
      newIngredient.productId &&
      newIngredient.label &&
      newIngredient.productId !== ""
    ) {
      await handleAddIngredient(selectedRecipeId, {
        ...newIngredient,
        productId: parseInt(newIngredient.productId),
      });
      const updatedIngredients = await fetchIngredients(selectedRecipeId);
      setIngredients(updatedIngredients);
      setNewIngredient({
        quantity: "",
        productId: "",
        label: "",
      });
    } else {
      alert("Veuillez remplir tous les champs et sélectionner un produit.");
    }
  };

  const startEditing = (ingredient) => {
    setEditingIngredientId(ingredient.ingredient_id);
    setEditingIngredient({
      quantity: ingredient.quantity,
      productId: ingredient.product_id.toString(),
      label: ingredient.label,
    });
  };

  const handleUpdateIngredient = async () => {
    if (
      ingredients.some(
        (ingredient) =>
          ingredient.product_id.toString() === editingIngredient.productId &&
          ingredient.ingredient_id !== editingIngredientId
      )
    ) {
      alert("Un autre ingrédient avec ce produit existe déjà dans la recette.");
      return;
    }
    if (
      editingIngredient.quantity &&
      editingIngredient.productId &&
      editingIngredient.label &&
      editingIngredient.productId !== ""
    ) {
      await handleChangeIngredient(editingIngredientId, {
        recipe_id: selectedRecipeId,
        quantity: editingIngredient.quantity,
        product_id: parseInt(editingIngredient.productId),
        label: editingIngredient.label,
      });

      const updatedIngredients = await fetchIngredients(selectedRecipeId);
      setIngredients(updatedIngredients);
      setEditingIngredientId(null);
      setEditingIngredient({ quantity: "", productId: "", label: "" });
    } else {
      alert("Veuillez remplir tous les champs et sélectionner un produit.");
    }
  };

  const handleRemoveIngredient = async (ingredientId) => {
    await handleDeleteIngredient(ingredientId);
    const updatedIngredients = await fetchIngredients(selectedRecipeId);
    setIngredients(updatedIngredients);
  };

  return (
    <div className={styles.container}>
      <h2>Ingrédients</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={styles.toto}>
          {editingIngredientId === ingredient.ingredient_id ? (
            <div className={styles.editIngredient}>
              <select
                value={editingIngredient.productId}
                onChange={(e) =>
                  setEditingIngredient((prev) => ({
                    ...prev,
                    productId: e.target.value,
                  }))
                }
              >
                <option value="">Veuillez sélectionner un produit</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                className={styles.input}
                type="text"
                value={editingIngredient.quantity}
                onChange={(e) =>
                  setEditingIngredient((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
                placeholder="Quantité"
              />
              <input
                type="text"
                value={editingIngredient.label}
                onChange={(e) =>
                  setEditingIngredient((prev) => ({
                    ...prev,
                    label: e.target.value,
                  }))
                }
                placeholder="Unité"
              />
                <Image
                  className={styles.buttons}
                  id={styles.validate}
                  src={validate}
                  alt="confirmer"
                  onClick={handleUpdateIngredient}
                />
            </div>
          ) : (
            <div className={styles.listIngredients}>
              <div className={styles.description}>
                <span>
                  {ingredient.quantity} {ingredient.label}{" "}
                  {
                    products.find(
                      (p) =>
                        p.product_id.toString() ===
                        ingredient.product_id.toString()
                    )?.name
                  }
                </span>
              </div>
              <div className={styles.actions}>
                <Image
                  className={styles.buttons}
                  id={styles.edit}
                  src={edit}
                  alt="éditer"
                  onClick={() => startEditing(ingredient)}
                />
                <Image
                  className={styles.buttons}
                  id={styles.remove}
                  src={remove}
                  alt="supprimer"
                  onClick={() =>
                    handleRemoveIngredient(ingredient.ingredient_id)
                  }
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <div className={styles.newIngredient}>
        <select
          value={newIngredient.productId}
          onChange={(e) => updateNewIngredient("productId", e.target.value)}
        >
          <option value="">Veuillez sélectionner un produit</option>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          className={styles.input}
          type="text"
          value={newIngredient.quantity}
          onChange={(e) => updateNewIngredient("quantity", e.target.value)}
          placeholder="Quantité"
        />
        <input
          className={styles.input}
          type="text"
          value={newIngredient.label}
          onChange={(e) => updateNewIngredient("label", e.target.value)}
          placeholder="Unité"
        />
        <Image
          className={styles.buttons}
          id={styles.add}
          src={add}
          alt="ajouter"
          onClick={handleAddNewIngredient}
        />
      </div>
    </div>
  );
};

export default AdminIngredients;