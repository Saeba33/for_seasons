"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "@/components/carousel/Carousel";
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
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
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
    <div className={styles.container}>
      <h1>Fruits et légumes de saison</h1>
      <div>
        <label htmlFor="month-selected">Choisissez un mois:</label>
        <select
          id="selectedMonth"
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
      <div className={styles.sections}>
        <section className={styles.vegetables}>
          <h3>Légumes</h3>
          <Carousel
            items={[
              ...vegetables
                .filter((veg) => veg.featured === true)
                .map((veg) => (
                  <div key={veg.id} className={styles.card}>
                    <Image
                      src={veg.picture || "/placeholder.jpg"}
                      alt={veg.name}
                      width={500}
                      height={500}
                    />
                    <h5>{veg.name}</h5>
                    <p>{veg.description}</p>
                  </div>
                )),
              ...vegetables
                .filter((veg) => veg.featured !== true)
                .map((veg) => (
                  <div key={veg.id} className={styles.card}>
                    <Image
                      src={veg.picture || "/placeholder.jpg"}
                      alt={veg.name}
                      width={500}
                      height={500}
                    />
                    <h5>{veg.name}</h5>
                    <p>{veg.description}</p>
                  </div>
                )),
            ]}
          />
        </section>
        <section className={styles.fruits}>
          <h3>Fruits</h3>
          <Carousel
            items={[
              ...fruits
                .filter((fruit) => fruit.featured === true)
                .map((fruit) => (
                  <div key={fruit.id} className={styles.card}>
                    <Image
                      src={fruit.picture || "/placeholder.jpg"}
                      alt={fruit.name}
                      width={500}
                      height={500}
                    />
                    <h5>{fruit.name}</h5>
                    <p>{fruit.description}</p>
                  </div>
                )),
              ...fruits
                .filter((fruit) => fruit.featured !== true)
                .map((fruit) => (
                  <div key={fruit.id} className={styles.card}>
                    <Image
                      src={fruit.picture || "/placeholder.jpg"}
                      alt={fruit.name}
                      width={500}
                      height={500}
                    />
                    <h5>{fruit.name}</h5>
                    <p>{fruit.description}</p>
                  </div>
                )),
            ]}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
