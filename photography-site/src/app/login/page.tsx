"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/admin");
    } catch (error) {
      alert("Invalid email or password")
      setError("Invalid email or password");
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 mt-24">
      <div className="bg-white p-8 rounded shadow-md w-96 border-gray-400 border">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-oak rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-oak rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-oak text-white py-2 rounded hover:bg-mocha duration-300"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
