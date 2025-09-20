import { useEspecialidades } from "@/hooks/useAddEspecialidades"; // Revisado, pero tal vez sea necesario cambiar useReservas por useEspecialidades
import { useState } from "react";
import { ModalNewEsp } from "./UX/modal/ModalNewEsp";
import { ContainerTableSpe } from "./ContainerTableSpe"; // Falta revisar
import { usePaginationEsp } from "@/hooks/useSearchEspecialidad";
import { Button } from "../pacientes/Buttom";
import { Input } from "../pacientes/InputPacientes"; // Chequeado, dudoso
import { Filter, Search } from "lucide-react";
import RecordsPerPage from "./UX/modal/SelectDesing"; // Chequeado, dudoso
import AnimatedPagination from "./UX/AnimatePagination";

export const DesingTableSpe = () => {
  const [elementosPorPagina, setElementosPorPagina] = useState(4);
  const {
    dataRender,
    pagina,
    totalPaginas,
    cambiarPagina,
    setFiltro,
    filtro,
    setDataEspecialidad,
  } = usePaginationEsp([], elementosPorPagina);
  const { agregarEspecialidad, especialidades } = useEspecialidades();
  const [isActive, setIsActive] = useState(false);
  const [especialidadEditando, setEspecialidadEditando] = useState(null);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] =
    useState(null);

  // Eliminar especialidad
  const eliminarEspecialidad = (id) => {
    const nuevasEspecialidades = especialidades.filter((e) => e.id !== id);
    setDataEspecialidad(nuevasEspecialidades);
    localStorage.setItem(
      "especialidades",
      JSON.stringify(nuevasEspecialidades)
    );
  };

  // Guardar cambios de la especialidad editada
  const guardarEdicionEspecialidad = (especialidadEditada) => {
    const nuevasEspecialidades = especialidades.map((e) =>
      e.id === especialidadEditada.id ? especialidadEditada : e
    );
    setDataEspecialidad(nuevasEspecialidades);
    localStorage.setItem(
      "especialidades",
      JSON.stringify(nuevasEspecialidades)
    );
    setEspecialidadEditando(null);
  };

  return (
    <div className="w-full px-4 md:px-6 py-4 bg-white">
      <div className="rounded-lg border bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-card-foreground shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 p-4 border-b">
          <h2 className="text-2xl font-semibold">Lista de especialidades</h2>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar especialidad..."
                className="pl-8"
              />
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsActive((prev) => !prev)}
            >
              Añadir Especialidad
            </Button>
          </div>
        </div>

        {isActive && (
          <ModalNewEsp
            agregarEspecialidad={agregarEspecialidad}
            isOpen={isActive}
            onClose={() => setIsActive(false)}
          />
        )}

        <RecordsPerPage
          elementosPorPagina={elementosPorPagina}
          setElementosPorPagina={setElementosPorPagina}
        />

        <ContainerTableSpe
          data={dataRender}
          onEdit={(especialidad) => setEspecialidadEditando(especialidad)}
          onDelete={eliminarEspecialidad}
        />

        <AnimatedPagination
          pagina={pagina}
          totalPaginas={totalPaginas}
          elementosPorPagina={elementosPorPagina}
          totalRegistros={especialidades.length}
          cambiarPagina={cambiarPagina}
        />

        {especialidadEditando && (
          <ModalNewEsp
            isOpen={!!especialidadEditando}
            onClose={() => setEspecialidadEditando(null)}
            agregarEspecialidad={agregarEspecialidad}
            guardarEdicion={guardarEdicionEspecialidad}
            especialidad={especialidadEditando}
          />
        )}
      </div>
    </div>
  );
};
