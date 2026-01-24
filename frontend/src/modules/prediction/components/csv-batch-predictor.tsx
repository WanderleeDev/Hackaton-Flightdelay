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
        data={data}
      />
    </div>
  );
}
