import { createPortal } from "react-dom";
import { type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: "sidebar" | "sidebar-right" | "centered";
  showCloseButton?: boolean;
  backdropMobileOnly?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  variant = "centered",
  showCloseButton = true,
  backdropMobileOnly = false,
}: ModalProps) {
  if (!open) return null;

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  const isSidebar = variant === "sidebar" || variant === "sidebar-right";
  const isRight = variant === "sidebar-right";

  return createPortal(
    <>
      <div
        className={`bg-background/80 fixed inset-0 backdrop-blur-sm transition-all duration-300 ${
          backdropMobileOnly ? "lg:hidden" : ""
        } ${isSidebar ? "z-40" : "z-50"}`}
        onClick={onClose}
      />

      <div
        className={`fixed transition-all duration-300 ${
          isSidebar
            ? `top-0 ${isRight ? "right-0" : "left-0"} z-50 translate-x-0 lg:absolute`
            : "inset-0 z-60 flex items-center justify-center"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`bg-background-dark relative flex flex-col ${
            isSidebar
              ? `h-dvh max-h-dvh w-screen overflow-y-auto ${isRight ? "border-l" : "border-r"} border-border-dark lg:h-auto lg:max-h-[calc(100vh-2rem)] lg:w-[450px] xl:w-[500px]`
              : "lg:border-border-dark h-full w-full overflow-y-auto lg:h-auto lg:max-h-[90vh] lg:max-w-5xl lg:rounded-2xl lg:border lg:shadow-2xl"
          }`}
        >
          {showCloseButton && (
            <div
              className={`absolute z-50 ${
                isSidebar
                  ? "top-4 right-4"
                  : "top-4 right-4 lg:top-6 lg:right-6"
              }`}
            >
              <button
                onClick={onClose}
                className="text-text-muted hover:text-primary hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
              >
                <span className="material-symbols-outlined text-2xl">
                  close
                </span>
                <span className="sr-only">Close</span>
              </button>
            </div>
          )}

          {children}
        </div>
      </div>
    </>,
    portalRoot,
  );
}
