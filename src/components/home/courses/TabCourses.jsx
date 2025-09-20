import { Briefcase, Heart, GraduationCap, Computer, Brain, Languages } from "lucide-react"

const TabCourses = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "business", label: "Negocios y Gestión", icon: <Briefcase className="w-6 h-6" /> },
    { id: "health", label: "Atención sanitaria y medicina", icon: <Heart className="w-6 h-6" /> },
    { id: "teaching", label: "Enseñanza", icon: <GraduationCap className="w-6 h-6" /> },
    { id: "tech", label: "Tecnología y TI", icon: <Computer className="w-6 h-6" /> },
    { id: "psychology", label: "Psicología y Salud Mental", icon: <Brain className="w-6 h-6" /> },
    { id: "languages", label: "Idiomas", icon: <Languages className="w-6 h-6" /> },
  ];

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="flex flex-nowrap gap-4 overflow-x-auto px-2 sm:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleTabChange(tab.id);
            }}
            className={`relative flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 min-w-[140px] sm:min-w-0 ${
              activeTab === tab.id ? "bg-blue-100" : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-gray-700">{tab.icon}</span>
              <span className="mt-2 text-sm font-medium text-gray-800 text-center">{tab.label}</span>
              {activeTab === tab.id && (<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-red-600 rounded-b-lg"/>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabCourses