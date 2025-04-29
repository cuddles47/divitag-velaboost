"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Create local types to avoid import issues
type PageType = "MAIN" | "LIST" | "PRODUCT";

type TAddPageVisit = {
  pageType: PageType;
  pagePath?: string;
  productID?: string;
  deviceResolution?: string;
};

// Create a local implementation of addVisit to avoid import issues
const addVisit = async (data: TAddPageVisit) => {
  try {
    const response = await fetch('/api/page-visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { error: 'Failed to add visit' };
    }

    const result = await response.json();
    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

const AddVisit = () => {
  const pathName = usePathname();
  useEffect(() => {
    const addingVisit = async () => {
      const deviceResolution = window.screen.width.toString() + " x " + window.screen.height.toString();

      const data: TAddPageVisit = {
        pageType: "MAIN",
        deviceResolution: deviceResolution,
      };

      if (pathName.includes("/list/")) {
        data.pageType = "LIST";
        const pathArr = pathName.split("/list/");
        data.pagePath = pathArr[pathArr.length - 1];
      }
      if (pathName.includes("/product")) {
        data.pageType = "PRODUCT";
        const pathArr = pathName.split("/product/");
        data.productID = pathArr[pathArr.length - 1];
      }
      await addVisit(data);
    };
    addingVisit();
  }, [pathName]);
  return <></>;
};

export default AddVisit;
