
import "./App.css";
import "./components/ux/loading/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./components/home/ForgotPassword";
import Dashboard from "./pages/admin/Dashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Navigation from "./components/navigation/Navigation";
import SimpleNavbar from "./components/navigation/SimpleNavbar";
import SimpleFooter from "./components/navigation/SimpleFooter";
import Profile from "./pages/student/Profile";
import MyRegistration from "./pages/student/MyRegistration";
import MyCourses from "./pages/student/MyCourses";
import TeacherForm from "./components/forms/TeacherForm";
import NewStudentForm from "./components/forms/NewStudentForm";
import PeriodForm from "./components/forms/PeriodForm";
import CicloForm from "./components/forms/CicloForm";
import UserForm from "./components/forms/UserForm";
import Notes from "./pages/student/reports/Notes";
import Horario from "./pages/student/reports/Horario";
import Matricula from "./pages/student/reports/Matricula";
import Pay from "./pages/student/reports/Pay";
import Debt from "./pages/student/reports/Debt";
import StudyPlan from "./pages/student/StudyPlan";
import Attendace from "./pages/student/Attendace";
import SeeRegistration from "./pages/student/SeeRegistration";
import Curso_Asignatura from "./pages/student/course/page.jsx";
import Home from "./pages/Home";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import Sede from "./pages/superadmin/Sede";
import StudentSA from "./pages/superadmin/StudentSA";
import TeachingSA from "./pages/superadmin/TeachingSA";
import UsersSA from "./pages/superadmin/UsersSA";
import Register from "./pages/Register";

import AcademicPeriod from "./pages/superadmin/acedemic/AcademicPeriod";
import AcademicCiclo from "./pages/superadmin/acedemic/AcademicCiclo";
import AcademicCourse from "./pages/superadmin/acedemic/AcademicCourse";
import AttendanceStudent from "./pages/superadmin/attendance/AttendanceStudent";
import AttendanceTeaching from "./pages/superadmin/attendance/AttendanceTeaching";
import StudentA from "./pages/admin/StudentA";
import TeachingA from "./pages/admin/TeachingA";
import UsersA from "./pages/admin/UsersA";
import AcademicPeriodA from "./pages/admin/academic/AcademicPeriodA";
// import AcademicCicloA from "./pages/admin/academic/AcademicCicloA";
// import AcademicCourseA from "./pages/admin/academic/AcademicCourseA";
import CreacionPeriodoA from "./pages/admin/academic/CreacionPeriodoA";
import AttendanceStudentA from "./pages/admin/attendance/AttendanceStudentA";
import AttendanceTeachingA from "./pages/admin/attendance/AttendanceTeachingA";
import PlanDeEstudioA from "./pages/admin/plandeestudios/PlanDeEstudioA";
import CreacionDePlanA from "./pages/admin/plandeestudios/CreacionDePlanA";
import Carrera from "./pages/configuracion/Carrera";
import Aula from "./pages/configuracion/Aula";
import Ciclo from "./pages/configuracion/Ciclo";
import Curso from "./pages/configuracion/Curso";

import NotFound from "./components/shared/NotFound";

import Contador from "./pages/contador/Contador";
import Factura from "./pages/contador/Factura";
import TramiteAcademico from "./pages/superadmin/TramiteAcademico";
import Directores from "./pages/superadmin/users/Directores";
import Profesores from "./pages/superadmin/users/Profesores";
import Estudiantes from "./pages/superadmin/users/Estudiantes";
import Padres from "./pages/superadmin/users/Padres";
import UsuariosPendientes from "./pages/superadmin/users/UsuariosPendientes";
import Docente from "./pages/docente/index";

import Docente_asignatura from "./pages/docente/asignatura/page.jsx";
import Formulario from "./pages/docente/asignatura/formulario.jsx";
import Docente_asistencia from "./pages/docente/asistencia/page.jsx";
import Detalle from "./pages/aprendizaje/detailsCourse.jsx";
import Reporte from "./components/home/intranet/Reporte.jsx";

import Gastos from "./pages/contador/Gastos";
import Clientes from "./pages/superadmin/clientes/page.jsx";
import Contadores from "./pages/superadmin/users/Contadores";
import Bibliotecarios from "./pages/superadmin/users/Bibliotecarios";

