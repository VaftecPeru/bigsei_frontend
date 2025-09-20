import { useEffect, useState } from "react";

const MotivationalBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    if (position > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }  text-white p-12 rounded-xl  max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out`}
    >
      <h2 className="text-3xl font-extrabold mb-6">
        Aprenda con <span className="text-orange-500">mas de 200</span> instituciones y educadores de primer nivel
        mundial
      </h2>
      <p className="text-lg mb-8 text-[#ddd]">
        Únase a una comunidad global de aprendizaje y avance en su carrera con
        los mejores recursos educativos.
      </p>
    </div>
  );
};

export default MotivationalBanner;
