import React from "react";
import { ChevronRight } from "lucide-react";

const CardWithList = () => {
  const customers = [
    {
      id: 1,
      name: "Nombre medicamento",
      marca: "Marca",
      slot: 100,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Nomre medicamento",
      marca: "Marca",
      slot: 100,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Nombre medicamento",
      marca: "Marca",
      slot: 100,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Nombre medicamento",
      marca: "Marca",
      slot: 100,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 5,
      name: "Nombre medicamento",
      marca: "Marca",
      slot: 100,
      avatar: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Medicamentos nuevos
        </h2>
        <button className="flex items-center text-blue-500 hover:text-blue-600 text-sm">
          Ver todos
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {customers.map((customer) => (
          <div key={customer.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={customer.avatar}
                alt={`${customer.name}'s avatar`}
                className="w-10 h-10 rounded -lg"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  {customer.name}
                </h3>
                <p className="text-sm text-gray-500">{customer.marca}</p>
              </div>
            </div>
            <span className=" text-sm font-medium text-gray-500">
              {customer.slot} slots
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardWithList;
