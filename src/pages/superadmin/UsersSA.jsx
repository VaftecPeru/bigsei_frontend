import { Filter, Pencil, PlusIcon, Search, Trash2, GraduationCap } from 'lucide-react';
import { Link } from "react-router-dom";

function UsersSA() {
    const userCategories = [
        { title: "Directores", count: "1 Directores", icon: "👨‍💼" },
        { title: "Profesores", count: "2 Profesores", icon: "👨‍🏫" },
        { title: "Estudiantes", count: "3 Estudiantes", icon: "👨‍🎓" },
        { title: "Padres", count: "2 Padres", icon: "👨‍👩‍👧‍👦" },
        { title: "Contadores", count: "1 Contadores", icon: "👨‍💼" },
        { title: "Bibliotecarios", count: "1 Bibliotecarios", icon: "👩‍💼" },
        { title: "Usuariospendientes", count: "0 Pendientes", icon: "⏳" }
    ];

    return (
        <>
            {/* Header */}
            <div className="w-full bg-[#004B93] text-white py-4 px-6 flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-[#1a237e]" />
                </div>
                <div>
                    <h1 className="text-lg font-medium">Usuarios</h1>
                    <p className="text-sm opacity-80">EduStudy | EduStudy</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {userCategories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/superadministrador/usuarios/${category.title.toLowerCase()}`}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="text-4xl">{category.icon}</div>
                                <h2 className="font-semibold text-gray-800">{category.title}</h2>
                                <p className="text-sm text-gray-500">{category.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UsersSA;
