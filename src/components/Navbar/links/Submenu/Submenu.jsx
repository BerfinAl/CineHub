import { handleLogout } from "@/lib/action";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../link.module.css";
import LogoutSvg from "@/components/LogoutSvg/LogoutSvg";

const Submenu = ({ content }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={styles.submenuContainer}
    >
      <div className={styles.bridge} />

      {content.map((child, i) => {
        return (
          <div className="overflow-hidden" key={i}>
            {child.logout ? (
              <form key={i} action={handleLogout}>
                <div>
                
                  <button className={styles.logoutBtn}>   <LogoutSvg /> {child.title}</button>
                </div>
              </form>
            ) : (
              <Link key={i} href={child?.path} className={styles.submenuLink}>
                {child?.title}
              </Link>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export default Submenu;
