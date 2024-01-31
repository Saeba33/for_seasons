import Image from "next/image";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Recipes",
    path: "/recipes",
  },
  {
    title: "Admin",
    path: "/admin",
    requireAdmin: true,
  },
];

const Links = ({ isLoggedIn, userProfile, handleLogout }) => {
  const [open, setOpen] = useState(false);

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
            Logout
          </button>
        )}
        {!isLoggedIn && <NavLink item={{ title: "Login", path: "/login" }} />}
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
              Logout
            </button>
          )}
          {!isLoggedIn && <NavLink item={{ title: "Login", path: "/login" }} />}
        </div>
      )}
    </div>
  );
};

export default Links;
