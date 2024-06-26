import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../_components/ui/table";
const SalesTable = () => {
  interface Row {
    date: string;
    action: string;
    detail: string;
    address: string;

    amount: number;
    [key: string]: string | number;
  }
  const columns = [
    { header: "Date", cell: "date" },
    { header: "Action", cell: "action" },
    { header: "Detail", cell: "detail" },
    { header: "Address", cell: "address" },
    { header: "Amount", cell: "amount" },
  ];

  const rows: Row[] = [
    {
      date: "2024/01/21",
      action: "sent",
      detail: "pid1234",
      address: "ghost.opti",
      amount: 32.256,
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b rounded-xl bg-theme-200 hover:bg-theme-200 text-bg-1">
          {columns.map((column, index) => (
            <TableHead
              key={column.header}
              className={`text-bg-1 text-base text-center  ${
                index === 0 ? "rounded-tl-2xl rounded-b-none" : ""
              } ${index === columns.length - 1 ? "rounded-tr-2xl rounded-b-none" : ""}`}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-bg-2 rounded-xl">
        {rows.map((row, index) => (
          <TableRow
            key={index}
            className="hover:bg-bg-1 h-10 text-center transition-colors duration-300 ease-in-out"
          >
            {columns.map((column) => (
              <TableCell
                key={column.cell}
                className="py-4 px-6 border-b border-b-theme-400"
              >
                {/* {row[column.cell]} */}-
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesTable;
