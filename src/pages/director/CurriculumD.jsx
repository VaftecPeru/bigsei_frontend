import { useState, useEffect } from "react";
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
import { Api_Global_Setup } from "../../services/SetupApi";
import { Api_Global_Director } from "../../services/DirectorApi";
import apiClient from "../../Utils/apiClient";
import { ClipLoader } from 'react-spinners';

export default function PlanDeEstudios() {
  const [isLoading, setLoading] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState({
    id_ciclo: "",
    nombre: "",
  });
  const [selectedCareer, setSelectedCareer] = useState({
    id_carrera: "",
    nombre: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [carreras, setCarreras] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [cursos, setCursos] = useState([]);

  const handleCarreras = () => {
    apiClient.get(Api_Global_Setup.carreras.activos({
      per_page: 50,
      page: 1,
    }, ""))
      .then((response) => {
        setCarreras(response.data.data);
      })
      .catch((error) => {
        setCarreras([]);
      });
  };

  const handleCiclos = () => {
    apiClient.get(Api_Global_Setup.ciclos.listar({
      per_page: 50,
      page: 1,
    }, ""))
      .then((response) => {
        setCiclos(response.data.data);
      })
      .catch((error) => {
        setCiclos([]);
      });
  };

  const handleCursos = (id_carrera, id_ciclo, text_search) => {
    setLoading(true);
      apiClient.get(Api_Global_Director.academicoPlanEstudios.listar(text_search, id_carrera, id_ciclo))
      .then((response) => {
        setLoading(false);
        setCursos(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setCursos([]);
      });
  };

  const changeCarreras = (value) => {
    const item = carreras.find((it => it.id_carrera == value));
    setSelectedCareer(item);
    handleCursos(value, selectedCycle.id_ciclo, searchTerm);
  };

  const changeCiclos = (value) => {
    const item = ciclos.find((it => it.id_ciclo == value));
    setSelectedCycle(item);
    handleCursos(selectedCareer.id_carrera, value, searchTerm);
  };

  useEffect(() => {
    handleCarreras();
    handleCiclos();
    handleCursos("", "", "");
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <GraduationCap className="text-blue-600" size={36} />
            <h2 className="text-3xl font-bold">Plan de Estudios</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-lg font-semibold">Carrera:</label>
              <Select value={selectedCareer.id_carrera} onValueChange={(value) => changeCarreras(value)}>
                <SelectTrigger className="mt-2 w-full"> {selectedCareer.nombre} </SelectTrigger>
                <SelectContent>
                  {carreras.map((career) => (
                    <SelectItem key={career.id_carrera} value={career.id_carrera}>{career.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-lg font-semibold">Ciclo:</label>
              <Select value={selectedCycle.id_ciclo} onValueChange={(value) => changeCiclos(value)}>
                <SelectTrigger className="mt-2 w-full"> {selectedCycle.nombre} </SelectTrigger>
                <SelectContent>
                  {ciclos.map((ciclo) => (
                    <SelectItem key={ciclo.id_ciclo} value={ciclo.id_ciclo}>{ciclo.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-lg font-semibold">Curso:</label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input 
                  className="pl-10 w-full" 
                  placeholder="ingrese texto" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-lg font-semibold">&nbsp;</label>
              <div className="relative mt-2">
                <button
                  type="button"
                  className={`w-full bg-emerald-600 text-white py-2 px-3 rounded`}
                  onClick={(e) => handleCursos(selectedCareer.id_carrera, selectedCycle.id_ciclo, searchTerm)}
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Buscar'}
                </button>
              </div>
            </div>
          </div>

          {cursos.length > 0 ? (
          <Table className="mt-8">
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Carrera</TableHead>
                <TableHead>Ciclo</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Horas</TableHead>
                <TableHead>Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cursos.map((course) => (
                  <TableRow key={course.id_planestudiocurso}>
                    <TableCell>{course.curso_nombre}</TableCell>
                    <TableCell>{course.carrera_nombre}</TableCell>
                    <TableCell>{course.ciclo_nombre}</TableCell>
                    <TableCell>{course.creditos}</TableCell>
                    <TableCell>{course.horas_semanal}</TableCell>
                    <TableCell>{course.tipo_descripcion}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          ) : (
            <div className="text-center text-gray-500 text-xl font-bold py-12">
              No se encontraron resultados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
