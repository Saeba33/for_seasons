import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";
import notFound from "/public/notfound.png";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.error}>404</h1>
      <div className={styles.noResult}>
        <h2>
          <Image src={notFound} alt="Not Found" width={50} height={50} />
          Not Found
          <Image src={notFound} alt="Not Found" width={50} height={50} />
        </h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/"></Link>
      </div>
    </div>
  );
};

export default NotFound;
