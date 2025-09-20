import { Outlet, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";
import { Api_Global_Setup } from "../../services/SetupApi";
import { rutaApi } from "../../Utils/Utils";
import MyCourseCard from "./components/MyCourseCard";

export default function Introduccion() {
    const location = useLocation();
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        if (location.pathname === "/web/aprendizaje/curso") {
            setShowSelect(true);
        } else {
            setShowSelect(false);
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <main className="max-w-7xl mx-auto">
                {/* Título y Nav */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu aprendizaje</h1>
                    <div className="flex justify-center items-center h-[38px]">
                        <div className="flex space-x-16 text-md items-center">
                            <Link
                                to="/web/aprendizaje/curso"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 transition-all duration-300"
                                        : "text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 pb-1 transition-all duration-300"
                                }
                            >
                                Cursos
                            </Link>
                            <Link
                                to="/web/aprendizaje/lista-de-deseos"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 transition-all duration-300"
                                        : "text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 pb-1 transition-all duration-300"
                                }
                            >
                                Lista de deseos
                            </Link>
                            <Link
                                to="/web/aprendizaje/recomendaciones"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 transition-all duration-300"
                                        : "text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 pb-1 transition-all duration-300"
                                }
                            >
                                Recomendaciones
                            </Link>
                            <Link
                                to="/web/aprendizaje/logros"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 transition-all duration-300"
                                        : "text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 pb-1 transition-all duration-300"
                                }
                            >
                                Logros
                            </Link>

                            {/* Contenedor con ancho fijo para el select */}
                            <div className="w-40"> {/* Ancho fijo para el contenedor */}
                                {showSelect && (
                                    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="Todos">Todos</option>
                                        <option value="En curso">En curso</option>
                                        <option value="Por empezar">Por empezar</option>
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Renderiza las rutas hijas */}
                <Outlet />
            </main>
        </div>
    );
}

export const CourseCard = ({ id_periodocurso, image, university, description, link, course, status }) => {
    // console.log("Recibo en CourseCard:", { id_periodocurso, image, university, description, link, course, status });
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/detalles-curso"); 
    };
    const [isHovered, setIsHovered] = useState(false);

    const goToPago = () => {
        // navigate("/detalles-curso"); 
        navigate('/logingoogle/'+id_periodocurso);
    };

    return (
        <div
            className="w-[250px] h-[600px] rounded-lg overflow-hidden shadow-lg bg-white flex flex-col hover:bg-gray-100 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Contenedor de la imagen con texto superpuesto */}
            <div className="relative">
                <img className="w-full h-32 object-cover" src={image} alt={university} />
                {/* Texto superpuesto */}
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                    {status}
                </div>
            </div>

            {/* Contenido de la card */}
            <div className="px-4 py-4 flex-1">
                {/* Nombre de la universidad */}
                <div className="text-sm text-gray-500 mb-2">{university}</div>
                <div className="font-bold text-xl mb-2">{course}</div>

                {/* Descripción del curso */}
                <p className="text-gray-700 text-sm">{description}</p>
                <div className="flex mt-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-merge"><path d="m8 6 4-4 4 4" /><path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" /><path d="m20 22-5-5" /></svg>
                    <p className="ml-2 text-gray-700 text-sm">Incluido en Unlimited</p>
                </div>
            </div>

            {isHovered && (
                <div className="flex justify-center">
                    <button className="bg-blue-900 text-white px-8 py-2 rounded-md w-40 hover:bg-blue-500" onClick={handleClick} >
                        Ir al curso
                    </button>
                </div>
            )}

            {/* Botones de acción (pegados al fondo) */}
            <div className="px-8 py-4">
                <div className="flex flex-col items-center">
                    <button className="text-blue-900 px-4 py-2 mb-2 border border-blue-900 rounded-md hover:bg-blue-900 hover:text-white w-48"
                    onClick={() => goToPago()} >
                        Comprar este curso
                    </button>
                    <button className="text-blue-900 px-4 py-2 mb-2 rounded-md hover:bg-blue-900 hover:text-white w-48">
                        Abandonar el curso
                    </button>
                </div>
            </div>
        </div>
    );
};

