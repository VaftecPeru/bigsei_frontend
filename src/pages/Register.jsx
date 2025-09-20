import { useState } from 'react';
import { Link } from "react-router-dom"

function Register() {
    const [activeTab, setActiveTab] = useState('registro');

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <Link to="/" className="p-2 flex items-center">
                    <span className="sr-only">Your Company</span>
                    <img
                        alt="Image logo"
                        src="/img/full_bigsei_fontblue.png"
                        className="block dark:hidden w-auto h-auto max-w-[100px] sm:max-w-[150px] min-w-[80px]"
                    />
                    <img
                        alt="Image logo dark"
                        src="/img/6.png"
                        className="hidden dark:block w-auto h-auto max-w-[100px] sm:max-w-[150px] min-w-[80px]"
                    />
                </Link>
            </div>

            <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                {/* Pestañas */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setActiveTab('inicio')}
                        className={`py-2 px-4 font-bold text-sm focus:outline-none ${activeTab === 'inicio'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        onClick={() => setActiveTab('registro')}
                        className={`py-2 px-4 font-bold text-sm focus:outline-none ${activeTab === 'registro'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        Registro
                    </button>
                </div>

                {/* Contenido de las pestañas */}
                <div className="mt-6">
                    {activeTab === 'inicio' ? (
                        <div>
                            <div className='space-y-4'>
                                {/* Botón Facebook con hover */}
                                <div className='flex items-center bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white p-2 cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                    <p className="ml-2">Inicia sesión con Facebook</p>
                                </div>

                                {/* Botón Google con hover */}
                                <div className='flex items-center bg-blue-400 hover:bg-blue-500 transition-colors duration-200 text-white p-2 cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chrome-icon lucide-chrome">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="4" />
                                        <line x1="21.17" x2="12" y1="8" y2="8" />
                                        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
                                        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
                                    </svg>
                                    <p className="ml-2">Inicia sesión con Google</p>
                                </div>

                                {/* Botón Organización con hover */}
                                <div className='flex items-center border border-blue-900 hover:bg-blue-50 transition-colors duration-200 text-blue-900 p-2 cursor-pointer'>
                                    <p>Inicia sesión con tu organización</p>
                                </div>
                            </div>

                            <div className='mt-4 mb-4 flex items-center'>
                                <div className='flex-grow border-t border-gray-300 dark:border-gray-600'></div>
                                <p className='mx-4 text-gray-500 dark:text-gray-400'>O</p>
                                <div className='flex-grow border-t border-gray-300 dark:border-gray-600'></div>
                            </div>

                            <form>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Correo
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Sección de opciones adicionales */}
                                <div className="mb-6 flex flex-col space-y-2">
                                    <div className="flex justify-end">
                                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-400 dark:text-gray-300">
                                            Recordarme
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                >
                                    Iniciar sesión
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nombres Completos
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Correo
                                    </label>
                                    <input
                                        type="email"
                                        id="reg-email"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="reg-password"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Repite Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                >
                                    Registrar
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;