"use client";

import { useAdminAccess } from "@/contexts/AuthContext";
import NotFound from "../not-found";
import Image from "next/image";
import Link from "next/link";
import styles from "./admin.module.css";
import product from "/public/product.png";
import recipe from "/public/recipe.png";

const Admin = () => {
const isAdmin = useAdminAccess();
if (!isAdmin) {
  return <NotFound />;
}

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Admin Panel</h1>
      <div className={styles.product}>
        <Link className={styles.link} href="/admin/products">
          Gestion des produits
        </Link>
        <Image src={product} alt={product} width={50} height={50} />
      </div>
      <div className={styles.recipe}>
        <Link className={styles.link} href="/admin/recipes">
          Gestion des recettes
        </Link>
        <Image src={recipe} alt={recipe} width={50} height={50} />
      </div>
    </div>
  );
};

export default Admin;
