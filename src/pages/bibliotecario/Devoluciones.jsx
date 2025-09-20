import { useState } from "react"
import { Calendar, ChevronDown, Download, Search, X, Filter, Bell } from "lucide-react"

function Devoluciones() {
  const [activeTab, setActiveTab] = useState("register")
  const [searchInput, setSearchInput] = useState("")

  const pendingBooks = [
    {
      id: 1,
      dni: "1245699",
      code: "ABC-123",
      title: "Harry Potter y la piedra filosofal",
      name: "María González López",
      registerDate: "12/04/2024",
      returnDate: "12/04/2024",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      cover: "https://m.media-amazon.com/images/I/81qYyfUILxL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      dni: "8745632",
      code: "DEF-456",
      title: "El señor de los anillos",
      name: "Carlos Martínez Ruiz",
      registerDate: "10/04/2024",
      returnDate: "15/04/2024",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      cover: "https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 3,
      dni: "9852147",
      code: "GHI-789",
      title: "Cien años de soledad",
      name: "Ana Sánchez Pérez",
      registerDate: "08/04/2024",
      returnDate: "18/04/2024",
      photo: "https://randomuser.me/api/portraits/women/63.jpg",
      cover: "https://m.media-amazon.com/images/I/91kyw6VXKXL._AC_UF1000,1000_QL80_.jpg"
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Devoluciones</h1>
        <p className="text-gray-600">Registra y gestiona las devoluciones de libros</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab("register")}
          className={`px-6 py-3 font-medium text-sm relative ${
            activeTab === "register" 
              ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-blue-600 after:rounded-t" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Registrar devolución
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-3 font-medium text-sm relative ${
            activeTab === "pending" 
              ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-blue-600 after:rounded-t" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pendientes
        </button>
      </div>

      {activeTab === "register" ? (
        <>
          {/* Search Section */}
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Buscar préstamo</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-gray-700">DNI del usuario</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Ingrese DNI" 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                BUSCAR
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <span className="text-sm text-gray-500">Fecha de registro: 12/04/2024</span>
              <button className="text-sm text-blue-600 hover:text-blue-800">Ver historial completo</button>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="https://m.media-amazon.com/images/I/81qYyfUILxL._AC_UF1000,1000_QL80_.jpg"
                    alt="Book cover"
                    className="w-64 h-80 object-cover rounded-lg shadow-md border-4 border-yellow-100"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {pendingBooks[0].code}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">Título</label>
                  <input 
                    type="text" 
                    value="Harry Potter y la piedra filosofal" 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" 
                    readOnly 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Autor</label>
                    <input 
                      type="text" 
                      value="J.K. Rowling" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Categoría</label>
                    <input 
                      type="text" 
                      value="Novela" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" 
                      readOnly 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">Género</label>
                  <input 
                    type="text" 
                    value="Fantasía" 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" 
                    readOnly 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Fecha de préstamo</label>
                    <input 
                      type="text" 
                      value="05/04/2024" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Fecha de devolución</label>
                    <input 
                      type="text" 
                      value="15/04/2024" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" 
                      readOnly 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-white shadow" 
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">María González López</h4>
                    <p className="text-sm text-gray-500">DNI: 1245699</p>
                  </div>
                </div>
                
                <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                  Registrar devolución
                </button>
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className="mt-6 bg-green-100 border border-green-200 text-green-800 py-4 px-6 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-semibold">ENTREGA DENTRO DE PLAZO</div>
              <div className="text-sm">Fecha límite: 15/04/2024</div>
            </div>
            <div className="text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Pending Returns Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Devoluciones pendientes</h2>
                <p className="text-sm text-gray-600">
                  Lista de usuarios con devoluciones pendientes. Puedes notificar individualmente o hacer una notificación colectiva.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                  <Filter size={16} />
                  Filtrar
                  <ChevronDown size={16} />
                </button>
                
                <div className="relative min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium">
                  <Download size={16} />
                  Exportar
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <span className="text-gray-600">Filtros aplicados: 2</span>
              <button className="text-blue-600 hover:text-blue-800">Borrar todo</button>
              
              <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm">
                Tipo: DNI
                <X size={14} className="cursor-pointer hover:text-blue-800" />
              </div>
              
              <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm">
                Estado: Pendiente
                <X size={14} className="cursor-pointer hover:text-blue-800" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      N°
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DNI
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Libro
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      F. préstamo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      F. devolución
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {book.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.dni}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full border-2 border-white shadow" src={book.photo} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{book.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-9">
                            <img className="h-12 w-9 object-cover rounded shadow" src={book.cover} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                            <div className="text-sm text-gray-500">{book.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.registerDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.returnDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pendiente
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Ver
                        </button>
                        <button className="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-xs">
                          <Bell size={14} />
                          Notificar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 rounded-b-lg">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">1</span> a <span className="font-medium">3</span> de{' '}
                    <span className="font-medium">3</span> resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Devoluciones