"use client";

import styles from "./contact.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1>Contactez-nous</h1>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Nom" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Objet" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Votre message"
          ></textarea>
          <button>Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
