import React from "react";
import PropTypes from "prop-types";

export default function TaskCard({ task }) {
    // Mapeo de estados desde el backend al frontend
    const getTaskStatus = (tarea) => {
        if (!tarea.mi_entrega) return "Not Submitted";
        if (tarea.mi_entrega.estado === "Entregado") return "Completed";
        if (tarea.mi_entrega.estado === "Pendiente") return "Not Submitted";
        return "Not Started";
    };

    const statusColors = {
        "Not Submitted": "bg-orange-100 text-orange-600 border-orange-600",
        "Completed": "bg-green-100 text-green-600 border-green-600",
        "In Progress": "bg-purple-100 text-purple-600 border-purple-600",
        "Not Started": "bg-gray-100 text-red-600 border-red-600",
    };

    const status = getTaskStatus(task);
    const cursoNombre = task.curso?.nombre || "Sin curso asignado";
    const fechaEntrega = task.fecha_fin ? new Date(task.fecha_fin).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) : "Sin fecha definida";

    const fechaSubida = task.mi_entrega?.fechaSubida ? new Date(task.mi_entrega.fechaSubida).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) : null;

    return (
        <div className={`border ${statusColors[status].split(" ")[2]} rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
            {/* Título y estado */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                        {cursoNombre} - {task.descripcion.substring(0, 30)}{task.descripcion.length > 30 ? "..." : ""}
                    </h3>
                    <p className="text-xs text-gray-500">
                        Código: {task.curso?.codigo || "N/A"}
                    </p>
                </div>
                <span
                    className={`text-xs font-semibold px-2 py-1 rounded-lg ${statusColors[status]} transition-colors duration-300`}
                >
                    {status}
                </span>
            </div>

            {/* Línea separadora */}
            <hr className="border-gray-300 my-2 group-hover:border-gray-400 transition-colors duration-300" />

            {/* Descripción y fecha */}
            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                <p className="mb-1">
                    <span className="font-semibold">Descripción:</span> {task.descripcion}
                </p>
                <p className="mb-1">
                    <span className="font-semibold">Fecha entrega:</span> {fechaEntrega}
                </p>
                {task.mi_entrega && (
                    <>
                        <p>
                            <span className="font-semibold">Estado:</span> {task.mi_entrega.estado}
                        </p>
                        {fechaSubida && (
                            <p>
                                <span className="font-semibold">Fecha subida:</span> {fechaSubida}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        idTarea: PropTypes.number.isRequired,
        curso: PropTypes.shape({
            idCurso: PropTypes.number.isRequired,
            nombre: PropTypes.string.isRequired,
            codigo: PropTypes.string.isRequired,
        }).isRequired,
        descripcion: PropTypes.string.isRequired,
        fecha_inicio: PropTypes.string.isRequired,
        fecha_fin: PropTypes.string.isRequired,
        mi_entrega: PropTypes.shape({
            estado: PropTypes.string,
            fechaSubida: PropTypes.string,
            archivo_nombre: PropTypes.string,
            nota_obtenida: PropTypes.number,
        }),
        nota_maxima: PropTypes.number,
    }).isRequired,
};