import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import NavLink from "./navLink/NavLink";
import styles from "./links.module.css";

const links = [
  { title: "De saison", path: "/" },
  { title: "Recettes", path: "/recipes" },
  { title: "Contactez-nous", path: "/contact" },
  { title: "À propos", path: "/about" },
  { title: "Admin", path: "/admin", requireAdmin: true },
];

const Links = ({ handleLogout }) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const closeMobileMenu = () => setOpen(false);

  return (
    <div className={styles.container}>
      <Image
        src="/menu.png"
        alt="Menu"
        width={50}
        height={50}
        className={styles.menuButton}
        onClick={() => setOpen(!open)}
      />
      <div className={styles.links}>
        {links.map((link) => {
          if (!link.requireAdmin || (link.requireAdmin && isAdmin)) {
            return <NavLink item={link} key={link.title} />;
          }
          return null;
        })}
        {isLoggedIn ? (
          <button className={styles.logout} onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          <NavLink item={{ title: "Connexion", path: "/login" }} />
        )}
      </div>
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => {
            if (!link.requireAdmin || (link.requireAdmin && isAdmin)) {
              return (
                <div key={link.title} onClick={closeMobileMenu}>
                  <NavLink item={link} />
                </div>
              );
            }
            return null;
          })}
          {isLoggedIn ? (
            <button
              className={styles.logout}
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
            >
              Déconnexion
            </button>
          ) : (
            <div onClick={closeMobileMenu}>
              <NavLink item={{ title: "Connexion", path: "/login" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
