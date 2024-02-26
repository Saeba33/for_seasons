"use client";

import Carousel from "@/components/carousel/Carousel";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const getCurrentMonth = () => {
  const monthNames = [
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
  return monthNames[new Date().getMonth()];
};

const Home = () => {
  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  useEffect(() => {
    const fetchProductsByMonth = async (month) => {
      const response = await fetch(`/api/products?month=${month}`);
      const data = await response.json();
      setVegetables(
        data.filter((product) => product.category === "vegetables")
      );
      setFruits(data.filter((product) => product.category === "fruits"));
    };

    fetchProductsByMonth(selectedMonth);
  }, [selectedMonth]);

  return (
    <>
      <h1 className={styles.title}>Fruits et légumes de saison</h1>
      <div className={styles.description}>
        <label htmlFor="selectedMonth">
          {" "}
          Sélectionnez un mois à partir du menu déroulant pour découvrir les
          produits de saison correspondants. En cliquant sur l&apos;un
          d&apos;entre eux, vous serez redirigé vers les recettes utilisant cet
          ingrédient. Les produits saisonnier en {""}
        </label>
        <select
          className={styles.month}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="january">Janvier</option>
          <option value="february">Février</option>
          <option value="march">Mars</option>
          <option value="april">Avril</option>
          <option value="may">Mai</option>
          <option value="june">Juin</option>
          <option value="july">Juillet</option>
          <option value="august">Août</option>
          <option value="september">Septembre</option>
          <option value="october">Octobre</option>
          <option value="november">Novembre</option>
          <option value="december">Décembre</option>
        </select>
      </div>
      <div className={styles.container}>
        <div className={styles.sections}>
          <section className={styles.fruits}>
            <h3>Fruits</h3>
            <Carousel
              items={fruits.map((fruit) => ({
                ...fruit,
                id: fruit.product_id,
              }))}
            />
          </section>
          <section className={styles.vegetables}>
            <h3>Légumes</h3>
            <Carousel
              items={vegetables.map((vegetable) => ({
                ...vegetable,
                id: vegetable.product_id,
              }))}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
