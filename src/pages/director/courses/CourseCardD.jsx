import PropTypes from 'prop-types';  // Importamos PropTypes de React

import { Link } from "react-router-dom";  // Importamos Link de React Router

export default function CourseCard({ course }) {
    return (
        // Envolvemos todo el contenido de la tarjeta en un Link
        <Link
            to={`/director/cursos/${course.id}`}  // Ruta dinámica para los detalles del curso
            className={`shadow-md p-6 rounded-lg transform transition-transform hover:scale-105 cursor-pointer ${course.bgColor}`}
        >
            {/* Título del curso */}
            <h3 className={`text-lg font-bold mb-3 ${course.textColor}`}>
                {course.title}
            </h3>

            {/* Línea decorativa */}
            <hr className={`h-0.5 rounded-full mb-4 ${course.bgColor}`} />

            {/* Información del curso */}
            <div className="text-sm space-y-3">
                {/* Profesor */}
                <div className="flex items-center text-gray-700 gap-x-1">
                    <img src="/img/icons/user.svg" alt="Profesor" />
                    <span>{course.teacher}</span>
                </div>
                
                {/* Correo */}
                <div className="flex items-center text-gray-700 gap-x-1">
                    <img src="/img/icons/correo.svg" alt="Correo" />
                    <span className="whitespace-pre-wrap">{course.email}</span>
                </div>
                
                {/* Hora específica */}
                <div className="flex items-center text-gray-700 gap-x-1">
                    <img src="/img/icons/clock.svg" alt="Hora" />
                    <span>{course.time || "Horario no especificado"}</span>
                </div>
                
                {/* Ubicación */}
                <div className="flex items-center text-gray-700 gap-x-1">
                    <img src="/img/icons/location.svg" alt="Ubicación" />
                    <span>{course.location}</span>
                </div>
            </div>
        </Link>
    );
}

// Validación de las propiedades
CourseCard.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        teacher: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        time: PropTypes.string,
        location: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired
    }).isRequired
};
