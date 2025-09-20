const Pricing = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Plan Básico */}
          <div className="bg-white p-6 rounded-lg text-center flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Plan Básico</h3>
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl font-extrabold">$9.99</span>
              <span className="text-gray-500">/mes</span>
            </div>
            <ul className="space-y-4 text-left text-gray-700">
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Acceso limitado a cursos básicos</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Acceso a recursos básicos</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 line-through">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Soporte personalizado</span>
              </li>
            </ul>
            <a
              href="#"
              className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 mx-auto"
            >
              Comienza ahora
            </a>
          </div>

          {/* Plan Premium */}
          <div className="bg-white p-6 rounded-md shadow-xl shadow-indigo-300 text-center flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Plan Premium</h3>
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl font-extrabold">$29.99</span>
              <span className="text-gray-500">/mes</span>
            </div>
            <ul className="space-y-4 text-left text-gray-700">
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  Acceso completo a todos los cursos y clases avanzadas
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Soporte 24/7 dedicado</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>50GB de almacenamiento en la nube</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Acceso a contenido exclusivo y personalizado</span>
              </li>
            </ul>
            <a
              href="#"
              className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 mx-auto"
            >
              Comienza ahora
            </a>
          </div>

          {/* Plan Avanzado */}
          <div className="bg-white p-6 rounded-lg text-center flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Plan Avanzado</h3>
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl font-extrabold">$19.99</span>
              <span className="text-gray-500">/mes</span>
            </div>
            <ul className="space-y-4 text-left text-gray-700">
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Acceso a todos los cursos básicos y avanzados</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Clases en vivo y tutorías personalizadas</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Acceso ilimitado a recursos exclusivos</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 line-through">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3h4a1 1 0 011 1v2H5V4a1 1 0 011-1zm0 5h10V6H5v2zm0 3h4v-2H5v2zm6 0h4v-2h-4v2zm0 5h4v-2h-4v2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Soporte 24/7</span>
              </li>
            </ul>
            <a
              href="#"
              className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 mx-auto"
            >
              Comienza ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
