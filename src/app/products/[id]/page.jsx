"use client";
import { useContext, useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import styles from "./products.module.css";

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

  if (!product) {
    return <Loading/>;
  }

  return (
    <div className={styles.card}>
      <Image
      className={styles.picture}
        src={product.picture || abricot}
        alt={product.name || "Product Image"}
        width={200}
        height={200}
      />
      <h1 className={styles.title}>{product.name}</h1>
      <section className={styles.description}>
        <h5 className={styles.subtitle}>Description</h5>
        <p>{product.description}</p>
      </section>

      <section className={styles.infos}>
        <h5 className={styles.subtitle}>Infos utiles</h5>
        <p>{product.informations}</p>
      </section>

      <section className={styles.varieties}>
        <h5 className={styles.subtitle}>Variétés</h5>
        <p>{product.varieties}</p>
      </section>
      <section className={styles.other}>
        <h5 className={styles.subtitle}>Autres</h5>
        <p>{product.other}</p>
      </section>
    </div>
  );
};

export default ProductDetails;

