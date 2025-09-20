import { Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const socialLinks = [
  {
    href: "https://www.facebook.com",
    src: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    alt: "Facebook",
    shadow: "hover:shadow-[0px_0px_5px_rgba(66,103,178,1)] rounded-lg",
  },
  {
    href: "https://www.linkedin.com",
    src: "https://cdn-icons-png.flaticon.com/512/733/733561.png",
    alt: "LinkedIn",
    shadow: "hover:shadow-[0px_0px_5px_rgba(0,119,181,1)] rounded-lg",
  },
  {
    href: "https://www.instagram.com",
    src: "https://cdn-icons-png.flaticon.com/512/733/733558.png",
    alt: "Instagram",
    shadow: "hover:shadow-[0px_0px_5px_rgba(193,53,132,1)] rounded-lg",
  },
  {
    href: "https://twitter.com",
    src: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    alt: "Twitter",
    shadow: "hover:shadow-[0px_0px_5px_rgba(29,161,242,1)] rounded-lg ",
  },
];

export default function Footer() {
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


  return (
    <footer className="bg-white mt-auto relative">
      {/* Contenido principal del footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y eslogan */}
          <div className="md:col-span-1 flex justify-center items-center">
            <h2 className="text-3xl font-semibold">
              <span className="text-blue-700">Mejora tus habilidades</span>
              <br />
              <span className="text-red-600">digitales</span>{" "}
              <span className="text-blue-900">con</span>
              <br />
              <span className="text-blue-900">cursos online</span>
            </h2>
          </div>

          {/* Sección de categorías */}
          <div className="md:col-span-1">
            <h3 className="text-orange-500 font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2 text-gray-600">
              {['Diseño Gráfico', 'Finanzas', 'Habilidades Personales', 'Marketing', 'Programación', 'Programas', 'Salud y Bienestar'].map((category) => (
                <li key={category} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección legal */}
          <div className="md:col-span-1">
            <h3 className="text-pink-500 font-semibold mb-4">Legales</h3>
            <ul className="space-y-2 text-gray-600">
              {['Términos y Condiciones', 'Política de Privacidad', 'Política de Cookies', 'Libro de Reclamaciones'].map((legal) => (
                <li key={legal} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-pink-500 transition-colors">
                    {legal}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="md:col-span-1">
            <h3 className="text-blue-500 font-semibold mb-4">Redes Sociales</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${social.shadow} hover:opacity-80 transition-opacity`}
                >
                  <img
                    src={social.src || "/placeholder.svg"}
                    alt={social.alt}
                    className="w-5 h-5"
                  />
                  <span className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                    {social.alt}
                  </span>
                </a>
              ))}
              <a
                href="mailto:info@bigsei.com"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Mail />
                info@bigsei.com
              </a>
            </div>
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
        <div className={`fixed right-4 bottom-6 z-20 w-80 bg-white rounded-t-lg shadow-2xl border border-gray-200 transition-all duration-300 transform ${isChatMinimized ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
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

      {/* Footer inferior */}
      <div className="bg-[#CB2145] text-white py-4 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
      <img src="img/icons/logofooter.png" alt="Logo" className="h-10" />
      </div>
      <div>
      <p className="text-center md:text-right">
      <strong>© 2025 Bigsei. Todos los derechos reservados.</strong>
      </p>
      </div>
      </div>
      </div>
    </footer>
  );
}