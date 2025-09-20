import { BriefcaseMedical } from "lucide-react";

const PanelHeader = () => {
  return (
    <div className="w-full bg-[#002C56] text-white py-4 px-6 flex items-center gap-4">
      <div className="bg-white p-2 rounded-lg">
        <BriefcaseMedical className="w-6 h-6 text-[#1a237e]" />
      </div>
      <div>
        <h1 className="text-lg font-medium">
          Bienvenido al panel de Administrador
        </h1>
        <p className="text-sm opacity-80">Panel Administrativo</p>
      </div>
    </div>
  );
};

export default PanelHeader;
