import { useState, useEffect } from "react";

export const useHorarios = () => {
  const storedHorarios = JSON.parse(localStorage.getItem("horarios")) || [];
  const [horarios, setHorarios] = useState(storedHorarios);

  useEffect(() => {
    localStorage.setItem("horarios", JSON.stringify(horarios));
  }, [horarios]);

  const agregarHorario = (nuevaHorario) => {
    const nuevasHorarios = [...horarios, nuevaHorario];
    setHorarios(nuevasHorarios);
  };

  return { horarios, agregarHorario, setHorarios };
};
