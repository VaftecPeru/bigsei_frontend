import { useState, useEffect } from "react";

export const usePacientes = () => {
  // Cargar desde localStorage al iniciar
  const storedPacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  const [pacientes, setPacientes] = useState(storedPacientes);

  // Guardar en localStorage cuando se actualicen los pacientes
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  // Función para agregar pacientes
  const agregarPaciente = (nuevoPaciente) => {
    const nuevosPacientes = [...pacientes, nuevoPaciente];
    setPacientes(nuevosPacientes);
  };

  return { pacientes, agregarPaciente };
};
