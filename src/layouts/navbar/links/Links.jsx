import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useContext, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";

const links = [
  { title: "De saison", path: "/" },
  { title: "Recettes", path: "/recipes" },
  { title: "Contactez-nous", path: "/contact" },
  { title: "À propos", path: "/about" },
  { title: "Admin", path: "/admin", requireAdmin: true },
];

const Links = ({ handleLogout }) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, userProfile } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => {
          if (
            !link.requireAdmin ||
            (link.requireAdmin && userProfile === "administrator")
          ) {
            return <NavLink item={link} key={link.title} />;
          }
          return null;
        })}
        {isLoggedIn && (
          <button className={styles.logout} onClick={handleLogout}>
            Déconnexion
          </button>
        )}
        {!isLoggedIn && (
          <NavLink item={{ title: "Connexion", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => {
            if (
              !link.requireAdmin ||
              (link.requireAdmin && userProfile === "administrator")
            ) {
              return <NavLink item={link} key={link.title} />;
            }
            return null;
          })}
          {isLoggedIn && (
            <button className={styles.logout} onClick={handleLogout}>
              Déconnexion
            </button>
          )}
          {!isLoggedIn && (
            <NavLink item={{ title: "Connexion", path: "/login" }} />
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
