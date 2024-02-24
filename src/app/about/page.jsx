import styles from "./about.module.css";

const About = () => {
  return (
    <div>
      <section className={styles.title}>
        <h1>Bienvenue sur &quot;4 Seasons&quot;</h1>
        <p className={styles.description}>
          Votre guide ultime pour découvrir et cuisiner avec les fruits et
          légumes de saison.
        </p>
      </section>
      <div className={styles.container}>
        <section className={styles.section}>
          <h2>Découvrez les stars de la saison</h2>
          <p>
            Chaque mois, &quot;4 Seasons&quot; met en lumière{" "}
            <strong>3 fruits et 3 légumes</strong> de saison, vous offrant ainsi
            des ingrédients frais, savoureux et nutritifs. Parmi ces sélections,
            un fruit et un légume sont mis en vedette, vous invitant à explorer
            leurs saveurs uniques.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Inspiration culinaire à portée de clic</h2>
          <p>
            Pour chaque aliment de saison présenté, nous vous proposons une
            collection de recettes triées sur le volet, conçues pour en
            valoriser la fraîcheur et la qualité. Laissez-vous inspirer et
            éveillez votre créativité culinaire avec &quot;4 Seasons&quot;.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Vos Favoris, notre priorité</h2>
          <p>
            Ajoutez facilement vos recettes préférées à votre liste de favoris
            et retrouvez-les en un instant pour votre prochaine aventure en
            cuisine.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Pourquoi choisir &quot;4 Seasons&quot; ?</h2>
          <ul>
            <li>
              <strong>Éco-responsable :</strong> soutenez l&apos;agriculture
              durable et réduisez votre empreinte carbone.
            </li>
            <li>
              <strong>Frais et de qualité :</strong> profitez des meilleurs
              produits que la nature a à offrir.
            </li>
            <li>
              <strong>Santé et bien-être :</strong> bénéficiez des bienfaits
              nutritionnels des fruits et légumes frais.
            </li>
            <li>
              <strong>Découverte et plaisir :</strong> laissez-vous surprendre
              par la variété des saveurs et textures.
            </li>
          </ul>
        </section>
        <section className={styles.section}>
          <p>
            &quot;4 Seasons&quot; est plus qu&apos;un site, c&apos;est une
            communauté de passionnés de cuisine et de nature.{" "}
            <strong>Rejoignez-nous</strong> et redécouvrez le plaisir de
            cuisiner avec des ingrédients qui racontent une histoire, celle des
            cycles naturels et de la terre nourricière.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
