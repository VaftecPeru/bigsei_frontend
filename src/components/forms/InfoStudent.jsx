import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function InfoStudent() {
    const [firma, setFirma] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFirma(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };


    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        dni: '',
        nombres: '',
        apellidos: '',
        genero: '',
        fechaNacimiento: '',
        direccion: '',
        celular: '',
        correo: '',
        especializacion: ''
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState('padre');
    const [showModal, setShowModal] = useState(false);
    const [aceptaDeclaracion, setAceptaDeclaracion] = useState(false);
    const [verModal, setVerModal] = useState(false);
    const [acceptDeclaration, setacceptDeclaration] = useState(false);

    return (
        <div className="container mx-auto px-4 pb-8">
            <div className="flex justify-center mb-8">
                <div className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold`}>
                        1
                    </div>
                    <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>

                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold`}>
                        2
                    </div>
                    <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>

                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold`}>
                        3
                    </div>
                </div>
            </div>

            {currentStep === 1 && (
                <div>
                    <div className="bg-white px-4 sm:px-6 md:px-8 py-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
                        <h1 className={`text-xl sm:text-2xl font-bold mb-6 text-blue-900 border-b-2 border-blue-100 pb-3 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                            Paso 1: Registro de datos personales
                        </h1>

                        <div className="flex flex-wrap -mx-2 sm:-mx-3">
                            {/* Fila 1 - En móvil: 1 columna, en tablet+: 2 columnas, en desktop: 3 columnas */}
                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">DNI *</label>
                                <input
                                    type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${errors.dni ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                />
                                {errors.dni && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.dni}</p>
                                )}
                            </div>

                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-150 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Nombres *</label>
                                <input
                                    type="text"
                                    name="nombres"
                                    value={formData.nombres}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${errors.nombres ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                />
                                {errors.nombres && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.nombres}</p>
                                )}
                            </div>

                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Apellidos *</label>
                                <input
                                    type="text"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${errors.apellidos ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                />
                                {errors.apellidos && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.apellidos}</p>
                                )}
                            </div>

                            {/* Fila 2 */}
                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-250 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Género *</label>
                                <select
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none bg-white ${errors.genero ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                </select>
                                {errors.genero && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.genero}</p>
                                )}
                            </div>

                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Fecha de nacimiento *</label>
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    value={formData.fechaNacimiento}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${errors.fechaNacimiento ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                />
                                {errors.fechaNacimiento && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.fechaNacimiento}</p>
                                )}
                            </div>

                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-350 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Dirección *</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${errors.direccion ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                />
                                {errors.direccion && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.direccion}</p>
                                )}
                            </div>

                            {/* Fila 3 */}
                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Celular *</label>
                                <input
                                    type="tel"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${errors.celular ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                />
                                {errors.celular && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.celular}</p>
                                )}
                            </div>

                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-450 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Correo *</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${errors.correo ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                />
                                {errors.correo && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.correo}</p>
                                )}
                            </div>

                            <div className={`w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-6 transition-all duration-500 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Especialización *</label>
                                <select
                                    name="especializacion"
                                    value={formData.especializacion}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none bg-white ${errors.especializacion ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'}`}
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="Inteligencia artificial">Inteligencia artificial</option>
                                    <option value="Desarrollo web">Desarrollo web</option>
                                    <option value="Ciencia de datos">Ciencia de datos</option>
                                    <option value="Ciberseguridad">Ciberseguridad</option>
                                    <option value="Cloud computing">Cloud computing</option>
                                </select>
                                {errors.especializacion && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.especializacion}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`mt-1 sm:mt-2 flex justify-center transition-all duration-500 delay-550 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <button
                            onClick={() => setCurrentStep(2)}
                            className="mt-1 sm:mt-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <div>
                    <div className="bg-white mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 py-6 rounded-xl shadow-lg border border-gray-100">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-900 border-b-2 border-blue-100 pb-2 sm:pb-3">
                            Paso 2: Registro familiar
                        </h1>

                        <div className="mb-4 sm:mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                <div>
                                    <h1 className="font-medium text-sm sm:text-base">Datos: </h1>
                                </div>

                                {/* Radio Buttons - Apilados verticalmente en móvil, horizontal en tablet+ */}
                                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="padre"
                                            name="familiar"
                                            value="padre"
                                            onChange={handleOptionChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="padre" className="ml-2 block text-sm text-gray-700">
                                            Padre
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="madre"
                                            name="familiar"
                                            value="madre"
                                            onChange={handleOptionChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="madre" className="ml-2 block text-sm text-gray-700">
                                            Madre
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="apoderado"
                                            name="familiar"
                                            value="apoderado"
                                            onChange={handleOptionChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="apoderado" className="ml-2 block text-sm text-gray-700">
                                            Apoderado/a
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Campos que aparecen según la selección */}
                        {selectedOption && (
                            <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-4 sm:mt-6">
                                {/* Primera fila - 1 columna en móvil, 2 en tablet+ */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">DNI/CPI *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">Apellido Paterno *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Segunda fila */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">Apellido Materno *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">Nombres *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Tercera fila */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">Celular *</label>
                                        <input
                                            type="tel"
                                            className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">Domicilio *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                {selectedOption === 'apoderado' && (
                                    <>
                                        {/* Campos adicionales para apoderado */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-gray-700 text-sm font-medium mb-1">Centro Laboral</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 text-sm font-medium mb-1">Teléfono Trabajo</label>
                                                <input
                                                    type="tel"
                                                    className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Email - Ocupa toda la fila */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botones de navegación */}
                    <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-8 space-y-2 sm:space-y-0 space-y-reverse">
                        <button
                            onClick={() => setCurrentStep(1)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 sm:py-3 sm:px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => setCurrentStep(3)}
                            className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-semibold py-2 px-4 sm:py-3 sm:px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {currentStep === 3 && (
                <div className="px-2 sm:px-4 md:px-6">
                    <div className="bg-white mt-4 sm:mt-6 md:mt-8 px-3 sm:px-6 md:px-8 py-4 sm:py-6 rounded-xl shadow-lg border border-gray-100">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-900 border-b-2 border-blue-100 pb-2 sm:pb-3">
                            Paso 3: Ficha médica
                        </h1>

                        <div className='bg-gray-100 p-2 sm:p-4 rounded-lg'>
                            <div className='bg-blue-100 text-blue-900 font-bold text-center py-2 text-sm sm:text-base rounded-t-lg'>
                                FICHA DE INSCRIPCIÓN VIRTUAL Y DECLARACIÓN JURADA
                            </div>
                            <div className='bg-white p-2 sm:p-4 rounded-b-lg border border-gray-300'>
                                <p className='text-blue-900 text-xs sm:text-sm mb-3 sm:mb-4'>
                                    Llene la presente ficha de inscripción totalmente y con datos reales, ya que serán consignados en el sistema para su identificación y trámite documentario.
                                </p>

                                <div className="w-full bg-gray-200 p-2 border border-gray-500">
                                    {/* Fila 1 - Nombre IE y Código Modular */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                        <div className="bg-blue-100 p-3 font-semibold border border-gray-400">
                                            Nombre de la IE:
                                        </div>
                                        <div className="p-1 border border-gray-400">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Ingrese nombre"
                                            />
                                        </div>
                                        <div className="bg-blue-100 p-3 font-semibold border border-gray-400">
                                            Código Modular:
                                        </div>
                                        <div className="p-1 border border-gray-400">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Ej: 999999"
                                            />
                                        </div>
                                    </div>

                                    {/* Fila 2 - Tipo de Gestión y DRE/GRE */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                        <div className="bg-blue-100 p-3 font-semibold border border-gray-400">
                                            Tipo de Gestión:
                                        </div>
                                        <div className="p-1 border border-gray-400">
                                            <select className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                <option value="">Seleccione</option>
                                                <option value="publica">Pública</option>
                                                <option value="privada">Privada</option>
                                            </select>
                                        </div>
                                        <div className="bg-blue-100 p-3 font-semibold border border-gray-400">
                                            DRE/GRE:
                                        </div>
                                        <div className="p-1 border border-gray-400">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Ej: DRELM"
                                            />
                                        </div>
                                    </div>

                                    {/* Fila 3 - Resolución */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div className="bg-blue-100 p-3 font-semibold border border-gray-400">
                                            Resolución de Licenciamiento/Autorización:
                                        </div>
                                        <div className="p-1 border border-gray-400">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Tipo</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        placeholder="Ej: R.D."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Número</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        placeholder="Ej: 0458-2023"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Fecha</label>
                                                    <input
                                                        type="date"
                                                        className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    PROGRAMA DE ESTUDIOS A INSCRIBIRSE:
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* Fila 1 - Tipo de programa y Carrera */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100 flex items-center">
                                            <span>Tipo de programa:</span>
                                        </div>
                                        <div className="p-2 border-r border-gray-400">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Ej. EPE-2025-I"
                                            />
                                        </div>
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100 flex items-center">
                                            Carrera Especialización:
                                        </div>
                                        <div className="p-2">
                                            <select className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                <option value="">Seleccione</option>
                                                <option value="Inteligencia artificial">Inteligencia artificial</option>
                                                <option value="Desarrollo web">Desarrollo web</option>
                                                <option value="Ciencia de datos">Ciencia de datos</option>
                                                <option value="Ciberseguridad">Ciberseguridad</option>
                                                <option value="Cloud computing">Cloud computing</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Fila 2 - Turno */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100 flex items-center md:col-span-2">
                                            Turno:
                                        </div>
                                        <div className="p-3 md:col-span-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                                                {['Mañana', 'Tarde', 'Noche'].map((turno) => (
                                                    <label
                                                        key={turno}
                                                        className="flex items-center space-x-2 cursor-pointer select-none"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="turno"
                                                            value={turno.toLowerCase()}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                            onChange={(e) => console.log('Turno seleccionado:', e.target.value)}
                                                        />
                                                        <span className="font-medium text-gray-700">{turno}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fila 3 - Nivel formativo */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100 flex items-center md:col-span-2">
                                            Nivel formativo:
                                        </div>
                                        <div className="p-2 md:col-span-2">
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                                            >
                                                <option value="">Seleccione el nivel formativo</option>
                                                <option value="Bachiller">Bachiller</option>
                                                <option value="Master">Master</option>
                                                <option value="Licenciado">Licenciado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    DATOS DEL ESTUDIANTE:
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* Fila 1 - Apellidos y Nombres */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* Apellido Paterno */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                APELLIDO PATERNO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese apellido paterno"
                                                />
                                            </div>
                                        </div>

                                        {/* Apellido Materno */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                APELLIDO MATERNO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese apellido materno"
                                                />
                                            </div>
                                        </div>

                                        {/* Nombres */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                NOMBRES:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese nombres completos"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fila 2 - Correo, Documento */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* Correo */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                CORREO ELECTRÓNICO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese correo"
                                                />
                                            </div>
                                        </div>

                                        {/* Tipo Documento */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                TIPO DE DOCUMENTO:
                                            </div>
                                            <div className="p-3">
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="dni">DNI</option>
                                                    <option value="ce">Carné de Extranjería</option>
                                                    <option value="pasaporte">Pasaporte</option>
                                                    <option value="otros">Otros</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* N° Documento */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                N° DE DOCUMENTO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese número"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fila 3 - Fecha Nacimiento, Edad, Sexo */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* Fecha Nacimiento */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                FECHA DE NACIMIENTO:
                                            </div>
                                            <div className="p-3 grid grid-cols-3 gap-2">
                                                <select className="px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Día</option>
                                                    {Array.from({ length: 31 }, (_, i) => (
                                                        <option key={i} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                                <select className="px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Mes</option>
                                                    <option value="1">Enero</option>
                                                    <option value="2">Febrero</option>
                                                    <option value="3">Marzo</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Mayo</option>
                                                    <option value="6">Junio</option>
                                                    <option value="7">Julio</option>
                                                    <option value="8">Agosto</option>
                                                    <option value="9">Septiembre</option>
                                                    <option value="10">Octubre</option>
                                                    <option value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>
                                                </select>
                                                <select className="px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Año</option>
                                                    {Array.from({ length: 100 }, (_, i) => {
                                                        const year = new Date().getFullYear() - i;
                                                        return <option key={year} value={year}>{year}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Edad */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                EDAD:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Años"
                                                />
                                            </div>
                                        </div>

                                        {/* Sexo */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                SEXO:
                                            </div>
                                            <div className="p-2">
                                                <div className="flex flex-col xl:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="sexo" value="M" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Masculino</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="sexo" value="F" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Femenino</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fila 4 - Estado Civil, Teléfonos */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* Estado Civil */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                ESTADO CIVIL:
                                            </div>
                                            <div className="p-3">
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="soltero">Soltero</option>
                                                    <option value="casado">Casado</option>
                                                    <option value="divorciado">Divorciado</option>
                                                    <option value="separado">Separado</option>
                                                    <option value="viudo">Viudo</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Teléfono Fijo */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                TELÉFONO FIJO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese teléfono fijo"
                                                />
                                            </div>
                                        </div>

                                        {/* Celular */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                CELULAR:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese celular"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fila 5 - Grado Académico (full width) */}
                                    <div>
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            GRADO ACADÉMICO ACTUAL:
                                        </div>
                                        <div className="p-3">
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                <option value="">Seleccione</option>
                                                <option value="bachiller">Bachiller</option>
                                                <option value="titulado">Titulado</option>
                                                <option value="maestria">Maestría</option>
                                                <option value="doctorado">Doctorado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    LUGAR DE NACIMIENTO:
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-b border-gray-400">
                                        {/* País */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                PAÍS:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Perú"
                                                />
                                            </div>
                                        </div>

                                        {/* Departamento */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                DEPARTAMENTO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Lima"
                                                />
                                            </div>
                                        </div>

                                        {/* Provincia */}
                                        <div className="border-r border-gray-400 sm:border-r-0 lg:border-r">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                PROVINCIA:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Lima"
                                                />
                                            </div>
                                        </div>

                                        {/* Distrito */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                DISTRITO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Miraflores"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    LUGAR DE RESIDENCIA:
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* Fila 1 - Ubicación */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-b border-gray-400">
                                        {/* País */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                PAÍS:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Perú"
                                                />
                                            </div>
                                        </div>

                                        {/* Departamento */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                DEPARTAMENTO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Lima"
                                                />
                                            </div>
                                        </div>

                                        {/* Provincia */}
                                        <div className="border-r border-gray-400 sm:border-r-0 lg:border-r">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                PROVINCIA:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Lima"
                                                />
                                            </div>
                                        </div>

                                        {/* Distrito */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                DISTRITO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ej. Miraflores"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fila 2 - Domicilio */}
                                    <div>
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            DOMICILIO ACTUAL:
                                        </div>
                                        <div className="p-3">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Ej. Av. Aviación 567"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    DATOS DEL COLEGIO:
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* Fila 1 - Tipo de Colegio y Nombre */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100 flex items-center">
                                            Tipo de Colegio:
                                        </div>
                                        <div className="p-2 border-r border-gray-400">
                                            <select className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                <option value="">Seleccione</option>
                                                <option value="particular">Particular</option>
                                                <option value="estatal">Estatal</option>
                                            </select>
                                        </div>
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100 flex items-center">
                                            Colegio en que terminaste secundaria:
                                        </div>
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Ej: Trilce"
                                            />
                                        </div>
                                    </div>

                                    {/* Fila 2 - Año de término */}
                                    <div className="grid grid-cols-1 gap-0">
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100">
                                            Año en que terminó el Colegio:
                                        </div>
                                        <div className="p-2">
                                            <select className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                <option value="">Seleccione</option>
                                                <option value="2025">2025</option>
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    TRABAJA:
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* Fila 1 - ¿Trabaja actualmente? */}
                                    <div className="grid grid-cols-1 gap-0 border-b border-gray-400">
                                        <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100">
                                            ¿Trabaja actualmente?
                                        </div>
                                        <div className="p-2">
                                            <select
                                                id="trabaja-actualmente"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                onChange={(e) => {
                                                    const detallesTrabajo = document.getElementById('detalles-trabajo');
                                                    if (e.target.value === 'si') {
                                                        detallesTrabajo.classList.remove('hidden');
                                                    } else {
                                                        detallesTrabajo.classList.add('hidden');
                                                    }
                                                }}
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="si">Sí</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Fila 2 - Detalles del trabajo (condicional) */}
                                    <div id="detalles-trabajo" className="hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                            <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100">
                                                Razón Social:
                                            </div>
                                            <div className="p-2 border-r border-gray-400">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Nombre de la empresa"
                                                />
                                            </div>
                                            <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100">
                                                Teléfono:
                                            </div>
                                            <div className="p-2">
                                                <input
                                                    type="tel"
                                                    className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Número de contacto"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    SUFRE DE ALGUNA DISCAPACIDAD:
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* Pregunta inicial */}
                                    <div className="grid grid-cols-1 gap-0 border-b border-gray-400">
                                        <div className="p-3 font-semibold bg-blue-100">
                                            ¿Sufre de alguna discapacidad?
                                        </div>
                                        <div className="p-2">
                                            <select
                                                id="trabaja-actualmente"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                onChange={(e) => {
                                                    const detallesDiscapacidad = document.getElementById('detalles-discapacidad');
                                                    if (e.target.value === 'si') {
                                                        detallesDiscapacidad.classList.remove('hidden');
                                                    } else {
                                                        detallesDiscapacidad.classList.add('hidden');
                                                    }
                                                }}
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="si">Sí</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Detalles discapacidad (condicional) */}
                                    <div id="detalles-discapacidad" className="hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                            <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100">
                                                Especifique la discapacidad:
                                            </div>
                                            <div className="p-2">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Nombre de la discapacidad"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                            <div className="p-3 border-r border-gray-400 font-semibold bg-blue-100">
                                                N° de carnet del CONADIS:
                                            </div>
                                            <div className="p-2">
                                                <input
                                                    type="tel"
                                                    className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Número de CONADIS"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    DATOS DEL PADRE, MADRE O APODERADO (en caso fuera menor de edad):
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* Nombre completo */}
                                    <div className="grid grid-cols-1 gap-0 border-b border-gray-400">
                                        <div className="p-3 font-semibold bg-blue-100">
                                            Nombre completo:
                                        </div>
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Apellidos y Nombres"
                                            />
                                        </div>
                                    </div>

                                    {/* Parentesco y Tipo Documento */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 font-semibold bg-blue-100">
                                                Parentesco:
                                            </div>
                                            <div className="p-2">
                                                <select className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="padre">Padre</option>
                                                    <option value="madre">Madre</option>
                                                    <option value="apoderado">Apoderado</option>
                                                    <option value="tutor">Tutor</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="p-3 font-semibold bg-blue-100">
                                                Tipo de Documento:
                                            </div>
                                            <div className="p-2">
                                                <select className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="dni">DNI</option>
                                                    <option value="carnet">Carné de Extranjería</option>
                                                    <option value="pasaporte">Pasaporte</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* N° Documento y Teléfono */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 font-semibold bg-blue-100">
                                                N° de Documento:
                                            </div>
                                            <div className="p-2">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Número de documento"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="p-3 font-semibold bg-blue-100">
                                                Teléfono:
                                            </div>
                                            <div className="p-2">
                                                <input
                                                    type="tel"
                                                    className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Número de contacto"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Correo electrónico */}
                                    <div className="grid grid-cols-1 gap-0 border-b border-gray-400">
                                        <div className="p-3 font-semibold bg-blue-100">
                                            Correo electrónico:
                                        </div>
                                        <div className="p-2">
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Dirección */}
                                    <div className="grid grid-cols-1 gap-0">
                                        <div className="p-3 font-semibold bg-blue-100">
                                            Dirección:
                                        </div>
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Dirección completa"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className='text-blue-900 text-sm mb-4 font-bold mt-4'>
                                    EVALUACIÓN DEL ESTADO NUTRICIONAL:
                                </p>

                                <p className='inline-block text-black bg-blue-200 border border-black py-2 px-2 rounded-xl text-sm mb-4 font-bold mt-2'>
                                    SECCIÓN 1: DATOS GENERALES
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* First Row - Names */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* Apellido Paterno */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                APELLIDO PATERNO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese apellido paterno"
                                                />
                                            </div>
                                        </div>

                                        {/* Apellido Materno */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                APELLIDO MATERNO:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese apellido materno"
                                                />
                                            </div>
                                        </div>

                                        {/* Nombres */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                NOMBRES:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese nombres completos"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Row - Birth Date, Age, Gender */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* Fecha de Nacimiento */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                FECHA DE NACIMIENTO:
                                            </div>
                                            <div className="p-3 grid grid-cols-3 gap-2">
                                                <select className="px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Día</option>
                                                    {Array.from({ length: 31 }, (_, i) => (
                                                        <option key={i} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                                <select className="px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Mes</option>
                                                    <option value="1">Enero</option>
                                                    <option value="2">Febrero</option>
                                                    <option value="3">Marzo</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Mayo</option>
                                                    <option value="6">Junio</option>
                                                    <option value="7">Julio</option>
                                                    <option value="8">Agosto</option>
                                                    <option value="9">Septiembre</option>
                                                    <option value="10">Octubre</option>
                                                    <option value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>
                                                </select>
                                                <select className="px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Año</option>
                                                    {Array.from({ length: 100 }, (_, i) => {
                                                        const year = new Date().getFullYear() - i;
                                                        return <option key={year} value={year}>{year}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Edad */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                EDAD:
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Años"
                                                />
                                            </div>
                                        </div>

                                        {/* Sexo */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                SEXO:
                                            </div>
                                            <div className="p-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="sexo" value="M" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Masculino</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="sexo" value="F" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Femenino</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Full-width fields */}
                                    <div className="border-b border-gray-400">
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            ESCUELA O INSTITUCIÓN ACADÉMICA:
                                        </div>
                                        <div className="p-3">
                                            <input type='text' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder='Ej. Trilce' />
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-400">
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            GRADO ESCOLAR:
                                        </div>
                                        <div className="p-3">
                                            <input type='text' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder='Ej. 5to año culminado' />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            LUGAR DE RESIDENCIA:
                                        </div>
                                        <div className="p-3">
                                            <input type='text' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder='Ej. Av. Jesus Maria 564' />
                                        </div>
                                    </div>
                                </div>

                                <p className='inline-block text-black bg-blue-200 border border-black py-2 px-2 rounded-xl text-sm mb-4 font-bold mt-4'>
                                    SECCIÓN 2: MEDIDAS ANTROPOMÉTRICAS
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* First Row - Weight, Height, BMI */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* Peso */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                PESO (KG):
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese peso en kg"
                                                />
                                            </div>
                                        </div>

                                        {/* Talla */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                TALLA (CM):
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese talla"
                                                />
                                            </div>
                                        </div>

                                        {/* IMC */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                IMC (NUM):
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese su IMC"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Row - Waist, Hip, Fat Percentage */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                                        {/* Cintura */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100 min-h-[4rem] flex items-center">
                                                MEDIDA CINTURA (CM):
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese medida cintura en cm"
                                                />
                                            </div>
                                        </div>

                                        {/* Cadera */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100 min-h-[4rem] flex items-center">
                                                MEDIDA CADERA (CM):
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese medida cadera en cm"
                                                />
                                            </div>
                                        </div>

                                        {/* % Grasa */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100 min-h-[4rem] flex items-center">
                                                PORCENTAJE GRASA (%): (OPCIONAL)
                                            </div>
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Ingrese porcentaje"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='inline-block text-black bg-blue-200 border border-black py-2 px-2 rounded-xl text-sm mb-4 font-bold mt-4'>
                                    SECCIÓN 3: HISTORIAL DE ALIMENTACIÓN
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* 1. Número de comidas + 2. Tipo de alimentos */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-gray-400">
                                        {/* 1. Número de comidas */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                1. NÚMERO DE COMIDAS AL DÍA:
                                            </div>
                                            <div className="p-3">
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="1-2">1-2 comidas</option>
                                                    <option value="3">3 comidas</option>
                                                    <option value="4+">4 o más comidas</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 2. Tipo de alimentos */}
                                        <div className="lg:col-span-2">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                2. TIPO DE ALIMENTOS CONSUMIDOS (Marque todos):
                                            </div>
                                            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Frutas y verduras</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Lácteos</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Cereales integrales</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Proteínas (carne, huevo, legumbres)</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Comida rápida</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Dulces y snacks</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Frutas/verduras + 4. Bebidas azucaradas */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        {/* 3. Consumo de frutas/verduras */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                3. CONSUMO DIARIO DE FRUTAS/VERDURAS:
                                            </div>
                                            <div className="p-3">
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="0">Ninguna porción</option>
                                                    <option value="1-2">1-2 porciones</option>
                                                    <option value="3+">3 o más porciones</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 4. Bebidas azucaradas */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                4. CONSUMO DE BEBIDAS AZUCARADAS:
                                            </div>
                                            <div className="p-3">
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="nunca">Nunca</option>
                                                    <option value="1semana">1 vez por semana</option>
                                                    <option value="2-4semana">2-4 veces por semana</option>
                                                    <option value="diario">Todos los días</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5. Comida rápida + 6. Desayuno */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        {/* 5. Comida rápida */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                5. FRECUENCIA DE COMIDA RÁPIDA:
                                            </div>
                                            <div className="p-3">
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="nunca">Nunca</option>
                                                    <option value="1semana">1 vez por semana</option>
                                                    <option value="2-4semana">2-4 veces por semana</option>
                                                    <option value="diario">Todos los días</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 6. Desayuno */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                6. ¿DESAYUNA DIARIAMENTE?
                                            </div>
                                            <div className="p-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="desayuno" value="si" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Sí</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="desayuno" value="no" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">No</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 7. Consumo de agua */}
                                    <div className="border-b border-gray-400">
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            7. CONSUMO DIARIO DE AGUA:
                                        </div>
                                        <div className="p-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                                <input
                                                    type="text"
                                                    className="w-full sm:w-1/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                    placeholder="Cantidad"
                                                />
                                                <select className="w-full sm:w-1/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="litros">Litros</option>
                                                    <option value="vasos">Vasos</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='inline-block text-black bg-blue-200 border border-black py-2 px-2 rounded-xl text-sm mb-4 font-bold mt-4'>
                                    SECCIÓN 4: HISTORIAL DE ACTIVIDAD FÍSICA
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* 1. Activity Days + 2. Duration */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        {/* 1. Activity Days */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100 min-h-[5rem] flex items-center">
                                                1. ¿CUÁNTOS DÍAS A LA SEMANA REALIZAS ACTIVIDAD FÍSICA?
                                            </div>
                                            <div className="p-3">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="7"
                                                        className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        placeholder="0-7"
                                                    />
                                                    <span>días</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. Activity Duration */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100 min-h-[5rem] flex items-center">
                                                2. ¿CUÁNTO TIEMPO DURA CADA SESIÓN?
                                            </div>
                                            <div className="p-3">
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                    <option value="">Seleccione</option>
                                                    <option value="<30">Menos de 30 minutos</option>
                                                    <option value="30-60">30-60 minutos</option>
                                                    <option value=">60">Más de 60 minutos</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Activity Type */}
                                    <div className="border-b border-gray-400">
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            3. TIPO DE ACTIVIDAD FÍSICA REALIZADA (Describir):
                                        </div>
                                        <div className="p-3">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                placeholder="Ej: Running, natación, fútbol, gimnasio..."
                                            />
                                        </div>
                                    </div>

                                    {/* 4. Sedentary Time */}
                                    <div>
                                        <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                            4. TIEMPO DIARIO EN ACTIVIDADES SEDENTARIAS (pantallas):
                                        </div>
                                        <div className="p-3">
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
                                                <option value="">Seleccione</option>
                                                <option value="<1">Menos de 1 hora</option>
                                                <option value="1-2">1-2 horas</option>
                                                <option value="3-4">3-4 horas</option>
                                                <option value=">4">Más de 4 horas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p className='inline-block text-black bg-blue-200 border border-black py-2 px-2 rounded-xl text-sm mb-4 font-bold mt-4'>
                                    SECCIÓN 5: HISTORIAL DE SALUD Y ANTECEDENTES
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    {/* 1. Diagnosed Illness + 2. Food Allergies */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                        {/* 1. Diagnosed Illness */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                1. ¿TIENES ALGUNA ENFERMEDAD DIAGNOSTICADA?
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="enfermedad" value="si" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Sí</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="enfermedad" value="no" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">No</span>
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        placeholder="Especificar enfermedad (si aplica)"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. Food Allergies */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                2. ¿TIENES ALGUNA ALERGIA ALIMENTARIA?
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="alergia" value="si" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Sí</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="alergia" value="no" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">No</span>
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        placeholder="Especificar alergia (si aplica)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Medications + 4. Family History */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                        {/* 3. Medications */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                3. ¿CONSUMES ALGÚN MEDICAMENTO REGULARMENTE?
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="medicamento" value="si" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">Sí</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="medicamento" value="no" className="h-4 w-4 focus:ring-blue-500" />
                                                        <span className="ml-2">No</span>
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        placeholder="Especificar medicamento (si aplica)"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* 4. Family History */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                4. ¿ANTECEDENTES FAMILIARES DE?
                                            </div>
                                            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Obesidad</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Diabetes</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Hipertensión</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Ninguna</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='inline-block text-black bg-blue-200 border border-black py-2 px-2 rounded-xl text-sm mb-4 font-bold mt-4'>
                                    SECCIÓN 6: BIENESTAR PSICOSOCIAL
                                </p>

                                <div className="w-full border border-gray-500 bg-gray-200 rounded">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                                        {/* 1. Health Perception */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                1. ¿CÓMO PERCIBES TU ESTADO DE SALUD?
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <label className="flex items-center">
                                                    <input type="radio" name="salud" value="bueno" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Bueno</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="salud" value="regular" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Regular</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="salud" value="malo" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Malo</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* 2. Body Image */}
                                        <div className="border-r border-gray-400">
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                2. ¿CÓMO TE SIENTES CON TU IMAGEN CORPORAL?
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <label className="flex items-center">
                                                    <input type="radio" name="imagen" value="satisfecho" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Satisfecho/a</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="imagen" value="insatisfecho" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Insatisfecho/a</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="imagen" value="indiferente" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Indiferente</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* 3. Food Stress */}
                                        <div>
                                            <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                3. ¿ESTRÉS/ANSIEDAD POR ALIMENTACIÓN?
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <label className="flex items-center">
                                                    <input type="radio" name="estres" value="si" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">Sí</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="estres" value="no" className="h-4 w-4 focus:ring-blue-500" />
                                                    <span className="ml-2">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className='inline-block text-black bg-blue-200 border border-black py-2 px-2 rounded-xl text-sm mb-4 font-bold mt-4'>
                                    SECCIÓN 7: OBSERVACIONES DEL EVALUADOR
                                </p>

                                <table className="w-full border border-gray-500 bg-gray-200">
                                    <tbody>
                                        {/* Comentarios adicionales */}
                                        <tr className="border-b border-gray-400">
                                            <td className="align-top" colSpan="3">
                                                <div className="flex flex-col h-full">
                                                    <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                        COMENTARIOS ADICIONALES:
                                                    </div>
                                                    <div className="p-3 flex-1">
                                                        <textarea
                                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                            rows="4"
                                                            placeholder="Escriba aquí sus observaciones adicionales..."
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Recomendaciones nutricionales */}
                                        <tr className="border-b border-gray-400">
                                            <td className="align-top" colSpan="3">
                                                <div className="flex flex-col h-full">
                                                    <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                        RECOMENDACIONES NUTRICIONALES:
                                                    </div>
                                                    <div className="p-3 flex-1">
                                                        <textarea
                                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                            rows="4"
                                                            placeholder="Escriba aquí las recomendaciones nutricionales..."
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Firma del evaluador */}
                                        <tr>
                                            <td className="align-top" colSpan="3">
                                                <div className="flex flex-col h-full">
                                                    <div className="p-3 border-b border-gray-400 font-semibold bg-blue-100">
                                                        FIRMA DEL EVALUADOR:
                                                    </div>
                                                    <div className="relative h-full min-h-[100px]">
                                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                                            <div className="w-3/4 border-t border-gray-400 pt-1">
                                                                <span className="text-xs text-gray-500">Nombre y firma</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <div className="w-full border border-gray-500 bg-gray-200 mt-12 rounded">
                                    {/* Header */}
                                    <div className="p-2 text-left border-b border-gray-400 bg-blue-100 font-semibold">
                                        OTROS DATOS:
                                    </div>

                                    {/* 1. Payment Support */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 font-semibold md:col-span-1">
                                            1. ¿QUIÉN TE APOYARÁ CON EL PAGO DE TUS ESTUDIOS? (marcar con X)
                                        </div>
                                        <div className="p-2 border-r border-gray-400">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>Padres o apoderados</span>
                                            </label>
                                        </div>
                                        <div className="p-2 border-r border-gray-400">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>Otro familiar</span>
                                            </label>
                                        </div>
                                        <div className="p-2 border-r border-gray-400">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>Yo mismo</span>
                                            </label>
                                        </div>
                                        <div className="p-2">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>Soy becado</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* 2. Payer's Occupation */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 font-semibold md:col-span-1">
                                            2. OCUPACIÓN DEL QUE PAGARÁ TUS ESTUDIOS (obligatorio)
                                        </div>
                                        <div className="p-2 md:col-span-4">
                                            <input type="text" className="w-full px-3 py-1 border border-gray-300 rounded" />
                                        </div>
                                    </div>

                                    {/* 3. Payment Receipt Type */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 font-semibold md:col-span-1">
                                            3. TIPO DE COMPROBANTE DE PAGO QUE REQUIERES (obligatorio) (marcar con X)
                                        </div>
                                        <div className="p-2 border-r border-gray-400">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>Boleta</span>
                                            </label>
                                        </div>
                                        <div className="p-2 md:col-span-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>Factura</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Reminder */}
                                    <div className="p-2 italic text-sm border-b border-gray-400">
                                        ¡Recuerda!
                                    </div>

                                    {/* 4. First Choice */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 font-semibold md:col-span-1">
                                            4. ¿FUE TU PRIMERA OPCIÓN CUANDO DECIDISTE ESTUDIAR UN PROGRAMA O CURSO? (obligatorio) (marcar con X)
                                        </div>
                                        <div className="p-2 border-r border-gray-400">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>SI</span>
                                            </label>
                                        </div>
                                        <div className="p-2 md:col-span-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="h-4 w-4" />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 md:col-span-1">
                                            En caso de marcar No, indica tu primera opción:
                                        </div>
                                        <div className="p-2 md:col-span-4">
                                            <input type="text" className="w-full px-3 py-1 border border-gray-300 rounded" />
                                        </div>
                                    </div>

                                    {/* 5. Study Reasons */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 font-semibold md:col-span-1">
                                            5. ¿POR QUÉ DECIDISTE ESTUDIAR? (obligatorio) (marcar con X)
                                        </div>
                                        <div className="p-2 md:col-span-4">
                                            <div className="space-y-2">
                                                <label className="flex items-start space-x-2">
                                                    <input type="checkbox" className="h-4 w-4 mt-1" />
                                                    <span>Prestigio y Trayectoria</span>
                                                </label>
                                                <label className="flex items-start space-x-2">
                                                    <input type="checkbox" className="h-4 w-4 mt-1" />
                                                    <span>Un amigo o familiar me recomendó la Institución por su calidad académica</span>
                                                </label>
                                                <label className="flex items-start space-x-2">
                                                    <input type="checkbox" className="h-4 w-4 mt-1" />
                                                    <span>Precio: Era lo más accesible que mi familia o yo podíamos costear para estudiar una carrera de salud</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 6. How Did You Hear */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 font-semibold md:col-span-1">
                                            6. ¿CÓMO TE ENTERASTE? (obligatorio) (marcar con X)
                                        </div>
                                        <div className="p-2 md:col-span-4">
                                            <input type="text" className="w-full px-3 py-1 border border-gray-300 rounded" />
                                        </div>
                                    </div>

                                    {/* 7. Media Channels */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-400">
                                        <div className="p-2 border-r border-gray-400 font-semibold md:col-span-1">
                                            7. ¿EN QUE MEDIOS NOS HAS VISTO O ESCUCHADO? (obligatorio) (marcar más de una alternativa)
                                        </div>
                                        <div className="p-2 md:col-span-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Televisión</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Cine</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Radio</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Spotify</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Volantes</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Paneles publicitarios en vías públicas</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Correo electrónico</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Redes sociales</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" className="h-4 w-4" />
                                                    <span>Web</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 8. Current Student */}
                                    <div className="border-b border-gray-400">
                                        <div className="p-2 font-semibold">
                                            8. ¿ES ACTUALMENTE ESTUDIANTE? (obligatorio)
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-gray-400">
                                            <div className="p-2 border-r border-gray-400">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="estudiante_actual"
                                                        value="si"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    SI
                                                </label>
                                            </div>
                                            <div className="p-2">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="estudiante_actual"
                                                        value="no"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    NO
                                                </label>
                                            </div>
                                        </div>
                                        <div className="p-2 border-t border-gray-400">
                                            En caso de marcar Si, de qué carrera o programa/curso:
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded mt-1"
                                                id="carrera_actual"
                                            />
                                        </div>
                                    </div>

                                    {/* 9. Graduate */}
                                    <div>
                                        <div className="p-2 font-semibold border-b border-gray-400">
                                            9. ¿ES EGRESADO? (obligatorio)
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-400">
                                            <div className="p-2 border-r border-gray-400">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="estudiante_egresado"
                                                        value="si"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    SI
                                                </label>
                                            </div>
                                            <div className="p-2">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="estudiante_egresado"
                                                        value="no"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    NO
                                                </label>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            En caso de marcar Si, de qué carrera o programa/curso:
                                            <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded mt-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4 px-4 sm:px-0">
                        {/* Primer checkbox - Declaración Jurada */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    id="acepta-declaracion"
                                    type="checkbox"
                                    checked={aceptaDeclaracion}
                                    onChange={(e) => {
                                        if (aceptaDeclaracion) {
                                            setAceptaDeclaracion(false);
                                        }
                                    }}
                                    onClick={(e) => {
                                        if (!aceptaDeclaracion) {
                                            e.preventDefault();
                                            setShowModal(true);
                                        }
                                    }}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300 cursor-pointer"
                                />
                            </div>
                            <label htmlFor="acepta-declaracion" className="ml-3 text-sm">
                                <span className="font-medium text-gray-700">
                                    He leído y acepto la{' '}
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                        className="text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Declaración Jurada del Estudiante
                                    </button>
                                </span>
                            </label>
                        </div>

                        {/* Segundo checkbox - Consentimiento Informado */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    id="accept-declaracion"
                                    type="checkbox"
                                    checked={acceptDeclaration}
                                    onChange={(e) => {
                                        if (acceptDeclaration) {
                                            setacceptDeclaration(false);
                                        }
                                    }}
                                    onClick={(e) => {
                                        if (!acceptDeclaration) {
                                            e.preventDefault();
                                            setVerModal(true);
                                        }
                                    }}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                                />
                            </div>
                            <label htmlFor="accept-declaracion" className="ml-3 text-sm">
                                <span className="font-medium text-gray-700">
                                    He leído y acepto el{' '}
                                    <button
                                        type="button"
                                        onClick={() => setVerModal(true)}
                                        className="text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Consentimiento Informado
                                    </button>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between mt-8 px-4 sm:px-0 space-y-4 sm:space-y-0">
                        <button
                            onClick={() => setCurrentStep(2)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
                        >
                            Anterior
                        </button>
                        <Link
                            to="/new-student/proceso-matricula"
                            className={`inline-flex justify-center items-center bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center ${!aceptaDeclaracion || !acceptDeclaration
                                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                                : 'hover:from-green-500 hover:to-green-400'
                                }`}
                        >
                            Siguiente
                        </Link>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-all duration-300">
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-100">
                                {/* Header con gradiente */}
                                <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 rounded-t-xl">
                                    <h2 className="text-2xl font-bold text-center text-white">
                                        DECLARACIÓN JURADA DEL ESTUDIANTE
                                    </h2>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Fecha con diseño mejorado */}
                                    <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-lg p-3">
                                        <span className="text-gray-700 font-medium">Lima,</span>
                                        <input
                                            type="text"
                                            className="w-12 border-b-2 border-blue-300 text-center focus:border-blue-500 focus:outline-none bg-transparent pb-1"
                                            placeholder="DD"
                                        />
                                        <span className="text-gray-700 font-medium">de</span>
                                        <input
                                            type="text"
                                            className="w-32 border-b-2 border-blue-300 text-center focus:border-blue-500 focus:outline-none bg-transparent pb-1"
                                            placeholder="Mes"
                                        />
                                        <span className="text-gray-700 font-medium">de 20</span>
                                        <input
                                            type="text"
                                            className="w-12 border-b-2 border-blue-300 text-center focus:border-blue-500 focus:outline-none bg-transparent pb-1"
                                            placeholder="AA"
                                        />
                                    </div>

                                    {/* Sección de cronograma de pagos */}
                                    <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                                        <h1 className="text-lg font-bold text-gray-800 border-b pb-2 border-blue-200">CRONOGRAMA DE PAGOS</h1>

                                        {/* Encabezados de tabla */}
                                        <div className="grid grid-cols-3 gap-4 font-medium text-gray-600 border-b pb-2">
                                            <p className="text-blue-700">Concepto</p>
                                            <p className="text-center text-blue-700">Monto</p>
                                            <p className="text-right text-blue-700">Fecha</p>
                                        </div>

                                        {/* Filas de pagos */}
                                        <div className="divide-y divide-gray-100">
                                            {[
                                                { concepto: "Matrícula", monto: "S/ 100.00", fecha: "01-04-2025" },
                                                { concepto: "1ra cuota", monto: "S/ 100.00", fecha: "01-05-2025" },
                                                { concepto: "2da cuota", monto: "S/ 100.00", fecha: "01-06-2025" },
                                                { concepto: "3ra cuota", monto: "S/ 100.00", fecha: "01-07-2025" },
                                                { concepto: "4ta cuota", monto: "S/ 100.00", fecha: "01-08-2025" }
                                            ].map((item, index) => (
                                                <div key={index} className="grid grid-cols-3 gap-4 py-3 items-center hover:bg-blue-50/50 transition-colors">
                                                    <p className="text-gray-700">{item.concepto}</p>
                                                    <p className="text-center font-medium text-gray-800">{item.monto}</p>
                                                    <p className="text-right text-gray-500">{item.fecha}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Total */}
                                        <div className="grid grid-cols-3 gap-4 pt-4 mt-2 border-t border-gray-200 font-bold text-blue-800">
                                            <p>Total</p>
                                            <p className="text-center">S/ 500.00</p>
                                            <p className="text-right"></p>
                                        </div>
                                    </div>

                                    {/* Sección de firma */}
                                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                                        <div className="flex flex-col items-center w-full md:w-auto">
                                            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                                                Firma del alumno o del padre/apoderado:
                                            </p>
                                            <div className="w-56 h-32 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 flex items-center justify-center transition-all hover:border-blue-300">
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Firma del alumno"
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-sm text-center p-4">
                                                        <svg className="w-10 h-10 mx-auto mb-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                        Vista previa de la firma
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center w-full md:w-auto space-y-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                                                Subir firma digital
                                            </label>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            <button
                                                onClick={triggerFileInput}
                                                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                Seleccionar imagen
                                            </button>
                                            <p className="text-xs text-gray-500 text-center">
                                                Formatos: JPG, PNG, SVG (max. 2MB)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Datos personales */}
                                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <label className="font-medium text-gray-700 md:w-32">Nombre completo:</label>
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Ingrese nombre completo"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <label className="font-medium text-gray-700 md:w-32">DNI:</label>
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Ingrese número de DNI"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <label className="font-medium text-gray-700 md:w-32">Teléfono:</label>
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Ingrese número telefónico"
                                            />
                                        </div>
                                    </div>

                                    {/* Texto de autorización */}
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            <span className="font-semibold text-blue-800">Autorizo libre y expresamente</span> el tratamiento de mis datos personales, los cuales serán registrados en el banco de datos "Alumnos" de titularidad de la Institución. (en adelante, el "colegio/Instituto/Universidad"), con la finalidad que esta última pueda almacenar mis datos, y además remitirme información a través de mi correo electrónico, WhatsApp, número de teléfono o dirección física sobre promociones, concursos, ofertas y, en general, realizar publicidad sobre los servicios de la institución durante un plazo indefinido o hasta que revoque esta autorización. Se me ha informado que la institución tratará directamente mis datos personales o a través de terceros. Cabe precisar que la presente autorización es obligatoria a fin que la institución pueda cumplir con la finalidad antes mencionada. Podré ejercer los derechos contenidos en la Ley N° 29733, su reglamento y/o normas modificatorias, dirigiendo una solicitud al domicilio fiscal de la institución.
                                        </p>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm hover:shadow-md flex-1 sm:flex-none"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setAceptaDeclaracion(true);
                                                setShowModal(false);
                                            }}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg flex-1 sm:flex-none flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Aceptar Declaración
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {verModal && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-all duration-300">
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
                                {/* Header con gradiente */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
                                    <h2 className="text-2xl font-bold text-center text-white">
                                        CONSENTIMIENTO INFORMADO
                                    </h2>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Fecha con diseño mejorado */}
                                    <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-lg p-3">
                                        <span className="text-gray-700 font-medium">Lima,</span>
                                        <input
                                            type="text"
                                            className="w-12 border-b-2 border-blue-300 text-center focus:border-blue-500 focus:outline-none bg-transparent pb-1"
                                            placeholder="DD"
                                        />
                                        <span className="text-gray-700 font-medium">de</span>
                                        <input
                                            type="text"
                                            className="w-32 border-b-2 border-blue-300 text-center focus:border-blue-500 focus:outline-none bg-transparent pb-1"
                                            placeholder="Mes"
                                        />
                                        <span className="text-gray-700 font-medium">de 20</span>
                                        <input
                                            type="text"
                                            className="w-12 border-b-2 border-blue-300 text-center focus:border-blue-500 focus:outline-none bg-transparent pb-1"
                                            placeholder="AA"
                                        />
                                    </div>

                                    {/* Contenido con mejor tipografía */}
                                    <div className="space-y-6 text-gray-700">
                                        <p className="leading-relaxed">
                                            <span className="font-semibold text-blue-700">Estimado/a participante y padres o tutores legales:</span> <br />
                                            Esta evaluación tiene como objetivo conocer el estado nutricional de adolescentes de 12 a 17 años para fines de investigación. La participación es voluntaria y toda la información proporcionada será confidencial y utilizada únicamente con propósitos institucionales de una mejor oferta de servicio.
                                        </p>

                                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                            <h1 className="font-bold text-blue-800 mb-2">Declaración del Participante y Tutor Legal:</h1>
                                            <p className="leading-relaxed">
                                                He leído y comprendido la información proporcionada. Estoy de acuerdo en participar en la evaluación del estado nutricional y autorizo el uso de los datos recopilados para los fines institucionales.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sección de firmas con diseño mejorado */}
                                    <div className="flex flex-col mt-6 md:flex-row gap-8 items-center justify-between">
                                        <div className="flex flex-col items-center w-full md:w-auto">
                                            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                                                Firma del alumno o del padre/apoderado:
                                            </p>
                                            <div className="w-56 h-32 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 flex items-center justify-center transition-all hover:border-blue-300">
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Firma del alumno"
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-sm text-center p-4">
                                                        <svg className="w-10 h-10 mx-auto mb-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                        Vista previa de la firma
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center w-full md:w-auto space-y-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                                                Subir firma digital
                                            </label>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            <button
                                                onClick={triggerFileInput}
                                                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                Seleccionar imagen
                                            </button>
                                            <p className="text-xs text-gray-500 text-center">
                                                Formatos: JPG, PNG, SVG (max. 2MB)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Datos personales con diseño mejorado */}
                                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <label className="font-medium text-gray-700 md:w-32">Nombre completo:</label>
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Ingrese nombre completo"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <label className="font-medium text-gray-700 md:w-32">DNI:</label>
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Ingrese número de DNI"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <label className="font-medium text-gray-700 md:w-32">Teléfono:</label>
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Ingrese número telefónico"
                                            />
                                        </div>
                                    </div>

                                    {/* Botones con mejor diseño */}
                                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
                                        <button
                                            onClick={() => setVerModal(false)}
                                            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm hover:shadow-md flex-1 sm:flex-none"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setacceptDeclaration(true);
                                                setVerModal(false);
                                            }}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg flex-1 sm:flex-none flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Aceptar Consentimiento
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}