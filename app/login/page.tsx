import { signIn } from 'next-auth/react';

export default async function Home() {
  return (
    <>
      <h1>Login page</h1>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
}
