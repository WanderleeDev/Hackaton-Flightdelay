import { Link } from "react-router";
import { useState } from "react";
import { createPortal } from "react-dom";
import TabNavigation from "./composed/TabNavigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { label: "Simulator", path: "simulator" },
    { label: "History", path: "history" },
  ];

  return (
    <header className="border-border-dark bg-surface-dark w-full border-b border-solid">
      <div className="flex items-center justify-between px-4 py-3 md:px-10">
        <Link to="/simulator" className="flex items-center gap-4">
          <div className="text-primary">
            <span className="material-symbols-outlined text-3xl">
              flight_takeoff
            </span>
          </div>
          <h2 className="text-lg leading-tight font-bold tracking-[-0.015em]">
            Flight Simulator v1.0
          </h2>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <TabNavigation routes={routes} />
        </div>
        <button
          className="text-text-light md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {isMenuOpen &&
        createPortal(
          <div className="bg-background-dark fixed inset-0 z-[100] flex flex-col">
            <div className="border-border-dark flex items-center justify-between border-b px-4 py-3">
              <Link
                to="/simulator"
                className="flex items-center gap-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    flight_takeoff
                  </span>
                </div>
                <h2 className="text-lg leading-tight font-bold tracking-[-0.015em]">
                  Flight Simulator v1.0
                </h2>
              </Link>
              <button
                className="text-text-light hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-3xl">
                  close
                </span>
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="text-text-light hover:text-primary text-3xl font-bold transition-colors active:scale-95"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>,
          document.getElementById("portal-root")!,
        )}
    </header>
  );
}
