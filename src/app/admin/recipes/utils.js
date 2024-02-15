export const fetchProducts = async () => {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

export const fetchRecipes = async () => {
  try {
    const response = await fetch("/api/admin/recipes");
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    throw error;
  }
};

export const handleAddRecipe = async (recipe) => {
  try {
    const response = await fetch(`/api/admin/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
};

export const handleChangeRecipe = async (recipeId, recipe) => {
  try {
    const response = await fetch(`/api/admin/recipes/${recipeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error changing recipe:", error);
    throw error;
  }
};

export const handleDeleteRecipe = async (recipeId) => {
  try {
    const response = await fetch(`/api/admin/recipes/${recipeId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

export const fetchIngredients = async (recipeId) => {
  try {
    const response = await fetch(`/api/admin/recipes/ingredients/${recipeId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe ingredients:", error.message);
    throw error;
  }
};

export const handleAddIngredient = async (recipeId, ingredient) => {
  try {
    const response = await fetch(`/api/admin/recipes/ingredients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...ingredient, recipeId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error;
  }
};


export const handleChangeIngredient = async (ingredientId, ingredient) => {
  try {
    const response = await fetch(
      `/api/admin/recipes/ingredients/${ingredientId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredient),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error changing ingredient:", error);
    throw error;
  }
};


export const handleDeleteIngredient = async (ingredientId) => {
  try {
    const response = await fetch(`/api/admin/recipes/ingredients/${ingredientId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    throw error;
  }
};
