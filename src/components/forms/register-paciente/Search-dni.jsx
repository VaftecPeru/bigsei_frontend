import { Search } from "lucide-react";

export const Search_dni = () => {
  return (
    <div className="relative mt-4 w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Ingresar Número de DNI"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
        text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};
