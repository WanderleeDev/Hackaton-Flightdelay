import { toast } from "sonner";
import VirtualLabel from "../../ui/VirtualLabel";
import Modal from "../../ui/Modal";
import { useState } from "react";

export default function CSVUploader() {
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isCSV = fileName.endsWith(".csv");

    if (!isCSV) {
      toast.error("Unsupported format", {
        description: `The file "${file.name}" is not a valid CSV.`,
      });
      e.target.value = "";
      return;
    }

    toast.success("File uploaded", {
      description: `${file.name} ready to process.`,
    });
    setOpen(false);
  };

  return (
    <>
      <VirtualLabel label="Upload CSV Data">
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-primary text-background-dark flex size-14 cursor-pointer items-center justify-center rounded-full shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] active:brightness-90 xl:size-16"
          >
            <span className="material-symbols-outlined text-2xl font-bold">
              upload_file
            </span>
            <span className="sr-only">Upload CSV</span>
          </button>
        </div>
      </VirtualLabel>

      <Modal open={open} onClose={() => setOpen(false)} variant="centered">
        <div className="flex flex-1 flex-col p-6 lg:p-12">
          <div className="mb-8 flex flex-col gap-2">
            <div className="text-primary flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase">
                Batch Processing
              </span>
            </div>
            <h1 className="text-3xl leading-tight font-black tracking-[-0.033em] lg:text-5xl">
              Upload CSV Data
            </h1>
            <p className="text-text-muted text-sm font-normal lg:text-lg">
              Import historical or planned flight data for bulk analysis.
              Supported formats: .csv
            </p>
          </div>

          <div className="flex flex-1 flex-col lg:h-[400px] lg:flex-none">
            <label className="border-border-dark hover:border-primary hover:bg-primary/5 group relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed transition-all duration-300">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="bg-background-light border-border-dark group-hover:border-primary flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] lg:h-32 lg:w-32">
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-5xl transition-colors duration-300 lg:text-6xl">
                  cloud_upload
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-text-main text-xl font-bold lg:text-2xl">
                  Click to upload
                </span>
                <span className="text-text-muted text-base">
                  or drag and drop CSV file here
                </span>
              </div>
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
}
