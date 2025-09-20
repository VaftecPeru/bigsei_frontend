import { usePacientes } from "@/hooks/useAddPaciente";

import { useState } from "react";
import { ModalAgregarPaciente } from "./UX/modal/AddModal";
import { ContainerTable } from "./ContainerTable";
import { usePagination } from "@/hooks/useSearch";

import { Button } from "../pacientes/Buttom";
import { Input } from "../pacientes/InputPacientes";
import { Filter, Search } from "lucide-react";
import RecordsPerPage from "./UX/modal/SelectDesing";
import AnimatedPagination from "./UX/AnimatePagination";
import { AddDiagnostico } from "./UX/modal/AddDiagnostico";

export const DesingTable = () => {
  const [elementosPorPagina, setElementosPorPagina] = useState(4);
  const {
    dataRender,
    pagina,
    totalPaginas,
    cambiarPagina,
    setFiltro,
    filtro,
    setDataPaciente,
  } = usePagination([], elementosPorPagina);
  const { agregarPaciente, pacientes } = usePacientes();
  const [isActive, setIsActive] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);
  const [pacienteEditandodos, setPacienteEditandodos] = useState(null);
  const [agregarDiagnostico, setDiagnostico] = useState(false);
  // Eliminar paciente
  const eliminarPaciente = (id) => {
    const nuevosPacientes = pacientes.filter((p) => p.id !== id);
    setDataPaciente(nuevosPacientes);
    localStorage.setItem("pacientes", JSON.stringify(nuevosPacientes));
  };

  // Guardar cambios del paciente editado
  const guardarEdicion = (pacienteEditado) => {
    const nuevosPacientes = pacientes.map((p) =>
      p.id === pacienteEditado.id ? pacienteEditado : p
    );
    setDataPaciente(nuevosPacientes);
    localStorage.setItem("pacientes", JSON.stringify(nuevosPacientes));
    setPacienteEditando(null);
  };
  const añadirDoctor = (pacienteEditado) => {
    const nuevosPacientes = pacientes.map((p) =>
      p.id === pacienteEditado.id ? pacienteEditado : p
    );
    setDataPaciente(nuevosPacientes);
    localStorage.setItem("pacientes", JSON.stringify(nuevosPacientes));
    setPacienteEditando(null);
  };
  return (
    <div className="w-full px-4 md:px-6 py-4 bg-white">
      <div className="rounded-lg border  bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]   text-card-foreground shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 p-4 border-b">
          <h2 className="text-2xl font-semibold">Lista de Pacientes</h2>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar pacientes..."
                className="pl-8"
              />
            </div>
            {/*btn modal */}

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsActive((prev) => !prev)}
            >
              Añadir Reserva Medica
            </Button>
          </div>
        </div>

        {isActive && (
          <ModalAgregarPaciente
            agregarPaciente={agregarPaciente}
            isOpen={isActive}
            onClose={() => setIsActive(false)}
          />
        )}

        <RecordsPerPage
          elementosPorPagina={elementosPorPagina}
          setElementosPorPagina={setElementosPorPagina}
        />

        <ContainerTable
          onAddDiagnostico={(paciente) => setPacienteEditandodos(paciente)}
          data={dataRender}
          onEdit={(paciente) => setPacienteEditando(paciente)}
          onDelete={eliminarPaciente}
        />

        <AnimatedPagination
          pagina={pagina}
          totalPaginas={totalPaginas}
          elementosPorPagina={elementosPorPagina}
          totalRegistros={pacientes.length}
          cambiarPagina={cambiarPagina}
        />

        {pacienteEditando && (
          <ModalAgregarPaciente
            isOpen={!!pacienteEditando}
            onClose={() => setPacienteEditando(null)}
            agregarPaciente={agregarPaciente}
            guardarEdicion={guardarEdicion}
            paciente={pacienteEditando}
          />
        )}
        {pacienteEditandodos && (
          <AddDiagnostico
            onClose={() => setPacienteEditandodos(null)}
            isOpen={!!pacienteEditandodos}
            guardarEdicion={guardarEdicion}
            paciente={pacienteEditandodos}
          />
        )}
      </div>
    </div>
  );
};
