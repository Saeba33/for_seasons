import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useContext } from "react";
import logo from "../../../public/logo.webp";
import Links from "./links/Links";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, userProfile, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className={styles.container}>
      <Image src={logo} alt="Logo" className={styles.logo} />
      <Links
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
