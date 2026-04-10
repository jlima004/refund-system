import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="bg-secondary min-h-screen w-full relative flex items-start justify-center pt-[128px] pb-16 px-6 font-sans">
      <Header />
      <Outlet />
    </div>
  );
}
