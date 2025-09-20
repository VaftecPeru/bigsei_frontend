export const Api_Global_Director = {
  estudiantes: {
    listar: (text_search: string) => `/director/estudiantes?text_search=${text_search}`,
  },

  docentes: {
    listar: (text_search: string) => `/director/docentes?text_search=${text_search}`,
  },

  academicoPeriodos: {
    listar: (text_search: string) => `/director/academico-periodos?text_search=${text_search}`,
  },

  academicoPeriodoCiclos: {
    listar: (text_search: string, id_periodo: string = "", id_carrera: string = "") => `/director/academico-periodo-ciclos?text_search=${text_search}&id_periodo=${id_periodo}&id_carrera=${id_carrera}`,
    // listarCarrerasActivas: (text_search: string) => `/director/academico-periodo-ciclos/carreras-activas?text_search=${text_search}`, // revisar en back tambien
  },

  academicoPeriodoCursos: {
    listar: (text_search: string) => `/director/academico-periodo-cursos?text_search=${text_search}`,
  },

  academicoPlanEstudios: {
    listar: (text_search: string, id_carrera: any, id_ciclo: any) => `/director/academico-plan-estudios?text_search=${text_search}&id_carrera=${id_carrera}&id_ciclo=${id_ciclo}`,
  },

  academicoCarreras: {
    listar: (text_search: string, id_periodo: string) => `/director/academico-carreras?text_search=${text_search}&id_periodo=${id_periodo}`,
  },

  asistencias: {
    estadisticas: (id_periodociclo: string) => `/director/asistencias/estadisticas?id_periodociclo=${id_periodociclo}`,
  },
};
