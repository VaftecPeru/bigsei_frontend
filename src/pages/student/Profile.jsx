import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Api_Global_Estudiante } from "../../services/EstudianteApi";
import { Api_Global_Setup } from "../../services/SetupApi";
import apiClient from "../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import ModalProfile from "./modals/ModalProfile";

// Carga diferida de componentes pesados
const AcademicHistory2 = lazy(() => import('@/components/dashboard/AcademicHistory2'));
const QualificationHistory = lazy(() => import('@/components/dashboard/QualificationHistory'));
const DownloadButton = lazy(() => import('@/components/ui/DownloadButton'));

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [carrera, setCarrera] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [notas, setNotas] = useState([]);
  const [dataY, setDataY] = useState([]);
  const [dataX, setDataX] = useState([]);
  const [promedio, setPromedio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePhoto: "https://picsum.photos/100/100",
    bannerPhoto: "https://imgs.search.brave.com/r6bX11Bkmd7aRDZHk2d9lnkrDPAStQDTdj6ECd81oTw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9iYW5uZXItaWx1/c3RyYWNpb24tZW50/b3Juby1mb25kby1w/YWlzYWplLXBsYXlh/LXRyb3BpY2FsLTJk/LWlhLWdlbmVyYXRp/dmFfMTU5MjQyLTIz/NDg5LmpwZw",
    phone: "987456321",
    email: "adrian@example.com",
  });
  const [archivoFoto, seArchivoFoto] = useState(null);
  const [archivoBaner, seArchivoBaner] = useState(null);

  const handleCarreras = () => {
    apiClient.get(Api_Global_Estudiante.miCarreras.listar({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        if (response.data.data.length > 0) {
          setCarrera(response.data.data[0]);
        }
      })
      .catch((error) => {
        toast.warning(error.response.data);
        setCarrera(null);
      });
  };

  const handlePerfil = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Estudiante.miPerfiles.mostrar())
      .then((response) => {
        setIsLoading(false);
        setPerfil(response.data);

        if (response.data.id_archivo_foto) handleUrlFoto(response.data.id_archivo_foto);
        if (response.data.id_archivo_baner) handleUrlBaner(response.data.id_archivo_baner);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
        setPerfil(null);
      });
  };

  const handleNotas = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Estudiante.miNotas.matriculas())
      .then((response) => {
        setIsLoading(false);
        const items = response.data.map((item) => {
          const cursos_ = item.cursos.map((item_) => {
            return {
              ciclo: item_.ciclo_nombre,
              plan: item_.anho_ff,
              asignatura: item_.curso_nombre,
              docente: item_.docente_nombre,
              nota: item_.nota,
              credito: item_.creditos,
            };
          });
          return {
            periodo: item.periodo_nombre,
            cursos: cursos_,
          };
        });
        setNotas(items);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
        setNotas([]);
      });
  };

  const handleHistorialAcademicos = () => {
    apiClient.get(Api_Global_Estudiante.miNotas.historialAcademicos())
      .then((response) => {
        const dataY_ = response.data.map((item) => {
          return item.nota;
        });
        setDataY(dataY_);

        const dataX_ = response.data.map((item) => {
          return item.mes_nombre;
        });
        setDataX(dataX_);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handlePromedio = () => {
    apiClient.get(Api_Global_Estudiante.miNotas.promedios())
      .then((response) => {
        if (response.data.length > 0) {
          setPromedio(response.data[0]);
        }
      })
      .catch((error) => {
        toast.warning(error.response.data);
        setPromedio(null);
      });
  };

  const handleUrlFoto = (id_archivo_foto) => {
    apiClient.get(Api_Global_Setup.archivos.visualizar(id_archivo_foto))
      .then((response) => {
        seArchivoFoto(response.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handleUrlBaner = (id_archivo_baner) => {
    apiClient.get(Api_Global_Setup.archivos.visualizar(id_archivo_baner))
      .then((response) => {
        seArchivoBaner(response.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleCarreras();
    handlePerfil();
    handleNotas();
    handleHistorialAcademicos();
    handlePromedio();
  },[]);

  return (
    <div className={`flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-sky-50 p-6`}>
      <div className="w-full max-w-7xl p-4">
        <div className="flex justify-end items-center text-sm text-gray-500">
          <span>
            <a href="#" className="hover:underline">Iaion &gt; Menú &gt; Perfil</a>
          </span>
        </div>
      </div>

      <div className='w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden'>
        <div className='relative'>
          {archivoBaner ? (
            <img
              src={`data:image/png;base64,${ archivoBaner.url }`}
              alt="Background"
              className="h-48 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <img
              src={profileData.bannerPhoto}
              alt="Background"
              className="h-48 w-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute left-8 bottom-[-150px]">
            {archivoFoto ? (
              <img
                src={`data:image/png;base64,${ archivoFoto.url }`}
                alt="Profile"
                className='h-64 w-64 rounded-full object-cover border-4 border-white'
                loading="lazy"
              />
            ) : (
              <img
                src={profileData.profilePhoto}
                alt="Profile"
                className='h-64 w-64 rounded-full object-cover border-4 border-white'
                loading="lazy"
              />
            )}
          </div>
        </div>
        <div className="px-8 mt-4 pb-8 flex justify-between items-center ml-72">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{perfil?.nombre_completo}</h1>
            <p className="text-lg text-gray-500">
              Estudiante de {carrera?.nombre}
            </p>
            <div>
              <p className="text-lg font-semibold text-blue-600 mt-4">{promedio?.nota}</p>
              <p className="text-base text-gray-500">Promedio</p>
            </div>
          </div>
          <Suspense fallback={<div>Cargando botón...</div>}>
            <DownloadButton label="Descargar perfil" />
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
          </Suspense>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Información personal</h2>
            <button
              className="text-blue-500 text-sm hover:underline flex items-center"
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <span>Editar
              <Edit className="ml-1 h-4 w-4" /></span>}
            </button>
          </div>
          <div className="mt-6 space-y-3 text-gray-600 text-base">
            {[
              { icon: "/img/icons/dni.svg", text: perfil?.numero_documento },
              { icon: "/img/icons/user.svg", text: perfil?.nombre_completo },
              { icon: "/img/icons/genero.svg", text: perfil?.sexo_ff },
              { icon: "/img/icons/nacimiento.svg", text: perfil?.fecha_nacimiento },
              { icon: "/img/icons/telefono.svg", text: perfil?.telefono },
              { icon: "/img/icons/correo.svg", text: perfil?.correo },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <img src={item.icon} alt="" loading="lazy" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Historial Académico con carga diferida */}
        <Suspense fallback={<div>Cargando historial académico...</div>}>
          <AcademicHistory2 dataY={dataY} dataX={dataX} />
        </Suspense>
      </div>

      <div className="w-full max-w-7xl mt-6">
        <Suspense fallback={<div>Cargando historial de calificaciones...</div>}>
          <QualificationHistory notas={notas} />
        </Suspense>
      </div>

      {isModalOpen && (
        <ModalProfile onClose={(e) => {
          setIsModalOpen(false);
          handlePerfil();
        }} />
      )}
      <ToastContainer />
    </div>
  )
}

export default Profile;