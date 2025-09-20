import { ClipboardPlus, PenSquare, Trash2 } from "lucide-react"

export const ItemPaciente=({onDelete,onEdit, row})=>{
       return(
        <tr key={row.id}>
        <td>{`${row.nombre} ${row.apellido}`}</td>
        <td>{row.dni}</td>
        <td>{row.fechaAtencion}</td>
        <td>
          <div className="actions">
          <button className="edit-button" onClick={() => onEdit(row)}>✏️ Editar</button>
          <button className="delete-button" onClick={() => onDelete(row.id)}>🗑️ Eliminar</button>
            <button className="primary-button">
              <ClipboardPlus size={16} />
            </button>
          </div>
        </td>
      </tr>
       )
}