import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function TableSA5({ columns, rows, perPage = 15, page = 1, total = 0, changePage }) {

  return (
    <div className="w-full">
      <TableContainer component={Paper} className="w-full">
        <Table className="w-full">
          <TableHead>
            <TableRow className="bg-gray-50">
              {columns.map((column, index) => (
                <TableCell key={index} className="bg-gray-50" padding="none">
                  <div className="py-2 text-center">
                    <span className="font-semibold">{column.header}</span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} padding="none">
                    <div className="py-2 text-center">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-full flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow">
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(total / perPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => changePage(index + 1)}
                  className={`px-4 py-2 text-sm font-medium ${
                    page === index + 1
                      ? "bg-blue-800 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } ${
                    index === 0 ? "rounded-l-md" : ""
                  } ${
                    index === Math.ceil(total / perPage) - 1 ? "rounded-r-md" : ""
                  } border border-gray-300`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}