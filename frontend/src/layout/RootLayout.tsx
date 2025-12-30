import Header from "../components/Header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <main className="dark relative overflow-hidden">
      <div className="bg-background-dark text-text-light font-display flex flex-col">
        <Header />
        <Outlet />
        <div id="portal-root"></div>
      </div>
    </main>
  );
}
