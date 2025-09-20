import { useState, useEffect } from "react";

export const useEspecialidades = () => {
  const storedEspecialidades =
    JSON.parse(localStorage.getItem("especialidades")) || [];
  const [especialidades, setEspecialidades] = useState(storedEspecialidades);

  useEffect(() => {
    localStorage.setItem("especialidades", JSON.stringify(especialidades));
  }, [especialidades]);

  const agregarEspecialidad = (nuevaEspecialidad) => {
    const nuevasEspecialidades = [...especialidades, nuevaEspecialidad];
    setEspecialidades(nuevasEspecialidades);
  };

  return { especialidades, agregarEspecialidad, setEspecialidades };
};
