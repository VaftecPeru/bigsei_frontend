import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Table from "@/components/ui/table/Table";
import TableHeader from "@/components/ui/table/TableHeader";
import TableRow from "@/components/ui/table/TableRow";
import TableHead from "@/components/ui/table/TableHead";
import TableBody from "@/components/ui/table/TableBody";
import TableCell from "@/components/ui/table/TableCell";
import { GraduationCap, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const courses = [
  { id: 1, name: "Álgebra Lineal", cycle: "Ciclo 1", credits: 4, hours: 5, type: "Obligatorio", career: "Ingeniería" },
  { id: 2, name: "Fundamentos de Programación", cycle: "Ciclo 1", credits: 5, hours: 6, type: "Obligatorio", career: "Computación" },
  { id: 3, name: "Física General", cycle: "Ciclo 2", credits: 4, hours: 5, type: "Obligatorio", career: "Ingeniería" },
  { id: 4, name: "Estructura de Datos", cycle: "Ciclo 2", credits: 5, hours: 6, type: "Obligatorio", career: "Computación" },
  { id: 5, name: "Bases de Datos Avanzadas", cycle: "Ciclo 3", credits: 4, hours: 5, type: "Obligatorio", career: "Computación" },
  { id: 6, name: "Gestión de Proyectos TI", cycle: "Ciclo 4", credits: 3, hours: 4, type: "Electivo", career: "Administración" },
  { id: 7, name: "Inteligencia Artificial", cycle: "Ciclo 5", credits: 4, hours: 5, type: "Electivo", career: "Computación" },
];

const careers = ["Todos", "Ingeniería", "Computación", "Administración"];

export default function PlanDeEstudiosP() {
  const [selectedCycle, setSelectedCycle] = useState("Todos");
  const [selectedCareer, setSelectedCareer] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(course => 
    (selectedCycle === "Todos" || course.cycle === selectedCycle) &&
    (selectedCareer === "Todos" || course.career === selectedCareer) &&
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <GraduationCap className="text-blue-600" size={36} />
            <h2 className="text-3xl font-bold">Plan de Estudios</h2>
          </div>

          {/* Filtros */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-lg font-semibold">Filtrar por carrera:</label>
              <Select value={selectedCareer} onValueChange={(value) => setSelectedCareer(value)}>
                <SelectTrigger className="mt-2 w-full"> {selectedCareer} </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career} value={career}>{career}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-lg font-semibold">Filtrar por ciclo:</label>
              <Select value={selectedCycle} onValueChange={(value) => setSelectedCycle(value)}>
                <SelectTrigger className="mt-2 w-full"> {selectedCycle} </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Ciclo 1">Ciclo 1</SelectItem>
                  <SelectItem value="Ciclo 2">Ciclo 2</SelectItem>
                  <SelectItem value="Ciclo 3">Ciclo 3</SelectItem>
                  <SelectItem value="Ciclo 4">Ciclo 4</SelectItem>
                  <SelectItem value="Ciclo 5">Ciclo 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-lg font-semibold">Buscar curso:</label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input 
                  className="pl-10 w-full" 
                  placeholder="Ingrese el nombre del curso..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Tabla */}
          <Table className="mt-8">
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Curso</TableHead>
                <TableHead>Carrera</TableHead>
                <TableHead>Ciclo</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Horas/Semana</TableHead>
                <TableHead>Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.career}</TableCell>
                    <TableCell>{course.cycle}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.hours}</TableCell>
                    <TableCell>{course.type}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                    No se encontraron cursos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
