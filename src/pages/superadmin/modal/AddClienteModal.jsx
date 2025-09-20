import React, { useState } from 'react';

export default function AddClienteModal({ onClose }) {
  const [campos, setCampos] = useState({
    nombre: '',
    celular: '',
    correo: '',
    direccion: '',
    departamento: '',
    provincia: '',
    distrito: '',
    estado: 'activo',
    genero: 'masculino',  // Asegúrate de que el valor inicial esté en 'masculino' o en el valor predeterminado que desees.
    fechaNacimiento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos({ ...campos, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado');
    onClose();
  };

  const inputClass = (valor) =>
    `w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#2D9CDB] ${valor ? 'border-blue-500' : 'border-gray-300'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}>
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-4xl relative">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => onClose()}
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <h2 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Columna Izquierda */}
          <div className="space-y-4">
            {/* Nombre completo */}
            <div>
              <label className="block mb-1 font-normal">Nombre completo <span className="text-red-500 text-lg">*</span></label>
              <input
                type="text"
                name="nombre"
                placeholder="ingresar nombre completo"
                value={campos.nombre}
                onChange={handleChange}
                className={inputClass(campos.nombre)}
                required
              />
            </div>

            {/* Celular */}
            <div>
              <label className="block mb-1 font-normal">Celular <span className="text-red-500 text-lg">*</span></label>
              <input
                type="tel"
                name="celular"
                placeholder="Ingresar celular"
                value={campos.celular}
                onChange={handleChange}
                className={inputClass(campos.celular)}
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block mb-1 font-normal">Correo <span className="text-red-500 text-lg">*</span></label>
              <input
                type="email"
                name="correo"
                placeholder="ingresar correo"
                value={campos.correo}
                onChange={handleChange}
                className={inputClass(campos.correo)}
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block mb-1 font-normal">Datos de Dirección:</label>
            </div>

            {/* Departamento / Provincia / Distrito */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label className="block mb-1 font-normal">Departamento</label>
                <input
                  type="text"
                  name="departamento"
                  placeholder="Departamento"
                  value={campos.departamento}
                  onChange={handleChange}
                  className={inputClass(campos.departamento)}
                />
              </div>
              <div>
                <label className="block mb-1 font-normal">Provincia</label>
                <input
                  type="text"
                  name="provincia"
                  placeholder="Provincia"
                  value={campos.provincia}
                  onChange={handleChange}
                  className={inputClass(campos.provincia)}
                />
              </div>
              <div>
                <label className="block mb-1 font-normal">Distrito</label>
                <input
                  type="text"
                  name="distrito"
                  placeholder="Distrito"
                  value={campos.distrito}
                  onChange={handleChange}
                  className={inputClass(campos.distrito)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-normal">Dirección:</label>
              <input
                type="text"
                name="direccion"
                placeholder="Ingresar Dirección"
                value={campos.direccion}
                onChange={handleChange}
                className={inputClass(campos.direccion)}
              />
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-4">
            {/* Estado */}
            <div>
              <label className="block mb-1 font-normal">Estado:</label>
              <select
                name="estado"
                value={campos.estado}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#2D9CDB] ${campos.estado ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block mb-1 font-normal">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={campos.fechaNacimiento}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#2D9CDB]"
              />
            </div>

            {/* Género */}
            <div>
              <label className="block mb-1 font-normal">Género:</label>
              <select
                name="genero"
                value={campos.genero}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#2D9CDB] ${campos.genero ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
