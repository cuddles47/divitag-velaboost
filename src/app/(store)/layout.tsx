"use client";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

import StoreNavBar from "@/domains/store/shared/components/navbar";
import Warning from "@/domains/store/shared/components/warning";
import { shoppingCartStore } from "@/store/shoppingCart";

import StoreFooter from "../../domains/store/shared/components/footer/index";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <main className="bg-gray-50">
        <Provider store={shoppingCartStore}>
          <StoreNavBar />
          {children}
          <StoreFooter />
          <Warning />
        </Provider>
      </main>
    </SessionProvider>
  );
};

export default StoreLayout;
