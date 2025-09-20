import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import { AccordionDesign } from "@/components/ux/Accordition/Accordion";
import { EducationalFooter } from "@/components/ui/footer/EducationalFooter";
import { CheckCircle, ChevronLeft, ChevronRight, Clock, Star, Users, User } from "lucide-react";
import FeaturedCourses from "./components/FeaturedCourses";
import { Link } from "react-router-dom";
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";
import { Api_Global_Setup } from "../../services/SetupApi";
import { rutaApi } from "../../Utils/Utils";
import { Loading2Component } from "@/components/ux/skeleton/Loading2Component";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-100"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-100"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const PageCurso = () => {
  const [loading, setLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState({});
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    "Programación y desarrollo web"
  );
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4; // Number of courses to display per page
  
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page when category changes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses[selectedCategory]?.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  ) || [];
  
  // Calculate total pages
  const totalCourses = courses[selectedCategory]?.length || 0;
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} fill="#FFC107" color="#FFC107" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} fill="#FFC107" color="#FFC107" size={16} style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<Star key={i} color="#FFC107" size={16} />);
      }
    }
    
    return stars;
  };

  const handleListarCategorias = () => {
    apiClient.get(Api_Global_Web.matriculas.listarCategoriaCursosLibres())
      .then((response) => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setCategorySelected(response.data[0]);
        }
      })
      .catch((error) => {
        setCategories([]);
      });
  };

  const handleListarCursos = (id_tipocategoria) => {
    setLoading(true);
    apiClient.get(Api_Global_Web.matriculas.listarCursoLibres("", id_tipocategoria))
      .then((response) => {
        setLoading(false);
        setCourses(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setCourses([]);
      });
  };

  useEffect(() => {
    if (categorySelected?.id_tipocategoria) {
      handleListarCursos(categorySelected.id_tipocategoria);
    }
  }, [categorySelected]);

  useEffect(() => {
    handleListarCategorias();
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>

      <div className="mb-12 text-left w-[80%] mx-auto mt-4">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Cursos en línea cortos
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
            Elija entre miles de cursos en línea de las principales universidades y organizaciones especializadas.
            </p>
          </div>
       <FeaturedCourses />
       <main>
      <div className="w-full mx-auto p-4 md:p-8">
        <div className="flex gap-4 py-4 md:py-8 flex-col md:flex-row">
          <div className="w-full md:w-64">
            <h3 className="text-xl font-semibold text-gray-800">
              Categorías
            </h3>
            <ul className="space-y-2 mt-4">
              {categories.map((item) => (
                <li
                  key={item.id_tipocategoria}
                  onClick={() => setCategorySelected(item)}
                  className={`flex items-center hover:underline cursor-pointer ${
                    categorySelected?.id_tipocategoria == item.id_tipocategoria ? "text-blue-600 underline font-semibold" : "text-gray-600"
                  }`}
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  {item.nombre} ({item.cant_cursos})
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <Loading2Component courses={courses} selectedCategory={categorySelected}/>
              ) : courses.length ? (
                courses.map((course, index) => (
                  <div key={course.id_periodocurso} className="bg-white rounded border border-gray-200 overflow-hidden">
                    {course?.id_archivo ? (
                      <img 
                        src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(course.id_archivo))}`}
                        alt={course.curso_nombre} 
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-48 object-cover font-bold text-center pt-16 text-gray-500"
                      >
                        Cargando imagen...
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-gray-600 text-sm mb-1">{course.empresa_razon_social}</div>
                      <h3 className="font-bold text-lg mb-2">{course.curso_nombre}</h3>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex mr-1">
                          {renderStars(course.rating)}
                        </div>
                        <span className="text-gray-700 text-sm">
                          {course.rating} ({course.reviews} reseñas)
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {course.weeks} semanas
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          {course.hoursPerWeek} horas a la semana
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4 text-sm text-gray-600">
                        <CheckCircle size={16} className="mr-1" />
                        Incluido en Unlimited
                      </div>
                      
                      <Link to={`/cursos-detalle/${course.id_periodocurso}`} className="w-full block text-center bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded">
                        Más información
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  Todavía no hay cursos disponibles en esta categoría.
                </p>
              )}
            </div>
            
            {/* Special recommendation card that spans two columns */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-white border border-gray-200 rounded p-6 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 pr-4">
                  <h3 className="text-xl font-bold mb-3">Encuentra el curso adecuado para ti.</h3>
                  <p className="text-gray-600 mb-4">
                    Consulta sus recomendaciones personalizadas basadas en sus intereses y metas.
                  </p>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded">
                    Continuar...
                  </button>
                </div>
                <div className="md:w-1/3 mt-4 md:mt-0 relative">
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-purple-600 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-r from-pink-600 to-yellow-500 transform translate-x-1/3 translate-y-1/3 rotate-45"></div>
                    <div className="transform rotate-45 overflow-hidden w-48 h-48">
                      {/* <img 
                        src="/api/placeholder/400/400" 
                        alt="Estudiante" 
                        className="transform -rotate-45 scale-150"
                      /> */}
                      <User size={46} className="transform -rotate-45 scale-150 mt-16 ml-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Empty div to complete the grid */}
              <div className="hidden md:block"></div>
            </div>
            
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <nav className="flex items-center">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 mr-2 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 mx-1 rounded ${
                        currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 ml-2 disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </nav>
              </div>
            )}
            
            {totalCourses > 0 && (
              <div className="mt-4 text-sm text-gray-500">
                Mostrando {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, totalCourses)} de {totalCourses} cursos
              </div>
            )}
          </div>
        </div>
      </div>
    </main>

      <section className="w-[97%] mx-auto p-8">
        <h2 className="text-[#3a343a] text-[2rem] font-semibold">
          Gana tu licenciatura en línea y estudia a tu propio ritmo
        </h2>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h2 className="text-[#3a343a] text-[2rem] font-semibold">
          Por qué deberías elegir una licenciatura en línea
        </h2>
        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Flexibilidad y comodidad
        </h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Flexibilidad y comodidad
        </h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Flexibilidad y comodidad
        </h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Preguntas frecuentes
        </h3>
        <div className="w-[100%] mx-auto mt-8">
          <AccordionDesign
            title={"Qué puedes hacer con una licenciatura en línea?"}
            content={
              "Una licenciatura en línea te prepara para varios roles en varios sectores, incluyendo negocios, salud, educación, tecnología y las artes. Los graduados a menudo realizan estudios o certificaciones adicionales para avanzar aún más en sus carreras."
            }
          />
          <AccordionDesign
            title={
              "Cuánto tiempo se tarda en obtener una licenciatura en línea?"
            }
            content={
              "La duración de completar una licenciatura en línea suele oscilar entre 3 y 4 años, dependiendo de la estructura del programa y de su ritmo de estudio."
            }
          />
          <AccordionDesign
            title={"Cuánto cuesta una licenciatura en línea?"}
            content={
              "El costo de los grados de licenciatura varía dependiendo de una multitud de factores. Los grados en línea, sin embargo, suelen costar menos que los títulos tradicionales. Con Bigsei, usted encontrará títulos de licenciatura en línea de universidades de clase mundial a un costo más asequible que las tasas universitarias tradicionales."
            }
          />
        </div>
      </section>

      <EducationalFooter />
    </div>
  );
};

export default PageCurso;
