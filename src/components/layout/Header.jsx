import { useEffect, useState } from "react"
import {
  Bars3Icon,
} from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import MenuItem from "../home/header/MenuItem"
import MenuContent from "../home/header/MenuContent"
import MobileMenu from "../home/header/MobileMenu"
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { FutureLearnForm } from "../ux/ModalMaestria"
import { Api_Global_Setup } from "../../services/SetupApi";
import { Api_Global_Auth } from "../../services/AuthApi";
import apiClient from "../../Utils/apiClient";
import Cookies from 'js-cookie';
import AlertModal from "@/components/bigsei/AlertModal.jsx";



const menuItemsData = [
  {
    title: "Temas",
    link: "/temas",
  },
  {
    title: "Cursos",
    link: "/Cursos",
  },
  {
    title: "Grados",
    link: "/web/grados",
  },
  {
    title: "Empresa",
    link: "/empresa",
  },
  {
    title: "Marketplace",
    link: "/marketplace",
  },
  {
    title: "Eventos",
    link: "/eventos-online",
  },

];

const menuItemsDataLogin = [
  {
    title: "Temas",
    link: "/temas",
  },
  {
    title: "Cursos",
    link: "/Cursos",
  },
  {
    title: "Grados",
    link: "/web/grados",
  },

  {
    title: "Empresa",
    link: "/empresa",
  },
  {
    title: "Marketplace",
    link: "/marketplace",
  },
  {
    title: "Aprendizaje",
    link: "/web/aprendizaje",
  },
];

