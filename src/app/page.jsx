import Image from "next/image";
import citron from "../../public/citron.png";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Fruits et légumes de saison</h1>
      <div className={styles.sections}>
        <section className={styles.vegetables}>
          <h3>Légumes</h3>
          <article className={styles.card}>
            <Image
              className={styles.picture}
              src={citron}
              alt="image_legumes"
            />
            <h5 className={styles.title}> Titre </h5>
            <p className={styles.description}> Description </p>
          </article>
        </section>
        <section className={styles.fruits}>
          <h3>Fruits</h3>
          <article className={styles.card}>
            <Image
              className={styles.picture}
              src={citron}
              alt="image_legumes"
            />
            <h5 className={styles.title}> Titre </h5>
            <p className={styles.description}> Description </p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Home;
