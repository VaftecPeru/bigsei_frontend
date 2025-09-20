
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("El correo es obligatorio");
            return;
        }

        try {
            // Aquí deberías hacer la petición a tu API
            // await apiClient.post("/auth/forgot-password", { email });
            setSuccess("Se ha enviado un correo para restablecer tu contraseña.");
        } catch (err) {
            setError("No se pudo procesar la solicitud. Intenta más tarde.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-blue-900 p-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 mt-20"
            >
                <h1 className="text-3xl lg:text-2xl font-bold text-center text-[#FF8A00]">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-black text-base text-center mt-6">
                En esta opción te ayudaremos a reestablecer tu contraseña, debes proporcionarnos la información necesaria para tal propósito.
                </p>

                <div className="w-full mt-6 space-y-4">
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`peer w-full text-lg placeholder:text-lg text-gray-600 bg-transparent rounded-md px-4 py-3 placeholder:text-[#C0C0C0] focus:border-[#42A5F5] transition-all ${
                            error ? "border-[#ff0000]" : "border-[#C0C0C0]"
                        }`}
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {success && <p className="text-green-400 text-xs">{success}</p>}

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full text-white text-lg font-semibold py-3 px-6 rounded-lg bg-[#C9002B] hover:bg-[#00264A] transition-all duration-500 ease-in-out"
                    >
                        Enviar enlace
                    </Button>

                    <div className="text-center mt-4">
                        <a href="/" className="text-sky-400 font-bold text-lg hover:underline">
                            Volver al inicio de sesión
                        </a>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden lg:flex absolute top-20 left-1000 items-rigth"
            >
                <img src="/img/6.png" alt="Imagen Login" className="w-3/4 max-w-sm" />
            </motion.div>
        </div>
    );
}

export default ForgotPassword;
