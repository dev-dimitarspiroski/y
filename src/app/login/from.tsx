"use client";

import { signIn } from "next-auth/react";
import { Input } from "../../components/ui/input";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="flex flex-col gap-4 items-center p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <Input
        placeholder="@johndoe"
        type="text"
        name="username"
        className="w-72"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="password"
        autoComplete="off"
        type="password"
        name="password"
        className="w-72"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={async () => {
          const response = await signIn("credentials", {
            username,
            password,
          });

          console.log("REPONSE FROM FORM: ", response);
        }}
        className="bg-blue-500 rounded-md px-4 py-2 text-white w-20 cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}