import Notas from "./pages/docente/reporte/notas"; //pskey35
import Horario_docente from "./pages/docente/reporte/horario"; //pskey35
import Degrees from "./pages/degrees";
import Aprendizaje from "./pages/aprendizaje";
import { Cursos, ListaDeDeseos, Recomendaciones, Logros } from "./pages/aprendizaje/introduccion";
import TramiteStudent from "./pages/student/TramiteStudent";
import SeguimientoStudent from "./pages/student/SeguimientoStudent";
import TramiteStudentAd from "./pages/admin/TramiteStudentAd";
import { createContext, useState } from "react";
import RegistrationForm from "./components/forms/formstudent/RegistrationForm.jsx"

export const ContextGlobal = createContext();

import Index from "./pages/director/indexD";
import MyCoursesD from "./pages/director/MyCoursesD";
import CourseDetailsD from "./pages/director/courses/CourseDetailsD";
import PendientesD from "./pages/director/pending/PendientesD";
import TopicoReservar from "./pages/topico/TopicoReservar";
import TopicoDashboard from "./pages/topico/TopicoDashboard";
import StudentD from "./pages/director/StudentD";
import TeachingD from "./pages/director/TeachingD";
import PlanDeEstudios from "./pages/director/CurriculumD";
import TramiteD from "./pages/director/TramiteD";
import AttendanceD from "./pages/director/AttendanceD";

import PanelDashboardAdmin from "./pages/topico/PanelDashboardAdmin";
import TopicoRegister from "./pages/topico/Dashboard/PageTopico";
import PageAddDoctor from "./components/pacientes/dashboard/PageAddDoctor";
import PageDashboardTopico from "./pages/topico/Dashboard/PageDashTopico";

import Bibliotecario from "./pages/bibliotecario/Bibliotecario";
import RegistrarMaterial from "./pages/bibliotecario/RegistrarMaterial";
import ReservaEstudiante from "./pages/bibliotecario/ReservaEstudiante";

import PageReport from "./pages/topico/Dashboard/reporte/PageReport";

import ReservaDocente from "./pages/bibliotecario/ReservaDocente";
import HistorialPrestamo from "./pages/bibliotecario/HistorialPrestamo";
import PageMiCurso from "./pages/student/miCurso/PageMiCurso";
import PageAddSchedules from "./components/pacientes/dashboard/PageAddSchedules";
import PageAddspecialties from "./components/pacientes/dashboard/PageAddSpecialties";
import InventoryPage from "./components/pacientes/dashboard/InventoryPage";
import Header from "./components/layout/Header";
import PageMaestria from "./pages/maestria/PageMaestria";
import { EducationalFooter } from "./components/ui/footer/EducationalFooter";
import PageEmpresa from "./pages/empresa/PageEmpresa";
import Empresa from "./pages/empresa/Empresa";
import TemasPage from "./pages/temas/TemasPage";
import TemasDetallePage from "./pages/temas/TemasDetallePage";
import CursosDetallePage from "./pages/cursos/CursosDetallePage";
import CompraCursoPage from "./pages/compra/CompraCursoPage";
import CompraMembresiaPage from "./pages/compra/CompraMembresiaPage";
import CompraLicenciaPage from "./pages/compra/CompraLicenciaPage";
import PageCurso from "./pages/cursos/PageCurso";
import EventsIndex from "./pages/events/EventsIndex";
import EventosPage from "./pages/EventosPage";
import LoginPage from "./pages/Log/LoginPage";
import { Conversation, Hacer, Progreso, DetalleModulo } from "./pages/aprendizaje/moduloCurso";
import Registro from "./pages/new_student/Registro";
import { MatriculaProceso } from "./pages/new_student/MatriculaProceso";
import Devoluciones from "./pages/bibliotecario/Devoluciones";
import PageHabilidades from "./pages/habilidades/PageHabilidades";

