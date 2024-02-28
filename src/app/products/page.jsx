import Image from "next/image";
import styles from "./products.module.css";
import abricot from "/public/products/abricot.webp";

const Product = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <Image
            className={styles.picture}
            src={abricot}
            alt="{image}"
            width={200}
            height={200}
          />
          <h1 className={styles.title}>L'abricot</h1>
          <section className={styles.description}>
            <h5 className={styles.subtitle}>Description</h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A hic
              molestiae ex soluta earum dolor accusamus porro laudantium,
              suscipit recusandae eum deserunt inventore quos voluptatum facilis
              rerum iste nulla. Suscipit natus sit ratione expedita saepe,
              officia ab, architecto non, nemo quas libero voluptatum sequi
              dolores inventore quibusdam vitae. Ipsa, dolor.
            </p>
          </section>

          <section className={styles.infos}>
            <h5 className={styles.subtitle}>Infos utiles</h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A hic
              molestiae ex soluta earum dolor accusamus porro laudantium,
              suscipit recusandae eum deserunt inventore quos voluptatum facilis
              rerum iste nulla. Suscipit natus sit ratione expedita saepe,
              officia ab, architecto non, nemo quas libero voluptatum sequi
              dolores inventore quibusdam vitae. Ipsa, dolor.
            </p>
          </section>

          <section className={styles.varieties}>
            <h5 className={styles.subtitle}>Variétés</h5>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
              asperiores accusamus ex soluta, aliquam non quia qui sit est nobis
              velit illum distinctio ipsa minima. Consectetur dolorem
              repudiandae ipsum soluta?
            </p>
          </section>
          <section className={styles.other}>
            <h5 className={styles.subtitle}>Autres</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
              vero non numquam sunt explicabo? Corporis quisquam odio et tempore
              architecto ratione nostrum, veritatis ab repellendus maxime magni
              minima adipisci neque.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Product;
