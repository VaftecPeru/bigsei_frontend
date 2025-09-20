import { useEffect, useState } from "react";

export const usePaginationHor = (data = [], elementosPorPagina = 4) => {
  let storedHorarios = [];
  try {
    storedHorarios = JSON.parse(localStorage.getItem("horarios")) || [];
  } catch (error) {
    console.error("Error al leer localStorage:", error);
  }

  const [dataHorario, setDataHorario] = useState(
    data.length ? data : storedHorarios
  );
  const [dataFiltrada, setDataFiltrada] = useState(dataHorario);
  const [dataRender, setDataRender] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filtro, setFiltro] = useState("");

  // Guardar en localStorage solo si hay datos
  useEffect(() => {
    if (dataHorario.length) {
      localStorage.setItem("horarios", JSON.stringify(dataHorario));
    }
  }, [dataHorario]);

  // Filtrar por nombre
  useEffect(() => {
    const resultado = dataHorario.filter((horario) =>
      (horario?.nombre || "").toLowerCase().includes(filtro.toLowerCase())
    );
    setDataFiltrada(resultado);
    setPagina(0);
  }, [filtro, dataHorario]);

  // Paginación
  useEffect(() => {
    const start = pagina * elementosPorPagina;
    const end = start + elementosPorPagina;
    setDataRender(dataFiltrada.slice(start, end));
  }, [pagina, dataFiltrada, elementosPorPagina]);

  // Cambiar página con validación
  const cambiarPagina = (nuevaPagina) => {
    if (
      nuevaPagina < 0 ||
      nuevaPagina >= Math.ceil(dataFiltrada.length / elementosPorPagina)
    )
      return;
    setPagina(nuevaPagina);
  };

  return {
    dataRender,
    pagina,
    totalPaginas: Math.max(
      1,
      Math.ceil(dataFiltrada.length / elementosPorPagina)
    ),
    cambiarPagina,
    filtro,
    setFiltro,
    setDataHorario,
  };
};
