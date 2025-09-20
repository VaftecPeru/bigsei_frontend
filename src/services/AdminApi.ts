export const Api_Global_Admin = {
  estudiantes: {
    listar: (paginate: any, text_search: string) => `/admin/estudiantes?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_estudiante: string) => `/admin/estudiantes/${id_estudiante}`,
    registrar:() => `/admin/estudiantes`,
    editar:(id_estudiante: string) => `/admin/estudiantes/${id_estudiante}`,
    eliminar: (id: any) => `/admin/estudiantes/${id}`,
  },

  docentes: {
    listar: (paginate: any, text_search: string) => `/admin/docentes?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_docente: string) => `/admin/docentes/${id_docente}`,
    registrar:() => `/admin/docentes`,
    editar:(id_docente: string) => `/admin/docentes/${id_docente}`,
    eliminar: (id_docente: any) => `/admin/docentes/${id_docente}`,
  },

  usuarios: {
    listar: (paginate: any, text_search: string) => `/admin/usuarios?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_usuario: string) => `/admin/usuarios/${id_usuario}`,
    registrar:() => `/admin/usuarios`,
    editar:(id_usuario: string) => `/admin/usuarios/${id_usuario}`,
    eliminar: (id_usuario: any) => `/admin/usuarios/${id_usuario}`,
    buscarPersonas: (id_tipodocumento: string, numero_documento: string) => `/admin/usuarios/buscar-personas?id_tipodocumento=${id_tipodocumento}&numero_documento=${numero_documento}`,
    completarPersonas: () => `/admin/usuarios/completar-personas`,
    generarPassword: () => `/admin/usuarios/generar-password`,
  },

  academicoPeriodos: {
    listar: (paginate: any, text_search: string) => `/admin/academico-periodos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_periodo: string) => `/admin/academico-periodos/${id_periodo}`,
    registrar:() => `/admin/academico-periodos`,
    editar:(id_periodo: string) => `/admin/academico-periodos/${id_periodo}`,
    eliminar: (id_periodo: any) => `/admin/academico-periodos/${id_periodo}`,
    carreraEstadisticas: (paginate: any, id_periodo: any) => `/admin/academico-periodos/carrera-estadisticas?per_page=${paginate.per_page}&page=${paginate.page}&id_periodo=${id_periodo}`,
    resumenCarreras: (id_periodo: string, id_carrera: string) => `/admin/academico-periodos/resumen-carreras?id_periodo=${id_periodo}&id_carrera=${id_carrera}`,
    abrir: (id_periodo: string) => `/admin/academico-periodos/${id_periodo}/abrir`,
  },

  academicoPeriodoCiclos: {
    listar: (paginate: any, id_periodo: string, id_carrera: string, text_search: string) => `/admin/academico-periodo-ciclos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodo=${id_periodo}&id_carrera=${id_carrera}&text_search=${text_search}`,
    listarByPeriodo: (id_periodo: string, id_carrera: string = "") => `/admin/academico-periodo-ciclos?id_periodo=${id_periodo}&id_carrera=${id_carrera}`,
    mostrar: (id_periodociclo: string) => `/admin/academico-periodo-ciclos/${id_periodociclo}`,
    registrar:() => `/admin/academico-periodo-ciclos`,
    editar:(id_periodociclo: string) => `/admin/academico-periodo-ciclos/${id_periodociclo}`,
    eliminar: (id_periodociclo: any) => `/admin/academico-periodo-ciclos/${id_periodociclo}`,
  },

  academicoPeriodoCursos: {
    listar: (paginate: any, id_periodociclo: string, text_search: string) => `/admin/academico-periodo-cursos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodociclo=${id_periodociclo}&text_search=${text_search}`,
    mostrar: (id_periodocurso: string) => `/admin/academico-periodo-cursos/${id_periodocurso}`,
    registrar:() => `/admin/academico-periodo-cursos`,
    editar:(id_periodocurso: string) => `/admin/academico-periodo-cursos/${id_periodocurso}`,
    eliminar: (id_periodocurso: any) => `/admin/academico-periodo-cursos/${id_periodocurso}`,
  },

  academicoPeriodoCursoPrecios: {
    listar: (id_periodocurso: string) => `/admin/academico-periodo-curso-precios?id_periodocurso=${id_periodocurso}`,
    registrar:() => `/admin/academico-periodo-curso-precios`,
    eliminar: (id_periodocursoprecio: any) => `/admin/academico-periodo-curso-precios/${id_periodocursoprecio}`,
  },

  academicoPeriodoHorarios: {
    listar: (paginate: any, id_periodo: string = "", id_periodocurso: string = "") => `/admin/academico-periodo-horarios?per_page=${paginate.per_page}&page=${paginate.page}&id_periodo=${id_periodo}&id_periodocurso=${id_periodocurso}`,
    mostrar: (id_periodohorario: string) => `/admin/academico-periodo-horarios/${id_periodohorario}`,
    registrar:() => `/admin/academico-periodo-horarios`,
    editar:(id_periodohorario: string) => `/admin/academico-periodo-horarios/${id_periodohorario}`,
    eliminar: (id_periodohorario: any) => `/admin/academico-periodo-horarios/${id_periodohorario}`,
  },

  // academicoPlanEstudioCiclos: {
  //   listar: (paginate: any, id_carrera: string) => `/admin/academico-plan-estudio-ciclos?per_page=${paginate.per_page}&page=${paginate.page}&id_carrera=${id_carrera}`,
  // },

  // academicoPlanEstudioCursos: {
  //   listar: (paginate: any, id_planestudiociclo: string) => `/admin/academico-plan-estudio-cursos?per_page=${paginate.per_page}&page=${paginate.page}&id_planestudiociclo=${id_planestudiociclo}`,
  // },

  academicoCarreras: {
    listar: (id_periodo: string) => `/admin/academico-carreras?id_periodo=${id_periodo}`,
  },

  planEstudios: {
    listar: (paginate: any, text_search: string, esta_publicado: string = "", id_carrera: string = "") => `/admin/plan-estudios?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}&esta_publicado=${esta_publicado}&id_carrera=${id_carrera}`,
    mostrar: (id_planestudio: string) => `/admin/plan-estudios/${id_planestudio}`,
    registrar:() => `/admin/plan-estudios`,
    editar:(id_planestudio: string) => `/admin/plan-estudios/${id_planestudio}`,
    eliminar: (id_planestudio: any) => `/admin/plan-estudios/${id_planestudio}`,
    estadisticas: (id_planestudio: any) => `/admin/plan-estudios/estadisticas?id_planestudio=${id_planestudio}`,
    publicar: (id_planestudio: any) => `/admin/plan-estudios/${id_planestudio}/publicar`,
  },

  planEstudioCiclos: {
    listarCheck: (paginate: any, id_planestudio: string, text_search: string) => `/admin/plan-estudio-ciclos/check?per_page=${paginate.per_page}&page=${paginate.page}&id_planestudio=${id_planestudio}&text_search=${text_search}`,
    listar: (paginate: any, id_planestudio: string, text_search: string) => `/admin/plan-estudio-ciclos?per_page=${paginate.per_page}&page=${paginate.page}&id_planestudio=${id_planestudio}&text_search=${text_search}`,
    registrar:() => `/admin/plan-estudio-ciclos`,
    eliminar: (id_planestudiociclo: any) => `/admin/plan-estudio-ciclos/${id_planestudiociclo}`,
  },

  planEstudioCursos: {
    listar: (paginate: any, id_planestudiociclo: string, text_search: string) => `/admin/plan-estudio-cursos?per_page=${paginate.per_page}&page=${paginate.page}&id_planestudiociclo=${id_planestudiociclo}&text_search=${text_search}`,
    mostrar: (id_planestudiocurso: string) => `/admin/plan-estudio-cursos/${id_planestudiocurso}`,
    registrar:() => `/admin/plan-estudio-cursos`,
    editar:(id_planestudiocurso: string) => `/admin/plan-estudio-cursos/${id_planestudiocurso}`,
    eliminar: (id_planestudiocurso: string) => `/admin/plan-estudio-cursos/${id_planestudiocurso}`,
  },

  mensajerias: {
    listarGrupos: (paginate: any, id_periodocurso: string = "") => `/admin/mensajerias/grupos?per_page=${paginate.per_page}&page=${paginate.page}&id_periodocurso=${id_periodocurso}`,
    registrarGrupos:() => `/admin/mensajerias/grupos`,
    listarPersonas: (paginate: any, id_mensajeriagrupo: string = "") => `/admin/mensajerias/personas?per_page=${paginate.per_page}&page=${paginate.page}&id_mensajeriagrupo=${id_mensajeriagrupo}`,
    registrarEstudianteTodos:() => `/admin/mensajerias/estudiante-todos`,
    registrarDocentes:() => `/admin/mensajerias/docentes`,
  },

  roles: {
    listar: (paginate: any, id_usuario: string = "") => `/admin/roles?per_page=${paginate.per_page}&page=${paginate.page}&id_usuario=${id_usuario}`,
    registrar:() => `/admin/roles`,
    eliminar: (id_usuariorol: string) => `/admin/roles/${id_usuariorol}`,
    elegirPrincipal: (id_usuariorol: string) => `/admin/roles/${id_usuariorol}/elegir-principal`,
  },

  modulos: {  // pendiente sin uso
    listar: (paginate: any, text_search: string = "") => `/admin/roles?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
  },
};
