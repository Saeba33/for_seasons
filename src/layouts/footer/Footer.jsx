import styles from "./footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>Charles Proust</div>
      <div className={styles.text}>4 Seasons © {currentYear}</div>
    </div>
  );
};

export default Footer;
