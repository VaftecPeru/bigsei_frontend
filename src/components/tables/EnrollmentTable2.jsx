function EnrollmentTable2({ headers, grades }) {
  const creditosTotal = grades.reduce((accumulator, grade) => {
    return accumulator + grade.cursos.reduce((accumulator2, curso) => {
        return accumulator2 + curso.creditos;
      }, 0)
  }, 0);

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
            grade.cursos.map((asignatura, asignaturaIndex) =>
              <tr key={`${gradeIndex}-${asignaturaIndex}`}>
                {asignaturaIndex === 0 && (
                  <>
                    <td
                      rowSpan={grade.cursos.length}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {grade.carrera_nombre}
                    </td>
                    <td
                      rowSpan={grade.cursos.length}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {grade.ciclo_nombre}
                    </td>
                  </>
                )}
                <td
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {asignatura.curso_nombre}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {asignatura.creditos}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {asignatura.docente_nombre}
                </td>
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className="border border-gray-300 px-4 py-2 text-right">Total créditos:</th>
            <th className="border border-gray-300 px-4 py-2 text-center">{creditosTotal}</th>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default EnrollmentTable2;