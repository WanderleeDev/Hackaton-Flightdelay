import VirtualLabel from "../../ui/VirtualLabel";
import FormPrediction from "../FormPrediction";
import FormHeader from "../FormPrediction/FormHeader";
import Modal from "../../ui/Modal";
import { useState } from "react";

export default function SimplePrediction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <VirtualLabel label="Simple Prediction">
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="bg-primary text-background-dark flex size-14 cursor-pointer items-center justify-center rounded-full shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] active:brightness-90 xl:size-16"
          >
            <span className="material-symbols-outlined text-2xl font-bold">
              flight
            </span>
            <span className="sr-only">Simple Prediction</span>
          </button>
        </div>
      </VirtualLabel>

      <Modal
        variant="sidebar-right"
        open={open}
        onClose={() => setOpen(false)}
        backdropMobileOnly
      >
        <FormHeader />
        <FormPrediction />
      </Modal>
    </>
  );
}
