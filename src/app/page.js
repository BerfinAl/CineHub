import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1 className={styles.bannertext}>
        Your Cinematic Journey <br /> Starts
        <span className={styles.highlight}> Here </span>
      </h1>
      <div>
        <Image
          src={`https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "auto",
            height: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
          }} // optional
          alt="logo"
        />
      </div>
    </>
  );
}
