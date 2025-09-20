import { useState } from "react";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SedeCard from "@/components/dashboard/SedeCard";
import EditSedeModal from "./modal/EditSedeModal";
import RegisterModal from "./modal/RegisterModal";
import { Api_Global_SuperAdministrador } from "../../services/SuperAdministradorApi";
import apiClient from "../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const ITEMS_PER_PAGE = 4;

export default function Sede() {
  const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedSede, setSelectedSede] = useState(null);
    const [sedes, setSedes] = useState([]);
    const [idEmpresaEdit, setIdEmpresaEdit] = useState(null);
    const totalPages = Math.ceil(sedes.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedSedes = sedes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleEdit = (id_empresa) => {
        setIdEmpresaEdit(id_empresa);
        setEditModalOpen(true);
    };

    const handleAddSede = (newSede) => {
        // console.log("Nueva sede agregada:", newSede);
    };

    const listarSedes = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.empresas.listar(searchQuery));
            const data = response.data.map((item) => ({
                id: item.id_empresa,
                id_empresa: item.id_empresa,
                nombre: item.razon_social,
                direccion: item.direccion,
                horario: item.empresa_horario,
                location: "#",
                archivo_nombre: item.archivo_nombre,
                archivo_url: item.archivo_url,
                archivo_extension: item.archivo_extension,
            }));
            setSedes(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmDelete = async (id_empresa) => {
        setIsLoading(true);
        try {
            const response = await apiClient.delete(Api_Global_SuperAdministrador.empresas.eliminar(id_empresa));
        
            if (response.status === 200) {
                toast.success("Realizado.");
                listarSedes();
            } else {
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }

        setOpenModal(false);
        setStudentToDelete(null);
        listarDocentes("");
    };

    useEffect(() => {
        listarSedes();
    }, []);

    return (
        <>
            {isEditModalOpen && (
                <EditSedeModal
                    onClose={() => {
                        setEditModalOpen(false);
                        setIdEmpresaEdit(null);
                    }}
                    idEmpresaEdit={idEmpresaEdit}
                />
            )}

            <RegisterModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setAddModalOpen(false);
                    listarSedes();
                }}
                onSave={handleAddSede}
            />

            <div className="flex min-h-screen flex-col bg-gray-50/50">
                <div className="mx-auto w-full max-w-7xl px-4 py-4">
                    <div className="flex justify-end">
                        <nav className="flex text-sm text-gray-500">
                            <a href="#" className="hover:text-gray-900">
                                <span className="text-gray-900">Iaion &gt; Menú &gt; Sedes</span>
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-7xl flex-1 px-4 pb-8">
                    <div className="rounded-xl bg-white shadow">
                        <div className="flex items-center justify-between border-b p-4">
                            <div className="relative ">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar sede..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-10 rounded-lg bg-gray-50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 w-full sm:w-96 max-w-full"
                                />
                            </div>
                            <Button className="bg-blue-800 hover:bg-blue-700" onClick={() => listarSedes()}
                                disabled={isLoading}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Buscar
                                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                            </Button>
                            <Button className="bg-green-800 hover:bg-green-700" onClick={() => setAddModalOpen(true)}
                                disabled={isLoading}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar
                                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                            </Button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {displayedSedes.map((sede) => (
                                    <SedeCard
                                        key={sede.id}
                                        sede={sede}
                                        onEdit={() => handleEdit(sede.id_empresa)}
                                        onDelete={() => handleConfirmDelete(sede.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 border-t p-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    className="bg-blue-900 hover:bg-blue-800"
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}
