import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import SaberMas from "./modal/SaberMas";
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";
import EmpresaCard from "./components/EmpresaCard";
import CursoCard from "./components/CursoCard";
import TemaCard from "./components/TemaCard";

export default function Introduccion() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courses = [
    {
      title: "Artes y humanidades",
      university: "Universidad de Newcastle, Australia",
      degree: "Licenciado en letras",
      image: "https://picsum.photos/400/300?random=1",
    },
    {
      title: "Negocios y gestión",
      university: "Universidad de Rockingham",
      degree: "Maestría en Administración de Empresas (MBA)",
      image: "https://picsum.photos/400/300?random=2",
    },
    {
      title: "Cuidado de la salud",
      university: "Universidad de Rockingham",
      degree: "MBA en Gestión Sanitaria",
      image: "https://picsum.photos/400/300?random=3",
    },
    {
      title: "Análisis de datos",
      university: "Universidad de Huddersfield",
      degree: "Maestría en Inteligencia Artificial",
      image: "https://picsum.photos/400/300?random=4",
    },
    {
      title: "Psicología",
      university: "Universidad Brunel de Londres",
      degree: "Máster en Ciencias Psicológicas",
      image: "https://picsum.photos/400/300?random=5",
    },
    {
      title: "Ingeniería",
      university: "Universidad Brunel de Londres",
      degree: "Maestría en Gestión de Operaciones",
      image: "https://picsum.photos/400/300?random=6",
    },
  ];
  const [titulaciones, setTitulaciones] = useState([]);
  const [titulacionSelected, setTitulacionSelected] = useState({id_tipotituloacademico: ""});
  const [cantidadTitulaciones, setCantidadTitulaciones] = useState(0);
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelected, setCategoriaSelected] = useState({id_tipocategoria: ""});
  const [cantidadCategorias, setCantidadCategorias] = useState(0);
  const [temas, setTemas] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]); // EMPRESAS
  const [organizacionSelected, setOrganizacionSelected] = useState({id_empresa: ""});
  const [cantidadOrganizaciones, setCantidadOrganizaciones] = useState(0);
  const [cursos, setCursos] = useState([]);

  const handleOpenModal = (course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  const handleListarTitulaciones = () => {
    apiClient.get(Api_Global_Web.carreras.listarTipoTituloAcademico({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        setTitulaciones(response.data.data);
        calcularCantidadTitulaciones(response.data.data);
      })
      .catch((error) => {
        setTitulaciones([]);
      });
  };

  const handleListarCategorias = () => {
    apiClient.get(Api_Global_Web.tipoCategorias.listarPorTemas({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        setCategorias(response.data.data);
        calcularCantidadCategorias(response.data.data);
      })
      .catch((error) => {
        setCategorias([]);
      });
  };

  const handleListarOrganizaciones = () => {
    apiClient.get(Api_Global_Web.empresas.listar({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        setOrganizaciones(response.data.data);
        calcularCantidadOrganizaciones(response.data.data);
      })
      .catch((error) => {
        setOrganizaciones([]);
      });
  };

  const handleListarEmpresas = () => {
    const id_tipotituloacademico = titulacionSelected?.id_tipotituloacademico ? titulacionSelected?.id_tipotituloacademico : "";
    apiClient.get(Api_Global_Web.carreras.listar({
      per_page: 15,
      page: 1,
    }, id_tipotituloacademico))
      .then((response) => {
        setEmpresas(response.data.data);
      })
      .catch((error) => {
        setEmpresas([]);
      });
  };

  const handleListarTemas = () => {
    const id_tipocategoria = categoriaSelected?.id_tipocategoria ? categoriaSelected?.id_tipocategoria : "";
    apiClient.get(Api_Global_Web.temas.listar({
      per_page: 15,
      page: 1,
    }, id_tipocategoria))
      .then((response) => {
        setTemas(response.data.data);
      })
      .catch((error) => {
        setTemas([]);
      });
  };

  const handleListarCursos = () => {
    const id_empresa = organizacionSelected?.id_empresa ? organizacionSelected?.id_empresa : "";
    apiClient.get(Api_Global_Web.cursos.listarVisiblesWeb({
      per_page: 15,
      page: 1,
    }, id_empresa))
      .then((response) => {
        setCursos(response.data.data);
      })
      .catch((error) => {
        setCursos([]);
      });
  };

  const calcularCantidadTitulaciones = (data) => {
    const total = data.reduce((accumulator, currentValue) => {
      return accumulator + Math.floor(currentValue.cant_tipos);
    }, 0);
    setCantidadTitulaciones(total);
  };

  const calcularCantidadCategorias = (data) => {
    const total = data.reduce((accumulator, currentValue) => {
      return accumulator + Math.floor(currentValue.cant_tipos);
    }, 0);
    setCantidadCategorias(total);
  };

  const calcularCantidadOrganizaciones = (data) => {
    const total = data.reduce((accumulator, currentValue) => {
      return accumulator + Math.floor(currentValue.cant_cursos);
    }, 0);
    setCantidadOrganizaciones(total);
  };

  useEffect(() => {
    handleListarEmpresas();
  }, [titulacionSelected]);

  useEffect(() => {
    handleListarTemas();
  }, [categoriaSelected]);

  useEffect(() => {
    handleListarCursos();
  }, [organizacionSelected]);

  useEffect(() => {
    handleListarTitulaciones();
    handleListarCategorias();
    handleListarOrganizaciones();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-12 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Grados en línea</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Aprenda de manera flexible con nuestros cursos de grado en línea creados por las principales universidades.
            Desde la licenciatura hasta el posgrado, haga que el aprendizaje a nivel de grado funcione para usted y
            lleve su carrera al siguiente nivel.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Premios</h2>
              <ul className="space-y-2">
                <li
                  onClick={() => setTitulacionSelected({id_tipotituloacademico: ""})}
                  className={`flex items-center hover:underline cursor-pointer ${titulacionSelected?.id_tipotituloacademico == "" ? "text-blue-600" : "text-gray-600"}`}>
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Todos los premios ({cantidadTitulaciones})
                </li>
                {titulaciones.map((titulacion, index) => (
                <li
                  key={titulacion.id_tipotituloacademico}
                  onClick={() => setTitulacionSelected(titulacion)}
                  className={`flex items-center cursor-pointer hover:underline ${titulacionSelected?.id_tipotituloacademico == titulacion.id_tipotituloacademico ? "text-blue-600" : "text-gray-600"}`}
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  {titulacion.nombre} ({titulacion.cant_tipos})
                </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Temas</h2>
              <ul className="space-y-2">
                <li
                  onClick={() => setCategoriaSelected({id_tipocategoria: ""})}
                  className={`flex items-center hover:underline cursor-pointer ${categoriaSelected?.id_tipocategoria == "" ? "text-blue-600" : "text-gray-600"}`}>
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Todas las materias ({cantidadCategorias})
                </li>
                {categorias.map((item, index) => (
                <li
                  key={item.id_tipocategoria}
                  onClick={() => setCategoriaSelected(item)}
                  className={`flex items-center cursor-pointer hover:underline ${categoriaSelected?.id_tipocategoria == item.id_tipocategoria ? "text-blue-600" : "text-gray-600"}`}
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  {item.nombre} ({item.cant_tipos})
                </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Organizaciones</h2>
              <ul className="space-y-2">
                <li
                  onClick={() => setOrganizacionSelected({id_empresa: ""})}
                  className={`flex items-center hover:underline cursor-pointer ${organizacionSelected?.id_empresa == "" ? "text-blue-600" : "text-gray-600"}`}>
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Todas las organizaciones ({cantidadOrganizaciones})
                </li>
                {organizaciones.map((item, index) => (
                <li
                  key={item.id_empresa}
                  onClick={() => setOrganizacionSelected(item)}
                  className={`flex items-center cursor-pointer hover:underline ${organizacionSelected?.id_empresa == item.id_empresa ? "text-blue-600" : "text-gray-600"}`}
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  {item.razon_social} ({item.cant_cursos})
                </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {empresas.map((item, index) => (
                <EmpresaCard empresa={item} />
              ))}
              {temas.map((item, index) => (
                <TemaCard tema={item} />
              ))}
              {cursos.map((item, index) => (
                <CursoCard curso={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <SaberMas isOpen={isModalOpen} onClose={handleCloseModal} course={selectedCourse} />
    </div>
  )
}

