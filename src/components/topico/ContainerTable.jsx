import { Edit2, Phone, Trash2 } from "lucide-react"
import { Button } from "../pacientes/Buttom"
import { TableBody } from "../pacientes/TableBody"
import { TableCell } from "../pacientes/TableCell"
import { TableComponent } from "../pacientes/TableComponent"
import { TableHead } from "../pacientes/TableHead"
import { TableHeader } from "../pacientes/TableHeader"
import { TableRow } from "../pacientes/TableRow"
import { ItemPaciente } from "./ItemPaciente"

 
 
 
export const ContainerTable=({data,onEdit,onDelete, onAddDiagnostico})=>{
   
     return(
      <div className="overflow-x-auto">
<TableComponent>
  <TableHeader>
    <TableRow>
      <TableHead className="  text-white">Nombre</TableHead>
      <TableHead className="  text-white">Teléfono</TableHead>
      <TableHead className="  text-white">Email</TableHead>
      <TableHead className="text-white">Estado</TableHead>
      <TableHead className="  text-white">Última Visita</TableHead>
      <TableHead className="text-white">Acciones</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      
        <ItemPaciente
         key={row.id}
         row={row}
         onEdit={onEdit}
         onAddDiagnostico={onAddDiagnostico}
         onDelete={onDelete}
        />
         
    
    ))}
  </TableBody>
</TableComponent>
</div>

     )
}





/*


  <div className="table-container">
        <TableComponent>
          <TableHeader>
            <TableRow>
              <TableHead>Dias de atencion medica</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Fecha_Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {data.map((row, index) => (
                <ItemPaciente
                  key={row.id}
                  row={row}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
            ))}
          </TableBody>
        </TableComponent>
      </div>
*/