import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-radial from-indigo-700 via-indigo-800 to-blue-950 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-gray-300">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
          Estamos trabajando en ello.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-gradient-radial from-purple-600 to-purple-700 hover:from-purple-400 hover:to-purple-600 hover:scale-110 transition all duration-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ir a la página principal
          </Link>
          <a
            href="#"
            className="text-sm font-semibold text-gray-50 hover:scale-110 transition-all duration-300"
          >
            Contáctarme con Soporte{" "}
            <span aria-hidden="true" className="">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
