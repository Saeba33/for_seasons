import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import logo from "/public/logo.webp";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <Links isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </nav>
  );
};

export default Navbar;
