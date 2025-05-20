import { handleGitHubLogin, handleGoogleLogin } from "@/lib/action";
import React from "react";
import styles from "./providerFrom.module.css";
import Image from "next/image";

function ProviderForm({ provider }) {
  const formAction =
    provider === "Google" ? handleGoogleLogin : handleGitHubLogin;

  return (
    <form className={`col-xl-6 col-12 ps-0 mb-2`} action={formAction}>
      <button className={styles.providerBtn}>
        <Image
          src={`/images/${provider}.png`}
          width={32}
          height={32}
          alt="google"
        />
        Login with {provider}
      </button>
    </form>
  );
}

export default ProviderForm;
