"use client";

import { register } from "@/lib/action";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useFormState } from "react-dom";

function RegisterForm() {
  const [formState, formAction] = useFormState(register, {});

  const router = useRouter();

/*   const autoSıgnIn = async () => {
    await signIn("credentials", {
      email: formState?.registeredUser.email,
      password: formState?.registeredUser.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
 */
  useEffect(() => {
    if (formState?.success) router.push("/login");
  }, [formState?.success, router]);

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="name" min={3} max={50} placeholder="name" />
        <input
          type="text"
          name="username"
          min={3}
          max={20}
          placeholder="username"
        />
        <input type="email" name="email" max={50} placeholder="email" />
        <input
          type="password"
          name="password"
          min={5}
          max={15}
          placeholder="password"
        />
        <input
          type="password"
          name="passwordRepeat"
          min={5}
          max={15}
          placeholder="password again"
        />
        <input type="text" name="img" placeholder="imgSrc" />
        <button>Register</button>
      </form>
      {formState?.success && <div className="toast">{formState?.message}</div>}
      {!formState?.success && <div className="error">{formState?.message}</div>}
      <Link href={"/login"}>
        Already have an account? <b>Login</b>
      </Link>
    </div>
  );
}

export default RegisterForm;
