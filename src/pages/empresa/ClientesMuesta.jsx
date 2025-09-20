function ClientesMuestra() {
    const logos = [
      { name: "NHS Englandxd", src: "/svg/ban1.svg" },
      { name: "CIPD", src: "/svg/ban2.svg" },
      { name: "Accenture", src: "/svg/ban3.svg" },
      { name: "BBC", src: "/svg/ban4.svg" },
      { name: "UCL", src: "/svg/ban5.svg" },
      { name: "King's London", src: "/svg/ban6.svg" },
      { name: "KPMG", src: "/svg/ban2.svg" },
      { name: "ACCA", src: "/svg/ban1.svg" },
    ]

  
    return (
      <div className="bg-gradient-to-b from-[#00264A] to-[#00264A] overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white max-w-3xl mx-auto mb-16">
            Únase a miles de empresas que ya están aprendiendo de instituciones de renombre mundial
          </h2>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto mb-16">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 filter grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img src={logo.src || "/placeholder.svg"} alt={`Logo de ${logo.name}`} className="max-h-12 w-auto filter brightness-0 invert" />
              </div>
            ))}
          </div>
  
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-pink-500 font-semibold text-lg mb-2">Ilimitado para equipos</h3>
              <p className="text-gray-600">Acceso completo a todos nuestros cursos para sus empleados</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-pink-500 font-semibold text-lg mb-2">Bigsei para empresas</h3>
              <p className="text-gray-600">Soluciones de aprendizaje personalizadas para su organización</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
export default ClientesMuestra