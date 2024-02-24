import styles from "./footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <p className={styles.author}>Charles Proust</p>
      <p className={styles.credits}>4 Seasons © {currentYear}</p>
    </div>
  );
};

export default Footer;
