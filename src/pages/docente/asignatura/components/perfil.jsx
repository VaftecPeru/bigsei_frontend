import React, { useEffect, useState} from "react";
import {
    Email_icon, Calendario_icon, Clock_icon, Link_icon, FlechaLeft_icon,
} from "../docente_icons.jsx";
import { Api_Global_Setup } from "../../../../services/SetupApi";
import apiClient from "../../../../Utils/apiClient";
import { rutaApi } from "../../../../Utils/Utils";
import { User, Book } from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Perfil_first = ({ perfil, onGoBack }) => {
    const handleGoBack = () => {
        onGoBack();
    };

    return (
        <div className="w-full relative 
            h-[300px]
            md:h-[300px]"
        >
            <div className="w-full h-full">
                {perfil?.curso_id_archivo ? (
                    <img className="h-full absolute w-full top-0 right-0 h-full"
                        src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(perfil.curso_id_archivo))}`}
                    ></img>
                ) : (
                    <div className="text-center font-bold text-gray-500">Cargando imagen...</div>
                )}
            </div>
            <span className="
                    w-[40px] h-[40px] rounded rounded-full
                    flex items-center justify-center p-2 cursor-pointer
                    hover:bg-blue-500 transition duration-150
                    absolute bottom-[5%] right-[2%]
                    md:top-[5%] md:right-[2%]
                "
                title="Volver a cursos"
                style={{background: '#74c2ff'}}
                onClick={handleGoBack}
            >
                <FlechaLeft_icon></FlechaLeft_icon>
            </span>

            <div className="w-full absolute 
                    top-[5%] left-[5%] right-auto h-min w-max
                    flex items-center
                    md:top-auto md:top-auto md:left-auto
                    md:justify-end md:bottom-[5%] md:right-[5%]
                    px-4 py-2
                "
                style={{background: "#0000ff", opacity: "0.75"}}
            >
                <h1 className="mr-[10px] text-white font-bold
                        text-md
                        lg:text-xl
                        xl:text-4xl
                        flex
                        gap-1
                    "
                >
                    <Book />
                    {perfil?.curso_nombre} - {perfil?.curso_codigo}
                </h1>
            </div>

        </div>
    );
};

const Perfil_second = ({ perfil} ) => {
    const [archivoFoto, seArchivoFoto] = useState(null);

    const handleUrlFoto = (id_archivo_foto) => {
      apiClient.get(Api_Global_Setup.archivos.visualizar(id_archivo_foto))
        .then((response) => {
          seArchivoFoto(response.data);
        })
        .catch((error) => {
          toast.warning(error.response.data);
        });
    };
  
    useEffect(() => {
      if (perfil?.docente_id_archivo_foto) {
        handleUrlFoto(perfil?.docente_id_archivo_foto);
      }
    },[perfil]);

    return (
        <div className="w-full bg-gray-50 relative h-[130px]
                md:h-[130px]  md:pr-4
                md:flex
                md:items-center
            "
        >
            <div className="h-[150px] w-[150px] absolute 
                    transform left-[5%] top-[-25%]
                    border-blue-400 rounded rounded-full
                    md:-translate-y-[50%] md:translate-x-[15%]
                    md:left-[0]
                    md:top-0 md:left-0 
                    lg:h-[220px] lg:w-[220px]
                "
                style={{ border: "6px solid #f0f7ff" }}
            >
                {archivoFoto ? (
                    <img
                        className="w-full h-full"
                        src={`data:image/png;base64,${ archivoFoto.url }`}
                    ></img>
                ) : (
                    <User className="w-24 h-24 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
            </div>

            <div className="w-full flex flex-col md:flex-row items-start md:items-center pl-[23%]">
                <div className="flex items-center">

                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-2xl">{perfil?.docente_nombre}</h2>
                        <p className="text-gray-500 text-lg">Docente de {perfil?.curso_nombre} - {perfil?.curso_codigo}</p>
                        <div className="flex items-center">
                            <span>
                                <Email_icon />
                            </span>
                            <span className="ml-2 text-gray-500 text-sm">{perfil?.docente_correo}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-4 ml-auto">
                    <div className="flex items-center">
                        <span>
                            <Calendario_icon />
                        </span>
                        <span className="ml-2">{perfil?.horario_dias}</span>
                    </div>

                    <div className="flex items-center">
                        <span>
                            <Clock_icon />
                        </span>
                        <span className="ml-2">{perfil?.horario_horas}</span>
                    </div>

                    <div className="flex items-center">
                        <span>
                            <Link_icon />
                        </span>
                        <a href={perfil?.url_zoom} target="_blank" rel="noopener noreferrer">
                            <span className="ml-2 text-blue-500 cursor-pointer hover:underline">
                                Link de zoom
                            </span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default function Perfil({ perfil, onGoBack }) {
    return (
        <div className="w-full rounded-2xl h-full bg-gray-100 overflow-hidden shadow-xl">
            <Perfil_first perfil={perfil} onGoBack={onGoBack} />
            <Perfil_second perfil={perfil} />
        </div>
    );
}