"use client";

import { Button } from "@/components/ui/button";
import Category from "../category/page";
import { useState } from "react";
import axios from "axios";
import { TProduct } from "@/types/product";

const FormAddProduct = () => {
    const base_url = process.env.NEXT_PUBLIC_API_URL;
  
  
  const [formData, setFormData] = useState<TProduct>({
    name: "",
    price: 0,
    image: "",
    categoryId: 0,
    createdAt: new Date().toISOString(), 
  })
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, image: file ? URL.createObjectURL(file) : "" });
  };

  const handleCategoryChange = (selectedOption: { label: string; value: number } | null) => {
    if (selectedOption) {
      setFormData({ ...formData, categoryId: selectedOption.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("price", formData.price.toString());
    if (formData.image) {
      productData.append("image", formData.image);
    }
    if (formData.categoryId) {
      productData.append("category", formData.categoryId.toString());
    }

    try {
      const response = await axios.post(`${base_url}/add-product`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response)
      alert("Product berhasil ditambahkan!");
    } catch (err) {
      console.error("Gagal menambahkan produk", err);
    }
  };


    return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-3/4 mx-auto flex flex-col p-5 rounded shadow-lg bg-white">
        <h1 className="font-bold text-3xl mb-5">Create Product</h1>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Masukan nama product anda..."
          className="border rounded p-2 mb-3"
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          onChange={handleChange}

          placeholder="Masukan price product anda..."
          className="border rounded p-2 mb-3"
        />

        <label>image</label>
          
          <input type="file"  onChange={handleFileChange}  className=" p-2 mb-3" />

        <label>Choses Category</label>
        <Category handleCategoryChange={handleCategoryChange} />
        <Button type="submit" className="my-5 font-semibold">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormAddProduct;
