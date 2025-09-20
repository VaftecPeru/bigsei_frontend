function GradesTable({ headers, grades }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
        <thead className="bg-blue-100 text-lg">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {grades.map((grade, gradeIndex) =>
            grade.asignaturas.map((asignatura, asignaturaIndex) =>
              asignatura.evaluaciones.map((evaluation, evalIndex) => (
                <tr key={`${gradeIndex}-${asignaturaIndex}-${evalIndex}`}>
                  {asignaturaIndex === 0 &&
                    evalIndex === 0 && (
                      <td
                        rowSpan={grade.asignaturas.reduce(
                          (sum, asignatura) =>
                            sum + asignatura.evaluaciones.length,
                          0
                        )}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        {grade.ciclo}
                      </td>
                    )}

                  {evalIndex === 0 && (
                    <td
                      rowSpan={asignatura.evaluaciones.length}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {asignatura.nombre}
                    </td>
                  )}

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {evaluation.tipo}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {evaluation.nota}
                  </td>

                  {evalIndex === 0 && (
                    <td
                      rowSpan={asignatura.evaluaciones.length}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {asignatura.formula}
                    </td>
                  )}
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GradesTable;
