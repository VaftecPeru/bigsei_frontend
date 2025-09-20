import { useState } from "react";
import { Plus, X } from "lucide-react";

function AddCourse({ onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    teacher: "",
    email: "",
    location: "",
  });

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.teacher || !newCourse.email || !newCourse.location) return;
    const courseToAdd = {
      ...newCourse,
      id: Date.now(),
      role: `Docente de ${newCourse.title}`,
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
    };
    onAdd(courseToAdd);
    setNewCourse({ title: "", teacher: "", email: "", location: "" });
    setShowForm(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setShowForm(true)}
        className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Agregar Nuevo Curso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="border p-2 rounded"
                placeholder="Nombre del curso"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Profesor"
                value={newCourse.teacher}
                onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Correo"
                value={newCourse.email}
                onChange={(e) => setNewCourse({ ...newCourse, email: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Ubicación"
                value={newCourse.location}
                onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddCourse}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
