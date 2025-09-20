import React, { useState, useEffect } from "react";
import { CardTitle } from "../ui/card";
import DownloadButton from "../ui/DownloadButton";
import { Card } from "@mui/material";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

const IncomeExpenseTable = () => {
  const [filter, setFilter] = useState("todos");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Función para obtener los movimientos desde la API
  const fetchMovimientos = async (tipo) => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        Api_Global_Dashboard.admin.listaMovimiento(tipo === "" ? "" : tipo)
      );
      setMovimientos(response.data.data);
      setError(null);
      setCurrentPage(1); // Resetear a la primera página cuando cambian los datos
    } catch (err) {
      setError("Error al cargar los movimientos");
      console.error("Error fetching movimientos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los movimientos cuando cambia el filtro
  useEffect(() => {
    fetchMovimientos(filter);
  }, [filter]);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    let dataToSort = [...movimientos];

    if (sortConfig.key) {
      dataToSort.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return dataToSort;
  };

  // Obtener los elementos actuales para la página actual
  const currentItems = () => {
    const data = sortedData();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(Math.abs(value));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-PE', options);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="ml-1 h-3 w-3" />;
    return sortConfig.direction === 'ascending'
      ? <ChevronUp className="ml-1 h-3 w-3" />
      : <ChevronDown className="ml-1 h-3 w-3" />;
  };

  if (loading) {
    return <div className="p-6 text-center">Cargando movimientos...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <Card className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between items-center w-full">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Transacciones Financieras</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Detalle de ingresos y egresos</p>
          </div>
          <DownloadButton
            label="Exportar"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          />
        </div>
      </div>

      <div className="px-6 py-3 border-b border-gray-100">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === "todos"
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-500 hover:bg-gray-100"
              }`}
            onClick={() => handleFilterChange("todos")}
          >
            Todos
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === "I"
                ? "bg-green-100 text-green-700"
                : "text-gray-500 hover:bg-gray-100"
              }`}
            onClick={() => handleFilterChange("I")}
          >
            Ingresos
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === "E"
                ? "bg-red-100 text-red-700"
                : "text-gray-500 hover:bg-gray-100"
              }`}
            onClick={() => handleFilterChange("E")}
          >
            Egresos
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'id', label: 'Nº' },
                { key: 'Descripción', label: 'Descripción' },
                { key: 'Fecha', label: 'Fecha' },
                { key: 'Monto', label: 'Monto' },
                { key: 'Método de pago', label: 'Método de pago' }
              ].map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => requestSort(header.key)}
                >
                  <div className="flex items-center">
                    {header.label}
                    {getSortIcon(header.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems().map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Descripción}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(row.Fecha)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${row.Tipo === "I" ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {row.Tipo === "I" ? '+' : '-'} {formatCurrency(row.Monto)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row["Método de pago"] === 'Yape' ? 'bg-purple-100 text-purple-800' :
                      row["Método de pago"] === 'Transferencia' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {row["Método de pago"]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
          {Math.min(currentPage * itemsPerPage, movimientos.length)} de{' '}
          {movimientos.length} registros
        </div>
        <div className="flex space-x-2 text-sm">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-xl ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Anterior
          </button>

          {Array.from({ length: Math.ceil(movimientos.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-md ${currentPage === index + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(movimientos.length / itemsPerPage)}
            className={`px-3 py-1 rounded-md ${currentPage === Math.ceil(movimientos.length / itemsPerPage)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </Card>
  );
};

export default IncomeExpenseTable;