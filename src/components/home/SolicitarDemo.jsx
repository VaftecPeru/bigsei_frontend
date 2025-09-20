import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTimes, FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";

function SolicitarDemo() {
  const [isLoading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: '¡Hola! 👋 ¿En qué podemos ayudarte hoy?', sender: 'bot' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Agregar mensaje del usuario
    setMessages([...messages, { text: message, sender: 'user' }]);
    setMessage('');

    // Simular respuesta del bot después de 1 segundo
    setTimeout(() => {
      setMessages(prev => [...prev,
      { text: 'Gracias por tu mensaje. Un agente te responderá pronto.', sender: 'bot' }
      ]);
    }, 1000);
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatMinimized(true);
      setTimeout(() => {
        setIsChatOpen(false);
        setIsChatMinimized(false);
      }, 300);
    } else {
      setIsChatOpen(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      correo: "",
      razon_social: "",
      numero_trabajadores: "",
      pais: "",
      cargo: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    apiClient.post(Api_Global_Web.solicitudes.registrarEmpresa(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        reset();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  }

  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#213C69] to-[#213C69] flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="lg:w-1/3">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Que tu equipo crezca con {" "} <span className="text-red-800">BIGSEI</span> </h1>
            <div className="w-20 h-0.5 bg-cyan-400 my-6"></div>
            <h2 className="text-2xl text-white font-semibold mb-4">Solicita una demo</h2>
            <p className="text-gray-300">
              Llena el siguiente formulario y una persona del equipo Iessin se comunicará contigo para brindarte
              asesoría y la demostración.
            </p>
          </div>
          <div className="w-[90%] lg:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    Nombres<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("nombre", { required: true })}
                    id="nombre"
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa tu nombre"
                  />
                  {errors.nombre && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                </div>

                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    Correo corporativo<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("correo", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa tu correo"
                    type="email"
                  />
                  {errors.correo && <span className="text-xs text-pink-500">Ingresa un correo válido</span>}
                </div>

                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    Nombre de tu empresa<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("razon_social", { required: true })}
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa tu empresa"
                  />
                  {errors.razon_social && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                </div>

                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    País de residencia<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("pais", { required: true })}
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa tu país"
                  />
                  {errors.pais && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    Apellidos<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("apellido", { required: true })}
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa tus apellidos"
                  />
                  {errors.apellido && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                </div>

                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    Número de teléfono<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("telefono", {
                      required: true,
                      pattern: /^[0-9+\-\s()]*$/,
                    })}
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa tu número"
                    type="tel"
                  />
                  {errors.telefono && <span className="text-xs text-pink-500">Ingresa un teléfono válido</span>}
                </div>

                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    Número de Trabajadores<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("numero_trabajadores", {
                      required: true,
                      pattern: /^[0-9]*$/,
                    })}
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa la cantidad de trabajadores"
                    type="number"
                  />
                  {errors.numero_trabajadores && <span className="text-xs text-pink-500">Ingresa un número válido</span>}
                </div>

                <div>
                  <label className="block text-sm text-cyan-400 mb-1">
                    Cargo<span className="text-pink-500">*</span>
                  </label>
                  <input
                    {...register("cargo", { required: true })}
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                    placeholder="Ingresa tu cargo"
                  />
                  {errors.cargo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                </div>
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="border-[#FF1F6D] border-2 bg-pink-900 text-white px-8 py-3 rounded-full hover:bg-[#FF1F6D]/90 transition-colors"
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Solicita una demo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className={`fixed right-4 z-30 cursor-pointer transition-all duration-300 ease-in-out ${isChatOpen ? 'bottom-[460px]' : 'bottom-6'} ${isChatMinimized ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        onClick={toggleChat}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H14L9 21V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {!isChatOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
              !
            </div>
          )}
        </div>
      </div>

      {/* Ventana del chat */}
      {isChatOpen && (
        <div className={`fixed right-4 bottom-6 z-20 w-80 bg-white rounded-t-lg shadow-2xl border border-gray-700 transition-all duration-300 transform ${isChatMinimized ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">Soporte en vivo</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          <div className="h-64 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                  : 'bg-gray-200 text-gray-800 rounded-tl-none'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <div className={`text-xs mt-1 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-r-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Soporte en línea 24/7
            </p>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default SolicitarDemo;