export function Cursos() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState("");

    const baseURL = "http://intranet.bigsei.com/public/api";
    const getImageUrl = (endpoint) => `${baseURL}${endpoint}`;

    const getCursos = async () => {
        setLoading(true);
        setError(null);
        //setDebugInfo("Obteniendo cursos...");
        try {
            const response = await apiClient.get(Api_Global_Web.matriculas.listarCursoLibres("", ""));
            console.log("Respuesta completa de la API (Cursos):", response.data);
            console.log("Datos de cursos:", response.data.data);

            const allowedCourses = [
                "Ciencia y Tecnología",
                "Ed. Religiosa",
                "Geometría",
                "Ingles"
            ];
            const seenCourses = new Set();
            const filteredData = response.data.data
                .filter((item) => allowedCourses.includes(item.curso_nombre))
                .filter((item) => {
                    if (seenCourses.has(item.curso_nombre)) {
                        console.log(`Duplicado detectado: ${item.curso_nombre}`);
                        return false;
                    }
                    seenCourses.add(item.curso_nombre);
                    return true;
                })
                .map((item, index) => {
                    const imageUrl = item.id_archivo
                        ? getImageUrl(Api_Global_Setup.archivos.visualizarImagen(item.id_archivo))
                        : "https://picsum.photos/250/150";
                    console.log(
                        `Curso ${index + 1} - Nombre: ${item.curso_nombre || "Sin nombre"}, ` +
                        `id_archivo: ${item.id_archivo || "No presente"}, ` +
                        `URL: ${imageUrl}`
                    );
                    return {
                        id_periodocurso: item.id_periodocurso || `curso_${index}`,
                        image: imageUrl,
                        university: item.empresa_razon_social || "Sin universidad",
                        description: item.detalle || "Sin descripción",
                        name: item.curso_nombre || "Sin nombre",
                        link: "#",
                        status: item.status || "Abierto",
                    };
                });

            setCursos(filteredData);
            //setDebugInfo(`Cursos cargados: ${filteredData.length} (Ciencia y Tecnología, Ed. Religiosa, Geometría, Inglés)`);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
            setError("No se pudieron cargar los cursos. Por favor, intenta de nuevo.");
            setDebugInfo(`Error: ${error.message}`);
            setCursos([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        getCursos();
    }, []);

    return (
        <div className="flex justify-center w-full px-4">
            <div className="grid grid-cols-4 gap-4 p-4 overflow-x-auto">
                <div className="col-span-4 text-center mb-4">
                    <p className="text-gray-600">{debugInfo}</p>
                </div>
                {loading ? (
                    <div className="col-span-4 text-center">
                        <p className="text-gray-600">Cargando cursos...</p>
                    </div>
                ) : error ? (
                    <div className="col-span-4 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : cursos.length ? (
                    cursos.map((course, index) => (
                        <div key={index} className="w-[250px]">
                            <MyCourseCard course={course} />
                        </div>
                    ))
                ) : (
                    <div className="w-[250px] h-[600px] rounded-lg overflow-hidden shadow-lg bg-white flex flex-col hover:bg-gray-100 transition-colors">
                        <div className="relative">
                            <br />
                            <br />
                            <br />
                            <div className="font-bold text-xl mb-2" style={{ textAlign: "center" }}>
                                Todavía no está suscrito a ningún curso.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function ListaDeDeseos() {
    const wishlistCourses = [
        {
            image: "https://imgs.search.brave.com/_ytijteoV9tyxzzRvPbhprY4gf2e0yPxW9NSpPwfLhg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3Vyc29zZmVteGEu/ZXMvbWVkaWEvazIv/aXRlbXMvY2FjaGUv/OTNhYmM5NTFjOWIx/MTkzNmFjMzQ3MjVi/MjA1MjY1YzVfUy53/ZWJw",
            name: "Ética empresarial: análisis del Big Data y la evasión fiscal",
            university: "Universidad de Leeds",
            description: "Descubra por qué el big data y la evasión fiscal son algunos de los mayores problemas éticos que enfrentan las empresas hoy en día y cómo pueden abordarse.",
            link: "#",
            status: "Acceso expiró el 22 de marzo a las 12:55 (-05)",
        },
        {
            image: "https://imgs.search.brave.com/ZGx6jMgIJuc0dMeN2R7MKxp1kngM6Z0yzCgFUmg39QQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmNvbXBhcmFzb2Z0/d2FyZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDYv/ZnVuZGFtZW50b3Mt/ZGUtYWRtaW5pc3Ry/YWNpb24tZGUtcHJv/eWVjdG9zLTEtMTAy/NHg1NzYucG5n",
            name: "Fundamentos de la gestión de proyectos",
            university: "Universidad de Coventry",
            description: "Explore los aspectos fundamentales de la gestión de proyectos y desarrolle su comprensión de los ciclos de vida de los proyectos tradicionales.",
            link: "#",
            status: "Quedan 22 horas",
        },
        {
            image: "https://imgs.search.brave.com/W93MjI-AktpYnQJVkdMqnQ-imPjugHkpCQzaiZik_vA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXRh/bS5rYXNwZXJza3ku/Y29tL2NvbnRlbnQv/ZXMtbXgvaW1hZ2Vz/L3JlcG9zaXRvcnkv/aXNjLzIwMjAvY3li/ZXItc2VjdXJpdHkt/YXJ0aWNsZS5qcGc",
            name: "Introducción a la ciberseguridad",
            university: "La Universidad Abierta",
            description: "Aprenda los conceptos básicos de la seguridad cibernética y desarrolle sus habilidades para proteger mejor su información digital de las amenazas a la seguridad.",
            link: "#",
            status: "Quedan 3 días",
        },
    ];

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl">
                {wishlistCourses.map((course, index) => (
                    <CourseCard
                        key={index}
                        id_periodocurso={index}
                        image={course.image}
                        university={course.university}
                        description={course.description}
                        course={course.name}
                        link={course.link}
                        status={course.status}
                    />
                ))}
            </div>
        </div>
    );
}

export const Course = ({ image, university, description, link, name }) => {

    return (
        <div
            className="w-[250px] h-[450px] rounded-lg overflow-hidden shadow-lg bg-white flex flex-col hover:bg-gray-100 transition-colors"
        >
            {/* Contenedor de la imagen con texto superpuesto */}
            <div className="relative">
                <img className="w-full h-32 object-cover" src={image} alt={university} />
            </div>

            {/* Contenido de la card */}
            <div className="px-4 py-4 flex-1">
                {/* Nombre de la universidad */}
                <div className="text-xs text-gray-500 mb-2">{university}</div>
                <div className="font-bold text-sm mb-2">{name}</div>

                {/* Descripción del curso */}
                <p className="text-gray-700 text-xs">{description}</p>
                <div className="flex mt-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-merge"><path d="m8 6 4-4 4 4" /><path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" /><path d="m20 22-5-5" /></svg>
                    <p className="ml-2 text-gray-700 text-sm">Incluido en Unlimited</p>
                </div>
            </div>

            {/* Botones de acción (pegados al fondo) */}
            <div className="px-8 py-4">
                <div className="flex flex-col items-center">
                    <button className="text-white px-4 py-2 mb-2 border bg-blue-900 border-blue-900 rounded-md hover:bg-blue-500 hover:text-white w-48">
                        Descubra más
                    </button>
                </div>
            </div>
        </div>
    );
};

const NavigationButton = ({ onClick, disabled, direction }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="p-2 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="blue"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'prev' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
    </button>
);

const CourseList = ({ courses, startIndex, coursesPerPage }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl">
        {courses.slice(startIndex, startIndex + coursesPerPage).map((course, index) => (
            <Course
                key={index}
                image={course.image}
                university={course.university}
                description={course.description}
                name={course.name}
                link={course.link}
            />
        ))}
    </div>
);

export function Recomendaciones() {
    const [startIndexRecomendados, setStartIndexRecomendados] = useState(0);
    const [startIndexNegocios, setStartIndexNegocios] = useState(0);
    const coursesPerPage = 4;

    const coursesRecommended = [
        {
            image: "https://imgs.search.brave.com/_ytijteoV9tyxzzRvPbhprY4gf2e0yPxW9NSpPwfLhg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3Vyc29zZmVteGEu/ZXMvbWVkaWEvazIv/aXRlbXMvY2FjaGUv/OTNhYmM5NTFjOWIx/MTkzNmFjMzQ3MjVi/MjA1MjY1YzVfUy53/ZWJw",
            name: "Ética empresarial: análisis del Big Data y la evasión fiscal",
            university: "Universidad de Leeds",
            description: "Descubra por qué el big data y la evasión fiscal son algunos de los mayores problemas éticos que enfrentan las empresas hoy en día y cómo pueden abordarse.",
            link: "#",
            status: "Acceso expiró el 22 de marzo a las 12:55 (-05)",
        },
        {
            image: "https://imgs.search.brave.com/ZGx6jMgIJuc0dMeN2R7MKxp1kngM6Z0yzCgFUmg39QQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmNvbXBhcmFzb2Z0/d2FyZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDYv/ZnVuZGFtZW50b3Mt/ZGUtYWRtaW5pc3Ry/YWNpb24tZGUtcHJv/eWVjdG9zLTEtMTAy/NHg1NzYucG5n",
            name: "Fundamentos de la gestión de proyectos",
            university: "Universidad de Coventry",
            description: "Explore los aspectos fundamentales de la gestión de proyectos y desarrolle su comprensión de los ciclos de vida de los proyectos tradicionales.",
            link: "#",
            status: "Quedan 22 horas",
        },
        {
            image: "https://imgs.search.brave.com/W93MjI-AktpYnQJVkdMqnQ-imPjugHkpCQzaiZik_vA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXRh/bS5rYXNwZXJza3ku/Y29tL2NvbnRlbnQv/ZXMtbXgvaW1hZ2Vz/L3JlcG9zaXRvcnkv/aXNjLzIwMjAvY3li/ZXItc2VjdXJpdHkt/YXJ0aWNsZS5qcGc",
            name: "Introducción a la ciberseguridad",
            university: "La Universidad Abierta",
            description: "Aprenda los conceptos básicos de la seguridad cibernética y desarrolle sus habilidades para proteger mejor su información digital de las amenazas a la seguridad.",
            link: "#",
            status: "Quedan 3 días",
        },
        {
            image: "https://imgs.search.brave.com/tlvYh4-_S8ZLH6FNiByZMfOUEQg7g6x8ILaB_yEVLvo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcm9k/LWRpc2NvdmVyeS5l/ZHgtY2RuLm9yZy9j/ZG4tY2dpL2ltYWdl/L3dpZHRoPTM3OCxo/ZWlnaHQ9YXV0byxx/dWFsaXR5PTg1LGZv/cm1hdD13ZWJwL21l/ZGlhL2NvdXJzZS9p/bWFnZS8xNjQ0YWNj/Ni1jYTVjLTRhY2Et/YmJmYi1jODI4Mzc1/ODgwZGItNzMwYjgw/NzdjOTI1LmpwZWc",
            name: "Protección de adultos: capacitación de nivel 3",
            university: "Servicio Nacional de Salud de Inglaterra",
            description: "Aprenda cómo garantizar la protección exitosa de los adultos con este curso de capacitación a pedido de Health Education England.",
            link: "#",
            status: "Acceso expiró el 15 de marzo a las 16:32 (-05)",
        },
        {
            image: "https://imgs.search.brave.com/qXWYWz-WKz2FquU6atxzknP6DWRsBhh0azZgeA8249M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY29udGVudHN0/YWNrLmlvL3YzL2Fz/c2V0cy9ibHRmZmEx/M2E5NTk0OTUxZDQ3/L2JsdDdkOTdkOTRj/ZTAzNzY1OWIvNjQ0/YzIxMjhiYzY0MGUx/MTU3YzMwNzlkL3Zv/Y2FidWxhcmlvLWVu/LWluZ2xlcy5qcGc_/YXV0bz13ZWJwJmZv/cm1hdD1wanBnJnF1/YWxpdHk9ODAmd2lk/dGg9NjQwJmhlaWdo/dD02NDAmZml0PWNy/b3AmY3JvcD02NDA6/NDgwLHNtYXJ0",
            name: "Enseñanza de inglés en línea",
            university: "Prensa y evaluación de la Universidad de Cambridge",
            description: "Aprenda a transferir sus habilidades de enseñanza a un contexto en línea y tecnológico.",
            link: "#",
            status: "Quedan 5 días",
        },
    ];

    const coursesNegocios = [
        {
            image: "https://imgs.search.brave.com/_ytijteoV9tyxzzRvPbhprY4gf2e0yPxW9NSpPwfLhg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3Vyc29zZmVteGEu/ZXMvbWVkaWEvazIv/aXRlbXMvY2FjaGUv/OTNhYmM5NTFjOWIx/MTkzNmFjMzQ3MjVi/MjA1MjY1YzVfUy53/ZWJw",
            name: "Ética empresarial: análisis del Big Data y la evasión fiscal",
            university: "Universidad de Leeds",
            description: "Descubra por qué el big data y la evasión fiscal son algunos de los mayores problemas éticos que enfrentan las empresas hoy en día y cómo pueden abordarse.",
            link: "#",
            status: "Acceso expiró el 22 de marzo a las 12:55 (-05)",
        },
        {
            image: "https://imgs.search.brave.com/ZGx6jMgIJuc0dMeN2R7MKxp1kngM6Z0yzCgFUmg39QQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmNvbXBhcmFzb2Z0/d2FyZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDYv/ZnVuZGFtZW50b3Mt/ZGUtYWRtaW5pc3Ry/YWNpb24tZGUtcHJv/eWVjdG9zLTEtMTAy/NHg1NzYucG5n",
            name: "Fundamentos de la gestión de proyectos",
            university: "Universidad de Coventry",
            description: "Explore los aspectos fundamentales de la gestión de proyectos y desarrolle su comprensión de los ciclos de vida de los proyectos tradicionales.",
            link: "#",
            status: "Quedan 22 horas",
        },
        {
            image: "https://imgs.search.brave.com/W93MjI-AktpYnQJVkdMqnQ-imPjugHkpCQzaiZik_vA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXRh/bS5rYXNwZXJza3ku/Y29tL2NvbnRlbnQv/ZXMtbXgvaW1hZ2Vz/L3JlcG9zaXRvcnkv/aXNjLzIwMjAvY3li/ZXItc2VjdXJpdHkt/YXJ0aWNsZS5qcGc",
            name: "Introducción a la ciberseguridad",
            university: "La Universidad Abierta",
            description: "Aprenda los conceptos básicos de la seguridad cibernética y desarrolle sus habilidades para proteger mejor su información digital de las amenazas a la seguridad.",
            link: "#",
            status: "Quedan 3 días",
        },
        {
            image: "https://imgs.search.brave.com/tlvYh4-_S8ZLH6FNiByZMfOUEQg7g6x8ILaB_yEVLvo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcm9k/LWRpc2NvdmVyeS5l/ZHgtY2RuLm9yZy9j/ZG4tY2dpL2ltYWdl/L3dpZHRoPTM3OCxo/ZWlnaHQ9YXV0byxx/dWFsaXR5PTg1LGZv/cm1hdD13ZWJwL21l/ZGlhL2NvdXJzZS9p/bWFnZS8xNjQ0YWNj/Ni1jYTVjLTRhY2Et/YmJmYi1jODI4Mzc1/ODgwZGItNzMwYjgw/NzdjOTI1LmpwZWc",
            name: "Protección de adultos: capacitación de nivel 3",
            university: "Servicio Nacional de Salud de Inglaterra",
            description: "Aprenda cómo garantizar la protección exitosa de los adultos con este curso de capacitación a pedido de Health Education England.",
            link: "#",
            status: "Acceso expiró el 15 de marzo a las 16:32 (-05)",
        },
        {
            image: "https://imgs.search.brave.com/qXWYWz-WKz2FquU6atxzknP6DWRsBhh0azZgeA8249M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY29udGVudHN0/YWNrLmlvL3YzL2Fz/c2V0cy9ibHRmZmEx/M2E5NTk0OTUxZDQ3/L2JsdDdkOTdkOTRj/ZTAzNzY1OWIvNjQ0/YzIxMjhiYzY0MGUx/MTU3YzMwNzlkL3Zv/Y2FidWxhcmlvLWVu/LWluZ2xlcy5qcGc_/YXV0bz13ZWJwJmZv/cm1hdD1wanBnJnF1/YWxpdHk9ODAmd2lk/dGg9NjQwJmhlaWdo/dD02NDAmZml0PWNy/b3AmY3JvcD02NDA6/NDgwLHNtYXJ0",
            name: "Enseñanza de inglés en línea",
            university: "Prensa y evaluación de la Universidad de Cambridge",
            description: "Aprenda a transferir sus habilidades de enseñanza a un contexto en línea y tecnológico.",
            link: "#",
            status: "Quedan 5 días",
        },
    ];

    const navigate = (setStartIndex, startIndex, courses, direction) => {
        const newIndex = direction === 'next' ? startIndex + coursesPerPage : startIndex - coursesPerPage;
        if (newIndex >= 0 && newIndex < courses.length) {
            setStartIndex(newIndex);
        }
    };

    return (
        <>
            <div>
                <div className="ml-28">
                    <h1 className="font-bold text-lg">Recomendado para ti</h1>
                    <p>Creemos que estos cursos podrían gustarte</p>
                </div>
                <div className="flex justify-center items-center">
                    <NavigationButton
                        onClick={() => navigate(setStartIndexRecomendados, startIndexRecomendados, coursesRecommended, 'prev')}
                        disabled={startIndexRecomendados === 0}
                        direction="prev"
                    />
                    <CourseList courses={coursesRecommended} startIndex={startIndexRecomendados} coursesPerPage={coursesPerPage} />
                    <NavigationButton
                        onClick={() => navigate(setStartIndexRecomendados, startIndexRecomendados, coursesRecommended, 'next')}
                        disabled={startIndexRecomendados + coursesPerPage >= coursesRecommended.length}
                        direction="next"
                    />
                </div>
            </div>
            <div className="ml-28 mt-4">
                <h1 className="font-bold text-lg">Los cursos más populares en <span className="!text-blue-900">Negocios y gestión</span></h1>
            </div>
            <div className="flex justify-center items-center">
                <NavigationButton
                    onClick={() => navigate(setStartIndexNegocios, startIndexNegocios, coursesNegocios, 'prev')}
                    disabled={startIndexNegocios === 0}
                    direction="prev"
                />
                <CourseList courses={coursesNegocios} startIndex={startIndexNegocios} coursesPerPage={coursesPerPage} />
                <NavigationButton
                    onClick={() => navigate(setStartIndexNegocios, startIndexNegocios, coursesNegocios, 'next')}
                    disabled={startIndexNegocios + coursesPerPage >= coursesNegocios.length}
                    direction="next"
                />
            </div>
        </>
    );
}

export function Logros() {
    const sections = [
        {
            title: "Descubra nuestra gama de cursos",
            items: [
                "Cursos en línea",
                "Certificación en línea",
                "Microcredenciales",
                "Campamentos de entrenamiento en línea",
                "Títulos en línea",
                "Másteres en línea",
                "Licenciaturas en línea",
                "Certificados de posgrado en línea",
            ],
        },
        {
            title: "Asignaturas del curso",
            items: [
                "Negocios y gestión",
                "Atención sanitaria y medicina",
                "Enseñanza",
                "Psicología y Salud Mental",
                "TI y Ciencias de la computación",
                "Idioma",
                "Artes creativas y medios",
                "Ciencia, ingeniería y matemáticas",
            ],
        },
        {
            title: "Aprende una nueva habilidad",
            items: [
                "Marketing digital",
                "Análisis de datos",
                "Inteligencia artificial (IA)",
                "Ciencias de datos",
                "Recursos Humanos (RRHH)",
                "Ciberseguridad",
                "Gestión de proyectos",
                "Codificación y programación",
                "Colecciones de cursos",
            ],
        },
        {
            title: "Explora nuestros títulos en línea",
            items: [
                "Títulos de MBA",
                "Licenciaturas en Psicología",
                "Grados en docencia",
                "Grados en informática y ciencias de la computación",
                "Grados en Ciencia de Datos",
                "PGCE",
                "Grados en Ingeniería de Software",
                "Grados en Administración y Dirección de Empresas",
            ],
        },
        {
            title: "Obtenga una maestría en línea",
            items: [
                "Másteres en Psicología",
                "Másteres en Ciencias de la Computación",
                "Másteres en Ciencia de Datos",
                "Másteres en Marketing Digital",
                "Másteres en Salud Pública",
                "Maestrías en Finanzas",
                "Másteres en Economía",
                "Másteres en Inteligencia Artificial (IA)",
            ],
        },
        {
            title: "Obtenga una licenciatura en línea",
            items: [
                "Licenciaturas en Salud",
                "Licenciaturas en Criminología",
                "Licenciaturas en Psicología",
                "Licenciaturas en Contabilidad",
                "Licenciaturas en Economía",
                "Licenciaturas en Finanzas",
                "Licenciaturas en Gestión de Proyectos",
                "Licenciaturas en Negocios y Gestión",
            ],
        },
    ];

    return (
        <div className="px-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificados</h2>
            <p className="text-gray-700">Una vez que haya obtenido un Certificado de Logro o una Declaración de Participación, aparecerá aquí.</p>
            <div className="flex text-sm space-x-16 mt-12">
                {sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                        <h2 className="font-bold">{section.title}</h2>
                        {section.items.map((item, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="block text-gray-700 hover:text-blue-900 hover:underline"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}