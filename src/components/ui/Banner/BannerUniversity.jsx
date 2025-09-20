
export const UniversityHeroBanner = () => {
  return (
    <div
      className="relative w-full h-96 bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/banner/banner-university.jpg')"
      }}
    >
      {/* University Logo */}
      <div className="  m-0">
        <svg className="w-32 h-32" viewBox="0 0 100 100" fill="white">
          <path d="M20 20 L20 50 L50 50 L50 20 Z" />
          <path d="M55 20 L55 50 L85 50 L85 20 Z" />
          <path d="M20 55 L20 85 L50 85 L50 55 Z" />
          <path d="M55 55 L55 85 L85 85 L85 55 Z" />
        </svg>
      </div>

      {/* University Name */}
      <h1 className="text-4xl mt-0 font-bold mb-6 text-center">Universidad de Roehampton</h1>

      {/* Descripción de la Universidad */}
      <p className="m-0 text-xl text-center w-full md:max-w-4xl px-4">
        Situada en el campus más bello de Londres, la Universidad de Roehampton
        ofrece una experiencia estudiantil de alta calidad con un personal excepcional y las instalaciones de.
      </p>
    </div>
  );
};