import PendientesP from "./pages/padre/pending/PendientesP";
import CourseDetailsP from "./pages/padre/courses/CourseDetailsP";
import AttendanceP from "./pages/padre/AttendanceP";
import PlanDeEstudiosP from "./pages/padre/CurriculumP";
import IndexP from "./pages/padre/indexP";
import MyCoursesP from "./pages/padre/MyCoursesP";
import StudentP from "./pages/padre/StudentP";
import TeachingP from "./pages/padre/TeachingP";
import TramiteP from "./pages/padre/TramiteP";
import ScrollToTop from './components/navigation/ScrollToTop';
import EducationMarketplace from './pages/market/Marketplace';


function App() {
  const [idStep, setIdStep] = useState(0);

  return (
    <ContextGlobal.Provider value={{ idStep, setIdStep }}>
      {/* <ConditionalNavigation> */}

      <ScrollToTop /> {/* Para que la pagina no comience de abajo */}
      <Routes>
        {/* Web principal */}
        <Route path="/" element={<Home />} />
        {/* Empresa */}
        <Route path="/empresa" element={<Empresa />} />

        <Route path="/web/grados" element={<Degrees />} />
        <Route path="/login" element={<Login />} />
        <Route path="/temas" element={<TemasPage />} />
        <Route path="/temas-detalle/:idPeriodocurso" element={<TemasDetallePage />} />
        <Route path="/compra-curso/:idPeriodocurso" element={<CompraCursoPage />} />
        <Route path="/compra-membresia/:idMembresiatipo" element={<CompraMembresiaPage />} />
        <Route path="/compra-licencia/:idLicenciatipo" element={<CompraLicenciaPage />} />


        <Route path="/Eventos" element={<EventosPage />} />

        <Route path="/marketplace" element={
          <>
            <Header />
            <EducationMarketplace />
            <EducationalFooter />
          </>
        } />

        <Route path="/detalles-curso" element={<Detalle />}>
          <Route index element={<Hacer />} />
          <Route path="hacer" element={<Hacer />} />
          <Route path="conversaciones" element={<Conversation />} />
          <Route path="progreso" element={<Progreso />} />
          <Route path="detalle-modulo/:moduleId" element={<DetalleModulo />} />
        </Route>

        <Route path="/web/aprendizaje" element={<Aprendizaje />}>
          <Route index element={<Cursos />} />
          <Route path="curso" element={<Cursos />} />
          <Route path="lista-de-deseos" element={<ListaDeDeseos />} />
          <Route path="recomendaciones" element={<Recomendaciones />} />
          <Route path="logros" element={<Logros />} />
        </Route>

        {/* Events */}
        <Route path="/eventos-online" element={< EventsIndex/>} />


        <Route path="/reporte/ficha-academica" element={<Reporte />}>
        </Route>

        <Route path="/cursos" element={<PageCurso />} />
        <Route path="/cursos-detalle/:idPeriodocurso" element={<CursosDetallePage />} />
        <Route path="/habilidades" element={<PageHabilidades />} />
        <Route path="/logingoogle" element={< LoginPage />} />
        <Route path="/logingoogle/:idPeriodocurso" element={< LoginPage />} />

        <Route path="/login/forgot-password" element={<ForgotPassword />} />

        <Route path="/registro" element={< Register />} />

        <Route
          path="/formulario"
          element={< Formulario />} />
        <Route
          path="/formulario/:idPeriodocuestionario"
          element={
            <Navigation isSuperAdmin={true}>
              <Formulario />
            </Navigation>
          }
        />

        {/* Super admin */}
        <Route
          path="/superadministrador"
          element={
            <Navigation isSuperAdmin={true}>
              <SuperAdminDashboard />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/estudiantes"
          element={
            <Navigation isSuperAdmin={true}>
              <StudentSA />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/docentes"
          element={
            <Navigation isSuperAdmin={true}>
              <TeachingSA />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/docentes/agregar"
          element={
            <Navigation isSuperAdmin={true}>
              <TeacherForm />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios"
          element={
            <Navigation isSuperAdmin={true}>
              <UsersSA />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/usuarios/directores"
          element={
            <Navigation isSuperAdmin={true}>
              <Directores />
            </Navigation>
          }
        />

        <Route
          path="/micurso"
          element={
            <>
              <Header />
              <PageMiCurso />

            </>



          }
        />

        {/*Maestria */}


        <Route
          path="/maestria"
          element={
            <>
              <Header />
              <PageMaestria />
              <EducationalFooter />
            </>



          }
        />
        <Route
          path="/empresa"
          element={
            <>
              <Header />
              <PageEmpresa />
              <EducationalFooter />
            </>



          }
        />
        <Route
          path="/superadministrador/usuarios/profesores"
          element={
            <Navigation isSuperAdmin={true}>
              <Profesores />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios/estudiantes"
          element={
            <Navigation isSuperAdmin={true}>
              <Estudiantes />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios/padres"
          element={
            <Navigation isSuperAdmin={true}>
              <Padres />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios/contadores"
          element={
            <Navigation isSuperAdmin={true}>
              <Contadores />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/usuarios/bibliotecarios"
          element={
            <Navigation isSuperAdmin={true}>
              <Bibliotecarios />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/usuarios/usuariospendientes"
          element={
            <Navigation isSuperAdmin={true}>
              <UsuariosPendientes />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/usuarios/directores"
          element={
            <Navigation isSuperAdmin={true}>
              <Directores />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios/profesores"
          element={
            <Navigation isSuperAdmin={true}>
              <Profesores />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios/estudiantes"
          element={
            <Navigation isSuperAdmin={true}>
              <Estudiantes />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios/padres"
          element={
            <Navigation isSuperAdmin={true}>
              <Padres />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/usuarios/usuariospendientes"
          element={
            <Navigation isSuperAdmin={true}>
              <UsuariosPendientes />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/usuario/agregar"
          element={
            <Navigation isSuperAdmin={true}>
              <UserForm />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/academico/periodo"
          element={
            <Navigation isSuperAdmin={true}>
              <AcademicPeriod />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/academico/ciclo"
          element={
            <Navigation isSuperAdmin={true}>
              <AcademicCiclo />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/academico/curso"
          element={
            <Navigation isSuperAdmin={true}>
              <AcademicCourse />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/estudiante/agregar"
          element={
            <Navigation isSuperAdmin={true}>
              <NewStudentForm />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/asistencia/estudiante"
          element={
            <Navigation isSuperAdmin={true}>
              <AttendanceStudent />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/asistencia/docente"
          element={
            <Navigation isSuperAdmin={true}>
              <AttendanceTeaching />
            </Navigation>
          }
        />
        <Route
          path="/superadministrador/tramites"
          element={
            <Navigation isSuperAdmin={true}>
              <TramiteAcademico />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/sedes*"
          element={
            <Navigation isSuperAdmin={true}>
              <Sede />
            </Navigation>
          }
        />

        <Route
          path="/superadministrador/clientes"
          element={
            <Navigation isSuperAdmin={true}>
              <Clientes></Clientes>
            </Navigation>
          }
        />

        <Route
          path="/admin"
          element={
            <Navigation isAdmin={true}>
              <Dashboard />
            </Navigation>
          }
        />
        <Route
          path="/admin/estudiantes"
          element={
            <Navigation isAdmin={true}>
              <StudentA />
            </Navigation>
          }
        />
        <Route
          path="/admin/tramite"
          element={
            <Navigation isAdmin={true}>
              <TramiteStudentAd />
            </Navigation>
          }
        />
        <Route
          path="/admin/docentes"
          element={
            <Navigation isAdmin={true}>
              <TeachingA />
            </Navigation>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <Navigation isAdmin={true}>
              <UsersA />
            </Navigation>
          }
        />
        <Route
          path="/admin/academico/periodo"
          element={
            <Navigation isAdmin={true}>
              <AcademicPeriodA />
            </Navigation>
          }
        />
        {/* <Route
          path="/admin/academico/ciclo"
          element={
            <Navigation isAdmin={true}>
              <AcademicCicloA />
            </Navigation>
          }
        /> */}
        {/* <Route
          path="/admin/academico/curso"
          element={
            <Navigation isAdmin={true}>
              <AcademicCourseA />
            </Navigation>
          }
        /> */}
        <Route
          path="/admin/academico/creacion-periodo/:idPeriodo"
          element={
            <Navigation isAdmin={true}>
              <CreacionPeriodoA />
            </Navigation>
          }
        />
        <Route
          path="/admin/academico/asistencia/estudiante"
          element={
            <Navigation isAdmin={true}>
              <AttendanceStudentA />
            </Navigation>
          }
        />
        <Route
          path="/admin/academico/asistencia/docente"
          element={
            <Navigation isAdmin={true}>
              <AttendanceTeachingA />
            </Navigation>
          }
        />

        <Route path="/admin/new-docente*" element={<TeacherForm />} />
        <Route
          path="/admin/plan-de-estudios"
          element={
            <Navigation isAdmin={true}>
              <PlanDeEstudioA />
            </Navigation>
          }
        />
        <Route
          path="/admin/creacion-de-plan/:idPlanestudio"
          element={
            <Navigation isAdmin={true}>
              <CreacionDePlanA />
            </Navigation>
          }
        />
        <Route
          path="/configuracion/carrera"
          element={
            <Navigation isAdmin={true}>
              <Carrera />
            </Navigation>
          }
        />
        <Route
          path="/configuracion/aula"
          element={
            <Navigation isAdmin={true}>
              <Aula />
            </Navigation>
          }
        />
        <Route
          path="/configuracion/ciclo"
          element={
            <Navigation isAdmin={true}>
              <Ciclo />
            </Navigation>
          }
        />
        <Route
          path="/configuracion/curso"
          element={
            <Navigation isAdmin={true}>
              <Curso />
            </Navigation>
          }
        />

        <Route
          path="/topicomedico"
          element={
            <Navigation isTopico={true}>
              <PageDashboardTopico />
            </Navigation>
          }
        />
        <Route
          path="/topicomedico/reporte"
          element={
            <Navigation isTopico={true}>
              <PageReport />
            </Navigation>
          }
        />

        <Route
          path="/topicomedico/pacientes"
          element={
            <Navigation isTopico={true}>
              <TopicoRegister />
            </Navigation>
          }
        />

        <Route
          path="/topico/TopicoDashboard"
          element={
            <Navigation isTopico={true}>
              <TopicoDashboard />
            </Navigation>
          }
        />
        <Route
          path="/topicomedico/dashboard-panel"
          element={
            <Navigation isTopico={true}>
              <PanelDashboardAdmin />
            </Navigation>
          }
        />
        <Route
          path="/topicomedico/añadir-doctor"
          element={
            <Navigation isTopico={true}>
              <PageAddDoctor />
            </Navigation>
          }
        />
        <Route
          path="/topicomedico/horarios"
          element={
            <Navigation isTopico={true}>
              <PageAddSchedules />
            </Navigation>
          }
        />
        <Route
          path="/topicomedico/especialidades"
          element={
            <Navigation isTopico={true}>
              <PageAddspecialties />
            </Navigation>
          }
        />

        <Route
          path="/topicomedico/stock"
          element={
            <Navigation isTopico={true}>
              <InventoryPage />
            </Navigation>
          }
        />

        <Route
          path="/topicomedico/panel-admin"
          element={
            <Navigation isTopico={true}>
              <PanelDashboardAdmin />
            </Navigation>
          }
        />
        {/* nuevo para registar alumnos nuevos */}
        <Route path="/admin/new-student*" element={<NewStudentForm />} />

        {/* nuevo para registar admin/periodo */}
        <Route path="/admin/new-periodo*" element={<PeriodForm />} />

        {/* nuevo para registar admin/periodo */}
        <Route path="/admin/new-ciclo*" element={<CicloForm />} />

        {/* nuevo para registar admin/usuario */}
        <Route path="/admin/new-user*" element={<UserForm />} />

        <Route
          path="/new-student/registration/*"
          element={
            <>
              <SimpleNavbar />
              <Registro />
              <SimpleFooter />
            </>
          }
        />
        <Route path="/new-student/proceso-matricula" element={<MatriculaProceso />} />

        <Route
          path="/student/*"
          element={
            <Navigation isAdmin={false}>
              <StudentDashboard />
            </Navigation>
          }
        />

        <Route
          path="/student/perfil"
          element={
            <Navigation isAdmin={false}>
              <Profile />
            </Navigation>
          }
        />

        <Route
          path="/student/matricula"
          element={
            <Navigation isAdmin={false}>
              <MyRegistration />
            </Navigation>
          }
        />

        {/* matricula ver mi matricula */}
        <Route
          path="/student/mimatricula"
          element={
            <Navigation isAdmin={false}>
              <SeeRegistration />
            </Navigation>
          }
        />

        <Route
          path="/student/cursos"
          element={
            <Navigation isAdmin={false}>
              <Curso_Asignatura />
            </Navigation>
          }
        />
        {/*           <Route
            path="/student/cursos/"
            element={
              <Navigation isAdmin={false}>
                <PageAsignatura />
              </Navigation>
            }
          /> */}

        {/* <Route
            path="/student/cursos/mensajeria"
            element={
              <Navigation isAdmin={false}>
                <PageAsignatura />
              </Navigation>
            }
          /> */}

        {/* student Reportes/notas */}
        <Route
          path="/student/reporte/notas"
          element={
            <Navigation isAdmin={false}>
              <Notes />
            </Navigation>
          }
        />

        {/* student Reportes/horario */}
        <Route
          path="/student/reporte/horario"
          element={
            <Navigation isAdmin={false}>
              <Horario />
            </Navigation>
          }
        />

        {/* student Reportes/matricula */}
        <Route
          path="/student/reporte/matricula"
          element={
            <Navigation isAdmin={false}>
              <Matricula />
            </Navigation>
          }
        />

        {/* student Reportes/pago */}
        <Route
          path="/student/reporte/pagos"
          element={
            <Navigation isAdmin={false}>
              <Pay />
            </Navigation>
          }
        />

        {/* student Reportes/deuda */}
        <Route
          path="/student/reporte/deudas"
          element={
            <Navigation isAdmin={false}>
              <Debt />
            </Navigation>
          }
        />

        {/* student asistencia */}
        <Route
          path="/student/asistencia"
          element={
            <Navigation isAdmin={false}>
              <Attendace />
            </Navigation>
          }
        />

        {/* student plan de estudio */}
        <Route
          path="/student/plan-de-estudios"
          element={
            <Navigation isAdmin={false}>
              <StudyPlan />
            </Navigation>
          }
        />

        {/* student tramite academico */}
        <Route
          path="/student/tramite"
          element={
            <Navigation isAdmin={false}>
              <TramiteStudent />
            </Navigation>
          }
        />
        <Route
          path="/student/tramite/seguimiento"
          element={
            <Navigation isAdmin={false}>
              <SeguimientoStudent />
            </Navigation>
          }
        />

        {/* page 404 */}
        <Route path="*" element={<NotFound />} />

        {/* contador */}

        <Route
          path="/contador"
          element={
            <Navigation isContador={true}>
              <Contador />
            </Navigation>
          }
        />
        <Route
          path="/contador/factura"
          element={
            <Navigation isContador={true}>
              <Factura />
            </Navigation>
          }
        />
        <Route
          path="/contador/gastos"
          element={
            <Navigation isContador={true}>
              <Gastos />
            </Navigation>
          }
        />

        {/*docentes*/}
        <Route
          path="/docente"
          element={
            <Navigation isDocente={true}>
              <Docente></Docente>
            </Navigation>
          }
        />

        <Route
          path="/docente/asignaturas"
          element={
            <Navigation isDocente={true}>
              <Docente_asignatura></Docente_asignatura>
            </Navigation>
          }
        ></Route>

        <Route
          path="/docente/asistencia"
          element={
            <Navigation isDocente={true}>
              <Docente_asistencia></Docente_asistencia>
            </Navigation>
          }
        ></Route>

        <Route
          path="/docente/reporte/notas"
          element={
            <Navigation isDocente={true}>
              <Notas></Notas>
            </Navigation>
          }
        ></Route>

        <Route
          path="/docente/reporte/horario"
          element={
            <Navigation isDocente={true}>
              <Horario_docente></Horario_docente>
            </Navigation>
          }
        ></Route>
        {/* vendedor */}
        <Route
          path="/vendedor"
          element={
            <Navigation isVendedor={true}>
              <Index />
            </Navigation>
          }
        />
        {/* tutor */}
        <Route
          path="/tutor"
          element={
            <Navigation isTutor={true}>
              <Index />
            </Navigation>
          }
        />
        {/* padre */}
        <Route
          path="/padre"
          element={
            <Navigation isPadre={true}>
              <IndexP />
            </Navigation>
          }
        />

        <Route
          path="/padre/cursos"
          element={
            <Navigation isPadre={true}>
              <MyCoursesP />
            </Navigation>
          }
        />

        <Route
          path="/padre/cursos/:id"
          element={
            <Navigation isPadre={true}>
              <CourseDetailsP />
            </Navigation>
          }
        />

        <Route
          path="/padre/pendientes"
          element={
            <Navigation isPadre={true}>
              <PendientesP />
            </Navigation>
          }
        />

        <Route
          path="/padre/estudiantes"
          element={
            <Navigation isPadre={true}>
              <StudentP />
            </Navigation>
          }
        />
        <Route
          path="/padre/docentes"
          element={
            <Navigation isPadre={true}>
              <TeachingP />
            </Navigation>
          }
        />

        <Route
          path="/padre/plan-de-estudios"
          element={
            <Navigation isPadre={true}>
              <PlanDeEstudiosP />
            </Navigation>
          }
        />

        <Route
          path="/padre/tramite"
          element={
            <Navigation isPadre={true}>
              <TramiteP />
            </Navigation>
          }
        />

        <Route
          path="/padre/asistencia"
          element={
            <Navigation isPadre={true}>
              <AttendanceP />
            </Navigation>
          }
        />


        {/* Bibliotecario */}
        <Route
          path="/bibliotecario"
          element={
            <Navigation isBibliotecario={true}>
              <Bibliotecario />
            </Navigation>
          }
        />
        <Route
          path="/bibliotecario/historial-devoluciones"
          element={
            <Navigation isBibliotecario={true}>
              <Devoluciones />
            </Navigation>
          }
        />
        <Route
          path="/bibliotecario/reserva-estudiantes"
          element={
            <Navigation isBibliotecario={true}>
              <ReservaEstudiante />
            </Navigation>
          }
        />
        <Route
          path="/bibliotecario/reserva-docentes"
          element={
            <Navigation isBibliotecario={true}>
              <ReservaDocente />
            </Navigation>
          }
        />
        <Route
          path="/bibliotecario/historial-prestamo"
          element={
            <Navigation isBibliotecario={true}>
              <HistorialPrestamo />
            </Navigation>
          }
        />

        <Route
          path="/bibliotecario/registrar-material"
          element={
            <Navigation isBibliotecario={true}>
              <RegistrarMaterial />
            </Navigation>
          }
        />
        <Route
          path="/bibliotecario/devoluciones"
          element={
            <Navigation isBibliotecario={true}>
              <RegistrarMaterial />
            </Navigation>
          }
        />
        {/* director */}
        <Route
          path="/director"
          element={
            <Navigation isDirector={true}>
              <Index />
            </Navigation>
          }
        />

        <Route
          path="/director/cursos"
          element={
            <Navigation isDirector={true}>
              <MyCoursesD />
            </Navigation>
          }
        />

        <Route
          path="/director/cursos/:id"
          element={
            <Navigation isDirector={true}>
              <CourseDetailsD />
            </Navigation>
          }
        />

        <Route
          path="/director/pendientes"
          element={
            <Navigation isDirector={true}>
              <PendientesD />
            </Navigation>
          }
        />

        <Route
          path="/director/estudiantes"
          element={
            <Navigation isDirector={true}>
              <StudentD />
            </Navigation>
          }
        />
        <Route
          path="/director/docentes"
          element={
            <Navigation isDirector={true}>
              <TeachingD />
            </Navigation>
          }
        />

        <Route
          path="/director/plan-de-estudios"
          element={
            <Navigation isDirector={true}>
              <PlanDeEstudios />
            </Navigation>
          }
        />

        <Route
          path="/director/tramite"
          element={
            <Navigation isDirector={true}>
              <TramiteD />
            </Navigation>
          }
        />

        <Route
          path="/director/asistencia"
          element={
            <Navigation isDirector={true}>
              <AttendanceD />
            </Navigation>
          }
        />
      </Routes>
      {/*topico ruta */}

      {/* </ConditionalNavigation> */}
    </ContextGlobal.Provider>
  );

}

export default App;
