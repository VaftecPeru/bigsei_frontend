import { Form_datos, Search_dni } from "@/components";
import { CalendarDays } from "lucide-react";
import {
  Phone,
  Smartphone,
  Mail,
  MapPin,
  Briefcase,
  Cake,
  User2,
} from "lucide-react";
const TopicoPage = () => {
  return (
    <div className="flex flex-col justify-start min-h-screen text-2xl w-full p-4">
      <section className="bg-gray-100 p-6 rounded-2xl">
        <h2 className="border-b-[1px] border-gray-300 text-[16px] font-semibold flex items-center gap-2">
          <CalendarDays size={20} className="text-gray-800" />
          <span>Registro Paciente</span>
        </h2>
        <Search_dni />

        <section className="grid grid-cols-3 gap-6  mt-6   ">
          {/* Sección Izquierda */}
          <div className="col-span-2   ">
            <Form_datos
              className={" bg-white p-2 rounded-xl shadow-md"}
              name={"Datos Antropométricos"}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[16px] font-semibold">Peso</label>
                  <input
                    type="text"
                    placeholder="63 Kg"
                    className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                  />
                </div>
                <div>
                  <label className="text-[16px] font-semibold">Talla</label>
                  <input
                    type="text"
                    placeholder="1.77 cm"
                    className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                  />
                </div>
              </div>
            </Form_datos>

            {/* Motivo de consulta */}
            <div className=" rounded-xl shadow-md">
              <Form_datos
                className={"  bg-white  rounded-xl shadow-md"}
                name={"Motivo de Consulta"}
              >
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="col-span-2">
                    <label className="block text-gray-600 text-sm font-medium">
                      Síntomas
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md text-[15px]"
                      placeholder="Ingrese síntomas ..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-medium">
                      Inicio de síntomas
                    </label>
                    <input
                      type="date"
                      className="text-[15px] w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-medium">
                      Intensidad
                    </label>
                    <select className=" text-[15px] bg-white w-full p-3 border rounded-md">
                      <option>Seleccione intensidad</option>
                      <option>Leve</option>
                      <option>Moderada</option>
                      <option>Grave</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-medium">
                      ¿Toma medicamento?
                    </label>
                    <select className="w-full p-2 border rounded-md text-[15px] bg-white ">
                      <option>Seleccione respuesta</option>
                      <option>Sí</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-medium">
                      Medicamento
                    </label>
                    <input
                      type="text"
                      className="w-full text-[15px] p-1 border rounded-md"
                      placeholder="Ingrese medicamento"
                    />
                  </div>
                </div>
              </Form_datos>
            </div>
          </div>

          {/* Sección Derecha - Perfil */}
          <div className="bg-white  border-[3px] border-slate-300  p-6 rounded-xl shadow-md flex flex-col   text-center">
            <img
              src="/img/teacher2.jpg"
              alt="Perfil"
              className="mx-auto w-24 h-24 rounded-full object-cover"
            />
            <h2 className="text-lg font-semibold m-0">Nombre de estudiante</h2>
            <p className="text-gray-500 text-[15px] m-0">Estudiante</p>
            <div className="mt-4   text-gray-700 text-sm text-left">
              <h4 className="font-bold">Informacion:</h4>
              <ul className="flex mt-2 flex-col gap-2">
                <li className="flex gap-1">
                  <Phone size={18} className="text-black font-extrabold" />{" "}
                  74508977
                </li>
                <li className="flex gap-1">
                  <User2 size={18} className="text-black" /> Masculino
                </li>
                <li className="flex gap-1">
                  <Cake size={18} className="text-black" /> 19 años
                </li>
                <li className="flex gap-1">
                  <Smartphone size={18} className="text-black" /> 987456321
                </li>
                <li className="flex gap-1">
                  <Mail size={18} className="text-black" /> adrian@example.com
                </li>
                <li className="flex gap-1">
                  <MapPin size={18} className="text-black" /> Jr. Ucayali Nº
                  388, Lima 01 - Perú
                </li>
                <li className="flex gap-1">
                  <Briefcase size={18} className="text-black" /> Desarrollo de
                  software
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-6  mt-6   ">
          {/* Sección Izquierda */}
          <div className="h-full col-span-2">
            <Form_datos
              className={"  bg-white  rounded-xl shadow-md"}
              name={"Evalucacíon y Tratamiento"}
            >
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="col-span-2">
                  <label className="block text-gray-600 text-sm font-medium">
                    Diagnóstico
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md text-[15px]"
                    placeholder="Ingrese síntomas ..."
                  ></textarea>
                </div>
                <div className="col-span-2 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm font-medium">
                      Medicamento Aplicado
                    </label>
                    <select className=" text-[15px] bg-white w-full p-3 border rounded-md">
                      <option>Seleccione intensidad</option>
                      <option>Leve</option>
                      <option>Moderada</option>
                      <option>Grave</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-medium">
                      Dosis
                    </label>
                    <select className=" text-[15px] bg-white w-full p-3 border rounded-md">
                      <option>Seleccione intensidad</option>
                      <option>Leve</option>
                      <option>Moderada</option>
                      <option>Grave</option>
                    </select>
                  </div>

                  <div className="flex items-center   ">
                    <button className="bg-blue-800 w-full rounded text-white text-[15px]  font-bold p-1 mt-3">
                      Agregar
                    </button>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-gray-600 text-sm font-medium">
                      Síntomas
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md text-[15px]"
                      placeholder="Ingrese síntomas ..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </Form_datos>

            {/* Motivo de consulta */}
          </div>
          <div className="grid-cols-3 rounded-xl shadow-md">
            <div className="col-span-2">
              <Form_datos
                className={"  bg-white  rounded-xl shadow-md"}
                name={"Evalucacíon y Tratamiento dsd"}
              >
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[16px] font-semibold">Peso</label>
                    <input
                      type="text"
                      placeholder="63 Kg"
                      className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="text-[16px] font-semibold">Talla</label>
                    <input
                      type="text"
                      placeholder="1.77 cm"
                      className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="text-[16px] font-semibold">Talla</label>
                    <input
                      type="text"
                      placeholder="1.77 cm"
                      className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
                    />
                  </div>
                </div>
              </Form_datos>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default TopicoPage;
