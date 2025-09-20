import PropTypes from "prop-types";

const promotions = [
  {
    title: "Docentes de Calidad",
    description:
      "Aprende de los mejores instructores y alcanza tus objetivos con cursos cuidadosamente diseñados.",
    buttonText: "Explorar más",
  },
  {
    title: "Cursos Innovadores",
    description:
      "Accede a programas que combinan teoría y práctica para una experiencia de aprendizaje única.",
    buttonText: "Descubrir cursos",
  },
  {
    title: "Transforma tu Futuro",
    description:
      "Invierte en ti y desbloquea nuevas oportunidades con conocimientos prácticos y relevantes.",
    buttonText: "Comenzar ahora",
  },
];

const PromotionCard = ({title, description, buttonText}) => (
  <div className="flex flex-col items-center text-center bg-white rounded-lg p-8 shadow-lg hover:shadow-xl hover:shadow-yellow-500 transform hover:scale-105 transition duration-300">
    <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <a
      href="#"
      className="inline-block bg-red-600 text-white py-2 px-6 rounded-full font-medium hover:bg-red-700 transition"
    >
      {buttonText}
    </a>
  </div>
);

const Promotions = () => (
  <section className="py-16">
    <div className="container mx-auto px-6 lg:px-20 text-center">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-6">
        Invierte en tu Futuro
      </h2>
      <p className="text-gray-100 text-lg max-w-2xl mx-auto mb-12">
        Aprovecha nuestras promociones exclusivas y accede a contenido que
        transformará tu vida personal y profesional.
      </p>
      <div className="grid grid-cols-1 lg:w-full sm:w-80 sm:grid-cols-1 sm:mx-auto lg:grid-cols-3 gap-12">
        {promotions.map((promo, index) => (
          <PromotionCard
            key={index}
            title={promo.title}
            description={promo.description}
            buttonText={promo.buttonText}
          />
        ))}
      </div>
    </div>
  </section>
);

PromotionCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
  };

export default Promotions;
