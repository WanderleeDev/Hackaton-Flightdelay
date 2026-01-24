import { useState, useRef } from "react";
import { usePredictionBatch } from "@/src/modules/prediction/hooks/usePredictionBatch";

export const useBatchUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [batchName, setBatchName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isError, error, data, status, reset } = usePredictionBatch();

  const errorMessage = isError
    ? error?.message || "Unknown error occurred"
    : "";

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (
      selectedFile.type === "text/csv" ||
      selectedFile.name.endsWith(".csv")
    ) {
      setFile(selectedFile);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = () => {
    if (!file || !batchName.trim()) return;
    mutate(
      { file, batchName: batchName.trim() },
      {
        onSuccess: () => {
          openDialog();
        },
      },
    );
  };

  const removeFile = () => {
    setFile(null);
    setBatchName("");
    reset(); // Reset TanStack Query mutation state
    closeDialog();
  };

  return {
    file,
    batchName,
    status,
    errorMessage,
    data,
    isDialogOpen,
    dragActive,
    inputRef,

    handleDrag,
    handleDrop,
    handleChange,
    onButtonClick,
    handleUpload,
    removeFile,
    setBatchName,
    openDialog,
    closeDialog,
  };
};
