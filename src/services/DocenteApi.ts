export const Api_Global_Docente = {
  academicoPeriodos: {
    listar: (paginate: any) => `/docente/academico-periodos?per_page=${paginate.per_page}&page=${paginate.page}`,
  },

  academicoPeriodoCiclos: {
    listar: (paginate: any, id_periodo: string) => `/docente/academico-periodo-ciclos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodo=${id_periodo}`,
  },

  academicoPeriodoCursos: {
    listar: (paginate: any, text_search: string, id_periodociclo: string = "") => `/docente/academico-periodo-cursos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}&id_periodociclo=${id_periodociclo}`,
    mostrar: (id_periodocurso: string) => `/docente/academico-periodo-cursos/${id_periodocurso}`,
  },

  academicoPeriodoModulos: {
    listar: (paginate: any, id_periodocurso: string) => `/docente/academico-periodo-modulos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocurso=${id_periodocurso}`,
    registrar: () => `/docente/academico-periodo-modulos`,
  },

  academicoPeriodoTemas: {
    listar: (paginate: any, id_periodomodulo: string) => `/docente/academico-periodo-temas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodomodulo=${id_periodomodulo}`,
    registrar: () => `/docente/academico-periodo-temas`,
  },

  academicoPeriodoTarea: {
    listar: (paginate: any, id_periodotema: string) => `/docente/academico-periodo-tareas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotema=${id_periodotema}`,
    mostrar: (id_periodotarea: string) => `/docente/academico-periodo-tareas/${id_periodotarea}`,
    registrar: () => `/docente/academico-periodo-tareas`,
    editar:(id_periodotarea: string) => `/docente/academico-periodo-tareas/${id_periodotarea}`,
  },

  academicoPeriodoVideos: {
    listar: (paginate: any, id_periodotema: string, tipo: string) => `/docente/academico-periodo-videos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotema=${id_periodotema}&tipo=${tipo}`,
    registrar: () => `/docente/academico-periodo-videos`,
    editar:(id_periodovideo: string) => `/docente/academico-periodo-videos/${id_periodovideo}`,
  },

  academicoPeriodoCuestionarios: {
    listar: (paginate: any, id_periodotema: string) => `/docente/academico-periodo-cuestionarios?per_page=${paginate.per_page}&page=${paginate.page}&id_periodotema=${id_periodotema}`,
    mostrar: (id_periodocuestionario: string) => `/docente/academico-periodo-cuestionarios/${id_periodocuestionario}`,
    registrar: () => `/docente/academico-periodo-cuestionarios`,
    editar:(id_periodocuestionario: string) => `/docente/academico-periodo-cuestionarios/${id_periodocuestionario}`,
  },

  academicoPeriodoPreguntas: {
    listar: (paginate: any, id_periodocuestionario: string) => `/docente/academico-periodo-preguntas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocuestionario=${id_periodocuestionario}`,
    registrar: () => `/docente/academico-periodo-preguntas`,
    editar:(id_periodopregunta: string) => `/docente/academico-periodo-preguntas/${id_periodopregunta}`,
    eliminar: (id_periodopregunta: any) => `/docente/academico-periodo-preguntas/${id_periodopregunta}`,
  },

  academicoPeriodoRespuestas: {
    listar: (paginate: any, id_periodopregunta: string) => `/docente/academico-periodo-respuestas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodopregunta=${id_periodopregunta}`,
    registrar: () => `/docente/academico-periodo-respuestas`,
    editar:(id_periodorespuesta: string) => `/docente/academico-periodo-respuestas/${id_periodorespuesta}`,
  },

  academicoPeriodoHorarios: {
    listar: (paginate: any, id_periodo: string) => `/docente/academico-periodo-horarios?per_page=${paginate.per_page}&page=${paginate.page}&id_periodo=${id_periodo}`,
  },

  archivos: {
    listar: (paginate: any, obj: any) => `/docente/archivos?per_page=${paginate.per_page}&page=${paginate.page}&${obj.label}=${obj.value}`,
    registrar: () => `/docente/archivos`,
    eliminar: (id_archivo: any) => `/docente/archivos/${id_archivo}`,
  },

  cursos: {
    listaCurso: (idUsuario: number) => `/dashboard/docente/listar-cursos/${idUsuario}`,
  },

  mensajeriaGrupos: {
    listar: (paginate: any, id_periodocurso: string, tipo: string) => `/docente/mensajeria-grupos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocurso=${id_periodocurso}&tipo=${tipo}`,
  },

  mensajeriaPersonas: {
    listar: (paginate: any, id_mensajeriagrupo: string) => `/docente/mensajeria-personas?per_page=${paginate.per_page}&page=${paginate.page}&id_mensajeriagrupo=${id_mensajeriagrupo}`,
  },

  mensajeriaMensajes: {
    listar: (paginate: any, id_mensajeriagrupo: string, mayor_a_id_mensajeriamensaje: string) => `/docente/mensajeria-mensajes?per_page=${paginate.per_page}&page=${paginate.page}&id_mensajeriagrupo=${id_mensajeriagrupo}&mayor_a_id_mensajeriamensaje=${mayor_a_id_mensajeriamensaje}`,
    registrar: () => `/docente/mensajeria-mensajes`,
  },

  asistencias: {
    listarEstudiantes: (paginate: any, id_periodocurso: string, fecha: string) => `/docente/asistencias/estudiantes?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocurso=${id_periodocurso}&fecha=${fecha}`,
    registrarEstudiantes: () => `/docente/asistencias/estudiantes`,
    registrarEstudiantesTodos: () => `/docente/asistencias/estudiantes/todos`,
  },

  miAsistencias: {
    listar: (paginate: any) => `/docente/mi-asistencias?per_page=${paginate.per_page}&page=${paginate.page}`,
    registrar: () => `/docente/mi-asistencias`,
    porcentajes: () => `/docente/mi-asistencias/porcentajes`,
  },

  evaluacionNotas: {
    listar: (paginate: any, id_periodocurso: string) => `/docente/evaluacion-notas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocurso=${id_periodocurso}`,
    registrar: () => `/docente/evaluacion-notas`,
  },

  evaluacionCriterios: {
    listar: (paginate: any, id_periodocurso: string) => `/docente/evaluacion-criterios?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocurso=${id_periodocurso}`,
    registrar: () => `/docente/evaluacion-criterios`,
    editar:(id_evaluacioncriterio: string) => `/docente/evaluacion-criterios/${id_evaluacioncriterio}`,
  },
};
