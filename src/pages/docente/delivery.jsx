import * as React from "react";

const deliverys = [
  {
    id: 1,
    user: "Adepoju Ademola",
    message: "Hello, Mr John. I am yet to get your class b, because i am not have internet for send my homework ",
    time: "10:25 a.m.",
  },
  {
    id: 2,
    user: "Badiru Pomile",
    message: "Please schedule your class test",
    time: "12:35 p.m.",
  },
  {
    id: 3,
    user: "Emmanuel John",
    message: "Please resend last session",
    time: "04:30 p.m.",
  },
];

function getInitials(name) {
  const parts = name.split(" ");
  const initials = parts.map((part) => part[0]).join("");
  return initials;
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export default function DeliveryTask() {
  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-lg w-full h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Entregas</h2>
        <span className="text-base font-medium text-blue-600">Ver todos</span>
      </div>
      <hr />
      <div className="space-y-4">
        {deliverys.map((delivery, index) => (
          <React.Fragment key={delivery.id}>
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded-lg">
              {/* Ícono del usuario */}
              <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full">
                <span className="text-base font-semibold text-blue-700">
                  {getInitials(delivery.user)}
                </span>
              </div>

              {/* Contenido de la entrega */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-800 text-center md:text-left">
                    {delivery.user}
                  </h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {delivery.time}
                  </span>
                </div>

                {/* Mensaje */}
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-600 text-xs text-center md:text-left">
                    {truncateText(delivery.message, 35)}
                  </p>
                </div>
              </div>
            </div>

            {/* Línea horizontal (excepto en el último elemento) */}
            {index !== deliverys.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}