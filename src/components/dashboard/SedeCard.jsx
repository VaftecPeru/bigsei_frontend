import { MapPin, MoreVertical } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SedeCard({ sede, onEdit, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        setIsModalOpen(false); // Cierra el modal
        onDelete(); // Llama la función de eliminación
    };

    return (
        <Card className="max-w-md overflow-hidden shadow-2xl">
            <div className="relative">
                {sede.archivo_url ? (
                    <img
                        src={`data:image/png;base64,${sede.archivo_url}`}
                        alt={sede.nombre}
                        className="h-64 w-full object-cover"
                    />
                ) : (
                    <div className="pt-14 font-bold text-gray-500 text-center">
                        Imagen no encontrada...
                    </div>
                )}
            </div>

            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                        <h3 className="text-xl font-medium text-gray-900">{sede.nombre}</h3>
                        <p className="text-sm text-gray-600">Horario: {sede.horario}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setIsModalOpen(true)} // Abre el modal
                                    className="text-destructive"
                                >
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <a
                            href={sede.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                            <MapPin />
                            Ver Mapa
                        </a>
                    </div>
                </div>
            </CardContent>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
                        <p className="text-lg font-medium text-gray-900 mb-4">
                            ¿Estás seguro de eliminarlo?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button
                                className="px-6 py-2 bg-[#3F66FF] hover:bg-blue-700"
                                onClick={handleDelete}
                            >
                                Sí
                            </Button>
                            <Button
                                variant="outlined"
                                className="px-4 py-2 border border-[#3F66FF] text-[#3F66FF]"
                                onClick={() => setIsModalOpen(false)}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
