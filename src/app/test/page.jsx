import styles from './test.module.css';

const page = () => {
    return (
      <>
      <div className={styles.container}>
        <section className={styles.pageContainer}>
          <h1>Montserrat avec serif pour les titres `h1`</h1>
          <h2>Biryani sans serif pour les sous titres (h2...h6)</h2>
          <p>Roboto pour le corps de texte</p>
        </section>
        <section className={styles.color}>
          <div className={styles.uc}>
            <h5>Vert sapin</h5>
            <p>#283319</p>
            <span>(40 , 51 , 25)</span>
          </div>
          <div className={styles.uc}>
            <h5>Vert mousse</h5>
            <p>#679F5A </p>
            <span>(103 , 159 , 90)</span>
          </div>
          <div className={styles.uc}>
            <h5>Pistache pâle</h5>
            <p>#D1E2CD </p>
            <span>(209 , 226 , 205)</span>
          </div>
          <div className={styles.uc}>
            <h5>Blanc lin</h5>
            <p>#F4F3EF </p>
            <span>(244 , 243 , 239)</span>
          </div>
        </section>
        </div>
      </>
    );
};

export default page;