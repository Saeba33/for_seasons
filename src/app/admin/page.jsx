"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./admin.module.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    picture: "",
    description: "",
    month: "",
    featured: false,
  });

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/admin");
    const data = await response.json();
    setProducts(data);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedProduct ? "PUT" : "POST";
    const url = selectedProduct
      ? `/api/admin/${selectedProduct}`
      : "/api/admin";
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      fetchProducts();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product.product_id);
    setFormData({
      name: product.name,
      category: product.category,
      picture: product.picture,
      description: product.description,
      month: months.indexOf(product.month) + 1,
      featured: product.featured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit ?"
    );
    if (confirmDelete) {
      await fetch(`/api/admin/${productId}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      category: "",
      picture: "",
      description: "",
      month: "",
      featured: false,
    });
  };

  return (
    <div className="Admin">
      <h1>Admin</h1>
      <button onClick={() => setIsModalOpen(true)}>Ajouter un produit</button>
      {isModalOpen && (
        <>
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Nom du produit"
                required
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                placeholder="Catégorie"
                required
              />
              <input
                type="text"
                name="picture"
                value={formData.picture}
                onChange={handleFormChange}
                placeholder="Lien de l'image"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Description"
              />
              <select
                name="month"
                value={formData.month}
                onChange={handleFormChange}
              >
                <option value="">Sélectionnez un mois</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <label>
                En vedette:
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleFormChange}
                />
              </label>
              <button type="submit">
                {selectedProduct ? "Mettre à jour" : "Créer"}
              </button>
            </form>
          </div>
        </>
      )}
      <div>
        {products.map((product) => (
          <div key={product.product_id} className="card">
            <h3>{product.name}</h3>
            <p>ID: {product.product_id}</p>
            <p>Catégorie: {product.category}</p>
            <p>Description: {product.description}</p>
            {product.picture && (
              <Image
                src={product.picture}
                alt={product.name}
                width={200}
                height={200}
              />
            )}
            <p>Mois: {product.month}</p>
            <p>En vedette: {product.featured ? "Oui" : "Non"}</p>
            <button onClick={() => handleEdit(product)}>Modifier</button>
            <button onClick={() => handleDelete(product.product_id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
