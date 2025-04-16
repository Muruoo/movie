"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import LogOutButton from "@/components/auth/LogOutButton";
import styles from "./page.module.css";

const LoginPage = () => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.login}>
      <h1> 로그인 </h1>
      {!session && (
         <GoogleLoginButton onClick={() => signIn("google")} />
      )}
      {/* 로그인 된 상태 */}
      {session && (
        <div>
          <p>환영합니다 영화보자 회원님!</p>
          <LogOutButton onClick={() => signOut()}/>
        </div>
      )}

    </div>



  );
};

export default LoginPage;
