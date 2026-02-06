"use client";

import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import { cn } from "@/src/utils/cn";

interface DataTableContentProps<TData> {
  table: TanstackTable<TData>;
}

export function DataTableContent<TData>({
  table,
}: DataTableContentProps<TData>) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-4 py-3 text-left font-semibold text-muted-foreground whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b last:border-0 hover:bg-muted/30 transition-colors",
                  index % 2 === 0 ? "bg-background" : "bg-muted/10",
                )}
              >
                {row.getVisibleCells().map(({ id, column, getContext }) => (
                  <td key={id} className="px-4 py-3">
                    {flexRender(column.columnDef.cell, getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
