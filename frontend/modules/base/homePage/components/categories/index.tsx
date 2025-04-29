"use client";

import { useEffect, useState } from "react";

// Use proper imports from the shared components
import { getAllCategoriesJSON } from "@/actions/category/category";
import { SK_Box } from "@/shared/components/UI/skeleton";
import { TGroupJSON } from "@/types/categories";

import CategoryListItem from "./catListItem";

export const HomeCategoryList = () => {
  const [categories, setCategories] = useState<TGroupJSON[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await getAllCategoriesJSON();

        if (result.err) {
          setError(result.err);
          setCategories([]);
        } else if (result.res) {
          // Make sure categories is always an array before setting state
          const categoriesArray = Array.isArray(result.res) ? result.res : [];
          setCategories(categoriesArray);
          setError(null);
        } else {
          setCategories([]);
          setError("No categories returned from server");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-w-[256px] absolute h-[500px] hidden lg:block bg-white mr-4 rounded-xl px-6 text-gray-800 shadow-md z-[3]">
      <ul className="mt-3">
        {loading ? (
          <div className="flex flex-col gap-7 justify-center mt-5">
            {renderSkeletons()}
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-gray-500 p-4">No categories available</div>
        ) : (
          categories.map((item, index) => (
            <CategoryListItem
              key={item.id || index}
              categoryData={item}
              className={index === categories.length - 1 ? "border-b-0" : ""}
            />
          ))
        )}
      </ul>
    </div>
  );
};

// Moved to a named function for better organization
const renderSkeletons = () => {
  const skeletons: React.ReactNode[] = [];
  for (let i = 0; i < 10; i++) {
    skeletons.push(<SK_Box key={i} width="100%" height="16px" className="mb-4" />);
  }
  return skeletons;
};