const Header = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)
  const [openSearch, setOpenSearch] = useState(false)
  const [isActive, setIsActive] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const nombreUsuario = Cookies.get('nombre');

  const navigate = useNavigate();
  const gotoWebsite = () => {
    navigate(`/`);
    window.location.reload();
  };

  const gotoIntranet = (url) => {
    navigate(`${url}`);
    window.location.reload();
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleUserData = () => {
    if (Cookies.get('nombre') == null) {
      apiClient.get(Api_Global_Setup.userLogin.mostrar())
        .then((response) => {
          setUser(response.data);
          setMenuItems(menuItemsDataLogin);
        })
        .catch((error) => {
        });
    } else {
      setMenuItems(menuItemsDataLogin);
    }
  };

  const handleCerrarSesion = () => {
    if (Cookies.get('nombre') == null) {
      apiClient.post(Api_Global_Auth.sessions.logout())
        .then((response) => {
          Cookies.remove('token');
          Cookies.remove('nombre');
          Cookies.remove("idUser");
          setIsAlertOpen(false);
          gotoWebsite();
        })
        .catch((error) => {
          Cookies.remove('token');
          Cookies.remove('nombre');
          Cookies.remove("idUser");
          setIsAlertOpen(false);
          gotoWebsite();
        });
    } else {
      Cookies.remove('token');
      Cookies.remove('nombre');
      Cookies.remove("idUser");
      setIsAlertOpen(false);
      gotoWebsite();
    }
  };

  const handleIntranet = () => {
    apiClient.get(Api_Global_Setup.userModulos.listar())
      .then((response) => {
        if (response.data.length > 0) {
          gotoIntranet(response.data[0].url);
        } else {
          alert("No se encontraron módulos disponibles para este usuario.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener módulos:", error);
        const mensaje = error?.response?.data?.error || error.message || "Error desconocido";
        alert("Ocurrió un error al obtener los módulos: " + mensaje);
      });
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu") && !event.target.closest(".dropdown-card")) {
        setOpenItem(null)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, []);

  useEffect(() => {
    setMenuItems(menuItemsData);
    handleUserData();
  }, []);


  return (
    <header className="border-b-2 w-screen bg-white dark:bg-[#00264A] dark:border-white relative h-full overflow-x-hidden">

      {/* Menú desplegable hacia arriba: Buscador */}
      <div
        className={`block xl:hidden left-0 top-0 w-full bg-gradient-to-r from-[#6590b9] via-[#115697] to-[#C9002B] dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-50
          ${openSearch ? "opacity-100 scale-100 translate-y-0 max-h-[200px]" : "opacity-0 scale-100 -translate-y-full max-h-0"}
        `}
      >
        <form className="max-w-md mx-auto p-5">
          <label htmlFor="search-overlay" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Buscar en BigSei
          </label>
          <div className="relative">
            {/* Icono de búsqueda dentro del input */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>

            {/* Campo de búsqueda */}
            <input
              type="search" id="search-overlay"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-800 dark:focus:border-blue-800"
              placeholder="Explora BigSei..."
              required
            />

            {/* Botón de búsqueda */}
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 transition-colors bg-blue-700 hover:bg-[#662936] 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      <nav aria-label="Global" className="mx-auto flex items-center justify-between px-8 gap-4 h-full w-full">

        {/* Logo */}
        <div className="flex flex-none p-1.5">
          <Link to="/" className="p-2 flex items-center">
            <span className="sr-only">Your Company</span>
            <img
              alt="Image logo"
              src="/img/full_bigsei_fontblue.png"
              className="block dark:hidden w-auto h-auto max-w-[100px] sm:max-w-[150px] min-w-[80px]"
            />
            <img
              alt="Image logo dark"
              src="/img/6.png"
              className="hidden dark:block w-auto h-auto max-w-[100px] sm:max-w-[150px] min-w-[80px]"
            />
          </Link>
        </div>

        {/* Menú Principal */}
        <div className="hidden xl:flex h-full ">
          {menuItems.map((item, index) => (
            <div key={index} className="relative dropdown-menu h-full flex-grow flex">
              <MenuItem
                item={item}
                isOpen={openItem === index}
                onToggle={() => setOpenItem(openItem === index ? null : index)}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Para móviles (se oculta en xl) */}
          <button
            type="submit"
            className="search-button 2xl:hidden text-white transition-colors bg-blue-700 hover:bg-[#662936] 
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-2.5 dark:bg-blue-600 
            dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            onClick={() => setOpenSearch(!openSearch)}
          >
            <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </button>
          {/* Para computadoras solo visible en `xl` */}
          <div className="hidden 2xl:flex 2xl:flex-1 2xl:justify-end">
            <form className="max-w-md mx-auto">
              <div className="hidden lg:flex lg:flex-1 lg:justify-center mx-4">
                <div className="  w-[230px] relative">
                  <input
                    type="text"
                    placeholder="Buscar Cursos "
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                  />
                  <button className="absolute right-0 top-0 h-full bg-[#C9002B] text-white px-4 rounded hover:bg-[#00264A]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

            </form>
          </div>

          {/* Notificaciones */}


          {/* Menú Principal MOVIL */}
          <div className="flex xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-gray-100 text-[#00264A]"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>

        {/* Botón para iniciar sesión */}
        <div className="hidden xl:flex xl:flex-col xl:items-center xl:space-y-2">
          {/* <Link
            to={"/registro"}
            className="flex items-center w-36 justify-center gap-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#C9002B] to-[#00264A] hover:bg-fuchsia-700 transition-all px-4 py-2 min-w-[120px]"
          >
            <FaUserPlus className="text-md" />
            Registrate
          </Link> */}

          {/* <Link
            to="/login"
            className="flex items-center w-36 justify-center gap-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#C9002B] to-[#00264A] hover:bg-fuchsia-700 transition-all px-4 py-2 min-w-[120px] whitespace-nowrap"
          >
            <FaSignInAlt className="text-md" />
            Iniciar sesión
          </Link> */}
          {user ? (
            // Caso 1: Usuario autenticado
            <div className="flex flex-row gap-4">
              <button
                className="flex items-center justify-center gap-2 rounded-lg text-xl font-bold text-[#00264A] hover:text-[#C9002B] transition-all px-4 py-2 min-w-[120px] whitespace-nowrap bg-transparent border-none"
                onClick={handleIntranet}
              >
                <span>Intranet</span>
              </button>

              <button
                className="flex items-center w-36 justify-center gap-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#C9002B] to-[#00264A] hover:bg-fuchsia-700 transition-all px-4 py-2 min-w-[120px] whitespace-nowrap"
                onClick={() => setIsAlertOpen(true)}
              >
                <span>Cerrar sesión</span>
              </button>
            </div>

          ) : nombreUsuario ? (
            // Caso 2: Solo hay nombre guardado (parcialmente autenticado o sesión persistente)
            <div className="relative">
              {/* Botón de usuario */}
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-full px-2 py-1 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#C9002B] to-[#00264A] flex items-center justify-center text-white font-semibold text-lg">
                  {nombreUsuario?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-800 hidden md:inline">{nombreUsuario}</span>
                <svg
                  className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Menú desplegable */}
              {isUserMenuOpen && (
                <div className="fixed right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                  {/* Perfil */}
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-900">{user?.nombre ? user.nombre : nombreUsuario}</p>
                    <p className="text-xs text-gray-500">Usuario registrado</p>
                  </div>

                  {/* Opciones */}
                  <div className="py-1">
                    <button
                      onClick={handleIntranet}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m11 10h-4m0 0l2 2m-2-2l2-2" />
                      </svg>
                      Intranet
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsAlertOpen(true);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m6 6l-6-6 6-6" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

          ) : (
            // Caso 3: No hay sesión activa
            <Link
              to="/login"
              className="flex items-center w-36 justify-center gap-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#C9002B] to-[#00264A] hover:bg-fuchsia-700 transition-all px-4 py-2 min-w-[120px] whitespace-nowrap"
            >
              <FaSignInAlt className="text-md" />
              Iniciar sesión
            </Link>
          )}

        </div>
      </nav>

      {/* Menú desplegable hacia abajo*/}
      {openItem !== null && (
        <div
          className={`hidden lg:flex p-5 left-0 top-full w-full text-gray-800 bg-[#eaf2fa] dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out overflow-hidden dropdown-card
            ${openItem !== null ? "opacity-100 max-h-[500px] scale-100" : "opacity-0 max-h-0 scale-95"}
          `}
        >
          <MenuContent item={menuItems[openItem]} />
        </div>
      )}

      {/* Menú lateral movil */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        menuItems={menuItems}
        user={user}
      >
      </MobileMenu>
      {isActive && (
        <FutureLearnForm
          isActive={isActive}
          setIsActive={setIsActive}
        />
      )}

      <AlertModal
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
        actionType="logout"
        onConfirm={handleCerrarSesion}
      />
    </header>
  )
}

export default Header;