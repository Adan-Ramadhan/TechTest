"use client";

import { Button } from "@/components/ui/button";

const FormAddProduct = () => {
  return (
    <div className="w-full">
      <form className="w-3/4 mx-auto flex flex-col p-5 rounded shadow-lg bg-white">
        <h1 className="font-bold text-3xl mb-5">Create Product</h1>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Masukan nama product anda..."
          className="border rounded p-2 mb-3"
        />

        <label>Price</label>
        <input
          type="text"
          placeholder="Masukan price product anda..."
          className="border rounded p-2 mb-3"
        />

        <label>image</label>
        <input type="file" className=" p-2 mb-3" />

        <label>Choses Category</label>
        
        <Button type="submit" className="my-5 font-semibold">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormAddProduct;
