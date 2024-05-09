import React from "react";
import styles from "./auth.module.css"

function AuthLayout({ children }) {
  return (
    <div className="row w-100">
      <div
        className={`col-md-6 col-12 d-flex flex-column align-items-center justify-content-center ${styles.formsWrapper}`}
      >
        {children}
      </div>
      <div className={`col-md-6 d-md-inline d-none ${styles.bgImg}`}></div>
    </div>
  );
}

export default AuthLayout;
