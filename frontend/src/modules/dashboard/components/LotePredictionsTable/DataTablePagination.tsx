"use client";

import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
      <div className="flex items-center gap-6 order-2 sm:order-1">
        <Field className="flex flex-row items-center gap-2">
          <FieldLabel className="text-sm text-muted-foreground whitespace-nowrap">
            Rows per page
          </FieldLabel>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(e) => table.setPageSize(Number(e))}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue
                placeholder={`${table.getState().pagination.pageSize}`}
              />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <div className="text-sm text-muted-foreground font-medium hidden md:block">
          Total: {table.getCoreRowModel().rows.length} results
        </div>
      </div>

      <div className="flex items-center gap-4 order-1 sm:order-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 font-bold disabled:cursor-not-allowed"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 font-bold disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 font-bold disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 font-bold disabled:cursor-not-allowed"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <span>Page</span>
          <span className="text-foreground">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
}
