import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyCourseCard = ({ course }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/detalles-curso"); 
    };

    return (
        <div
            className="w-[250px] h-[600px] rounded-lg overflow-hidden shadow-lg bg-white flex flex-col hover:bg-gray-100 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Contenedor de la imagen con texto superpuesto */}
            <div className="relative">
                <img className="w-full h-32 object-cover" src={course.image} alt={course.university} />
                {/* Texto superpuesto */}
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                    {course.status}
                </div>
            </div>

            {/* Contenido de la card */}
            <div className="px-4 py-4 flex-1">
                {/* Nombre de la universidad */}
                <div className="text-sm text-gray-500 mb-2">{course.university}</div>
                <div className="font-bold text-xl mb-2">{course.name}</div>

                {/* Descripción del curso */}
                <p className="text-gray-700 text-sm">{course.description}</p>
                <div className="flex mt-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-merge"><path d="m8 6 4-4 4 4" /><path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" /><path d="m20 22-5-5" /></svg>
                    <p className="ml-2 text-gray-700 text-sm">Incluido en Unlimited</p>
                </div>
            </div>

            {isHovered && (
                <div className="flex justify-center">
                    <button className="bg-blue-900 text-white px-8 py-2 rounded-md w-40 hover:bg-blue-500" onClick={handleClick} >
                        Ir al curso
                    </button>
                </div>
            )}

            {/* Botones de acción (pegados al fondo) */}
            <div className="px-8 py-4">
                <div className="flex flex-col items-center">
                    <button className="text-blue-900 px-4 py-2 mb-2 rounded-md hover:bg-blue-900 hover:text-white w-48">
                        Abandonar el curso
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCourseCard;