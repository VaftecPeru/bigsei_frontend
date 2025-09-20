export const Api_Global_SuperAdministrador = {
  estudiantes: {
    listar: (text_search: string) => `/superadministrador/estudiantes?text_search=${text_search}`,
    mostrar: (id_estudiante: string) => `/superadministrador/estudiantes/${id_estudiante}`,
    registrar:() => `/superadministrador/estudiantes`,
    editar:(id_estudiante: string) => `/superadministrador/estudiantes/${id_estudiante}`,
    eliminar: (id: any) => `/superadministrador/estudiantes/${id}`,
  },

  docentes: {
    listar: (text_search: string) => `/superadministrador/docentes?text_search=${text_search}`,
    mostrar: (id_docente: string) => `/superadministrador/docentes/${id_docente}`,
    registrar:() => `/superadministrador/docentes`,
    editar:(id_docente: string) => `/superadministrador/docentes/${id_docente}`,
    eliminar: (id_docente: any) => `/superadministrador/docentes/${id_docente}`,
  },

  empresas: {
    listar: (text_search: string) => `/superadministrador/empresas?text_search=${text_search}`,
    mostrar: (id_empresa: string) => `/superadministrador/empresas/${id_empresa}`,
    registrar:() => `/superadministrador/empresas`,
    editar:(id_empresa: string) => `/superadministrador/empresas/${id_empresa}`,
    eliminar: (id_empresa: any) => `/superadministrador/empresas/${id_empresa}`,
    archivos: (id_empresa: any) => `/superadministrador/empresas/${id_empresa}/archivos`,
  },

  vendedores: {
    listar: (text_search: string) => `/superadministrador/vendedores?text_search=${text_search}`,
  },

  academicoPeriodos: {
    listar: (text_search: string) => `/superadministrador/academico-periodos?text_search=${text_search}`,
    registrar:() => `/superadministrador/academico-periodos`,
    editar:(id_periodo: string) => `/superadministrador/academico-periodos/${id_periodo}`,
    eliminar: (id_periodo: any) => `/superadministrador/academico-periodos/${id_periodo}`,
  },

  academicoPeriodoCiclos: {
    listar: (text_search: string) => `/superadministrador/academico-periodo-ciclos?text_search=${text_search}`,
    registrar:() => `/superadministrador/academico-periodo-ciclos`,
    editar:(id_periodociclo: string) => `/superadministrador/academico-periodo-ciclos/${id_periodociclo}`,
    eliminar: (id_periodociclo: any) => `/superadministrador/academico-periodo-ciclos/${id_periodociclo}`,
  },

  academicoPeriodoCursos: {
    listar: (text_search: string) => `/superadministrador/academico-periodo-cursos?text_search=${text_search}`,
    registrar:() => `/superadministrador/academico-periodo-cursos`,
    editar:(id_periodocurso: string) => `/superadministrador/academico-periodo-cursos/${id_periodocurso}`,
    eliminar: (id_periodocurso: any) => `/superadministrador/academico-periodo-cursos/${id_periodocurso}`,
    listarDocentesActivos: (text_search: string) => `/superadministrador/academico-periodo-cursos/docentes-activos?text_search=${text_search}`,
    listarCursosActivos: (id_docente: string) => `/superadministrador/academico-periodo-cursos/cursos-activos?id_docente=${id_docente}`,
  },

  asistencias: {
    listar: (text_search: string, tipo: string) => `/superadministrador/asistencias?text_search=${text_search}&tipo=${tipo}`,
    registrar:() => `/superadministrador/asistencias`,
  },

  matriculas: {
    listarEstudiantesActivos: (text_search: string) => `/superadministrador/matriculas/estudiantes-activos?text_search=${text_search}`,
    listarCursosActivos: (id_estudiante: string) => `/superadministrador/matriculas/cursos-activos?id_estudiante=${id_estudiante}`,
  },
};
