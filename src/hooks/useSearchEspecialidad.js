import { useEffect, useState } from "react";

export const usePaginationEsp = (data = [], elementosPorPagina = 4) => {
  // Inicializar con datos del localStorage o los proporcionados
  const storedEspecialidades =
    JSON.parse(localStorage.getItem("especialidades")) || [];
  const [dataEspecialidad, setDataEspecialidad] = useState(
    data.length ? data : storedEspecialidades
  );
  const [dataFiltrada, setDataFiltrada] = useState(dataEspecialidad);
  const [dataRender, setDataRender] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filtro, setFiltro] = useState("");

  // Guardar en localStorage cuando cambie `dataReserva`
  useEffect(() => {
    localStorage.setItem("especialidades", JSON.stringify(dataEspecialidad));
  }, [dataEspecialidad]);

  // Filtrar por nombre y apellido
  useEffect(() => {
    const resultado = dataEspecialidad.filter((especialidad) =>
      `${especialidad.nombre} `.toLowerCase().includes(filtro.toLowerCase())
    );
    setDataFiltrada(resultado);
    setPagina(0);
  }, [filtro, dataEspecialidad]);

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
    totalPaginas: Math.ceil(dataFiltrada.length / elementosPorPagina),
    cambiarPagina,
    filtro,
    setFiltro,
    setDataEspecialidad, // Para actualizar manualmente reservas
  };
};
