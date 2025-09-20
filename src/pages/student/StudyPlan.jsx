import React from 'react';
import { GraduationCap, Search } from 'lucide-react';
import DownloadButton from '@/components/ui/DownloadButton';
import StudyPlanTable from '@/components/tables/StudyPlanTable';

function StudyPlan() {
    const courses = [
        {
            title: 'Período académico',
            description: '2024 - II',
        },
        {
            title: 'Plan de estudios',
            description: '2018 - Plan de Estudios 2018',
        },
        {
            title: 'Especialidad',
            description: 'Desarrollo de software',
        },
    ];

    const headers = ['Asignatura', 'Crédito', 'Pre-requisito'];

    const planData = [
        {
            ciclo: 'CICLO 1',
            asignaturas: [
                { nombre: 'Graphic Fundamentals - ART101', credito: 3, preRequisito: null },
                { nombre: 'Mathematics - MAT101', credito: 4, preRequisito: null },
            ],
        },
        {
            ciclo: 'CICLO 2',
            asignaturas: [
                { nombre: 'Advanced Design - ART201', credito: 3, preRequisito: 'Graphic Fundamentals - ART101' },
                { nombre: 'Physics - PHY101', credito: 4, preRequisito: null },
            ],
        },
    ];

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-4">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            Iaion &gt; Menú &gt; Cursos
                        </a>
                    </span>
                </div>
            </div>

            <div className="max-w-7xl w-full shadow-md rounded-lg bg-white">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-base font-semibold">
                        <GraduationCap className="inline-block mr-1 w-5 h-5" />
                        Plan de estudios
                    </h2>
                    <p className="text-sm text-blue-500 hover:underline cursor-pointer">Ver todo</p>
                </div>

                <div className="px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                    {courses.map((course, index) => (
                        <div key={index} className="p-2 rounded-lg shadow-md bg-blue-100 w-[250px]">
                            <h3 className="text-sm mb-2 font-semibold text-gray-700">{course.title}</h3>
                            <p className="text-gray-600 text-sm">{course.description}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl w-full shadow-md rounded-lg bg-white mt-8">
                    <div className="flex justify-between items-center mb-4 m-3">
                        <div className="flex w-[600px] mb-4">
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-r-lg text-white flex items-center justify-center transition-all duration-300 group">
                                <span className="absolute inset-0 bg-gradient-to-r from-white to-white opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-all duration-500"></span>
                                <Search className="w-4 h-4 z-10" />
                            </button>
                        </div>

                        <DownloadButton label="Descargar" />
                    </div>

                    <div className="p-4">
                        <StudyPlanTable headers={headers} planData={planData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudyPlan;
