import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>Bienvenue sur &quot;4 Saisons&quot;</h1>
        <p>
          Votre guide ultime pour découvrir et cuisiner avec les fruits et
          légumes de saison.
        </p>
      </section>
      <section className={styles.firstSection}>
        <h2>Découvrez les Stars de la Saison</h2>
        <p>
          Chaque mois, &quot;4 Saisons&quot; met en lumière{" "}
          <strong>3 fruits et 3 légumes</strong> qui sont à leur apogée, vous
          offrant ainsi des ingrédients frais, savoureux et nutritifs. Parmi ces
          sélections, un fruit et un légume sont mis en vedette, vous invitant à
          explorer leurs saveurs uniques.
        </p>
      </section>
      <section className={styles.secondSection}>
        <h2>Inspiration Culinaire à Portée de Clic</h2>
        <p>
          Pour chaque aliment de saison présenté, nous vous proposons une
          collection de recettes triées sur le volet, conçues pour en valoriser
          la fraîcheur et la qualité. Laissez-vous inspirer et éveillez votre
          créativité culinaire avec &quot;4 Saisons&quot;.
        </p>
      </section>
      <section className={styles.thirdSection}>
        <h2>Vos Favoris, Notre Priorité</h2>
        <p>
          Ajoutez facilement vos recettes préférées à votre liste de favoris et
          retrouvez-les en un instant pour votre prochaine aventure en cuisine.
        </p>
      </section>
      <section className={styles.fourthSection}>
        <h2>Pourquoi Choisir &quot;4 Saisons&quot; ?</h2>
        <ul>
          <li>
            <strong>Frais et de Qualité :</strong> Profitez des meilleurs
            produits que la nature a à offrir.
          </li>
          <li>
            <strong>Éco-responsable :</strong> Soutenez l&apos;agriculture
            durable et réduisez votre empreinte carbone.
          </li>
          <li>
            <strong>Santé et Bien-être :</strong> Bénéficiez des bienfaits
            nutritionnels des fruits et légumes frais.
          </li>
          <li>
            <strong>Découverte et Plaisir :</strong> Laissez-vous surprendre par
            la variété des saveurs et textures.
          </li>
        </ul>
      </section>
      <section className={styles.lastSection}>
        <p>
          &quot;4 Saisons&quot; est plus qu&apos;un site ; c&apos;est une
          communauté de passionnés de cuisine et de nature.{" "}
          <strong>Rejoignez-nous</strong> et redécouvrez le plaisir de cuisiner
          avec des ingrédients qui racontent une histoire, celle des cycles
          naturels et de la terre nourricière.
        </p>
      </section>
    </div>
  );
};

export default About;
