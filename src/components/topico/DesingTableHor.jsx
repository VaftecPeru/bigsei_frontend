import { useHorarios } from "@/hooks/useAddHorario"; // Revisado, pero tal vez sea necesario cambiar useReservas por useEspecialidades
import { useState } from "react";
import { ModalNewHor } from "./UX/modal/ModalNewHor";
import { ContainerTableHor } from "./ContainerTableHor";
import { usePaginationHor } from "@/hooks/useSearchHorario";
import { Button } from "../pacientes/Buttom";
import { Input } from "../pacientes/InputPacientes"; // Chequeado, dudoso
import { Filter, Search } from "lucide-react";
import RecordsPerPage from "./UX/modal/SelectDesing"; // Chequeado, dudoso
import AnimatedPagination from "./UX/AnimatePagination";

export const DesingTableHor = () => {
  const [elementosPorPagina, setElementosPorPagina] = useState(4);
  const {
    dataRender,
    pagina,
    totalPaginas,
    cambiarPagina,
    setFiltro,
    filtro,
    setDataHorario,
  } = usePaginationHor([], elementosPorPagina);
  const { agregarHorario, horarios } = useHorarios();
  const [isActive, setIsActive] = useState(false);
  const [horarioEditando, setHorarioEditando] = useState(null);
  const [horarioSeleccionada, setHorarioSeleccionada] = useState(null);

  // Eliminar especialidad
  const eliminarHorario = (id) => {
    const nuevasHorarios = horarios.filter((e) => e.id !== id);
    setDataHorario(nuevasHorarios);
    localStorage.setItem("horarios", JSON.stringify(nuevasHorarios));
  };

  // Guardar cambios de la especialidad editada
  const guardarEdicionHorario = (horarioEditada) => {
    const nuevasHorarios = horarios.map((e) =>
      e.id === horarioEditada.id ? horarioEditada : e
    );
    setDataHorario(nuevasHorarios);
    localStorage.setItem("horarios", JSON.stringify(nuevasHorarios));
    setHorarioEditando(null);
  };

  return (
    <div className="w-full px-4 md:px-6 py-4 bg-white">
      <div className="rounded-lg border bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-card-foreground shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 p-4 border-b">
          <h2 className="text-2xl font-semibold">Lista de disponibilidad</h2>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar doctor..."
                className="pl-8"
              />
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsActive((prev) => !prev)}
            >
              Añadir Horario
            </Button>
          </div>
        </div>

        {isActive && (
          <ModalNewHor
            agregarHorario={agregarHorario}
            isOpen={isActive}
            onClose={() => setIsActive(false)}
          />
        )}

        <RecordsPerPage
          elementosPorPagina={elementosPorPagina}
          setElementosPorPagina={setElementosPorPagina}
        />

        <ContainerTableHor
          data={dataRender}
          onEdit={(horario) => setHorarioEditando(horario)}
          onDelete={eliminarHorario}
        />

        <AnimatedPagination
          pagina={pagina}
          totalPaginas={totalPaginas}
          elementosPorPagina={elementosPorPagina}
          totalRegistros={horarios.length}
          cambiarPagina={cambiarPagina}
        />

        {horarioEditando && (
          <ModalNewHor
            isOpen={!!horarioEditando}
            onClose={() => setHorarioEditando(null)}
            agregarHorario={agregarHorario}
            guardarEdicion={guardarEdicionHorario}
            horario={horarioEditando}
          />
        )}
      </div>
    </div>
  );
};
