/* import { handleLogout } from "@/lib/action"; */
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../link.module.css";
import LogoutSvg from "@/components/LogoutSvg/LogoutSvg";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Submenu = ({ content, parent }) => {
  const router = useRouter();

  async function handleLogout() {
    await signOut({ redirect: false }).then(() => {
      router.refresh(); // Redirect to the dashboard page after signing out
    });
  }

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
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <LogoutSvg /> {child.title}
              </button>
            ) : (
              <Link
                key={i}
                href={`/${parent}${child?.path}`}
                className={styles.submenuLink}
              >
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
