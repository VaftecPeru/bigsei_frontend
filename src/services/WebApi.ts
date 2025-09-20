export const Api_Global_Web = {
  matriculas: {
    listarCursoLibres: (text_search: string, id_tipocategoria: string) => `/web/matriculas/curso-libres?text_search=${text_search}&id_tipocategoria=${id_tipocategoria}`,
    mostrarCursoLibres: (id_periodocurso: string) => `/web/matriculas/curso-libres/${id_periodocurso}`,
    listarPrecioCursoLibres: (idPeriodocurso: any) => `/web/matriculas/precio-curso-libres?id_periodocurso=${idPeriodocurso}`,
    registrarCursoLibre: () => `/web/matriculas/curso-libres`,
    listarCategoriaCursosLibres: () => `/web/matriculas/categoria-cursos-libres`,
  },

  miMatriculas: {
    registrarConMembresias: () => `/web/mi-matriculas/con-membresias`,
    registrarSinMembresias: () => `/web/mi-matriculas/sin-membresias`,
  },

  cursos: {
    listarDestacados: (paginate: any) => `/web/cursos/destacados?per_page=${paginate.per_page}&page=${paginate.page}`,
    listarVisiblesWeb: (paginate: any, id_empresa: string = "") => `/web/cursos/visibles-web?per_page=${paginate.per_page}&page=${paginate.page}&id_empresa=${id_empresa}`,
  },

  misCursos: {
    listar: (paginate: any) => `/web/mis-cursos?per_page=${paginate.per_page}&page=${paginate.page}`,
  },

  membresiaTipos: {
    listarActivos: (paginate: any) => `/web/membresia-tipos/activos?per_page=${paginate.per_page}&page=${paginate.page}`,
    mostrar: (idMembresiatipo: string) => `/web/membresia-tipos/${idMembresiatipo}`,
  },

  membresias: {
    registrar:() => `/web/membresias`,
  },

  miMembresias: {
    listarActivas:(paginate: any) => `/web/mi-membresias/activas?per_page=${paginate.per_page}&page=${paginate.page}`,
    registrar:() => `/web/mi-membresias`,
  },

  solicitudes: {
    registrarEmpresa:() => `/web/solicitudes/empresas`,
    registrarContacto:() => `/web/solicitudes/contactos`,
  },

  licencias: {
    registrar:() => `/web/licencias`,
    listarTipoActivos: (paginate: any) => `/web/licencias/tipo-activos?per_page=${paginate.per_page}&page=${paginate.page}`,
  },

  carreras: {
    listar: (paginate: any, id_tipotituloacademico: string) => `/web/carreras?per_page=${paginate.per_page}&page=${paginate.page}&id_tipotituloacademico=${id_tipotituloacademico}`,
    listarTipoTituloAcademico: (paginate: any) => `/web/carreras/tipo-titulo-academico?per_page=${paginate.per_page}&page=${paginate.page}`,
  },

  tipoCategorias: {
    listarPorTemas: (paginate: any) => `/web/tipo-categorias/por-temas?per_page=${paginate.per_page}&page=${paginate.page}`,
  },

  temas: {
    listar: (paginate: any, id_tipocategoria: string) => `/web/temas?per_page=${paginate.per_page}&page=${paginate.page}&id_tipocategoria=${id_tipocategoria}`,
  },

  empresas: {
    listar: (paginate: any) => `/web/empresas?per_page=${paginate.per_page}&page=${paginate.page}`,
  },
};
