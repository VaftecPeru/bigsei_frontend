import Header from "@/components/layout/Header";
import { MBACard } from "@/components/grados/MBACard";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { AccordionDesign } from "@/components/ux/Accordition/Accordion";
import { EducationalFooter } from "@/components/ui/footer/EducationalFooter";
import { LoadingComponentXDesing } from "@/components/ui/loading/LoadingComponent";
import { ChevronRight } from "lucide-react";
import { LoadingComponent } from "@/components/ux/skeleton/LoadingComponent";


const categories = [
  "Programación y desarrollo web",
  "Desarrollo frontend",
  "Desarrollo backend",
  "Inteligencia Artificial",
  "Marketing y negocios",
  "Seguridad Informática",
  "DevOps y Cloud Computing",
  "Ciberseguridad",
  "UX/UI design",
  "Diseño y multimedia",
  "Desarrollo móvil",
  "Redes y electrónica",
  "Inglés para developers",
  "Creación de contenido",
  "Análisis y ciencia de datos",
];

const courses = {
  "Programación y desarrollo web": [
    {
      title: "HTML & CSS Ninja – Domina la base del desarrollo web",
      slug: "html-css-ninja",
      img: "https://i.ytimg.com/vi/rr2H086z16s/maxresdefault.jpg",
      description:
        "Aprende desde cero a crear sitios web profesionales con HTML y CSS.",
    },
    {
      title: "HTML & CSS Ninja – Domina la base del desarrollo web",
      slug: "html-css-ninja",
      img: "https://i.ytimg.com/vi/rr2H086z16s/maxresdefault.jpg",
      description:
        "Aprende desde cero a crear sitios web profesionales con HTML y CSS.",
    },
    {
      title:
        "Diseño UX/UI con Figma y Tailwind CSS – Crea interfaces que enamoran",
      slug: "ux-ui-figma-tailwind",
      img: "https://img.freepik.com/vector-gratis/fondo-degradado-ui-ux_23-2149051557.jpg",
      description:
        "Domina el diseño de interfaces modernas con herramientas avanzadas.",
    },
  ],
  "Desarrollo frontend": [
    {
      title: "JavaScript Moderno (ES6+) al Máximo – De principiante a experto",
      slug: "javascript-moderno",
      img: "https://www.datocms-assets.com/48401/1628644950-javascript.png",
      description: "Conviértete en un experto en JavaScript  ",
    },
    {
      title:
        "React Masterclass – Construye aplicaciones interactivas como un pro",
      slug: "react-masterclass",
      img: "https://kinsta.com/es/wp-content/uploads/sites/8/2023/04/react-must-be-in-scope-when-using-jsx.jpg",
      description: "Aprende a crear aplicaciones web con React desde cero.",
    },
    {
      title: "Angular Pro – Arquitectura escalable y buenas prácticas",
      slug: "angular-pro",
      img: "https://ionic.io/blog/wp-content/uploads/2024/02/angular-feature-image-1-1024x512.png",
      description: "Domina Angular y desarrolla aplicaciones escalables.",
    },
  ],
  "Desarrollo backend": [
    {
      title:
        "SQL Server desde Cero – Aprende consultas, relaciones y optimización",
      slug: "sql-server",
      img: "https://storage.googleapis.com/medium-feed.appspot.com/images%2F9353691196%2Fbf0353ae89496-O-que-e-SQL-Server.jpg",
      description: "Domina SQL Server y la gestión de bases de datos.",
    },
    {
      title: "Python Backend Power – Crea APIs robustas con Django y Flask",
      slug: "python-backend",
      img: "https://cdn.activestate.com/wp-content/uploads/2021/12/python-coding-mistakes.jpg",
      description:
        "Aprende a desarrollar APIs seguras y eficientes con Python.",
    },
    {
      title: "Java desde Cero a Experto – Tu camino al backend profesional",
      slug: "java-backend",
      img: "https://blog.codmind.com/content/images/2021/01/banner-12.jpg",
      description: "Domina Java para el desarrollo backend.",
    },{
      title: "Java desde Cero a Experto – Tu camino al backend profesional",
      slug: "java-backend",
      img: "https://blog.codmind.com/content/images/2021/01/banner-12.jpg",
      description: "Domina Java para el desarrollo backend.",
    },
  ],
};


const EventosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "Programación y desarrollo web"
  );
  
  const [loading, setLoading] = useState(1)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <div className="w-[97%] mx-auto p-8">
          <div className="mb-12 text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Eventos en línea
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Aprenda de manera flexible con nuestros cursos de grado en línea
              creados por las principales universidades. Desde la licenciatura
              hasta el posgrado, haga que el aprendizaje a nivel de grado
              funcione para usted y lleve su carrera al siguiente nivel.
            </p>
          </div>
          <div className="flex gap-4 py-8 flex-col md:flex-row">
            <div className="w-[350px]">
              <h3 className="text-xl font-semibold text-[#3a343a]">
                Categorías
              </h3>
              <ul className="space-y-2">
                {categories.map((item) => (
                  <li
                    key={item}
                    onClick={() => setSelectedCategory(item)}
                    className={clsx("flex items-center  hover:underline cursor-pointer  ",   selectedCategory === item ? "text-blue-600 underline font-semibold": "text-gray-600")}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {item} ({courses[item]?.length || 0})
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-4">
              {loading ? (
                <LoadingComponent courses={courses} selectedCategory={selectedCategory}/>
              ) : courses[selectedCategory]?.length ? (
                courses[selectedCategory].map((course, index) => (
                  <MBACard
                    key={index}
                    title={course.title}
                    slug={course.slug}
                    img={course.img}
                    description={course.description}
                  />
                ))
              ) : (
                <p className="text-gray-600">
                  Todavía no hay cursos disponibles en esta categoría.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <section className="w-[97%] mx-auto p-8">
        <h2 className="text-[#3a343a] text-[2rem] font-semibold">
          Gana tu licenciatura en línea y estudia a tu propio ritmo
        </h2>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h2 className="text-[#3a343a] text-[2rem] font-semibold">
          Por qué deberías elegir una licenciatura en línea
        </h2>
        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Flexibilidad y comodidad
        </h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Flexibilidad y comodidad
        </h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Flexibilidad y comodidad
        </h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">
          Nuestras licenciaturas totalmente en línea le permiten iniciar su
          carrera y obtener un título a su conveniencia. Estudie de prestigiosas
          universidades a nivel mundial, en cualquier momento, en cualquier
          lugar. Equilibra su educación con sus otros compromisos sin sacrificar
          la calidad.{" "}
        </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">
          Preguntas frecuentes
        </h3>
        <div className="w-[100%] mx-auto mt-8">
          <AccordionDesign
            title={"Qué puedes hacer con una licenciatura en línea?"}
            content={
              "Una licenciatura en línea te prepara para varios roles en varios sectores, incluyendo negocios, salud, educación, tecnología y las artes. Los graduados a menudo realizan estudios o certificaciones adicionales para avanzar aún más en sus carreras."
            }
          />
          <AccordionDesign
            title={
              "Cuánto tiempo se tarda en obtener una licenciatura en línea?"
            }
            content={
              "La duración de completar una licenciatura en línea suele oscilar entre 3 y 4 años, dependiendo de la estructura del programa y de su ritmo de estudio."
            }
          />
          <AccordionDesign
            title={"Cuánto cuesta una licenciatura en línea?"}
            content={
              "El costo de los grados de licenciatura varía dependiendo de una multitud de factores. Los grados en línea, sin embargo, suelen costar menos que los títulos tradicionales. Con Bigsei, usted encontrará títulos de licenciatura en línea de universidades de clase mundial a un costo más asequible que las tasas universitarias tradicionales."
            }
          />
        </div>
      </section>

      <EducationalFooter />
    </div>
  );
};

export default EventosPage;
