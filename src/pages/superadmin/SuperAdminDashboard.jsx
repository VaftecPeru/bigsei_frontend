import BarReportRegistrationSede from "@/components/dashboard/BarReportRegistrationSede";
import BarSedes from "@/components/dashboard/BarSedes";
import { PieChartAttendaceSede } from "@/components/dashboard/PieChartAttendaceSede";
import StatCard from "@/components/dashboard/StatCard";
import {
    BookMarked,
    Flag,
    GraduationCap,
    Presentation,
} from "lucide-react";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";
import { useState, useEffect } from "react";

export default function SuperAdminDashboard() {
    const [sede, setSede] = useState({ cantidad: 0 });
    const [profesor, setProfesores] = useState({ cantidad: 0 });
    const [estudiante, setEstudiantes] = useState({ cantidad: 0 });
    const [padre, setPadres] = useState({ cantidad: 0 });

    const getSede = async (text_search) => {
        try {
            const response = await apiClient.get(Api_Global_Dashboard.superadministradores.cantidadSedes(text_search));
            setSede({
                cantidad: response.data.cantidad,
            });
        } catch (error) {
            console.error("Error al obtener sede:", error);
        } finally {
        }
    };

    const getProfesores = async (text_search) => {
        try {
            const response = await apiClient.get(Api_Global_Dashboard.superadministradores.cantidadProfesores(text_search));
            setProfesores({
                cantidad: response.data.cantidad,
            });
        } catch (error) {
            console.error("Error al obtener profesores:", error);
        } finally {
        }
    };

    const getEstudiantes = async (text_search) => {
        try {
            const response = await apiClient.get(Api_Global_Dashboard.superadministradores.cantidadEstudiantes(text_search));
            setEstudiantes({
                cantidad: response.data.cantidad,
            });
        } catch (error) {
            console.error("Error al obtener estudiantes:", error);
        } finally {
        }
    };

    const getPadres = async (text_search) => {
        try {
            const response = await apiClient.get(Api_Global_Dashboard.superadministradores.cantidadPadres(text_search));
            setPadres({
                cantidad: response.data.cantidad,
            });
        } catch (error) {
            console.error("Error al obtener padres:", error);
        } finally {
        }
    };

    useEffect(() => {
        getSede("");
        getProfesores("");
        getEstudiantes("");
        getPadres("");
    }, []);

    const totalUsuarios = estudiante.cantidad + profesor.cantidad + padre.cantidad;

    const porcentajeEstudiantes = totalUsuarios > 0
        ? ((estudiante.cantidad / totalUsuarios) * 100).toFixed(2)
        : 0;

    const porcentajeDocentes = totalUsuarios > 0
        ? ((profesor.cantidad / totalUsuarios) * 100).toFixed(2)
        : 0;

    const porcentajePadres = totalUsuarios > 0
        ? ((padre.cantidad / totalUsuarios) * 100).toFixed(2)
        : 0;

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-[#e0ecfc]">
            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl">
                <StatCard
                    title="Sedes"
                    value={sede.cantidad}
                    icon={<Flag />}
                    percentage="15"
                    description="Del período anterior"
                />
                <StatCard
                    title="Estudiantes"
                    value={estudiante.cantidad}
                    icon={<GraduationCap />}
                    percentage={porcentajeEstudiantes}
                    description="Del total de usuarios"
                />
                <StatCard
                    title="Docentes"
                    value={profesor.cantidad}
                    icon={<Presentation />}
                    percentage={porcentajeDocentes}
                    description="Del total de usuarios"
                />
                <StatCard
                    title="Padres"
                    value={padre.cantidad}
                    icon={<BookMarked />}
                    percentage={porcentajePadres}
                    description="Del total de usuarios"
                />
            </div>
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-4 rounded-2xl">
                <div className="w-full lg:w-2/2">
                    <BarSedes />
                </div>
                <div className="w-full lg:w-1/2">
                    <PieChartAttendaceSede />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-4 rounded-2xl">
                {/* <AreaChartInteractive /> */}
                <BarReportRegistrationSede />
            </div>
        </div>
    );
}
