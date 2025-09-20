import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function TableSA2({ columns, rows, itemsPerPage = 15 }) {
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;

  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <TableContainer component={Paper} className="w-full">
        <Table className="w-full">
          <TableHead>
            <TableRow className="bg-gray-50">
              {columns.map((column, index) => (
                <TableCell key={index} className="bg-gray-50">
                  <span className="font-semibold">{column.header}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
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
            {Array.from({ length: Math.ceil(rows.length / itemsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentPage === index + 1
                      ? "bg-blue-800 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } ${
                    index === 0 ? "rounded-l-md" : ""
                  } ${
                    index === Math.ceil(rows.length / itemsPerPage) - 1 ? "rounded-r-md" : ""
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

export default TableSA2;

