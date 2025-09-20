import { X } from "lucide-react"
import { useEffect } from "react"

export default function SaberMas({ isOpen, onClose, course }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "visible"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md relative rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">¿Quieres saber más?</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Cerrar">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Descripción */}
          <p className="text-sm text-gray-600 mb-6">
            Complete sus datos y compartiremos su información con UCL (University College London), que se pondrá en
            contacto con usted.
          </p>

          {/* Formulario */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="nombre">
                Nombre de pila <span className="text-red-500">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Boris"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="apellido">
                Apellido <span className="text-red-500">*</span>
              </label>
              <input
                id="apellido"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="P"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="email">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="boris.farmacia@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="pais">
                ¿Dónde vive? <span className="text-red-500">*</span>
              </label>
              <select id="pais" className="w-full border border-gray-300 p-2 rounded" required>
                <option value="">Seleccione un país</option>
                <option value="ES">España</option>
                <option value="MX">México</option>
                <option value="AR">Argentina</option>
                {/* Agregar más países según sea necesario */}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="telefono">
                Número de teléfono (incluido el código del país) <span className="text-red-500">*</span>
              </label>
              <input
                id="telefono"
                type="tel"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="+44 1234 567890"
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="marketing" className="mt-1" />
              <label htmlFor="marketing" className="text-sm">
                Quiero recibir más información de Bigsei sobre titulaciones y otra información relacionada
              </label>
            </div>

            <div className="text-sm text-gray-600">
              Al registrarse, usted acepta la{" "}
              <a href="#" className="text-pink-600 hover:underline">
                Política de privacidad
              </a>{" "}
              de Bigsei y la{" "}
              <a href="#" className="text-pink-600 hover:underline">
                Política de privacidad de UCL
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 hover:bg-pink-700 transition-colors rounded"
            >
              Entregar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

