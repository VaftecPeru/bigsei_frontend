import CardWithList from "./Card1Medic";
import AttentionsCardMedic from "./Card2Medic";
import FrequencyChartMedic from "./ChartMedic";

export default function DashboardMedic() {
  return (
    <div className="flex-1 overflow-y-auto bg-sky-50 justify-start">
      <div className="w-full p-4">
        <div className="flex justify-end items-center text-sm text-gray-500">
          <span>
            <a href="#" className="hover:underline">
              Iaion &gt; Menú &gt; Perfil
            </a>
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4 p-4 rounded-2xl mx-auto">
        <FrequencyChartMedic />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 p-4 rounded-2xl mx-auto">
        <CardWithList className="flex-1" />
        <AttentionsCardMedic className="flex-1" />
      </div>
    </div>
  );
}
