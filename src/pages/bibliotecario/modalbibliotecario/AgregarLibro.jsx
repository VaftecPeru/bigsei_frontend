import { useState } from "react"
import { X, Upload, Check, Calendar, Plus, Trash2, FileText } from "lucide-react"

function AgregarLibro({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(1)
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    editorial: "",
    descripcion: "",
    categoria: "",
    genero: "",
    stock: "",
    fechaIngreso: "",
    portada: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        portada: file,
      }))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        portada: file,
      }))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      portada: null,
    }))
  }

  const handleContinue = () => {
    if (activeTab < 3) {
      setActiveTab((prev) => prev + 1)
    } else {
      console.log("Formulario enviado:", formData)
      onClose()
    }
  }

  const handleBack = () => {
    if (activeTab > 1) {
      setActiveTab((prev) => prev - 1)
    }
  }

  const renderTabIcon = (tabNumber) => {
    if (tabNumber < activeTab) {
      return (
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
          <Check className="w-4 h-4" />
        </span>
      )
    }
    return (
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full text-sm ${activeTab === tabNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
      >
        {tabNumber}
      </span>
    )
  }

  const getTabStyle = (tabNumber) => {
    if (tabNumber < activeTab) {
      return "border-green-500 text-green-500"
    } else if (tabNumber === activeTab) {
      return "border-blue-600 text-blue-600"
    } else {
      return "border-transparent text-gray-500"
    }
  }

  if (!isOpen) return null
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Agregar Material</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-8 px-6 pt-6">
          <button
            className={`flex items-center gap-2 pb-3 transition-colors ${getTabStyle(1)}`}
            onClick={() => setActiveTab(1)}
          >
            {renderTabIcon(1)}
            General
          </button>
          <button
            className={`flex items-center gap-2 pb-3 transition-colors ${getTabStyle(2)}`}
            onClick={() => setActiveTab(2)}
          >
            {renderTabIcon(2)}
            Detalles
          </button>
          <button
            className={`flex items-center gap-2 pb-3 transition-colors ${getTabStyle(3)}`}
            onClick={() => setActiveTab(3)}
          >
            {renderTabIcon(3)}
            Portada
          </button>
        </div>

        {/* formulario */}
        <div className="p-6">
          {activeTab === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Harry Potter y la piedra filosofal"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                <input
                  type="text"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  placeholder="J. K. Rowling"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Editorial</label>
                <input
                  type="text"
                  name="editorial"
                  value={formData.editorial}
                  onChange={handleChange}
                  placeholder="Nombre editorial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción añadida ...."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Categoría</label>
                <div className="flex gap-2">
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Seleccione categoría</option>
                    <option value="libro">Libro</option>
                    <option value="revista">Revista</option>
                    <option value="articulo">Artículo</option>
                  </select>
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsCategoryModalOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Añadir categoría
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Género</label>
                <div className="flex gap-2">
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className="flex-1 px-3 max-w-[456px] py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Seleccione género</option>
                    <option value="ficcion">Ficción</option>
                    <option value="no-ficcion">No Ficción</option>
                    <option value="fantasia">Fantasía</option>
                  </select>
                  <button className="flex min-w-[156px] items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsGenderModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Añadir género
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Indique el stock"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Fecha de ingreso</label>
                <div className="relative">
                  <input
                    type="date"
                    name="fechaIngreso"
                    value={formData.fechaIngreso}
                    onChange={handleChange}
                    placeholder="Indique fecha"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-blue-300 rounded-lg p-8 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <div className="flex flex-col items-center justify-center text-center min-h-[200px]">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Subir solicitud</p>
                  <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              <div
                className={`flex items-center justify-between px-4 py-2 ${formData.portada ? "bg-blue-50" : "bg-gray-50"
                  } rounded-md`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formData.portada ? formData.portada.name : "Archivo no cargado"}
                  </span>
                </div>
                {formData.portada && (
                  <button onClick={removeFile} className="text-gray-400 hover:text-gray-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between p-4 border-t">
          <button
            onClick={activeTab === 1 ? onClose : () => setActiveTab((prev) => prev - 1)}
            className="px-6 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-700 rounded-md hover:bg-gray-50"
          >
            VOLVER
          </button>
          <button
            onClick={() => (activeTab < 3 ? setActiveTab((prev) => prev + 1) : onClose())}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            {activeTab === 3 ? "GUARDAR" : "CONTINUAR"}
          </button>
        </div>
      </div>
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Crear Nueva Categoría</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la categoría
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ej: Libros de Ciencia"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsCategoryModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  // Lógica para guardar la categoría
                  setIsCategoryModalOpen(false);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {isGenderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Genero</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del genero
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ej: Romance"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsGenderModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  setIsGenderModalOpen(false);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgregarLibro

