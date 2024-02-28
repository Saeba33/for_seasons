"use client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import styles from "./products.module.css";
import abricot from "/public/products/abricot.webp";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { selectedProduct } = useContext(AuthContext);

  useEffect(() => {
    if (selectedProduct) {
      console.log("Fetching product with ID:", selectedProduct);
      const url = `/api/products/${selectedProduct}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [selectedProduct]);

  return (
    <div className={styles.container}>
      {product ? (
        <div className={styles.card}>
          <Image
          className={styles.picture}
            src={product.picture}
            alt={product.name || "Product Image"}
            width={200}
            height={200}
          />
          <h1 className={styles.title}>{product?.name || "Product Name"}</h1>
          <section className={styles.description}>
            <h5 className={styles.subtitle}>Description</h5>
            <p>{product?.description || "No description available"}</p>
          </section>

          <section className={styles.infos}>
            <h5 className={styles.subtitle}>Infos utiles</h5>
            <p>{product?.informations || "No information available"}</p>
          </section>

          <section className={styles.varieties}>
            <h5 className={styles.subtitle}>Variétés</h5>
            <p>{product?.varieties || "No varieties available"}</p>
          </section>
          <section className={styles.other}>
            <h5 className={styles.subtitle}>Autres</h5>
            <p>{product?.other || "No additional information"}</p>
          </section>
        </div>
      ) : (
        <div>Chargement des détails du produit...</div>
      )}
    </div>
  );
};

export default ProductDetails;
