"use client";

import DropdownButton from "@/components/dropdown-button/dropdown-button";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

const Product = () => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const product = [
    {
      name: "cincin",
      price: "Rp.100.000",
      image: "muwu.png",
    },
    {
      name: "gelang",
      price: "Rp.80.000",
      image: "muwu.png",
    },
    {
      name: "kalung",
      price: "Rp.200.000",
      image: "muwu.png",
    },
  ];



  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`${base_url}/product`);
        console.log(response);
      } catch (err) {
        console.error("Gagal menampilkan product", err);
        console.log(err);
      }
    };
    getProduct();
  }, []);

  return (
    <div className="w-full p-3">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="font-bold text-3xl p-3">Product</h1>
        <Button>
          <Link href="/admin/add-product">Create Product</Link>
        </Button>
      </div>

      <table className="w-3/4 mx-auto border-collapse  border border-gray-300">
        <thead>
          <tr>
            <th className="bg-slate-700 text-white border p-2">Name</th>
            <th className="bg-slate-700 text-white border p-2">Price</th>
            <th className="bg-slate-700 text-white border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr key={item.name}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2"><DropdownButton/></td>
            
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
