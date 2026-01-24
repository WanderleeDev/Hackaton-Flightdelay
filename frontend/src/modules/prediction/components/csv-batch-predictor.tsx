"use client";

import { useBatchUpload } from "@/src/modules/prediction/hooks/useBatchUpload";
import BatchDropZone from "./batch-upload/batch-drop-zone";
import BatchResultsDialog from "./batch-upload/batch-results-dialog";

export default function CSVBatchPredictor() {
  const {
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
    closeDialog,
  } = useBatchUpload();

  return (
    <div className="flex flex-col gap-4">
      <BatchDropZone
        file={file}
        batchName={batchName}
        status={status}
        errorMessage={errorMessage}
        data={data}
        dragActive={dragActive}
        inputRef={inputRef}
        onDrag={handleDrag}
        onDrop={handleDrop}
        onChange={handleChange}
        onSelectFile={onButtonClick}
        onBatchNameChange={setBatchName}
        onUpload={handleUpload}
        onRemove={removeFile}
      />

      <BatchResultsDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        predictions={data?.histories || []}
        title={data?.batchName || "Batch Results"}
      >
        {data && (
          <span className="px-3 py-1 rounded-md bg-primary/10 text-primary font-bold text-sm">
            Batch: {data.batchName}
          </span>
        )}
      </BatchResultsDialog>
    </div>
  );
}
