import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-5xl">Welcome to My Pages</h1>
      <p className="font-light py-2">
        Please Login or Register to access the main dashboard.
      </p>
      
      <div className="flex gap-x-5">
        <Link href="/login">
          <Button className="font-semibold">Login</Button>
        </Link>
        <Link href="/register">
          <Button className="font-semibold">Register</Button>
        </Link>
      </div>
    </div>
  );
}
