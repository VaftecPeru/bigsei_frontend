import { Link } from "react-router-dom";

function FreeCourses() {
    return (
        <div className="pt-20 bg-gradient-to-br from-white via-pink-50 to-pink-100 p-8 flex items-center justify-center">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div className="flex justify-center">
                        <img
                            src="https://picsum.photos/600/400"
                            alt="Estudiante aprendiendo en línea"
                            className="w-full max-w-md h-auto object-cover rounded-2xl"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4 text-center md:text-left">
                        <h1 className="text-[2.5rem] font-bold text-[#333] leading-tight">
                            Mejora tus habilidades digitales con cursos online GRATUITOS
                        </h1>

                        <p className="text-gray-700 mt-6">
                            ¿Estás listo para adquirir habilidades en demanda para impulsar tu carrera tecnológica? El programa Click
                            Start de la Universidad de Leeds ofrece 29 cursos digitales GRATUITOS para ayudarte a dominar la
                            inteligencia artificial, la cadena de bloques, el desarrollo de software y más...
                        </p>

                        <div className="mt-6">
                            <div className="mb-4 flex items-center justify-center md:justify-start gap-4">
                                <p className="text-gray-600">Cursos impartidos por</p>
                                <img src="https://picsum.photos/100/30" alt="Click Start Logo" className="h-8" />
                            </div>

                            <Link to="/cursos" className="bg-[#E6007E] text-white px-8 py-2 rounded-full hover:bg-pink-700 transition-colors text-lg font-medium">
                                Empieza ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FreeCourses;
