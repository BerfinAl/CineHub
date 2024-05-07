"use client";
import { login } from "@/lib/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./loginForm.module.css";
import { toast } from "react-toastify";

function LoginForm() {
  const [formState, formAction] = useFormState(login, null);

  const router = useRouter();

console.log(formState)

  function handleCredErr() {
    toast.error(formState?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }

  useEffect(() => {
    if (formState?.success) router.push("/");
    if (!formState?.success) handleCredErr();
  }, [formState?.success, router]);

  return (
    <>
      <form className={`row w-100 ${styles.form}`} action={formAction}>
        <input
          className={`col-xl-6 col-12 mb-2  ${styles.loginInput} ${styles.inputOne}`}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className={`col-xl-6 col-12 mb-2 ${styles.loginInput}`}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button disabled={!formState} className={styles.loginBtn}>Login</button>
      </form>
    </>
  );
}

export default LoginForm;
