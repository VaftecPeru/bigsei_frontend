import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Users,
  Settings,
  HelpCircle,
  PanelLeftOpen,
  PanelLeftClose,
  Bell,
  NotebookPen,
  BookMarked,
  BookText,
  Album,
  SettingsIcon,
  School,
  UsersIcon,
  Square,
  SquareUser,
  Flag,
  Clock10,
  Clock10Icon,
  ReceiptText,
  Receipt,
  Landmark,
  Archive,
  Calendar,
  FileText,
  Book,
  NotepadText,
  FolderPlus,
  Laptop,
} from "lucide-react";
import { LogOut } from 'lucide-react'
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NavbarProfileSelection from "./NavbarProfileSelection";
import NavbarNotification from "./NavbarNotification";
import {
  GraduationCap,
  User,
  Building,
  Clock,
  Presentation,
  AlarmClockCheck,
} from "lucide-react";
import {
  AsignaturaIcon,
  AsistenciaIcon,
  ReporteIcon,
  ConfigurationIcon,
  Customer_icon,
} from "./icons.jsx";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Grid2X2,
  ContactRound,
  LucideBriefcaseMedical,
  ChartSpline,
  CalendarDays,
  HeartPulse,
} from "lucide-react";
import AlertModal from "@/components/bigsei/AlertModal.jsx";
import { Api_Global_Setup } from "../../services/SetupApi";
import { Api_Global_Auth } from "../../services/AuthApi";
import apiClient from "../../Utils/apiClient";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ChangeSedeRolModal from "./ChangeSedeRolModal";
import { rutaApi } from "../../Utils/Utils";

const iconItems = {
  "Home": Home,
  "GraduationCap": GraduationCap,
  "SquareUser": SquareUser,
  "Flag": Flag,
  "Customer_icon": Customer_icon,
  "UsersIcon": UsersIcon,
  "School": School,
  "Clock10Icon": Clock10Icon,
  "Archive": Archive,
  "Settings": Settings,
  "Presentation": Presentation,
  "Users": Users,
  "Building": Building,
  "AlarmClockCheck": AlarmClockCheck,
  "Book": Book,
  "NotepadText": NotepadText,
  "FileText": FileText,
  "AsignaturaIcon": AsignaturaIcon,
  "AsistenciaIcon": AsistenciaIcon,
  "ReporteIcon": ReporteIcon,
  "NotebookPen": NotebookPen,
  "BookMarked": BookMarked,
  "BookText": BookText,
  "Album": Album,
  "ReceiptText": ReceiptText,
  "Receipt": Receipt,
  "Landmark": Landmark,
  "Laptop": Laptop,
  "Grid2X2": Grid2X2,
  "CalendarDays": CalendarDays,
  "ContactRound": ContactRound,
  "LucideBriefcaseMedical": LucideBriefcaseMedical,
  "HeartPulse": HeartPulse,
  "FolderPlus": FolderPlus,
  "ChartSpline": ChartSpline,
};

