import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { id: "inicio", title: "Inicio" },
  { id: "eventos-online", title: "Eventos Online" },
  //{ id: "beneficio", title: "Beneficios" },
  { id: "cronograma", title: "Cronograma" },
  { id: "formulario", title: "Formulario" },
];

export default function Header() {
  const [active, setActive] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    let offsetTop = 0;

    if (id !== "inicio") {
      const el = document.getElementById(id);
      if (el) {
        const headerHeight = document.querySelector("header").offsetHeight;
        offsetTop = el.offsetTop - headerHeight - 10; // pequeña distancia
      }
    }

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let currentActive = "inicio";

      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            currentActive = item.id;
          }
        }
      });

      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white dark:bg-[#00264A] dark:border-white">
      <nav
        role="navigation"
        aria-label="Global"
        className="mx-auto flex items-center justify-between px-6 lg:px-12 h-20 w-full max-w-full"
      >
        {/* Logo */}
        <div className="flex flex-none">
          <Link to="/" className="p-3 flex items-center">
            <span className="sr-only">BIGSEI</span>
            <img
              alt="Logotipo de BIGSEI"
              src="/img/full_bigsei_fontblue.png"
              className="block dark:hidden h-full max-h-14 w-auto object-contain"
            />
            <img
              alt="Logotipo de BIGSEI (modo oscuro)"
              src="/img/6.png"
              className="hidden dark:block h-full max-h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Botón Hamburguesa */}
        <button
          className="xl:hidden p-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Alternar menú"
        >
          <svg
            className="w-6 h-6 text-[#00264A] dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Menú */}
        <div className={`flex gap-2 xl:gap-4 ${isMenuOpen ? "flex flex-col absolute top-20 left-0 w-full bg-white dark:bg-[#00264A] p-4 xl:flex-row xl:static xl:w-auto" : "hidden xl:flex"}`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-5 py-2 text-xs sm:text-sm lg:text-base font-medium transition ${
                active === item.id
                  ? "text-[#C9002B]"
                  : "text-[#00264A] dark:text-white hover:text-[#C9002B]"
              }`}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Botón CTA */}
        <button
          onClick={() => scrollToSection("formulario")}
          className="bg-[#C9002B] text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition hidden xl:block"
        >
          Regístrame
        </button>
      </nav>
    </header>
  );
}
