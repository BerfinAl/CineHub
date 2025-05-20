import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "../auth.module.css";
import Link from "next/link";

import ProviderForm from "@/components/ProviderForm/ProviderForm";

export default async function LoginPage() {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Log in to your account</h2>
        <Link className={styles.registerLink} href={"/register"}>
          Dont have an account? <b>Register!</b>
        </Link>
      </div>

      <div className="row w-100">
        <ProviderForm provider="Google" />
        <ProviderForm provider="Github" />
      </div>

      <div className={`formText ${styles.formTextWrapper}`}>
        <span className={styles.formText}>Or with email and password</span>
      </div>

      <LoginForm />
    </>
  );
}
