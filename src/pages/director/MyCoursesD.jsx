import { useState, useEffect } from "react";
import CourseCardD from "./courses/CourseCardD";
import { BookOpen, Search } from "lucide-react";
import { Api_Global_Director } from "../../services/DirectorApi";
import apiClient from "../../Utils/apiClient";
import { ClipLoader } from 'react-spinners';

const estilos = [
  {
    bgColor: "bg-purple-200",
    textColor: "text-purple-800",
  },
  {
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-800",
  },
  {
    bgColor: "bg-green-200",
    textColor: "text-green-800",
  },
  {
    bgColor: "bg-pink-200",
    textColor: "text-pink-800",
  },
  {
    bgColor: "bg-blue-200",
    textColor: "text-blue-800",
  },
  {
    bgColor: "bg-orange-200",
    textColor: "text-orange-800",
  },
  {
    bgColor: "bg-red-200",
    textColor: "text-red-800",
  },
  {
    bgColor: "bg-teal-200",
    textColor: "text-teal-800",
  },
  {
    bgColor: "bg-gray-200",
    textColor: "text-gray-800",
  },
  {
    bgColor: "bg-indigo-200",
    textColor: "text-indigo-800",
  },
  {
    bgColor: "bg-cyan-200",
    textColor: "text-cyan-800",
  },
  {
    bgColor: "bg-lime-200",
    textColor: "text-lime-800",
  },
  {
    bgColor: "bg-rose-200",
    textColor: "text-rose-800",
  },
  {
    bgColor: "bg-fuchsia-200",
    textColor: "text-fuchsia-800",
  },
  {
    bgColor: "bg-emerald-200",
    textColor: "text-emerald-800",
  },
  {
    bgColor: "bg-violet-200",
    textColor: "text-violet-800",
  },
  {
    bgColor: "bg-amber-200",
    textColor: "text-amber-800",
  },
  {
    bgColor: "bg-sky-200",
    textColor: "text-sky-800",
  },
  {
    bgColor: "bg-zinc-200",
    textColor: "text-zinc-800",
  },
  {
    bgColor: "bg-red-300",
    textColor: "text-red-900",
  },
];

function MyCoursesD() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursos, setCursos] = useState([]);

  const indexColor = (i) => {
    if (i < 20) {
      return i;
    } else {
      const res = i % 20;
      return res;
    }
  };

  const handleCursos = (text_search = "") => {
    setIsLoading(true);
    apiClient.get(Api_Global_Director.academicoPeriodoCursos.listar(text_search))
      .then((response) => {
        setIsLoading(false);
        const data = response.data.map((item, index) => ({
          index: (index+1),
          id:  item.id_periodocurso,
          title: item.curso_nombre,
          teacher: item.docente_nombre,
          role: item.curso_nombre,
          email: item.correo,
          time: item.horario_descripcion,
          location: item.aula_nombre,
          bgColor: estilos[indexColor(index)].bgColor,
          textColor: estilos[indexColor(index)].textColor,
        }));
        setCursos(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCursos([]);
      });
  };

  const changeCursos = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    handleCursos(searchTerm);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full bg-sky-50 p-6">
      <div className="w-full max-w-7xl p-4">
        <div className="flex justify-end text-sm text-gray-500">
          <a href="#" className="hover:underline">
            Iaion &gt; Menú &gt; Cursos
          </a>
        </div>
      </div>

      <div className="max-w-7xl w-full shadow-md rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold flex items-center">
            <BookOpen className="mr-2 w-6 h-6" />
            Cursos Existentes
          </h2>
        </div>

        <div className="px-4 py-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="texto de busqueda"
              value={searchTerm}
              onChange={(e) => changeCursos(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Buscar curso"
            />
          </div>
          <button
            onClick={() => handleCursos(searchTerm)}
            className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm flex items-center gap-1"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {cursos.length > 0 ? (
            cursos.map((course) => (
              <CourseCardD key={course.id} course={course} />
            ))
          ) : (
            <p className="text-center text-xl font-bold col-span-full my-6 text-gray-500">
              No se encontraron cursos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCoursesD;