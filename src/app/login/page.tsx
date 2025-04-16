'use client';

import {signIn} from "next-auth/react";

const LoginPage = () => {
  return (
    <div>
      <h1> 로그인 </h1>
      <button onClick={() => signIn("google")}>Google 로그인</button>
    </div>
  )
}

export default LoginPage;