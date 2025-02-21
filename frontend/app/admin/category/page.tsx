"use client";

import { TCategoryWithId } from "@/types/category";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });


type TProps = {
  handleCategoryChange: (selectedOption: { label: string; value: number } | null) => void;
} 

const Category = ({handleCategoryChange}: TProps) => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;

const [category, setCategory] = useState<TCategoryWithId[]>([])

const categoriesMapping = (category: TCategoryWithId) => ({
    label: category.name,
    value: category.id,
  });

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(`${base_url}/category`);
        
        console.log(response)
        setCategory(response.data)
      } catch (err) {
        console.error("Gagal mengambil category", err);
        console.log(err);
      }
    };

    getCategory();
  }, []);


  return (
    <Select
      isMulti
      name="colors"
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleCategoryChange}
      options={category.map(categoriesMapping)}
    />
  );
};

export default Category;
