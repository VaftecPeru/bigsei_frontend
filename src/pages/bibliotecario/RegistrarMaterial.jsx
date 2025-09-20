import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import AgregarLibro from "./modalbibliotecario/AgregarLibro";

function RegistrarMaterial() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    genre: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["Libro", "Revista", "Artículo", "Tesis"];
  const genres = ["Ficción", "No Ficción", "Fantasía", "Ciencia", "Historia"];
  const statuses = ["Disponible", "Prestado", "En Reparación"];

  const books = [
    {
      id: 1,
      title: "Harry Potter y la piedra filosofal",
      author: "J. K. Rowling",
      total: 10,
      available: 8,
      image: "https://picsum.photos/200/300",
      category: "Libro",
      genre: "Fantasía",
      status: "Disponible",
    },
    {
      id: 2,
      title: "Harry Potter y la piedra filosofal",
      author: "J. K. Rowling",
      total: 10,
      available: 8,
      image: "https://picsum.photos/200/300",
      category: "Libro",
      genre: "Fantasía",
      status: "Prestado",
    },
    {
      id: 3,
      title: "Harry Potter y la piedra filosofal",
      author: "J. K. Rowling",
      total: 10,
      available: 8,
      image: "https://picsum.photos/200/300",
      category: "Libro",
      genre: "Fantasía",
      status: "Disponible",
    },
  ];

  // Función para manejar cambios en los filtros
  const handleFilterChange = (type, value) => {
    if (value) {
      setFilters((prev) => ({ ...prev, [type]: value }));

      // Agregar nuevo filtro activo si no existe
      if (!activeFilters.some((filter) => filter.type === type)) {
        setActiveFilters((prev) => [...prev, { type, value }]);
      } else {
        // Actualizar filtro existente
        setActiveFilters((prev) =>
          prev.map((filter) =>
            filter.type === type ? { ...filter, value } : filter
          )
        );
      }
    }
  };

  // Función para eliminar un filtro
  const removeFilter = (filterType) => {
    setActiveFilters((prev) =>
      prev.filter((filter) => filter.type !== filterType)
    );
    setFilters((prev) => ({ ...prev, [filterType]: "" }));
  };

  // Función para aplicar los filtros
  useEffect(() => {
    let result = [...books];

    activeFilters.forEach((filter) => {
      if (filter.value) {
        result = result.filter(
          (book) => book[filter.type.toLowerCase()] === filter.value
        );
      }
    });

    setFilteredBooks(result);
  }, [activeFilters]);

  // Traducir tipos de filtro para mostrar en las etiquetas
  const filterTypeTranslations = {
    category: "Categoría",
    genre: "Género",
    status: "Estado",
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center min-h-screen w-full bg-[#F0F7FF] p-6">
        <div className="w-full max-w-7xl p-4">
          <div className="flex justify-end items-center text-sm text-gray-500">
            <span>
              <a href="#" className="hover:underline">
                Iaion &gt; Menú &gt; Material &gt; Registrar Material
              </a>
            </span>
          </div>
        </div>

        <div className="w-full max-w-7xl bg-[#F0F7FF] shadow-sm rounded-lg overflow-hidden">
          <div className="relative h-[300px] w-full">
            <img
              src="https://imgs.search.brave.com/NEgmpZyerbLbG1vDjFxG4mxFXpJUOsodWS6E-PTVP-8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIy/NDY4MTYyNC9lcy9m/b3RvL2JpYmxpb3Rl/Y2EtcCVDMyVCQWJs/aWNhLWRlLWxhLWNp/dWRhZC1kZS1lc3Rv/Y29sbW8uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTRMQzRW/ZTgxcTJEQ3JEWFda/dzVyeEwyUkF1WU5n/eGtuLVNWMlk4bUZ0/dDA9"
              alt="Library Header"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="relative w-full max-w-2xl mx-4">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar material"
                  className="w-full py-2 px-14 rounded-lg bg-white text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
            <div className="flex flex-col gap-6">
              {/* Header con título y botón */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Filtrar materiales</h2>
                  <p className="text-sm text-gray-500 mt-1">Selecciona los filtros para encontrar lo que buscas</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Agregar material
                </button>
              </div>

              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categoría */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Género */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Género</label>
                  <select
                    value={filters.genre}
                    onChange={(e) => handleFilterChange("genre", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  >
                    <option value="">Todos los géneros</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estado */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  >
                    <option value="">Todos los estados</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtros activos */}
              {activeFilters.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-medium text-gray-700">Filtros aplicados:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {activeFilters.map((filter) => (
                      <span
                        key={filter.type}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {filterTypeTranslations[filter.type]}: {filter.value}
                        <button
                          onClick={() => removeFilter(filter.type)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          aria-label={`Quitar filtro ${filter.value}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18" />
                            <path d="M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 mt-8"> {/* Cambiado gap-6 a gap-8 */}
            {(filteredBooks.length > 0 ? filteredBooks : books).map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full min-w-[300px]"
              >
                {/* Imagen del libro */}
                <div className="p-5 flex justify-center bg-gray-50">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={`Portada de ${book.title}`}
                    className="w-full max-w-[180px] aspect-[2/3] object-contain shadow-sm rounded-lg"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                </div>

                {/* Contenido */}
                <div className="p-5 pt-0 flex-grow flex flex-col">
                  {/* Metadatos */}
                  <div className="flex justify-between gap-4 mb-3 text-sm">
                    <span className={`px-2 py-1 rounded-full ${book.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {book.available > 0 ? `${book.available} Disponibles` : 'Agotado'}
                    </span>
                    <span className="text-gray-500">
                      Total: {book.total}
                    </span>
                  </div>

                  {/* Información del libro */}
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-1" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{book.author}</p>

                  {/* Botones de acción */}
                  <div className="mt-auto flex gap-3">
                    <button
                      className="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
                      onClick={() => handleDelete(book.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                      Eliminar
                    </button>
                    <button
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                      onClick={() => handleUpdate(book)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AgregarLibro
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default RegistrarMaterial;
