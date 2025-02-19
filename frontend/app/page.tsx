import Link from "next/link";

export default async function Home() {
  // const api = process.env.NEXT_PUBLIC_API_URL;

 

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex justify-center items-center flex-col text-center">
        <h1 className="font-bold text-4xl mb-2">Welcome to My Pages</h1>
        <p className="font-normal text-sm">Please Login or Register first to access the main dashboard.</p>

        <div className="flex gap-x-3 mt-5">
          <Link href="/login" className="bg-slate-700 hover:bg-slate-500 transition-all ease-in-out duration-300 font-semibold text-white rounded px-4 py-1">Login</Link>
          <Link href="/register" className="bg-slate-700 hover:bg-slate-500 transition-all ease-in-out duration-300 font-semibold text-white rounded px-4 py-1">Register</Link>
        </div>
      </div>
    </div>
  );
}
