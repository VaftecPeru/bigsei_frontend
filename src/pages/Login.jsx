import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Api_Global_Auth } from "../services/AuthApi";
import apiClient from "../Utils/apiClient";
import Cookies from 'js-cookie';
import LoginGoogle from "@/components/google/buttonLoginGoogle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formulario, setFormulario] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '', auth: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const goToWeb = (url_base) => {
        navigate(`/`);
    };

    const onLogin = async () => {
        const newErrors = {
            username: formulario.username.trim() === '' ? 'El usuario es obligatorio' : '',
            password: formulario.password.trim() === '' ? 'La contraseña es obligatoria' : '',
            auth: ''
        };
        setErrors(newErrors);

        if (newErrors.username || newErrors.password) return;

        setLoading(true);
        setIsLoading(true);
        try {
            const data = {
                username: formulario.username,
                password: formulario.password,
            };
            const response = await apiClient.post(Api_Global_Auth.sessions.login(), data);
            if (response.status === 200) {
                const { token, url_base, id_usuario, nombre } = response.data;
                // if (Cookies.get('token') == null) {
                //     Cookies.set('token', token, { path: '/', secure: true, sameSite: 'strict' });
                // }
                Cookies.set('token', token, { path: '/', secure: true, sameSite: 'strict' });
                Cookies.set('nombre', nombre, { path: '/', secure: true, sameSite: 'strict' });
                Cookies.set('idUser', id_usuario, { path: '/', secure: true, sameSite: 'strict' });
                toast.success("Realizado.");
                setTimeout(() => {
                    goToWeb();
                }, 700);
            }
        } catch (error) {
            setIsLoading(false);
            toast.warning(error.response.data);
            setErrors((prev) => ({ ...prev, auth: 'Usuario o contraseña incorrectos' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen items-center justify-center gap-32 p-5 bg-gradient-to-br from-black to-blue-900">
            {loading && (
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#83184C] to-[#C9002B] z-50"
                />
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 flex flex-col justify-center items-center w-full max-w-sm lg:w-1/2 bg-loginBox shadow-lg rounded-3xl lg:shadow-none"
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-center text-sky-400">
                    ¡Nos alegra verte de nuevo por aquí!
                </h1>
                <p className="text-white text-xs text-center mt-2">
                    Inicia sesión para acceder a tu cuenta
                </p>
                <form className="flex flex-col w-full max-w-md mt-6 space-y-4">
                    <Input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        value={formulario.username}
                        onChange={(e) => setFormulario({ ...formulario, username: e.target.value })}
                        className={`peer w-full text-white bg-transparent border rounded-md px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 text-sm transition-all ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600'
                            }`}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}

                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        value={formulario.password}
                        onChange={(e) => setFormulario({ ...formulario, password: e.target.value })}
                        className={`peer w-full text-white bg-transparent border rounded-md px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 text-sm transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600'
                            }`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                    <div className="flex items-center justify-between text-white text-sm">
                        <span>Mostrar contraseña</span>
                        <Switch checked={showPassword} onCheckedChange={setShowPassword} className="bg-gray-700 border-gray-600 focus:ring-blue-600" />
                    </div>

                    <Button type="button" onClick={onLogin} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                        {/* Ingresar */}
                        {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Ingresar'}
                    </Button>
                    {errors.auth && <p className="text-red-500 text-center text-sm mt-2">{errors.auth}</p>}
                </form>
                <button
                    className="mt-4 text-sm text-sky-400 hover:underline"
                    onClick={() => navigate("/login/forgot-password")}
                >
                    {isLoading ? <ClipLoader color="#ffffff" size={20} /> : '¿Olvidaste tu contraseña?'}
                </button>
                {isLoading ? (
                    <ClipLoader color="#ffffff" size={20} />
                ) : (
                    <LoginGoogle />
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden lg:flex justify-center items-center"
            >
                <img src="/img/6.png" alt="Imagen Login" className="w-3/4 max-w-sm" />
            </motion.div>

            <ToastContainer />
        </div>
    );
}

export default Login;