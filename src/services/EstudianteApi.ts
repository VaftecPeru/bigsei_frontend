export const Api_Global_Estudiante = {
  miCarreras: {
    listar: (paginate: any) => `/estudiante/mi-carreras?per_page=${paginate.per_page}&page=${paginate.page}`,
  },

  miPerfiles: {
    mostrar: () => `/estudiante/mi-perfil`,
    editar:() => `/estudiante/mi-perfil`,
    fotos:() => `/estudiante/mi-perfil/fotos`,
    baneres:() => `/estudiante/mi-perfil/baneres`,
  },

  miMatriculas: {
    listar: (paginate: any, id_periodo: string) => `/estudiante/mi-matriculas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodo=${id_periodo}`,
  },

  miNotas: {
    matriculas: () => `/estudiante/mi-notas/matriculas`,
    historialAcademicos: () => `/estudiante/mi-notas/historial-academicos`,
    promedios: () => `/estudiante/mi-notas/promedios`,
  },

  miAcademicoPeriodos: {
    listar: (paginate: any, text_search: string) => `/estudiante/mi-academico-periodos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
  },

  miAcademicoPeriodoCursos: {
    listar: (paginate: any, text_search: string) => `/estudiante/mi-academico-periodo-cursos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_periodocurso: string) => `/estudiante/mi-academico-periodo-cursos/${id_periodocurso}`,
  },

  miAcademicoPeriodoModulos: {
    listar: (paginate: any, id_periodocurso: string) => `/estudiante/mi-academico-periodo-modulos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocurso=${id_periodocurso}`,
  },

  miAcademicoPeriodoTemas: {
    listar: (paginate: any, id_periodomodulo: string) => `/estudiante/mi-academico-periodo-temas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodomodulo=${id_periodomodulo}`,
  },

  miAcademicoPeriodoTareas: {
    listar: (paginate: any, id_periodotema: string) => `/estudiante/mi-academico-periodo-tareas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotema=${id_periodotema}`,
  },

  miAcademicoEntregaTareas: {
    listar: (paginate: any, id_periodotarea: string) => `/estudiante/mi-academico-entrega-tareas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotarea=${id_periodotarea}`,
    registrar: () => `/estudiante/mi-academico-entrega-tareas`,
  },

  miAcademicoPeriodoVideos: {
    listar: (paginate: any, id_periodotema: string) => `/estudiante/mi-academico-periodo-videos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotema=${id_periodotema}`,
  },

  miAcademicoPeriodoCuestionarios: {
    listar: (paginate: any, id_periodotema: string) => `/estudiante/mi-academico-periodo-cuestionarios?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotema=${id_periodotema}`,
    mostrar: (id_periodocuestionario: string) => `/estudiante/mi-academico-periodo-cuestionarios/${id_periodocuestionario}`,
  },

  miAcademicoPeriodoPreguntas: {
    listar: (paginate: any, id_periodocuestionario: string) => `/estudiante/mi-academico-periodo-preguntas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocuestionario=${id_periodocuestionario}`,
  },

  miAcademicoEntregaRespuestas: {
    registrar: () => `/estudiante/mi-academico-entrega-respuestas`,
  },

  temaArchivos: {
    listar: (paginate: any, id_periodotema: string) => `/estudiante/tema-archivos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotema=${id_periodotema}`,
  },

  reportes: {
    notas: (id_matricula: string) => `/estudiante/reportes/notas?id_matricula=${id_matricula}`,
    matriculas: (id_matricula: string) => `/estudiante/reportes/matriculas?id_matricula=${id_matricula}`,
  },
};
