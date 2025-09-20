export const Api_Global_Setup = {
  tipoDocumentos: {
    listar: (text_search: string) => `/setup/tipo-documentos?text_search=${text_search}`,
  },

  tipoModalidadestudios: {
    listar: (text_search: string) => `/setup/tipo-modalidadestudios?text_search=${text_search}`,
  },

  tipoNiveleducativos: {
    listar: (paginate: any, text_search: string) => `/setup/tipo-niveleducativos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
  },

  tipoEspecializaciones: {
    listar: (paginate: any, text_search: string) => `/setup/tipo-especializaciones?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
  },

  carreras: {
    activos: (paginate: any, text_search: string) => `/setup/carreras/activos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    listar: (paginate: any, text_search: string) => `/setup/carreras?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_carrera: string) => `/setup/carreras/${id_carrera}`,
    registrar:() => `/setup/carreras`,
    editar:(id_carrera: string) => `/setup/carreras/${id_carrera}`,
    eliminar: (id_carrera: any) => `/setup/carreras/${id_carrera}`,
  },

  ciclos: {
    activos: (paginate: any, text_search: string) => `/setup/ciclos/activos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    listar: (paginate: any, text_search: string) => `/setup/ciclos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_ciclo: string) => `/setup/ciclos/${id_ciclo}`,
    registrar:() => `/setup/ciclos`,
    editar:(id_ciclo: string) => `/setup/ciclos/${id_ciclo}`,
    eliminar: (id_ciclo: any) => `/setup/ciclos/${id_ciclo}`,
  },

  cursos: {
    listar: (paginate: any, text_search: string) => `/setup/cursos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_curso: string) => `/setup/cursos/${id_curso}`,
    registrar:() => `/setup/cursos`,
    editar:(id_curso: string) => `/setup/cursos/${id_curso}`,
    eliminar: (id_curso: any) => `/setup/cursos/${id_curso}`,
  },

  secciones: {
    listar: (text_search: string) => `/setup/secciones?text_search=${text_search}`,
  },

  tipoCategorias: {
    listar: (text_search: string, tipo: string) => `/setup/tipo-categorias?text_search=${text_search}&tipo=${tipo}`,
  },

  empresas: {
    listar: (text_search: string) => `/setup/empresas?text_search=${text_search}`,
  },

  roles: {
    listar: (text_search: string) => `/setup/roles?text_search=${text_search}`,
  },

  userLogin: {
    mostrar: () => `/setup/user-login`,
  },

  userModulos: {
    listar: () => `/setup/user-modulos`,
  },

  userRoles: {
    listar: (id_empresa: any) => `/setup/user-roles?id_empresa=${id_empresa}`,
    esPrincipal: () => `/setup/user-roles/es-principales`,
  },

  userEmpresas: {
    listar: () => `/setup/user-empresas`,
  },

  tipoTituloAcademicos: {
    listarActivos: (text_search: string) => `/setup/tipo-titulo-academicos/activos?text_search=${text_search}`,
  },

  tituloAcademicos: {
    listarActivos: (text_search: string, id_tipotituloacademico: string) => `/setup/titulo-academicos/activos?text_search=${text_search}&id_tipotituloacademico=${id_tipotituloacademico}`,
  },

  tipoPreguntas: {
    listar: () => `/setup/tipo-preguntas`,
  },

  archivos: {
    visualizar: (id_archivo: string) => `/setup/visualizar-archivos/${id_archivo}`,
    descargar: (id_archivo: string) => `/setup/descargar-archivos/${id_archivo}`,
    listar: (paginate: any, obj: any) => `/setup/archivos?per_page=${paginate.per_page}&page=${paginate.page}&${obj.label}=${obj.value}`,
    visualizarImagen: (id_archivo: string) => `/setup/archivos/${id_archivo}/visualizar-imagenes`,
  },

  aulas: {
    activos: (paginate: any, text_search: string) => `/setup/aulas/activos?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    listar: (paginate: any, text_search: string) => `/setup/aulas?per_page=${paginate.per_page}&page=${paginate.page}&text_search=${text_search}`,
    mostrar: (id_aula: string) => `/setup/aulas/${id_aula}`,
    registrar:() => `/setup/aulas`,
    editar:(id_aula: string) => `/setup/aulas/${id_aula}`,
    eliminar: (id_aula: string) => `/setup/aulas/${id_aula}`,
  },

  dias: {
    activos: () => `/setup/dias/activos`,
  },
};
