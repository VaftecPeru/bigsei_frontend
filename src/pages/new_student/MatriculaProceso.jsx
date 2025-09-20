import { useState, useRef } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function MatriculaProceso() {
    const navigate = useNavigate();
    const tabs = [
        {
            id: 'documentacion',
            label: 'Documentación',
            content: <DocumentacionContent />
        },
        {
            id: 'matricula',
            label: 'Matrícula',
            content: <MatriculaContent />
        },
        {
            id: 'pago',
            label: 'Pago',
            content: <PagoContent />
        },
        {
            id: 'reporte',
            label: 'Reporte',
            content: <ReporteContent />
        }
    ];

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleNext = () => {
        if (activeTabIndex === 2) {
            const confirmPayment = window.confirm("¿Está seguro que desea confirmar el pago?");
            if (!confirmPayment) {
                return;
            }
        }

        if (activeTabIndex < tabs.length - 1) {
            setActiveTabIndex(activeTabIndex + 1);
        }

        if (activeTabIndex === tabs.length - 1) {
            navigate('/student');
        }
    };

    const handlePrev = () => {
        if (activeTabIndex === 0) {
            navigate('/new-student/registration');
        } else {
            setActiveTabIndex(activeTabIndex - 1);
        }
    };

    return (
        <div className="min-h-auto bg-gray-200 py-6">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl px-20 py-2">
                {/* Navegación dinámica */}
                <nav className="bg-white shadow-sm rounded-lg">
                    <ul className="flex overflow-x-auto">
                        {tabs.map((tab, index) => (
                            <li key={tab.id} className="flex-1 min-w-max">
                                <button
                                    className={`w-full px-4 py-3 text-center font-medium text-md transition-colors duration-200
                  ${index === activeTabIndex
                                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                            : 'text-gray-500 border-b-2 border-gray-300'}`}
                                    disabled
                                >
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="bg-white rounded-lg shadow-sm p-2">
                    {tabs[activeTabIndex].content}
                </div>

                {/* Botones de navegación */}
                <div className="flex justify-between p-4">
                    <button
                        onClick={handlePrev}
                        className={`flex items-center px-4 py-2 rounded-lg ${activeTabIndex === 0 ? 'text-blue-600 hover:bg-blue-50' : 'text-blue-600 hover:bg-blue-50'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {activeTabIndex === 0 ? 'Regresar' : 'Anterior'}
                    </button>

                    <button
                        onClick={handleNext}
                        className={`flex items-center px-4 py-2 rounded-lg ${activeTabIndex === tabs.length - 1
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {activeTabIndex === 2 ? 'Pagar' :
                            activeTabIndex === tabs.length - 1 ? 'Finalizar' : 'Siguiente'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export const FileUploadField = ({ label }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleDelete = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="mb-2">
            <h1 className="text-md font-medium text-gray-700 mb-2">{label}</h1>
            <div className="bg-white rounded-xl p-2">
                {!file ? (
                    <div
                        className="flex flex-col h-[84px] items-center justify-center py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                        onClick={triggerFileInput}
                    >
                        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <span className="text-gray-500">Subir archivo</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            <span className="text-gray-700">{file.name}</span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-gray-200 transition"
                                title="Editar"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-200 transition"
                                title="Eliminar"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function DocumentacionContent() {
    return (
        <form className="max-w-2xl mx-auto p-6">
            <FileUploadField
                label="DNI (Anverso y Reverso)*"
            />

            <FileUploadField
                label="Partida de nacimiento*"
            />

            <FileUploadField
                label="Certificado de estudios*"
            />

            <FileUploadField
                label="Declaración jurada del estudiante*"
            />

            <FileUploadField
                label="Declaración jurada del apoderado*"
            />
        </form>
    );
}

function MatriculaContent() {
    const [cursos, setCursos] = useState([
        { ciclo: 'III', codigo: 'SW301', asignatura: 'Programación Orientada a Objetos', creditos: 4, repitencia: 'No' },
        { ciclo: 'IV', codigo: 'SW402', asignatura: 'Estructuras de Datos y Algoritmos', creditos: 5, repitencia: 'No' },
        { ciclo: 'V', codigo: 'SW503', asignatura: 'Bases de Datos', creditos: 4, repitencia: 'Sí' },
        { ciclo: 'VI', codigo: 'SW604', asignatura: 'Desarrollo Web Frontend', creditos: 4, repitencia: 'No' },
        { ciclo: 'VII', codigo: 'SW705', asignatura: 'Desarrollo Backend con Node.js', creditos: 5, repitencia: 'No' }
    ]);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [seccionesCurso, setSeccionesCurso] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const seccionesEjemplo = {
        SW301: [
            {
                codigo: 'SW301-01',
                grupo: 'Grupo 01',
                profesor: 'Dr. Carlos Mendoza',
                sesiones: [
                    {
                        tipo: 'Teórico',
                        horario: 'Lunes 8:00-10:00',
                        aula: 'A-201',
                        dia: 'Lunes'
                    },
                    {
                        tipo: 'Práctico',
                        horario: 'Miércoles 8:00-10:00',
                        aula: 'Lab-3',
                        dia: 'Miércoles'
                    }
                ]
            },
            {
                codigo: 'SW301-02',
                grupo: 'Grupo 02',
                profesor: 'Ing. Luisa Fernández',
                sesiones: [
                    {
                        tipo: 'Teórico',
                        horario: 'Martes 14:00-16:00',
                        aula: 'A-202',
                        dia: 'Martes'
                    },
                    {
                        tipo: 'Práctico',
                        horario: 'Jueves 14:00-16:00',
                        aula: 'Lab-4',
                        dia: 'Jueves'
                    }
                ]
            }
        ],
        SW402: [
            {
                codigo: 'SW402-01',
                grupo: 'Grupo 01',
                profesor: 'Mg. Ana Torres',
                sesiones: [
                    {
                        tipo: 'Teórico',
                        horario: 'Miércoles 9:00-11:00',
                        aula: 'B-305',
                        dia: 'Miércoles'
                    },
                    {
                        tipo: 'Práctico',
                        horario: 'Viernes 9:00-11:00',
                        aula: 'Lab-2',
                        dia: 'Viernes'
                    }
                ]
            }
        ],
        SW503: [
            {
                codigo: 'SW402-01',
                grupo: 'Grupo 01',
                profesor: 'Mg. Ana Torres',
                sesiones: [
                    {
                        tipo: 'Teórico',
                        horario: 'Miércoles 9:00-11:00',
                        aula: 'B-305',
                        dia: 'Miércoles'
                    },
                    {
                        tipo: 'Práctico',
                        horario: 'Viernes 9:00-11:00',
                        aula: 'Lab-2',
                        dia: 'Viernes'
                    }
                ]
            }
        ],
        SW604: [
            {
                codigo: 'SW402-01',
                grupo: 'Grupo 01',
                profesor: 'Mg. Ana Torres',
                sesiones: [
                    {
                        tipo: 'Teórico',
                        horario: 'Miércoles 9:00-11:00',
                        aula: 'B-305',
                        dia: 'Miércoles'
                    },
                    {
                        tipo: 'Práctico',
                        horario: 'Viernes 9:00-11:00',
                        aula: 'Lab-2',
                        dia: 'Viernes'
                    }
                ]
            }
        ],
        SW705: [
            {
                codigo: 'SW402-01',
                grupo: 'Grupo 01',
                profesor: 'Mg. Ana Torres',
                sesiones: [
                    {
                        tipo: 'Teórico',
                        horario: 'Miércoles 9:00-11:00',
                        aula: 'B-305',
                        dia: 'Miércoles'
                    },
                    {
                        tipo: 'Práctico',
                        horario: 'Viernes 9:00-11:00',
                        aula: 'Lab-2',
                        dia: 'Viernes'
                    }
                ]
            }
        ]
    };

    const handleVerSeccion = (codigoCurso) => {
        const curso = cursos.find(c => c.codigo === codigoCurso);
        setCursoSeleccionado(curso);
        setSeccionesCurso(seccionesEjemplo[codigoCurso] || []);
        setModalAbierto(true);
    };

    const handleMatricular = (seccionCodigo) => {
        console.log(`Matriculando en ${seccionCodigo} del curso ${cursoSeleccionado?.codigo}`);
        // Aquí iría la lógica de matriculación
        setModalAbierto(false);
    };

    return (
        <div>
            <div className='flex justify-between'>
                <div className='bg-blue-300 p-2 rounded-xl'>
                    <h1 className='font-bold text-blue-900'>Especialidad</h1>
                    <p>Desarrollo de software</p>
                </div>
                <div className='bg-blue-300 p-2 rounded-xl'>
                    <h1 className='font-bold text-blue-900'>Plan de estudios</h1>
                    <p>2018 - Plan de estudios 2018</p>
                </div>
            </div>
            <div className='mt-6'>
                <h1 className='font-bold'>CICLO 1</h1>
                <p>Seleccione los cursos que desea llevar</p>
                <div>
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden mt-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ciclo</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Código</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Asignatura</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Créditos</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Repitencia</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sección</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cursos.map((curso, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{curso.ciclo}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{curso.codigo}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{curso.asignatura}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{curso.creditos}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{curso.repitencia}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleVerSeccion(curso.codigo)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition"
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {modalAbierto && cursoSeleccionado && (
                        <ModalSecciones
                            curso={cursoSeleccionado}
                            secciones={seccionesCurso}
                            onClose={() => setModalAbierto(false)}
                            onMatricular={handleMatricular}
                        />
                    )}
                    <p className='text-xs mt-2'>(*) El mínimo de créditos es 12</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">HORARIO 2024 – II</h1>
                    <select className="px-4 rounded-md">
                        <option value="">Descargar</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                        <option value="pdf">PDF</option>
                    </select>
                </div>

                <div className="overflow-x-auto mt-8">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="w-24 p-2 border bg-gray-100">Hora</th>
                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((dia) => (
                                    <th key={dia} className="p-2 border bg-gray-100 text-center">{dia}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mañana 8:00 - 10:00 */}
                            <tr>
                                <td className="p-2 border text-center font-medium">08:00 - 10:00</td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-blue-50 rounded-md">
                                        <h3 className="font-bold text-blue-700">Desarrollo Web Frontend</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-blue-50 rounded-md">
                                        <h3 className="font-bold text-blue-700">Inteligencia Artificial</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-blue-50 rounded-md">
                                        <h3 className="font-bold text-blue-700">Cloud Computing</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border"></td>
                            </tr>

                            {/* Mañana 10:30 - 12:00 */}
                            <tr>
                                <td className="p-2 border text-center font-medium">10:30 - 12:00</td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-green-50 rounded-md">
                                        <h3 className="font-bold text-green-700">Desarrollo Web Frontend</h3>
                                        <p className="text-sm text-gray-600">Práctico</p>
                                    </div>
                                </td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-green-50 rounded-md">
                                        <h3 className="font-bold text-green-700">Inteligencia Artificial</h3>
                                        <p className="text-sm text-gray-600">Laboratorio</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-green-50 rounded-md">
                                        <h3 className="font-bold text-green-700">Cloud Computing</h3>
                                        <p className="text-sm text-gray-600">Práctico</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border"></td>
                            </tr>

                            {/* Tarde 14:00 - 16:00 */}
                            <tr>
                                <td className="p-2 border text-center font-medium">14:00 - 16:00</td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-blue-50 rounded-md">
                                        <h3 className="font-bold text-blue-700">Bases de Datos</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-blue-50 rounded-md">
                                        <h3 className="font-bold text-blue-700">Seguridad Informática</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-blue-50 rounded-md">
                                        <h3 className="font-bold text-blue-700">Machine Learning</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                            </tr>

                            {/* Tarde 16:30 - 18:00 */}
                            <tr>
                                <td className="p-2 border text-center font-medium">16:30 - 18:00</td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-green-50 rounded-md">
                                        <h3 className="font-bold text-green-700">Bases de Datos</h3>
                                        <p className="text-sm text-gray-600">Práctico</p>
                                    </div>
                                </td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-green-50 rounded-md">
                                        <h3 className="font-bold text-green-700">Seguridad Informática</h3>
                                        <p className="text-sm text-gray-600">Laboratorio</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-green-50 rounded-md">
                                        <h3 className="font-bold text-green-700">Machine Learning</h3>
                                        <p className="text-sm text-gray-600">Práctico</p>
                                    </div>
                                </td>
                                <td className="p-2 border"></td>
                            </tr>

                            {/* Noche 19:00 - 21:00 */}
                            <tr>
                                <td className="p-2 border text-center font-medium">19:00 - 21:00</td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-purple-50 rounded-md">
                                        <h3 className="font-bold text-purple-700">Desarrollo Backend</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-purple-50 rounded-md">
                                        <h3 className="font-bold text-purple-700">DevOps</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-purple-50 rounded-md">
                                        <h3 className="font-bold text-purple-700">Big Data</h3>
                                        <p className="text-sm text-gray-600">Teórico</p>
                                    </div>
                                </td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-yellow-50 rounded-md">
                                        <h3 className="font-bold text-yellow-700">Seminario de Tesis</h3>
                                        <p className="text-sm text-gray-600">Asesoría</p>
                                    </div>
                                </td>
                            </tr>

                            {/* Sábado mañana 8:00 - 12:00 */}
                            <tr>
                                <td className="p-2 border text-center font-medium">08:00 - 12:00</td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border"></td>
                                <td className="p-2 border">
                                    <div className="p-2 bg-red-50 rounded-md">
                                        <h3 className="font-bold text-red-700">Taller de Investigación</h3>
                                        <p className="text-sm text-gray-600">Sesión completa</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export function ModalSecciones({ curso, secciones, onClose, onMatricular }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{curso.codigo} - {curso.asignatura}</h3>
                            <p className="text-sm text-gray-600">Créditos: {curso.creditos} | Ciclo: {curso.ciclo}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {secciones.map((seccion, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="mb-3">
                                    <h4 className="font-medium text-gray-900">{seccion.grupo}</h4>
                                    <p className="text-sm text-gray-600">Profesor: {seccion.profesor}</p>
                                </div>

                                <div className="space-y-3">
                                    {seccion.sesiones.map((sesion, idx) => (
                                        <div key={idx} className="flex items-start">
                                            <span className={`inline-block px-2 py-1 text-xs rounded-full mr-3 
                          ${sesion.tipo === 'Teórico' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {sesion.tipo}
                                            </span>
                                            <div>
                                                <p className="text-sm font-medium">{sesion.dia} {sesion.horario}</p>
                                                <p className="text-xs text-gray-500">Aula: {sesion.aula}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => onMatricular(seccion.codigo)}
                                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
                                >
                                    Matricular en {seccion.grupo}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PagoContent() {
    const [cardNumber, setCardNumber] = useState('');

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substring(i, i + 4));
        }

        return parts.join(' ');
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value;
        const formatted = formatCardNumber(input);
        setCardNumber(formatted);
    };

    const metodosPago = [
        {
            id: 'visa',
            nombre: 'Visa',
            imagen: 'https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png',
            descripcion: 'Pago con tarjeta Visa. Aceptamos todas las tarjetas Visa crédito y débito.',
            instrucciones: 'Ingrese los 16 dígitos de su tarjeta, fecha de expiración y CVV.'
        },
        {
            id: 'mastercard',
            nombre: 'Mastercard',
            imagen: 'https://culqi.com/assets/images/icons/mastercard.svg',
            descripcion: 'Pago con tarjeta Mastercard. Aceptamos todas las tarjetas Mastercard.',
            instrucciones: 'Ingrese los 16 dígitos de su tarjeta, fecha de expiración y CVV.'
        },
        {
            id: 'yape',
            nombre: 'Yape',
            imagen: 'https://images.seeklogo.com/logo-png/38/1/yape-logo-png_seeklogo-381640.png',
            descripcion: 'Pago rápido y seguro con Yape desde tu celular.',
            instrucciones: 'Escanea el código QR o ingresa nuestro número Yape: 999 888 777'
        },
        {
            id: 'paypal',
            nombre: 'PayPal',
            imagen: 'https://images.seeklogo.com/logo-png/24/1/paypal-logo-png_seeklogo-249214.png',
            descripcion: 'Pago seguro a través de tu cuenta PayPal.',
            instrucciones: 'Serás redirigido a la plataforma de PayPal para completar tu pago.'
        },
        {
            id: 'plin',
            nombre: 'Plin',
            imagen: 'https://images.seeklogo.com/logo-png/38/1/plin-logo-png_seeklogo-386806.png',
            descripcion: 'Pago instantáneo con Plin desde tu app móvil.',
            instrucciones: 'Envía el pago a nuestro número Plin: 999 888 777'
        },
        {
            id: 'culqi',
            nombre: 'Culqi',
            imagen: 'https://culqi.com/assets/images/brand/culqi-logo.png?v=3',
            descripcion: 'Pago seguro con tarjetas usando la plataforma Culqi.',
            instrucciones: 'Serás redirigido a Culqi para completar el pago de forma segura.'
        }
    ];

    const [metodoSeleccionado, setMetodoSeleccionado] = useState(metodosPago[0]);

    const handleSeleccion = (metodo) => {
        setMetodoSeleccionado(metodo);
    };

    return (
        <div className="max-w-5xl relative">
            <div>
                <h2 className="text-xl font-bold text-gray-700 mb-6">MÉTODOS DE PAGO</h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="flex flex-row flex-wrap gap-4">
                            {metodosPago.map((metodo) => (
                                <div
                                    key={metodo.id}
                                    className={`flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${metodoSeleccionado?.id === metodo.id
                                        ? "border-blue-500 bg-blue-50"
                                        : ""
                                        }`}
                                    onClick={() => handleSeleccion(metodo)}
                                >
                                    <img
                                        src={metodo.imagen}
                                        alt={metodo.nombre}
                                        className="w-8 h-6 object-contain mb-1"
                                    />
                                    <span className="text-sm font-medium text-gray-600">
                                        {metodo.nombre}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {metodoSeleccionado && metodoSeleccionado.id === 'visa' && (
                            <div className='mt-8'>
                                <div className="space-y-4">
                                    <h1 className="text-lg font-bold">Recuerda activar las compras por internet con tu banco</h1>
                                    <p className='text-gray-400'>Indique su información</p>

                                    <img
                                        src="https://imgs.search.brave.com/1PeddEwnGk3APSuellGc-lRNMM8NeZurA6KahIsAZME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmlzYS5jb20ucGUv/ZGFtL1ZDT00vcmVn/aW9uYWwvbGFjL1NQ/QS9wYW5hbWEvcGFn/dWUtY29uLXZpc2Ev/Y2FyZHMvcHJlcGFn/YXMvdGFyamV0YS10/cmF2ZWwtNDAweDIy/NS5qcGc"
                                        className="w-full max-w-xs mb-4 rounded-lg"
                                        alt="Tarjeta Visa"
                                    />

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={19}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento (MM/AA)</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/AA"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    maxLength="5"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    maxLength="3"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del titular</label>
                                            <input
                                                type="text"
                                                placeholder="Como aparece en la tarjeta"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="rememberCard"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="rememberCard" className="ml-2 block text-sm text-gray-700">
                                                Recordar esta tarjeta para futuras compras
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {metodoSeleccionado && metodoSeleccionado.id === 'mastercard' && (
                            <div className='mt-8'>
                                <div className="space-y-4">
                                    <h1 className="text-lg font-bold">Recuerda activar las compras por internet con tu banco</h1>
                                    <p className='text-gray-400'>Indique su información</p>

                                    <img
                                        src="https://imgs.search.brave.com/AFRiZIs-FY-7yEJb8oTnaWmNDgI9u2Gm3mzjXzVVIKA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90YXJq/ZXRhc2JhbnJ1cmFs/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMi8wNy9NQy1T/dGFuZGFyLnBuZw"
                                        className="w-full max-w-xs mb-4 rounded-lg"
                                        alt="Tarjeta Mastercard"
                                    />

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={19}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento (MM/AA)</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/AA"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    maxLength="5"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    maxLength="3"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del titular</label>
                                            <input
                                                type="text"
                                                placeholder="Como aparece en la tarjeta"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="rememberCard"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="rememberCard" className="ml-2 block text-sm text-gray-700">
                                                Recordar esta tarjeta para futuras compras
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {metodoSeleccionado && metodoSeleccionado.id === 'yape' && (
                            <div className='mt-8'>
                                <div className="space-y-4">
                                    <h1 className="text-lg font-bold">Encuentralo en el menú de Yape</h1>
                                    <p className='text-gray-400'>Indique su información</p>

                                    <img
                                        src="https://imgs.search.brave.com/BhD2p_CPn85XHRh2XBAhygEXbv8zAGlthxNOOLe31WU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/NzUzNzQyNS9waG90/by9xci1iYXJjb2Rl/LWZvci1kYXRhLWxh/YmVsaW5nLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1Fb002/LVVHTVdNaVQ5eUVx/RW52NWRybEtnMGg5/czI3NWdvU3c1SV84/MmJjPQ"
                                        className="w-32 max-w-xs mb-4 rounded-lg"
                                        alt="Tarjeta Mastercard"
                                    />

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de celular</label>
                                            <input
                                                type="text"
                                                placeholder="999888111"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Código de aprobación</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {metodoSeleccionado && metodoSeleccionado.id === 'plin' && (
                            <div className='mt-8'>
                                <div className="space-y-4">
                                    <h1 className="text-lg font-bold">Encuentralo en el menú de Plin</h1>
                                    <p className='text-gray-400'>Indique su información</p>

                                    <img
                                        src="https://imgs.search.brave.com/BhD2p_CPn85XHRh2XBAhygEXbv8zAGlthxNOOLe31WU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/NzUzNzQyNS9waG90/by9xci1iYXJjb2Rl/LWZvci1kYXRhLWxh/YmVsaW5nLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1Fb002/LVVHTVdNaVQ5eUVx/RW52NWRybEtnMGg5/czI3NWdvU3c1SV84/MmJjPQ"
                                        className="w-32 max-w-xs mb-4 rounded-lg"
                                        alt="Tarjeta Mastercard"
                                    />

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de celular</label>
                                            <input
                                                type="text"
                                                placeholder="999888111"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Código de aprobación</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {metodoSeleccionado && metodoSeleccionado.id === 'paypal' && (
                            <div className='mt-8'>
                                <div className="space-y-4">
                                    <h1 className="text-lg font-bold">Pago seguro con PayPal</h1>
                                    <p className='text-gray-400'>Serás redirigido al sitio seguro de PayPal</p>
                                </div>
                            </div>
                        )}
                        {metodoSeleccionado && metodoSeleccionado.id === 'culqi' && (
                            <div className='mt-8'>
                                <div className="space-y-4">
                                    <h1 className="text-lg font-bold">Pago seguro con Culqui</h1>
                                    <p className='text-gray-400'>Serás redirigido al sitio seguro de Culqui</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sección derecha - Detalles de pago */}
                    <div className="lg:w-1/3 lg:border-l lg:border-gray-300 lg:pl-8 pt-6 lg:pt-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4"> {/* Hacemos sticky el resumen */}
                            <h1 className="text-xl font-bold text-gray-700 mb-6">DETALLES DE PAGO:</h1>
                            <div className="space-y-4">
                                <div className='flex justify-between'>
                                    <p className="text-gray-600">Matrícula</p>
                                    <p className="font-medium">S/0.00</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className="text-gray-600">Mensualidad</p>
                                    <p className="font-medium">S/0.00</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className="text-gray-600">IGV</p>
                                    <p className="font-medium">S/0.00</p>
                                </div>
                                <div className='border-t border-gray-200 pt-4 mt-4'>
                                    <div className='flex justify-between font-bold text-lg'>
                                        <p>Total</p>
                                        <p>S/0.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReporteContent() {
    const [cursos, setCursos] = useState([
        { ciclo: 'III', codigo: 'SW301', asignatura: 'Programación Orientada a Objetos', creditos: 4, repitencia: 'No' },
        { ciclo: 'IV', codigo: 'SW402', asignatura: 'Estructuras de Datos y Algoritmos', creditos: 5, repitencia: 'No' },
        { ciclo: 'V', codigo: 'SW503', asignatura: 'Bases de Datos', creditos: 4, repitencia: 'Sí' },
        { ciclo: 'VI', codigo: 'SW604', asignatura: 'Desarrollo Web Frontend', creditos: 4, repitencia: 'No' },
        { ciclo: 'VII', codigo: 'SW705', asignatura: 'Desarrollo Backend con Node.js', creditos: 5, repitencia: 'No' }
    ]);
    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            {/* Encabezado con gradiente y efecto de luz */}
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-center py-8 rounded-t-xl shadow-lg relative overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">PAGO REGISTRADO CON ÉXITO</h2>
                    <p className="text-blue-100 text-md font-light">Recibo de matrícula académica</p>
                    <div className="mt-3 flex justify-center">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                            Comprobante digital
                        </span>
                    </div>
                </div>
            </div>

            {/* Contenido principal con sombra suave y bordes redondeados */}
            <div className='mt-6 bg-white rounded-b-xl rounded-t-lg shadow-lg overflow-hidden border border-gray-100/70'>
                {/* Sección de cursos con header estilizado */}
                <div className='p-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <p className='font-bold text-xl text-gray-800'>Cursos matriculados</p>
                            <p className='text-gray-500 text-sm'>Periodo académico 2023-2</p>
                        </div>
                        <button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Descargar listado
                        </button>
                    </div>

                    {/* Tabla con diseño mejorado */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-xs">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Ciclo</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Código</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Asignatura</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Créditos</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Repitencia</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cursos.map((curso, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{curso.ciclo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{curso.codigo}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{curso.asignatura}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                                {curso.creditos} CR
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${curso.repitencia === 'Sí' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {curso.repitencia}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Línea divisoria decorativa */}
                <div className="border-t border-gray-200 mx-8"></div>

                {/* Sección de reporte de pago */}
                <div className='p-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <p className='font-bold text-xl text-gray-800'>Comprobante de pago</p>
                            <p className='text-gray-500 text-sm'>Transacción #24578</p>
                        </div>
                        <button className='flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-gray-700 text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Descargar recibo
                        </button>
                    </div>

                    {/* Recibo de pago con diseño de tarjeta premium */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Encabezado del recibo */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-5 px-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Pago de matrícula</h3>
                                    <p className="text-blue-100 text-xs">Fecha: {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm">
                                Completado
                            </span>
                        </div>

                        {/* Detalles del pago */}
                        <div className="px-6 py-5 space-y-4">
                            <div className="flex justify-between items-center py-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-1 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600 font-medium">Matrícula regular</span>
                                </div>
                                <span className="text-gray-800 font-semibold">S/0.00</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-1 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600 font-medium">Mensualidad</span>
                                </div>
                                <span className="text-gray-800 font-semibold">S/0.00</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-1 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600 font-medium">IGV (18%)</span>
                                </div>
                                <span className="text-gray-800 font-semibold">S/0.00</span>
                            </div>

                            {/* Total con efecto de destaque */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">TOTAL A PAGAR</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-bold text-blue-600">S/0.00</span>
                                        <span className="text-xs text-gray-500 mt-1">Incluye impuestos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pie de recibo con detalles adicionales */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-medium text-gray-700">Método de pago:</p>
                                    <p>Transferencia bancaria</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">N° de operación:</p>
                                    <p>OP-2023-0024578</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mensaje final */}
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Este comprobante ha sido generado automáticamente. Para cualquier consulta, contacte con la oficina de administración.</p>
            </div>
        </div>
    );
}