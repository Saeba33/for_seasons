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

  const [isLoading, setIsLoading] = useState(true);

  const { userProfile, isLoggedIn } = useContext(AuthContext);

  const router = useRouter();


  useEffect(() => {
    if (!isLoggedIn || userProfile !== "administrator") {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, userProfile, router]);
  if (isLoading) {
    return <div>Chargement...</div>;
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
