import React from "react";

const CoursesTable = ({ courses, handleViewDetails, step }) => (
    <div className="mt-4 overflow-x-auto">
        {/* Tabla para dispositivos medianos y grandes */}
        <div className="hidden md:block">
            <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Ciclo</th>
                        {step !== 5 && <th className="px-4 py-2">Código</th>}
                        <th className="px-4 py-2">Asignatura</th>
                        <th className="px-4 py-2">Créditos</th>
                        {step !== 5 && (
                            <>
                                <th className="px-4 py-2">Repetencias</th>
                                <th className="px-4 py-2">Sección</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{course.cycle}</td>
                            {step !== 5 && (
                                <td className="border px-4 py-2">{course.code}</td>
                            )}
                            <td className="border px-4 py-2">{course.subject}</td>
                            <td className="border px-4 py-2">{course.credits}</td>
                            {step !== 5 && (
                                <>
                                    <td className="border px-4 py-2">
                                        {course.retries}
                                    </td>
                                    <td className="border px-4 py-2 text-blue-600 cursor-pointer">
                                        <button
                                            onClick={() => handleViewDetails(course)}
                                            className="text-blue hover:underline"
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Vista tipo "tarjeta" para dispositivos pequeños */}
        <div className="block md:hidden">
            {courses.map((course, index) => (
                <div
                    key={index}
                    className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm"
                >
                    <p>
                        <span className="font-semibold">Ciclo: </span>
                        {course.cycle}
                    </p>
                    {step !== 5 && (
                        <p>
                            <span className="font-semibold">Código: </span>
                            {course.code}
                        </p>
                    )}
                    <p>
                        <span className="font-semibold">Asignatura: </span>
                        {course.subject}
                    </p>
                    <p>
                        <span className="font-semibold">Créditos: </span>
                        {course.credits}
                    </p>
                    {step !== 5 && (
                        <>
                            <p>
                                <span className="font-semibold">Repetencias: </span>
                                {course.retries}
                            </p>
                            <p>
                                <span className="font-semibold">Sección: </span>
                                <button
                                    onClick={() => handleViewDetails(course)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Ver
                                </button>
                            </p>
                        </>
                    )}
                </div>
            ))}
        </div>
        {step !== 5 && (
            <p className="mt-4 text-sm text-gray-500">(*) El mínimo de créditos es 12</p>
        )}
    </div>
);

export default CoursesTable;
