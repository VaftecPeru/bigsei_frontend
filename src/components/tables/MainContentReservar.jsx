"use client"
import   { useState } from 'react';
 
 
import { Edit2, Phone, Search, Trash2, Filter, ClipboardPlus   } from 'lucide-react';
 
import { TableHeader } from '../pacientes/TableHeader';
import { TableRow } from '../pacientes/TableRow';
import { TableHead } from '../pacientes/TableHead';
import { TableBody } from '../pacientes/TableBody';
import { TableCell } from '../pacientes/TableCell';
import { TableComponent } from '../pacientes/TableComponent';
import { formatPhoneNumberPeru } from '@/helpers/formantNumerPeru';
import { ModalPacientes } from '../ux/modalReservar';
import { Input } from '../pacientes/InputPacientes';
import { Button } from '../pacientes/Buttom';
import MedicalPrescriptionApp from '../ux/ModalMedication'


const MainContentPacientes = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const pacientes = [
    {
      id: 1,
      nombre: "María González",
      telefono: formatPhoneNumberPeru("0744567890"),
      email: "maria@gmail.com",
      estado: "Activo",
      ultimaVisita: "15/01/24",
      enfermedad: "Diabetes tipo 2",
    },
    {
      id: 2,
      nombre: "Juan Martínez",
      telefono: formatPhoneNumberPeru("0744567890"),
      email: "juan@gmail.com",
      estado: "Pendiente",
      ultimaVisita: "20/01/24",
      enfermedad: "Hipertensión",
    },
    {
      id: 3,
      nombre: "Ana Rodríguez",
      telefono: formatPhoneNumberPeru("987654321"),
      email: "ana@gmail.com",
      estado: "Activo",
      ultimaVisita: "18/01/24",
      enfermedad: "Asma",
    },
  ];

  return (
    <div className="w-full px-4 md:px-6 py-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        {/* Header principal */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 p-4 border-b">
          <h2 className="text-2xl font-semibold">Reserva Médica</h2>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar reserva médica..." className="pl-8" />
            </div>
            <ModalPacientes />
            <Button className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-1" onClick={() => setIsFilterVisible(!isFilterVisible)}>
              <Filter className="h-4 w-4" /> Filtrar
            </Button>
          </div>
        </div>

        {/* Header de filtros dinámico */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterVisible ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-wrap gap-2 p-4 border-b justify-between">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Pagado</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Fecha</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Teléfono</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsFilterVisible(false)}>
              Cerrar Filtros
            </Button>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <TableComponent>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Última Visita</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pacientes.map((paciente) => (
                <TableRow key={paciente.id}>
                  <TableCell className="font-medium">{paciente.nombre}</TableCell>
                  <TableCell className="hidden md:table-cell">{paciente.telefono}</TableCell>
                  <TableCell className="hidden md:table-cell">{paciente.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paciente.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {paciente.estado}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{paciente.ultimaVisita}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      <MedicalPrescriptionApp paciente={paciente} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>
        </div>
      </div>
    </div>
  );
};

export default MainContentPacientes;
