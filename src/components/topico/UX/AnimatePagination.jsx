import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnimatedPagination = ({ 
  pagina, 
  totalPaginas, 
  elementosPorPagina, 
  totalRegistros, 
  cambiarPagina 
}) => {
  const paginaInicial = pagina * elementosPorPagina + 1;
  const paginaFinal = Math.min((pagina + 1) * elementosPorPagina, totalRegistros);

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(1, pagina + 1 - delta);
      i <= Math.min(totalPaginas, pagina + 1 + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 1) {
      rangeWithDots.push(1);
      if (range[0] > 2) rangeWithDots.push('...');
    }

    rangeWithDots.push(...range);

    if (range[range.length - 1] < totalPaginas) {
      if (range[range.length - 1] < totalPaginas - 1) rangeWithDots.push('...');
      rangeWithDots.push(totalPaginas);
    }

    return rangeWithDots;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-3 bg-white rounded-lg shadow-sm"
    >
      {/* Records info */}
      <motion.span 
        className="text-sm text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={`${paginaInicial}-${paginaFinal}`}
      >
        Mostrando <span className="font-medium">{paginaInicial}</span> - <span className="font-medium">{paginaFinal}</span> de{' '}
        <span className="font-medium">{totalRegistros}</span> registros
      </motion.span>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => cambiarPagina(pagina - 1)}
          disabled={pagina === 0}
          className="p-2 text-gray-600 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-1">
          {getVisiblePages().map((pageNumber, index) => (
            pageNumber === '...' ? (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <motion.button
                key={pageNumber}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => cambiarPagina(pageNumber - 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${pagina + 1 === pageNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {pageNumber}
              </motion.button>
            )
          ))}
        </div>

        <button
          onClick={() => cambiarPagina(pagina + 1)}
          disabled={pagina + 1 >= totalPaginas}
          className="p-2 text-gray-600 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default AnimatedPagination;