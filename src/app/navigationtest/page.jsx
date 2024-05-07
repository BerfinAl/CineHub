"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function NavigationTestPage() {
  // these are for client side components
  //CLIENT SIDE NAVIGATION
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  function handleClick() {
    // router.push("/");
    // router.refresh()
    // router.replace("/");
    router.back();
    // router.forward()
  }

  return (
    <>
      <h1>Navigation Test Page</h1>
      <Link href="/" prefetch={false}>Home</Link>
      <button onClick={handleClick}>Go Home </button>
    </>
  );
}

export default NavigationTestPage;