function EnhancedHeader({user}) {
  const { open, setOpen } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const gotToUrl = (data) => {
    if(data) {
      navigate(`${data.url}`);
      window.location.reload();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (data) => {
    setIsOpen(false);
    gotToUrl(data);
  };

  return (
    <>
    {isOpen && (
      <ChangeSedeRolModal
        onClose={(data) => {
          handleCloseModal(data);
        }}
      />
    )}

    <div
      className={`bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-gray-100 shadow-sm w-full

    `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close sidebar" : "Open sidebar"}
          >
            {open ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
        </div>
        {/* <div className="flex items-center">
          {user.razon_social}
        </div> */}

        {/* Right Section */}
        {/*

        https://picsum.photos/100/100
        */}
        <div className="flex items-center gap-6">
          {/* <div className="flex items-center">
            <div>Institución:</div>
            <div>{user.razon_social}</div>
          </div> */}
          <div>
            <p className="text-sm font-medium text-gray-900"> Institución </p>
            <p className="text-xs text-gray-500"> {user.razon_social}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900"> Rol </p>
            <p className="text-xs text-gray-500"> {user.rol_nombre}</p>
          </div>
          {/* Notifications */}
          <div className="relative group">
            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors duration-200 relative">
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 text-xs text-white items-center justify-center">
                  2
                </span>
              </span>
            </button>

            {/* Notification Dropdown Indicator */}
            <div className="hidden group-hover:block absolute top-full right-0 pt-2 transition-opacity duration-200">
              <div className="w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200 absolute right-7 top-1.5" />
            </div>
          </div>

          {/* Settings */}
          <button
            className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors duration-200 group"
            // onClick={() => setIsOpen(!isOpen)}
            onClick={() => handleOpen()}
          >
            <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
          </button>

          {/* User Profile */}
          {/* <button className="relative group">
            <div className="w-9 h-9 rounded-xl ring-2 ring-gray-100 overflow-hidden transition-transform duration-200 transform group-hover:scale-105">
              <img
                src="https://picsum.photos/100/100"
                alt="User profile"
                className="w-full h-full object-content"
              />
            </div>
            <div className="hidden group-hover:block absolute top-full right-0 pt-2 transition-opacity duration-200">
              <div className="w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200 absolute right-3 top-1.5" />
            </div>
          </button> */}
        </div>
      </div>
    </div>
    </>
  );
}

function NavbarContent({user}) {
  const { open, setOpen } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header
      className={`flex h-16 items-center border-b px-4 md:px-0 transition-all duration-300

        ${open
          ? " " +
          //"ml-64" +
          "md:ml-64"
          : "ml-0"
        }`}
    >
      <SidebarTrigger className="mr-2 md:hidden" />

      <EnhancedHeader user={user}></EnhancedHeader>
    </header>
  );
}

function FooterContent() {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-50 to-red-50">
      <div className="container mx-auto px-8 py-16">
        {/* Sección Superior */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Información de Contacto */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Contáctanos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+51 (01) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contacto@bisei.edu.pe</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>
                  Av. Universitaria 1234,
                  <br />
                  Lima, Perú
                </span>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Enlaces Rápidos
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/nosotros"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors"
              >
                Sobre Nosotros
              </Link>
              <Link
                to="/servicios"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300  transition-colors"
              >
                Servicios
              </Link>
              <Link
                to="/carreras"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors"
              >
                Carreras
              </Link>
              <Link
                to="/admisión"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors"
              >
                Admisión
              </Link>
              <Link
                to="/blog"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/contacto"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Sección de Conexión */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Conéctate con Nosotros
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Síguenos en nuestras redes sociales y mantente informado de las
              últimas noticias y actualizaciones.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </button>
              <button className="p-2 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </button>
              <button className="p-2 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </button>
              <button className="p-2 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Universidad Bisei. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              to="/politica-privacidad"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              to="/terminos"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Términos de Servicio
            </Link>
            <Link
              to="/cookies"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Navigation({
    children,
    isAdmin = false,
    isSuperAdmin = false,
    isDocente = false,
    isContador = false,
    isDirector = false,
    isVendedor = false,
    isTutor = false,
    isTopico = false,
    isBibliotecario = false,
    isPadre = false,
  }) {

  const [navItems, setNavItems] = useState([]);

  const [isAlertOpen, setAlertOpen] = useState(false); // Estado para controlar el AlertModal
  const [user, setUser] = useState({
    correo: "",
    nombre: "",
  });

  const openAlertModal = () => {
    setAlertOpen(true);
  };
  const navigate = useNavigate();
  const gotoWebsite = () => {
    navigate(`/`);
  };

  const handleAlertConfirm = async () => {
    try {
      const response = await apiClient.post(Api_Global_Auth.sessions.logout());

      if (response.status === 200) {
        Cookies.remove('token');
        Cookies.remove("nombre");
        Cookies.remove("idUser");
        gotoWebsite();
      } else {
      }
    } catch (error) {
    } finally {
    }
    setAlertOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const listarNavItems = () => {
    apiClient.get(Api_Global_Setup.userModulos.listar())
      .then((response) => {
        const data = response.data.map((item) => {
          if (item.modulos.length > 0) {
            const subItems = item.modulos.map((it) => {
              return ({
                label: it.nombre,
                to: it.url,
              });
            });
            return ({
              icon: iconItems[item.icon],
              label: item.nombre,
              to: item.url,
              to_activo: item.url_activo,
              subItems: subItems,
            });
          } else {
            return ({
              icon: iconItems[item.icon],
              label: item.nombre,
              to: item.url,
              to_activo: item.url_activo,
            });
          }
        });
        setNavItems(data);
      })
      .catch((error) => {
        setNavItems([]);
      });
  };

  const dataUser = () => {
    apiClient.get(Api_Global_Setup.userLogin.mostrar())
      .then((response) => {
        setUser({
          nombre: response.data.nombre,
          correo: response.data.correo,
          id_archivo_foto: response.data.id_archivo_foto,
          razon_social: response.data.razon_social,
          rol_nombre: response.data.rol_nombre,
        });
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    listarNavItems();
    dataUser();
  },[]);

  return (
    <SidebarProvider>
      <div className="flex w-full flex-col">
        <NavbarContent user={user} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar>
            <SidebarHeader className="p-8 items-center">
              <Link to="/">
                <img
                src="/img/6.png"
                alt="Logo"
                width={170}
                className="items-center"
                />
              </Link>
            </SidebarHeader>

            <SidebarContent className="p-4">
              <div className="text-opacity-60 ml-1 mb-1 text-base">Menú</div>
              <SidebarMenu>
                {navItems.map((item, index) => (
                  <SidebarMenuItem key={index} className="mb-2">
                    {item.subItems ? (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="text-base py-2">
                            <item.icon className="mr-4 h-20 w-20" />
                            <span>{item.label}</span>
                            <ChevronDown className="ml-auto h-6 w-6" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mt-2">
                            {item.subItems.map((subItem, subIndex) => (
                              <SidebarMenuSubItem key={subIndex} className="mb-1 ml-4">
                                <SidebarMenuButton className="text-base py-2">
                                  <Link to={subItem.to} className="flex items-center">
                                    {subItem.label}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton asChild className="text-base">
                        <Link
                          to={item.to}
                          className="text-gray-900 bg-transap hover:bg-white-200 transition transtion-all ease duration-400 flex items-center"
                          >
                          <item.icon className="mr-4! h-6 w-6 text-blue" />
                          {item.label}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="py-2 ml-4 flex flex-col pb-2">
                <p className="text-opacity-60 text-base mb-4">Perfil</p>
                <div className="mb-4">
                  <div class="flex items-center">
                    <img className="rounded-full w-10" src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(user.id_archivo_foto))}`} />
                    <div className="ml-3">
                      <p>{user.nombre}</p>
                      <p className="text-opacity-60">{user.correo}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="flex items-center bg-white font-medium text-sidebar-accent-foreground w-full h-8 rounded-lg"
                  onClick={openAlertModal}
                  >
                  <span className="ml-9 mx-4"><LogOut /></span>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 overflow-y-auto bg-[#ddeeff]">
            {children}
            <FooterContent />
          </main>
        </div>

        {/* Integración del AlertModal */}
        <AlertModal
          isOpen={isAlertOpen}
          onClose={handleAlertClose}
          actionType="logout" // Usamos "logout" para el mensaje específico
          onConfirm={handleAlertConfirm}
        />
      </div>
    </SidebarProvider>
  );
}

export default Navigation;