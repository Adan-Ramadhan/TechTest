"use client";

import { TCategoryWithId } from "@/types/category";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

const Category = () => {
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
      options={category.map(categoriesMapping)}
    />
  );
};

export default Category;
