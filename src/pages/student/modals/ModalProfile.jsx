import React, { useState, useEffect } from "react";
import { Api_Global_Estudiante } from "../../../services/EstudianteApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import apiFileClient from "../../../Utils/apiFileClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { Button } from '@mui/material';
import { CameraIcon } from 'lucide-react';

function ModalProfile({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePhoto: "https://picsum.photos/100/100",
    bannerPhoto: "https://imgs.search.brave.com/r6bX11Bkmd7aRDZHk2d9lnkrDPAStQDTdj6ECd81oTw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9iYW5uZXItaWx1/c3RyYWNpb24tZW50/b3Juby1mb25kby1w/YWlzYWplLXBsYXlh/LXRyb3BpY2FsLTJk/LWlhLWdlbmVyYXRp/dmFfMTU5MjQyLTIz/NDg5LmpwZw",
  });
  const [formulario, setFormulario] = useState({
    telefono: "",
    correo: "",
  });
  const [archivoFoto, seArchivoFoto] = useState(null);
  const [archivoBaner, seArchivoBaner] = useState(null);

  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target
    setFormulario(prevData => ({
      ...prevData,
      [name]: value
    }))
  }, []);

  const handleFileChangeFoto = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    apiFileClient.post(Api_Global_Estudiante.miPerfiles.fotos(), formData)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleUrlFoto(response.data.id_archivo);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleFileChangeBaner = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    apiFileClient.post(Api_Global_Estudiante.miPerfiles.baneres(), formData)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleUrlBaner(response.data.id_archivo);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault()
    setIsLoading(true);
    apiClient.put(Api_Global_Estudiante.miPerfiles.editar(), formulario)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  }, [formulario]);

  const handlePerfil = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Estudiante.miPerfiles.mostrar())
      .then((response) => {
        setIsLoading(false);
        setFormulario({
          ...formulario,
          telefono: response.data.telefono,
          correo: response.data.correo,
        });
        if (response.data.id_archivo_foto) handleUrlFoto(response.data.id_archivo_foto);
        if (response.data.id_archivo_baner) handleUrlBaner(response.data.id_archivo_baner);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
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
    handlePerfil();
  },[]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[20px] p-8 w-[532px] max-h-[550px] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm text-center">
              Foto de perfil <span className="text-indigo-500">*</span>
            </label>
            <div className="flex items-center justify-center space-x-4">
              {archivoFoto ? (
                <img
                  src={`data:image/png;base64,${ archivoFoto.url }`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <img
                  src={profileData.profilePhoto}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
              )}

              <Button
                component="label"
                variant="contained"
                className="cursor-pointer bg-indigo-600 text-white px-2 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                startIcon={<CameraIcon />}
              >
                Cambiar foto
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileChangeFoto(file);
                    }
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm text-center">
              Foto de banner <span className="text-indigo-500">*</span>
            </label>
            <div className="flex items-center justify-center space-x-4">
              {archivoBaner ? (
                <img
                  src={`data:image/png;base64,${ archivoBaner.url }`}
                  alt="Banner"
                  className="w-32 h-16 object-cover rounded"
                  loading="lazy"
                />
              ) : (
                <img
                  src={profileData.bannerPhoto}
                  alt="Banner"
                  className="w-32 h-16 object-cover rounded"
                  loading="lazy"
                />
              )}
              <Button
                component="label"
                variant="contained"
                className="cursor-pointer bg-indigo-600 text-white px-2 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                startIcon={<CameraIcon />}
              >
                Cambiar foto
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileChangeBaner(file);
                    }
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm">
              Celular <span className="text-indigo-500">*</span>
            </label>
            <input
              type="text"
              name="telefono"
              value={formulario.telefono}
              onChange={handleInputChange}
              className="w-full h-8 px-3 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors text-base"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm">
              Correo <span className="text-indigo-500">*</span>
            </label>
            <input
              type="email"
              name="correo"
              value={formulario.correo}
              onChange={handleInputChange}
              className="w-full h-8 px-3 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors text-base"
            />
          </div>

          <div className="flex justify-center space-x-2 pt-4">
            <button
              type="button"
              onClick={(e) => onClose()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Cancelar'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalProfile;