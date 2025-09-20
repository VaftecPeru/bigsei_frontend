import { Trash2, Edit2 } from "lucide-react";
import { TableBody } from "../pacientes/TableBody";
import { TableCell } from "../pacientes/TableCell";
import { TableComponent } from "../pacientes/TableComponent";
import { TableHead } from "../pacientes/TableHead";
import { TableHeader } from "../pacientes/TableHeader";
import { TableRow } from "../pacientes/TableRow";
import { ClipboardPlus, PenSquare } from "lucide-react";

export const ContainerTableSpe = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Especialidad Medica</TableHead>
            <TableHead className="text-white">Fecha de Registro</TableHead>
            <TableHead className="text-white">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.fechaAtencion}</TableCell>

              <TableCell className="flex items-center justify-center">
                <div className="actions">
                  <button className="edit-button " onClick={() => onEdit(row)}>
                    <PenSquare size={16} />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(row.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  );
};
