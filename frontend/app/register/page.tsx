"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/register`, {
        email,
        password,
      });

      console.log(response);

      router.push("/dashboard");
    } catch (err) {
      console.error("Gagal register", err);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <form onSubmit={register} className="rounded shadow flex flex-col p-5">
          <h1 className="font-bold text-2xl mb-3">Register</h1>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 rounded mb-3"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 rounded mb-3"
          />
          <button
            type="submit"
            className="bg-slate-700 py-1 rounded font-bold mb-3 text-white"
          >
            Submit
          </button>
          <p className="text-sm text-center">
            Have an account?{" "}
            <Link href="/login" className="text-sky-500">
              {" "}
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
