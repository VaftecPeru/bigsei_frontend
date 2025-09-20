import CardsOfPanel from "./CardsOfPanel";
import PanelHeader from "./PanelHeader";

export default function PanelDashboardMedic() {
  return (
    <div className="flex flex-col justify-start min-h-screen text-lg w-full bg-sky-50">
      <PanelHeader />
      <div className="flex-1 flex justify-center items-center py-5">
        <CardsOfPanel />
      </div>
    </div>
  );
}
