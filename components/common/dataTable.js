"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTable({ columns = [], data = [], onSort, sortBy, order, onRowClick }) {
  return (
    <div className="w-full rounded-2xl border border-taskTertiary/30 bg-taskPrimary overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-taskSecondary hover:bg-taskSecondary">
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  onClick={() => col.sortable && onSort?.(col.accessor)}
                  className={`px-4 py-3 text-xs md:text-sm font-semibold text-taskPrimary uppercase whitespace-nowrap
                  ${col.sortable ? "cursor-pointer" : ""}`}
                >
                  {col.header}

                  {col.sortable && sortBy === col.accessor && (
                    <span className="ml-2">{order === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow
                  onClick={() => onRowClick?.(row)}
                  key={rowIndex}
                  className="hover:bg-taskTertiary/10 transition cursor-pointer"
                >
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-4 py-3 text-sm text-taskSecondary whitespace-nowrap"
                    >
                      {col.render ? col.render(row) : (row[col.accessor] ?? "-")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10 text-taskTertiary">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
