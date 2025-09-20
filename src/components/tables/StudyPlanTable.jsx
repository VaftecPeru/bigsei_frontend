
function StudyPlanTable({ headers, planData }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
        <thead className="bg-gray-100 text-lg">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-center text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {planData.map((ciclo, cicloIndex) => (
            <>
              <tr key={`ciclo-${cicloIndex}`} className="bg-blue-100 font-bold">
                <td colSpan={headers.length} className="border border-gray-300 px-4 py-2 text-center">
                  {ciclo.ciclo}
                </td>
              </tr>
              
              {ciclo.asignaturas.map((asignatura, asignaturaIndex) => (
                <tr key={`asignatura-${cicloIndex}-${asignaturaIndex}`}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {asignatura.nombre}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {asignatura.credito}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {asignatura.preRequisito || "-"}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudyPlanTable;
