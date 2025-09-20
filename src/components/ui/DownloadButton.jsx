import React from "react"
import PropTypes from "prop-types"
import { Download } from "lucide-react"

export default function DownloadButton({ label, onClick }) {
    return (
        <button
            className="flex text-sm items-center gap-2 p-2 text-[#22A8E8] border rounded-lg border-[#22A8E8] hover:bg-[#DBF1FB] transition-all duration-300"
            onClick={onClick}
        >
            <Download className="w-4 h-4" />
            {label}
        </button>
    )
}

DownloadButton.propTypes = {
    label: PropTypes.string, // Texto del botón
    onClick: PropTypes.func, // Función a ejecutar al hacer clic
}

DownloadButton.defaultProps = {
    label: "Descargar", // Valor por defecto para el texto
    onClick: () => { }, // Acción por defecto: nada
}
