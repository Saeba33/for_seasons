"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "./admin.module.css";
import product from "/public/product.png";
import recipe from "/public/recipe.png";

const Admin = () => {
  const { userProfile, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour gérer le chargement

  useEffect(() => {
    if (!isLoggedIn || userProfile !== "administrator") {
      router.push("/login");
    } else {
      setIsLoading(false); // L'utilisateur est connecté et est admin, on enlève l'état de chargement
    }
  }, [isLoggedIn, userProfile, router]);

  if (isLoading) {
    return <div>Chargement...</div>; // Ou un composant de chargement plus élaboré
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
