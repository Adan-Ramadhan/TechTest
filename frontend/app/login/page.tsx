"use client";

// import { storage } from "@/utils/storage";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/login`, {
        email,
        password,
      });


      // storage.save("token", response.data.token);
      console.log(response);
      redirect("/dashboard")
    } catch (err) {
      console.error("gagal logiin", err);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleFormLogin}
          className="rounded shadow flex flex-col p-5"
        >
          <h1 className="font-bold text-2xl mb-3">Login</h1>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded mb-3"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded mb-3"
          />
          <button
            type="submit"
            className="bg-slate-700 py-1 rounded font-bold text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
