import { ClipboardPlus, PenSquare, Trash2 } from "lucide-react"
import { TableRow } from "../pacientes/TableRow"
import { TableCell } from "../pacientes/TableCell"

export const ItemPaciente=({onDelete,onEdit, row, onAddDiagnostico})=>{
  console.log(row)
       return(
        <TableRow key={row.id}>
        <TableCell className="text-center">{`${row.nombre} ${row.apellido}`}</TableCell>
        <TableCell className="text-center">{row.dni}</TableCell>
        <TableCell className="text-center">{row.fechaAtencion}</TableCell>
        <TableCell className={`text-center `}>
           <span className={`${row.estado=="Atendido"? 'bg-green-400 rounded' : ' rounded bg-red-500'} px-[10px] py-[4px] text-white`}>
                  {row.estado}
            </span> 
        </TableCell>
        <TableCell className="text-center">{row.fechaAtencion}</TableCell>
        
        <TableCell className="flex items-center justify-center">
          <div className="actions">
            <button className="edit-button " onClick={() => onEdit(row)}>
              <PenSquare size={16} />
            </button>
            <button className="delete-button" onClick={() => onDelete(row.id)}>
              <Trash2 size={16} />
            </button>
            <button className="primary-button">
              <ClipboardPlus size={16} onClick={()=>onAddDiagnostico(row)} />
            </button>
          </div>
        </TableCell>
      </TableRow>
       )
}