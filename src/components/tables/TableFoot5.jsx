import React from "react";

export default function TableFoot5({ perPage = 15, page = 1, total = 0, changePage }) {

  return (
    <div className="w-full">
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