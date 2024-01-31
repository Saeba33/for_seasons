import { useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import Links from "./links/Links";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userProfile } = useContext(AuthContext);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <Links
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
