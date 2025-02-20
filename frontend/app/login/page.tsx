"use client";

import { Button } from "@/components/ui/button";
import { storage } from "@/utils/storage";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login = () => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
const routes = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {

        if(!email || !password){
            return alert("Email dan Password harus di isi")
        }

        const response = await axios.post(`${base_url}/login`, {
        email,
        password,
      });

      const token = await response.data.token;

      storage.save("TOKEN", token)
      routes.push("/admin/dashboard")
      console.log(response);
    } catch (err) {
      console.error("Login gagal", err);
      console.log(err)
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 rounded shadow-lg bg-white"
      >
        <h1 className="font-bold text-3xl mb-5">Login</h1>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukan email anda..."
          className="border rounded p-2 mb-3"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukan password anda..."
          className="border rounded p-2 mb-3"
        />
        <Button type="submit" className="font-semibold">Submit</Button>

        <p className="font-light text-sm text-center py-2">
          Have&apos;t an account?{" "}
          <Link href="/register" className="text-sky-700">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
