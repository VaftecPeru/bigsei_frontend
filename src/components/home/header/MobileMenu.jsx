import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api_Global_Setup } from "../../../services/SetupApi";
import { Api_Global_Auth } from "../../../services/AuthApi";
import apiClient from "../../../Utils/apiClient";
import Cookies from 'js-cookie';
import AlertModal from "@/components/bigsei/AlertModal.jsx";

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen, menuItems, user }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [openItems, setOpenItems] = useState({})
    const [selectedSubject, setSelectedSubject] = useState(null)
    const navigate = useNavigate();

    const nombreUsuario = Cookies.get('nombre');

    const gotoWebsite = () => {
        navigate(`/`);
        window.location.reload();
    };

    const gotoIntranet = (url) => {
        navigate(`${url}`);
        window.location.reload();
    };

    const toggleItem = (index) => {
        setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }))
    }

    const handleAlertClose = () => {
        setIsAlertOpen(false);
    };

    const handleCerrarSesion = () => {
        apiClient.post(Api_Global_Auth.sessions.logout())
            .then((response) => {
                Cookies.remove("token");
                Cookies.remove("nombre");
                Cookies.remove("idUser");
                setIsAlertOpen(false);
                gotoWebsite();
            })
            .catch((error) => {
                Cookies.remove("token");
                Cookies.remove("nombre");
                Cookies.remove("idUser");
                setIsAlertOpen(false);
                gotoWebsite();
            });
    };

    const handleIntranet = () => {
        apiClient.get(Api_Global_Setup.userModulos.listar())
            .then((response) => {
                if(response.data.length > 0) {
                    gotoIntranet(response.data[0].url);
                }
            })
            .catch((error) => {
            });
    };

    return (
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="xl:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">

                {/* Encabezado con Logo y Botón Cerrar */}
                <div className="flex items-center justify-between">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        {/* Imagen para modo claro */}
                        <img src="/img/full_bigsei_fontblue.png" className="block dark:hidden h-12 w-auto cursor-default" alt="Logo" />
                        {/* Imagen para modo oscuro */}
                        <img src="/img/6.png" className="hidden dark:block h-12 w-auto cursor-default" alt="Logo Dark" />
                    </Link>

                    {/* Botón para cerrar el menú */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="size-7 hover:scale-110 transition-all duration-200" aria-hidden="true" />
                    </button>
                </div>

                {/* Contenido del Menú */}
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">

                            {/* Si un subject ha sido seleccionado, mostrar los topics */}
                            {selectedSubject ? (
                                <div>
                                    <button
                                        onClick={() => setSelectedSubject(null)}
                                        className="bg-[#ebebeb] flex justify-between items-center w-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-300 rounded-sm"
                                    >
                                        ← Volver a Subjects
                                    </button>
                                    <h3 className="text-lg font-bold mb-2">{selectedSubject.text}</h3>
                                    <ul className="space-y-2">
                                        {selectedSubject.topics.map((topic, i) => (
                                            <li key={i}>
                                                <Link to={topic.link} className="block text-gray-700 hover:text-blue-500">
                                                    {topic.topic_title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                /* Generando los elementos del menú dinámicamente */
                                menuItems.map((item, index) => (
                                    <div key={index}>
                                        {/* Si el item tiene un link directo */}
                                        {item.link ? (
                                            <Link
                                                to={item.link}
                                                className="bg-[#ebebeb] block rounded-sm px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-300"
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <div>
                                                <button
                                                    onClick={() => toggleItem(index)}
                                                    className="bg-[#ebebeb] flex justify-between items-center w-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-300 rounded-sm"
                                                >
                                                    {item.title}
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                        className={`size-6 transition-transform ${openItems[index] ? "rotate-180" : "rotate-0"}`}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>

                                                {/* Si tiene Subjects */}
                                                {openItems[index] && item.subjects && (
                                                    <ul className="pl-4 mt-2 space-y-1">
                                                        {item.subjects.items.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <button
                                                                    onClick={() => setSelectedSubject(subItem)}
                                                                    className="block text-gray-700 hover:text-blue-500 w-full text-left"
                                                                >
                                                                    {subItem.text}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Si tiene Featured Courses */}
                                                {openItems[index] && item.featured && (
                                                    <div className="pl-4 mt-4">
                                                        <h3 className="text-lg font-bold mb-2">{item.featured.subtitle}</h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {item.featured.items.map((course, i) => (
                                                                <Link
                                                                    key={i}
                                                                    to={course.link}
                                                                    className="block bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                                                >
                                                                    <img
                                                                        src={course.image}
                                                                        alt={course.title}
                                                                        className="w-full h-24 object-cover"
                                                                    />
                                                                    <div className="p-3">
                                                                        <p className="text-sm text-gray-500">{course.category}</p>
                                                                        <h4 className="text-md font-semibold">{course.title}</h4>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Si tiene subcategorías */}
                                                {openItems[index] && item.subcategories && (
                                                    <ul className="pl-4 mt-2 space-y-1">
                                                        {item.subcategories.map((subcategory, subIndex) => (
                                                            <li key={subIndex}>
                                                                <h4 className="text-gray-700 font-medium">{subcategory.category}</h4>
                                                                <ul className="pl-2 mt-1 space-y-1">
                                                                    {subcategory.items.map((subItem, subSubIndex) => (
                                                                        <li key={subSubIndex}>
                                                                            <Link to={subItem.link} className="block text-gray-700 hover:text-blue-500">
                                                                                {subItem.text}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Sección de Login */}
                        <div className="py-6">
                            {/* <Link
                                to="/registro"
                                className="-mx-3 block rounded px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-300"
                            >
                                Registro
                            </Link> */}
                            {user || nombreUsuario ? (
                                <div>
                                    <button
                                        className="flex items-center w-36 justify-center gap-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#C9002B] to-[#00264A] hover:bg-fuchsia-700 transition-all px-4 py-2 min-w-[120px] whitespace-nowrap mb-2"
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
                            ) : (
                                <Link
                                    to="/Login"
                                    className="-mx-3 block rounded px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-300"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>

                        <AlertModal
                            isOpen={isAlertOpen}
                            onClose={handleAlertClose}
                            actionType="logout"
                            onConfirm={handleCerrarSesion}
                        />

                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    )
}

export default MobileMenu
