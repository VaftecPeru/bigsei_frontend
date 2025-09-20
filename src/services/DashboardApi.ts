export const Api_Global_Dashboard = {
    superadministradores: {
        cantidadSedes: (text_search: string) => `/dashboard/superadministrador/cantidad-sedes?text_search=${text_search}`,
        cantidadProfesores: (text_search: string) => `/dashboard/superadministrador/cantidad-docentes?text_search=${text_search}`,
        cantidadEstudiantes: (text_search: string) => `/dashboard/superadministrador/cantidad-estudiantes?text_search=${text_search}`,
        cantidadPadres: (text_search: string) => `/dashboard/superadministrador/cantidad-padres?text_search=${text_search}`,
        cantidadSedeDocentes: (text_search: String) =>
            `/dashboard/superadministrador/cantidad-sede-docentes?text_search=${text_search}`,
        cantidadSedeEstudiantes: (text_search: string) =>
            `/dashboard/superadministrador/cantidad-sede-estudiantes?text_search=${text_search}`,
        cantidadSedePadres: (text_search: string) =>
            `/dashboard/superadministrador/cantidad-sede-padres?text_search=${text_search}`,
        listaNombresSede: (text_search: string) => `/dashboard/superadministrador/lista-nombre-sedes?text_search=${text_search}`,
        porcentajeAsistencia: (id_empresa: number) =>
            `/dashboard/superadministrador/porcentaje-asistencia/${id_empresa}`,
        cantidadMatriculasSede: (text_search: string) =>
            `/dashboard/superadministrador/cantidad-matriculas-sede?text_search=${text_search}`,
    },
    admin: {
        cantidadProfesores: (text_search: string) => `/dashboard/admin/cantidad-docentes?text_search=${text_search}`,
        cantidadEstudiantes: (text_search: string) => `/dashboard/admin/cantidad-estudiantes?text_search=${text_search}`,
        cantidadPadres: (text_search: string) => `/dashboard/admin/cantidad-padres?text_search=${text_search}`,
        cantidadSedes: (text_search: string) => `/dashboard/admin/cantidad-sedes?text_search=${text_search}`,
        notas: (text_search: string) => `/dashboard/admin/reporte-notas?text_search=${text_search}`,
        listaNombrePeriodo: (text_search: string) => `/dashboard/admin/lista-nombre-periodo?text_search=${text_search}`,
        listaNombreCiclo: (idPeriodo: string | number) =>
            `/dashboard/admin/lista-nombre-ciclo?idPeriodo=${idPeriodo}`,
        listaNombreCurso: (text_search: string) => `/dashboard/admin/lista-nombre-curso?text_search=${text_search}`,
        balanceFinanciero: (text_search: string) => `/dashboard/admin/balance-general?text_search=${text_search}`,
        listaMovimiento: (tipo: string) => `/dashboard/admin/lista-movimiento?tipo=${tipo}`,
        listaIngresos: (text_search: string) => `/dashboard/admin/lista-ingresos?text_search=${text_search}`,
        porcentajeIngresos: (text_search: string) => `/dashboard/admin/porcentaje-ingresos?text_search=${text_search}`,
        porcentajeEgresos: (text_search: string) => `/dashboard/admin/porcentaje-egresos?text_search=${text_search}`,
    },
    director: {
        cantidadProfesores: (text_search: string) => `/dashboard/director/cantidad-docentes?text_search=${text_search}`,
        cantidadEstudiantes: (text_search: string) => `/dashboard/director/cantidad-estudiantes?text_search=${text_search}`,
        cantidadPadres: (text_search: string) => `/dashboard/director/cantidad-padres?text_search=${text_search}`,
        cantidadSedes: (text_search: string) => `/dashboard/director/cantidad-sedes?text_search=${text_search}`,
        porcentajeIngresos: (text_search: string) => `/dashboard/director/porcentaje-ingresos?text_search=${text_search}`,
        porcentajeEgresos: (text_search: string) => `/dashboard/director/porcentaje-egresos?text_search=${text_search}`,
    },
    padre: {
        cantidadProfesores: (text_search: string) => `/dashboard/padre/cantidad-docentes?text_search=${text_search}`,
        cantidadEstudiantes: (text_search: string) => `/dashboard/padre/cantidad-estudiantes?text_search=${text_search}`,
        cantidadPadres: (text_search: string) => `/dashboard/padre/cantidad-padres?text_search=${text_search}`,
        cantidadSedes: (text_search: string) => `/dashboard/padre/cantidad-sedes?text_search=${text_search}`,
        porcentajeIngresos: (text_search: string) => `/dashboard/padre/porcentaje-ingresos?text_search=${text_search}`,
        porcentajeEgresos: (text_search: string) => `/dashboard/padre/porcentaje-egresos?text_search=${text_search}`,
    },
    bibliotecario: {
        reservaEstudiante: (text_search: string) => `/dashboard/bibliotecario/cant-reservas-estudiante?text_search=${text_search}`,
        reservaDocente: (text_search: string) => `/dashboard/bibliotecario/cant-reservas-docente?text_search=${text_search}`,
        devolucionAtrasada: (text_search: string) => `/dashboard/bibliotecario/cant-devoluciones-atrasada?text_search=${text_search}`,
        visitas: (text_search: string) => `/dashboard/bibliotecario/visitas?text_search=${text_search}`,
        reserva: (text_search: string) => `/dashboard/bibliotecario/cant-reservas?text_search=${text_search}`,
        ultReserva: (text_search: string) => `/dashboard/bibliotecario/ult-reservas?text_search=${text_search}`,
        listarLibro: (text_search: string) => `/dashboard/bibliotecario/listar-libro?text_search=${text_search}`,
    },
    docente: {
        listarCursos: (idUsuario: number) => `/dashboard/docente/listar-cursos/${idUsuario}`,
        cantidadAlumnos: (idUsuario: number) => `/dashboard/docente/cantidad-alumnos/${idUsuario}`,
        listarTarea: (idUsuario: number) => `/dashboard/docente/listar-tareas/${idUsuario}`,
    },
    student: {
        listarCursos: (idUsuario: number) => `/dashboard/estudiante/listar-cursos/${idUsuario}`,
        listarNotas: (idUsuario: number) => `/dashboard/estudiante/listar-notas/${idUsuario}`,
        listarTareas: (idUsuario: number) => `/dashboard/estudiante/listar-tareas/${idUsuario}`,
        listarAsistencia: (idUsuario: number) => `/dashboard/estudiante/listar-asistencia/${idUsuario}`,
    },
    topico: {
        cantidadPaciente: (text_search: string) => `/dashboard/topico/cantidad-paciente?text_search=${text_search}`,
        cantidadDoctor: (text_search: string) => `/dashboard/topico/cantidad-paciente?text_search=${text_search}`,
    }
};
