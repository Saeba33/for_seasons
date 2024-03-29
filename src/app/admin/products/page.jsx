"use client";

import { useAdminAccess } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import NotFound from "../../not-found";
import { frenchCategory, frenchMonth } from "../../utils/translations";
import styles from "./admin-products.module.css";
import retour from "/public/return.png";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    picture: "",
    description: "",
    informations: "",
    varieties: "",
    other: "",
    month: "",
    featured: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const fetchProducts = async () => {
    const response = await fetch("/api/admin/products");
    const data = await response.json();
    setProducts(data);
  };

  const isAdmin = useAdminAccess();
  if (!isAdmin) {
    return <NotFound />;
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.picture &&
      !formData.picture.startsWith("/") &&
      !formData.picture.startsWith("http://") &&
      !formData.picture.startsWith("https://")
    ) {
      toast.warning(
        'L\'URL de l\'image doit commencer par "/" ou "http://" ou "https://"'
      );
      return;
    }
    const method = selectedProduct ? "PUT" : "POST";
    const url = selectedProduct
      ? `/api/admin/products/${selectedProduct}`
      : "/api/admin/products";
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
      informations: product.informations,
      varieties: product.varieties,
      other: product.other,
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
      await fetch(`/api/admin/products/${productId}`, {
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
      informations: "",
      varieties: "",
      other: "",
      month: "",
      featured: false,
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.month.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.featured
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.product_id
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.picture.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Gestion des produits</h1>
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
            type="search"
            placeholder="Rechercher un produit ..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          Ajouter un produit
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
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Nom du produit"
                required
              />
              <input
                type="text"
                name="picture"
                value={formData.picture}
                onChange={handleFormChange}
                placeholder="Lien de l'image"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="fruits">Fruit</option>
                <option value="vegetables">Légume</option>
                <option value="other">Autre</option>
              </select>
              <select
                name="month"
                value={formData.month}
                onChange={handleFormChange}
              >
                <option value="">Sélectionnez un mois</option>
                {months.map((months, index) => (
                  <option key={index} value={months}>
                    {frenchMonth(months)}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Description"
              />
              <textarea
                name="informations"
                value={formData.informations}
                onChange={handleFormChange}
                placeholder="Informations"
              />
              <textarea
                name="varieties"
                value={formData.varieties}
                onChange={handleFormChange}
                placeholder="Variétés"
              />
              <input
                type="text"
                name="other"
                value={formData.other}
                onChange={handleFormChange}
                placeholder="Autre"
              />
              <div className={styles.checkbox}>
                <label>En vedette :</label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleFormChange}
                />
              </div>
              <button type="submit">
                {selectedProduct ? "Mettre à jour" : "Créer"}
              </button>
            </form>
          </>
        )}
        <div className={styles.cards}>
          {filteredProducts.length === 0 ? (
            <p>Aucun résultat pour cette recherche 😢 </p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.product_id} className={styles.card}>
                <div className={styles.header}>
                  <p>ID: {product.product_id}</p>
                  <h3>{product.name}</h3>
                </div>
                {product.picture && (
                  <Image
                    src={product.picture}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                )}
                <div className={styles.content}>
                  <p>Catégorie : {frenchCategory(product.category)}</p>
                  <p>Mois : {frenchMonth(product.month)}</p>
                  <p>En vedette : {product.featured ? "Oui" : "Non"}</p>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.editButton}`}
                    onClick={() => handleEdit(product)}
                  >
                    Modifier
                  </button>
                  <button
                    className={`${styles.deleteButton}`}
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <Toaster richColors position="top-center" />
      </div>
    </>
  );
};

export default AdminProducts;
