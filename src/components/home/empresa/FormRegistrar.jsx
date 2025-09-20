import React, { useState } from 'react';

function FormRegistrar({ onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    ubicacion: '',
    telefono: '',
    mensaje: '',
  });

  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      ubicacion: '',
      telefono: '',
      mensaje: '',
    });
    setAceptaPoliticas(false);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          ¿Quieres saber más?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Por favor, completa tus datos y compartiremos tu información con la Universidad de Southampton, quien se pondrá en contacto contigo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm w-full">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
              Apellido *
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
              ¿Dónde vives? Selecciona tu ubicación
            </label>
            <select
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una opción</option>
              <option value="españa">España</option>
              <option value="mexico">México</option>
              <option value="argentina">Argentina</option>
              <option value="colombia">Colombia</option>
            </select>
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Número de teléfono (incluyendo código del país) *
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ✅ CHECKBOX perfectamente alineado a la izquierda */}
          <div className="w-full">
            <label className="flex items-start gap-2 text-sm text-gray-700 font-normal">
              <input
                type="checkbox"
                id="aceptaPoliticas"
                checked={aceptaPoliticas}
                onChange={(e) => setAceptaPoliticas(e.target.checked)}
                className="mt-1"
                required
              />
              <span>
                Quiero recibir más información de Bigsei sobre títulos y otra información relacionada.
              </span>
            </label>
          </div>

          <p className="text-xs text-gray-500">
            Al registrarte, aceptas la{' '}
            <a href="#" className="text-[#C9002B] underline">Política de privacidad</a> de Bigsei y la{' '}
            <a href="#" className="text-[#C9002B] underline">Política de privacidad</a> de la Universidad de Southampton.
          </p>

          <button
            type="submit"
            className="w-full bg-[#C9002B] text-white font-medium py-2 rounded-full hover:bg-pink-600 transition-all text-sm"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormRegistrar;
