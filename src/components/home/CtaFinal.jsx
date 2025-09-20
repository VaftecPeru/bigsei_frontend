export default function CtaFinal() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Sección de texto */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Regístrate y solicita una demo personalizada
          </h2>
          <p className="mt-6 text-lg text-gray-200 leading-relaxed">
            Completa el formulario con tus datos para acceder a nuestra
            formación avanzada y transformar el potencial de tu equipo.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white p-8 sm:px-16 sm:py-8 rounded-xl shadow-2xl w-full mx-auto lg:max-w-none">
          <form className="grid lg:grid-cols-2 items-center gap-x-10 gap-y-6 space-y-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Escribe tu nombre"
                className="mt-2 w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991244] focus:border-[#991244] bg-gray-50 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Apellido */}
            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                placeholder="Escribe tu apellido"
                className="mt-2 w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991244] focus:border-[#991244] bg-gray-50 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Correo */}
            <div>
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                id="correo"
                type="email"
                placeholder="correo@empresa.com"
                className="mt-2 w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991244] focus:border-[#991244] bg-gray-50 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                placeholder="Número de teléfono"
                className="mt-2 w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991244] focus:border-[#991244] bg-gray-50 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Empresa */}
            <div>
              <label
                htmlFor="empresa"
                className="block text-sm font-medium text-gray-700"
              >
                Empresa
              </label>
              <input
                id="empresa"
                type="text"
                placeholder="Nombre de tu empresa"
                className="mt-2 w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991244] focus:border-[#991244] bg-gray-50 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Cargo */}
            <div>
              <label
                htmlFor="cargo"
                className="block text-sm font-medium text-gray-700"
              >
                Cargo
              </label>
              <input
                id="cargo"
                type="text"
                placeholder="Cargo dentro de la empresa"
                className="mt-2 w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991244] focus:border-[#991244] bg-gray-50 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Necesidades */}
            <div className="lg:col-span-2">
              <label
                htmlFor="necesidades"
                className="block text-sm font-medium text-gray-700"
              >
                Cuéntanos tus necesidades
              </label>
              <textarea
                id="necesidades"
                placeholder="Describe brevemente tus necesidades"
                className="mt-2 w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#991244] focus:border-[#991244] bg-gray-50 text-gray-900 placeholder-gray-500"
                rows="4"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              aria-label="Enviar solicitud de demo personalizada"
              className="w-full lg:col-span-2 items-center bg-gradient-to-r from-[#991244] to-[#cc1f5a] text-white font-bold py-3 rounded-lg hover:scale-105 hover:from-[#b71e48] hover:to-[#9c1340] transition-transform duration-300"
            >
              Enviar solicitud
            </button>

            {/* Consentimiento */}
            <div className="lg:col-span-2 flex items-start">
              <input
                id="consentimiento"
                type="checkbox"
                className="h-4 w-4 text-[#991244] border-gray-300 rounded focus:ring-2 focus:ring-[#991244] focus:ring-offset-gray-100"
              />
              <label
                htmlFor="consentimiento"
                className="ml-2 text-sm text-gray-700"
              >
                Acepto los{" "}
                <a
                  href="/terminos"
                  className="underline text-[#991244] hover:text-[#cc1f5a]"
                >
                  términos y condiciones
                </a>
                .
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
