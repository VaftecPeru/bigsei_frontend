import { AreaChartLegend } from "@/components/dashboard/AreaChartLegend";
import CalendarNew from "@/components/dashboard/CalendarNew";
import IncomeExpenseReport from "@/components/dashboard/IncomeExpenseReport";
import ListCard from "@/components/dashboard/ListCard";
import PercentageCard from "@/components/dashboard/PercentageCard";
import { PieChartDonutText } from "@/components/dashboard/PieChartDonutText";
import StatCard from "@/components/dashboard/StatCard";
import IncomeExpenseTable from "@/components/tables/IncomeExpenseTable";
import {
  BookMarked,
  GraduationCap,
  Presentation,
  Flag,
} from "lucide-react";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [sede, setSede] = useState({ cantidad: 0 });
  const [profesor, setProfesores] = useState({ cantidad: 0 });
  const [estudiante, setEstudiantes] = useState({ cantidad: 0 });
  const [padre, setPadres] = useState({ cantidad: 0 });
  const [data, setData] = useState([]);
  const [dataE, setDataE] = useState([]);


  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await apiClient.get(
          Api_Global_Dashboard.admin.porcentajeIngresos("")
        );

        const colors = [
          "#3B82F6", "#10B981", "#F59E0B",
          "#EF4444", "#8B5CF6", "#EC4899"
        ];

        const formattedData = response.data.data.map((item, index) => ({
          name: item.metodo_pago,
          percentage: item.porcentaje,
          color: colors[index % colors.length]
        }));

        setData(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPaymentMethods();

    const fetchPaymentMethodsE = async () => {
      try {
        const response = await apiClient.get(
          Api_Global_Dashboard.admin.porcentajeEgresos("")
        );

        const colors = [
          "#3B82F6", "#10B981", "#F59E0B",
          "#EF4444", "#8B5CF6", "#EC4899"
        ];

        const formattedData = response.data.data.map((item, index) => ({
          name: item.metodo_pago,
          percentage: item.porcentaje,
          color: colors[index % colors.length]
        }));

        setDataE(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPaymentMethodsE();
  }, []);

  const getSede = async (text_search) => {
    try {
      const response = await apiClient.get(Api_Global_Dashboard.admin.cantidadSedes(text_search));
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
      const response = await apiClient.get(Api_Global_Dashboard.admin.cantidadProfesores(text_search));
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
      const response = await apiClient.get(Api_Global_Dashboard.admin.cantidadEstudiantes(text_search));
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
      const response = await apiClient.get(Api_Global_Dashboard.admin.cantidadPadres(text_search));
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

  const events = [
    {
      title: "Algorítmica II - Teórico",
      start: "2024-11-18T08:00:00",
      end: "2024-11-18T10:00:00",
      backgroundColor: "#D6E4FF",
      borderColor: "#85AFFF",
    },
    {
      title: "Algorítmica II - Práctico",
      start: "2024-11-20T10:30:00",
      end: "2024-11-20T12:00:00",
      backgroundColor: "#D6E4FF",
      borderColor: "#85AFFF",
    },
    {
      title: "Algorítmica II - Teórico",
      start: "2024-11-21T08:00:00",
      end: "2024-11-21T10:00:00",
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
    {
      title: "Algorítmica II - Práctico",
      start: "2024-11-21T10:30:00",
      end: "2024-11-21T12:00:00",
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-sky-50 p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 rounded-2xl">
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
        <StatCard
          title="Sedes"
          value={sede.cantidad}
          icon={<Flag />}
          percentage="15"
          description="Del período anterior"
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 p-4 rounded-2xl">
        <div className="w-full lg:w-3/5">
          <AreaChartLegend />
        </div>
        <div className="w-full lg:w-2/5">
          <PieChartDonutText />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-4 rounded-2xl">
        {/* <AreaChartInteractive /> */}
        <IncomeExpenseReport></IncomeExpenseReport>
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-4 rounded-2xl">
        <IncomeExpenseTable />
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl justify-center gap-8 p-4 rounded-2xl">
        <ListCard title="Transacciones recibidas" />
        <PercentageCard title="Porcentaje de ingreso por tipo" data={data} />
        <PercentageCard title="Porcentaje de egreso por tipo" data={dataE} />
      </div>
      {/*
      <div className="w-full bg-white shadow-lg rounded-lg p-5">
        <CalendarNew events={events} />
      </div>
      */}
    </div>
  );
}
