import styles from "./loading.module.css";

const Loading = () => (
  <div className={styles.container}>
    <div className={styles.loader}>
      <div className={styles.text}>Loading...</div>
      <div className={styles.bar}></div>
    </div>
  </div>
);

export default Loading;
