"use client";

import { useRef, useState, useId } from "react";

import { ArrowIcon } from "@/shared/components/icons/svgIcons";
import { useToggleMenu } from "@/shared/hooks/useToggleMenu";
import { TDropDown } from "@/shared/types/uiElements";
import { cn } from "@/shared/utils/styling";

interface DropDownListProps {
  data: TDropDown[];
  width?: string;
  selectedIndex?: number;
  isDisabled?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  error?: string;
  onChange: (newIndex: number) => void;
}

const DropDownList = ({
  data,
  width = "auto",
  selectedIndex = 0,
  isDisabled = false,
  isSearchable = false,
  placeholder = "Select an option",
  error,
  onChange,
}: DropDownListProps) => {
  const id = useId();
  const optionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggleMenu(false, optionRef);
  const [searchValue, setSearchValue] = useState("");
  
  const filteredData = isSearchable && searchValue
    ? data.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : data;

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const handleChange = (newIndex: number) => {
    onChange(newIndex);
    setIsActive(false);
    if (isSearchable) {
      setSearchValue("");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="relative" style={{ width }}>
      <button
        id={`dropdown-${id}`}
        aria-haspopup="true"
        aria-expanded={isActive}
        aria-controls={`dropdown-list-${id}`}
        type="button"
        onClick={toggleMenu}
        className={cn(
          "flex w-full justify-between items-center h-10 px-4 transition-colors duration-300 border border-gray-300 rounded-md bg-white text-left",
          isDisabled ? "opacity-60 cursor-not-allowed bg-gray-50" : "cursor-pointer hover:border-gray-400",
          error ? "border-red-500" : "",
          isActive ? "border-gray-400" : ""
        )}
        disabled={isDisabled}
      >
        {data.length > 0 ? (
          <>
            <span className="text-sm text-gray-700 truncate max-w-[90%]">
              {selectedIndex >= 0 && selectedIndex < data.length ? data[selectedIndex].text : placeholder}
            </span>
            <ArrowIcon width={8} className={cn("transition-transform duration-300", isActive ? "rotate-180" : "")} />
          </>
        ) : (
          <span className="text-sm text-gray-500">No options available</span>
        )}
      </button>
      
      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      
      {/* Dropdown content */}
      {isActive && (
        <div
          ref={optionRef}
          id={`dropdown-list-${id}`}
          role="listbox"
          className={cn(
            "w-full absolute top-11 right-0 rounded-md overflow-hidden border border-gray-300 bg-white shadow-lg z-10 origin-top",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
        >
          {/* Search input */}
          {isSearchable && (
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                autoFocus
              />
            </div>
          )}
          
          {/* Options list */}
          <div className="h-auto max-h-[250px] overflow-y-auto">
            {filteredData.length > 0 ? (
              filteredData.map((option, index) => {
                const originalIndex = data.findIndex(item => item.value === option.value);
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={selectedIndex === originalIndex}
                    onClick={() => handleChange(originalIndex)}
                    className={cn(
                      "px-4 py-2 text-sm text-left text-gray-700 cursor-pointer transition-colors duration-200",
                      selectedIndex === originalIndex ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                    )}
                  >
                    {option.text}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownList;
