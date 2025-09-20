import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { TextField } from "@mui/material";

export default function AddSedeModal({ isOpen, onClose, onAdd }) {
    const [selectedDias, setSelectedDias] = useState([]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newSede = {
            nombre: formData.get("nombre"),
            desde: formData.get("desde"),
            hasta: formData.get("hasta"),
            dias: selectedDias,
            ubicacion: formData.get("ubicacion"),
            imagen: "/img/default-image.jpg", // Imagen predeterminada para nuevas sedes
        };
        onAdd(newSede);
        onClose();
    };

    const handleDiaToggle = (dia) => {
        if (selectedDias.includes(dia)) {
            setSelectedDias(selectedDias.filter((d) => d !== dia));
        } else {
            setSelectedDias([...selectedDias, dia]);
        }
    };

    if (!isOpen) return null;

    const diasSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="relative w-full h-48 bg-gray-200 rounded-t-lg mb-6 overflow-hidden">
                    <img
                        src="/img/library-bg.jpg"
                        alt="Nueva Sede"
                        className="h-64 w-full object-cover"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    {/* Nombre de la Sede */}
                    <div>
                        <h2 className="text-xl font-bold text-center mb-4">Agregar Nueva Sede</h2>
                        <TextField
                            fullWidth
                            name="nombre"
                            label="Ingrese el nombre de la sede"
                            placeholder="Ejemplo: Sede Central"
                            variant="outlined"
                        />
                    </div>

                    {/* Horario */}
                    <div>
                        <h3 className="text-lg font-bold text-center mb-3">Horario de atención</h3>
                        <div className="flex justify-between gap-4">
                            <TextField
                                fullWidth
                                name="desde"
                                label="Desde"
                                type="time"
                                defaultValue="07:00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                name="hasta"
                                label="Hasta"
                                type="time"
                                defaultValue="20:00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>

                    {/* Días de atención */}
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-center mb-2">Días de atención</h3>
                        <div className="flex justify-center gap-2 flex-wrap">
                            {diasSemana.map((dia) => (
                                <button
                                    key={dia}
                                    type="button"
                                    onClick={() => handleDiaToggle(dia)}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                                        selectedDias.includes(dia)
                                            ? "bg-black text-white"
                                            : "bg-gray-200 text-gray-700"
                                    } hover:bg-gray-800 hover:text-white`}
                                >
                                    {dia}
                                    {selectedDias.includes(dia) && (
                                        <Check className="w-4 h-4" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ubicación */}
                    <div>
                        <h3 className="text-lg font-bold text-center mb-3">Ubicación</h3>
                        <TextField
                            fullWidth
                            name="ubicacion"
                            label="Enlace de Maps"
                            placeholder="Pegue el enlace aquí"
                            variant="outlined"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-around pt-4 sticky bottom-0 bg-white p-4 border-t">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-red-700 hover:bg-red-600 text-white"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-700 hover:bg-green-600 text-white"
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
