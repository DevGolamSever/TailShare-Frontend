import { Header } from "./Header";
import { Footer } from "./Footer";
import { RightRail } from "./RightRail";
import { Outlet } from "react-router";
import { createContext, useContext } from "react";
import { useAppSelector } from "../store/hooks";
import type { User } from "../types";

interface LayoutContextType {
  user: User | null;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useUser must be used within Layout");
  }
  return context;
};

interface LayoutProps {
  showRightRail?: boolean;
}

export const Layout = ({ showRightRail = true }: LayoutProps) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <LayoutContext.Provider value={{ user }}>
      <div className="min-h-screen bg-[#f7fafc] flex flex-col">
        <Header user={user} />
        <main className="max-w-[1100px] mx-auto my-5.5 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5 px-4 items-start flex-1">
          {showRightRail && (
            <aside className="order-2 lg:order-1">
              <RightRail user={user} />
            </aside>
          )}
          <div className="order-1 lg:order-2">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
};

