import Link from "next/link";
import Image from "next/image";
import CategoryIcon from "@/components/category/CategoryIcon";

import { TGroupJSON } from "@/types/categories";
import { cn } from "@/utils/styling";

type TProps = {
  categoryData: TGroupJSON;
  className?: string;
};

const CategoryListItem = ({ categoryData, className }: TProps) => {
  // Handle potential null/undefined categoryData
  if (!categoryData || !categoryData.group) {
    console.error("Invalid categoryData provided to CategoryListItem:", categoryData);
    return null;
  }

  const { categories, group } = categoryData;

  // Debug iconUrl value
  console.log('Category:', group.name, 'IconUrl:', group.iconUrl);

  return (
    <li
      className={cn(
        "w-full h-12 flex justify-between items-center relative border-b border-gray-200 cursor-pointer hover:[&_.subCat]:visible hover:[&_.subCat]:opacity-100",
        className
      )}
    >
      <Link href={"/list/" + (group.url || "")} className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
        <div className="w-7 inline-block">
          <CategoryIcon
            iconName={group.iconUrl || ""}
            size={group.iconSize?.[0] || 20}
            className="align-middle mr-1"
          />
        </div>
        {group.name || "Unnamed Category"}
      </Link>
      <div>
        {Array.isArray(categories) && categories.length > 0 && (
          <i className="pi pi-chevron-right" style={{ fontSize: '10px' }}></i>
        )}
      </div>
      {Array.isArray(categories) && categories.length > 0 && (
        <div className="w-[300px] subCat absolute z-[12] left-56 top-0 flex flex-col p-3 bg-white rounded-lg overflow-hidden shadow-md transition-all duration-400 invisible opacity-0">
          {categories.map((item: any, index: number) => {
            // Skip rendering if category is missing
            if (!item || !item.category) return null;

            return (
              <div className="w-full flex flex-col" key={index}>
                <Link
                  href={"/list/" + (group.url || "") + "/" + (item.category.url || "")}
                  className="text-gray-900 px-3 py-2 border border-white rounded-md transition-all duration-300 hover:border-gray-200 hover:bg-gray-100"
                >
                  {item.category.name || "Unnamed Subcategory"}
                </Link>
                {Array.isArray(item?.subCategories) && item.subCategories.length > 0 ? (
                  <div className="flex flex-col">
                    {item.subCategories.map((link: any, index: number) => {
                      // Skip rendering if subcategory is missing required properties
                      if (!link) return null;

                      return (
                        <Link
                          key={index}
                          href={"/list/" + (group.url || "") + "/" + (item.category.url || "") + "/" + (link.url || "")}
                          className="text-gray-500 px-3 py-2 border border-white rounded-md transition-all duration-300 text-sm hover:text-gray-700 hover:border-gray-200 hover:bg-gray-100"
                        >
                          {link.name || "Unnamed Link"}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </li>
  );
};

export default CategoryListItem;
