import { useState } from "react";
import { getCsvByIdLote } from "../services/getCsvByIdLote";
import { toast } from "sonner";

export const useStreamingCsv = () => {
  const [isExporting, setIsExporting] = useState(false);
  const handleExportStream = async (idLote: string, suggestedName: string) => {
    try {
      setIsExporting(true);
      const stream = await getCsvByIdLote(idLote);

      if (!stream) throw new Error("No stream available");

      const handle = await (window as any).showSaveFilePicker({
        suggestedName,
        types: [
          {
            description: "CSV Files",
            accept: { "text/csv": [".csv"] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await stream.pipeTo(writable);
      toast.success("CSV downloaded successfully");
    } catch (error: any) {
      if (error.name === "AbortError") return;

      toast.error(
        `Error en el streaming: ${error instanceof Error ? error.message : "Unknown error, please try again"}`,
      );
    } finally {
      setIsExporting(false);
    }
  };

  return { isExporting, handleExportStream };
};
