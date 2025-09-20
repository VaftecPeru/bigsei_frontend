import { Search } from "lucide-react";
import { Avatar, Chip } from "@mui/material";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState, useEffect } from "react";
import { Api_Global_Director } from "../../services/DirectorApi";
import apiClient from "../../Utils/apiClient";
import { Api_Global_Setup } from "../../services/SetupApi";
import { rutaApi } from "../../Utils/Utils";
import { ClipLoader } from 'react-spinners';

function TeachingD() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedEstado, setSelectedEstado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [docentes, setDocentes] = useState([]);
    const photo = "/placeholder.svg";
    const columns = [
        { header: "N°", key: "index" },
        {
            header: "Foto",
            key: "photo",
            render: (value, row) => (
                <div className="flex justify-center">
                    {row.id_archivo_foto ? (
                        <Avatar src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(row.id_archivo_foto))}`} alt="Foto" />
                    ) : (
                        <Avatar src={value} alt="Foto" />
                    )}
                </div>
            ),
        },
        { header: "Documento", key: "numero_documento" },
        { header: "Nombre", key: "nombre_completo" },
        { header: "Celular", key: "telefono" },
        { header: "Correo", key: "correo" },
        { header: "Estado", key: "estado_descripcion" },
    ];

    const handleDocentes = (text_search = "") => {
        setIsLoading(true);
        apiClient.get(Api_Global_Director.docentes.listar(text_search))
            .then((response) => {
                setIsLoading(false);
                const data = response.data.map((item, index) => ({
                    ...item,
                    index: (index+1),
                    photo: photo,
                }));
                setDocentes(data);
            })
            .catch((error) => {
                setIsLoading(false);
                setDocentes([]);
            });
    };

    const changeDocentes = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        handleDocentes(searchTerm);
    }, []);

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">Iaion &gt; Menú &gt; Docente</span>
                        </a>
                    </span>
                </div>
            </div>

            <div className="w-full max-w-7xl p-2 bg-white">
                <div className="flex justify-between items-center mb-4 mt-5">
                    <div className="flex items-center gap-2">
                        <div className="w-full sm:w-96 max-w-full">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="texto de busqueda"
                                    value={searchTerm}
                                    onChange={(e) => changeDocentes(e.target.value)}
                                    className="border rounded-md pl-10 pr-3 py-2 text-sm outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleDocentes(searchTerm)}
                            className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm flex items-center gap-1"
                            disabled={isLoading}
                        >
                            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                            <Search className="w-4 h-4" />
                            Buscar
                        </button>
                        <DownloadButton label="Descargar" />
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    {selectedCiclo && (
                        <Chip
                            label={`Ciclo: ${selectedCiclo}`}
                            onDelete={() => setSelectedCiclo("")}
                        />
                    )}
                    {selectedEstado && (
                        <Chip
                            label={`Estado: ${selectedEstado}`}
                            onDelete={() => setSelectedEstado("")}
                        />
                    )}
                </div>
            </div>

            <TableSA columns={columns} rows={docentes} />
        </div>
    );
}

export default TeachingD;