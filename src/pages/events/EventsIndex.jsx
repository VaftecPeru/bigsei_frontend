import Banner from "./components/Banner";
import Header from "./components/Header";
import { eventos, visitas, EventoCard, VisitaCard } from "./components/EventCard";
import CronogramaBan from "./components/CronogramaBan";
import { CronogramaSection } from "./components/CronogramaCard";
import FormContacto from '../empresa/FormContacto'
import EventosOnline from "./components/EventOnline";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function EventsIndex() {
  return (
    <div id="inicio" className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <Header />
      <Banner />

      <main className="min-h-screen bg-gradient-to-br from-[#E6F3FF] to-[#D1E8FF] px-4 sm:px-6 lg:px-12 py-6 space-y-12 sm:space-y-16 lg:space-y-24">

        {/* Sección Eventos Online */}
        <section
          id="eventos-online"
          className="p-6 sm:p-8 lg:p-12 -mx-4 sm:-mx-6 lg:-mx-12"
        >
          <div className="text-left mb-8">
            <div className="inline-block ml-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00264A] dark:text-white relative pb-2">
                Eventos Online
              </h2>
              <span className="block w-20 h-1 bg-[#C9002B] mx-auto mt-2 rounded"></span>
            </div>
          </div>


          <EventosOnline />
        </section>

        {/* Sección Próximos Eventos */}
        <section
          id="eventos"
          className="bg-gradient-to-br from-[#E6F3FF] to-[#D1E8FF] p-6 sm:p-8 lg:p-12 -mx-4 sm:-mx-6 lg:-mx-12"
        >
          <div className="text-center mb-8">
            <h2 className="inline-block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00264A] dark:text-white relative pb-2">
              Próximos Eventos
            </h2>
            <span className="block w-20 h-1 bg-[#C9002B] mx-auto mt-2 rounded"></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
            {visitas.map((visita) => (
              <VisitaCard key={visita.id} visita={visita} />
            ))}
          </div>
        </section>

        {/* Cronograma */}
        <section id="cronograma" className="pt-12 pb-6">
          <div className="-mx-4 sm:-mx-6 lg:-mx-12">
            <CronogramaBan />
          </div>
          <CronogramaSection />
        </section>

        {/* Formulario */}
        <section id="formulario" className="pt-6 pb-12">
          <div className="text-center mb-8">
            <h2 className="inline-block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00264A] dark:text-white relative pb-2">
              Formulario
              <span className="block w-20 h-1 bg-[#C9002B] mx-auto mt-2 rounded"></span>
            </h2>
          </div>

          {/* Contenedor con fondo blanco */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-6 max-w-lg mx-auto">
            <FormContacto />
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-[#000000] via-[#213C69] to-[#213C69] m-0">
        <div
          className="xl:flex w-full relative h-auto justify-center"
          style={{
            backgroundImage: `url("/bg/Rectangle.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="absolute bottom-0 w-full px-4 bg-transparent">
            <div className="w-full px-8 py-4 relative z-10">
              <div className="flex flex-col md:flex-row justify-around gap-8 items-center md:items-start">
                {/* Logo */}
                <div className="flex flex-col items-center md:items-start">
                  <img
                    src="/img/full_bigsei_fontblue.png"
                    alt="BIGSEI Logo"
                    className="h-[50px] w-[100px]"
                  />
                </div>

                {/* Texto */}
                <div className="flex flex-col text-center md:text-left mt-5">
                  <p className="text-sm text-gray-400">
                    © 2025 Bigsei. Todos los derechos reservados.
                  </p>
                </div>

                {/* Redes sociales */}
                <div className="flex gap-4 justify-center items-end">
                  {[
                    { icon: <FaFacebook />, color: "bg-blue-600" },
                    { icon: <FaTwitter />, color: "bg-blue-400" },
                    { icon: <FaInstagram />, color: "bg-pink-500" },
                    { icon: <FaLinkedin />, color: "bg-blue-800" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 flex justify-center items-center rounded-full text-white text-sm cursor-pointer transition-transform transform hover:scale-110 shadow-lg ${item.color}`}
                    >
                      {item.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

