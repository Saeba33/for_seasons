"use client";

import Link from "next/link";
import styles from "./admin.module.css";

const Admin = () => {
  return (
    <div className={styles.container}>
      <h1>Panel administrateur</h1>
      <Link className={styles.link} href="/admin/products">
        Gestion des produits
      </Link>
      <Link className={styles.link} href="/admin/recipes">
        Gestion des recettes
      </Link>
    </div>
  );
};

export default Admin;
