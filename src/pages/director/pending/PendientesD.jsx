import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  ChevronLeft,
  PlusCircle,
  Save,
  MoreVertical,
  Trash2,
  MessageSquare,
  Bell,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function PendientesD() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("pendientes")) || [];
    setNotes(storedNotes);
  }, []);

  const handleSave = () => {
    localStorage.setItem("pendientes", JSON.stringify(notes));
    navigate("../director/");
  };

  const handleChange = (id, field, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Nuevo pendiente",
      description: "Descripción",
      priority: "Media",
    };
    setNotes([...notes, newNote]);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="../director"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="size-5" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Crear Pendientes</h2>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddNote}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <PlusCircle className="size-5" />
            <span>Agregar</span>
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Save className="size-5" />
            <span>Guardar</span>
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <EditableNoteCard
              key={note.id}
              note={note}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No hay pendientes creados</p>
            <button
              onClick={handleAddNote}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center gap-2 mx-auto"
            >
              <PlusCircle className="size-5" />
              Crear primer pendiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EditableNoteCard({ note, onChange, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const priorityColors = {
    Alta: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      ring: "ring-red-100"
    },
    Media: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      ring: "ring-amber-100"
    },
    Baja: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      ring: "ring-emerald-100"
    }
  };

  const currentColor = priorityColors[note.priority];

  return (
    <div
      className={`p-4 rounded-lg border ${currentColor.bg} ${currentColor.border} relative transition-all hover:shadow-md`}
    >
      {/* Options Menu */}
      <div className="absolute top-3 right-3" ref={optionsRef}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={`p-1 rounded-full ${currentColor.text} hover:${currentColor.bg.replace('50', '100')}`}
          aria-label="Opciones"
        >
          <MoreVertical className="size-5" />
        </button>
        
        {showOptions && (
          <div className={`absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border ${currentColor.border} overflow-hidden`}>
            <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 w-full text-left">
              <Bell className="size-4 text-gray-600" />
              <span>Recordatorio</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 w-full text-left">
              <MessageSquare className="size-4 text-gray-600" />
              <span>Mensaje</span>
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 text-red-600 w-full text-left"
            >
              <Trash2 className="size-4" />
              <span>Eliminar</span>
            </button>
          </div>
        )}
      </div>

      {/* Note Content */}
      <div className="space-y-3">
        <input
          type="text"
          value={note.title}
          onChange={(e) => onChange(note.id, "title", e.target.value)}
          className={`w-full font-medium bg-transparent border-b ${currentColor.border} focus:border-b-2 focus:outline-none ${currentColor.text} pb-1`}
          placeholder="Título del pendiente"
        />
        
        <textarea
          value={note.description}
          onChange={(e) => onChange(note.id, "description", e.target.value)}
          className={`w-full text-sm bg-transparent border-b ${currentColor.border} focus:border-b-2 focus:outline-none ${currentColor.text} resize-none min-h-[80px] pb-1`}
          placeholder="Descripción"
          rows="3"
        />
        
        <select
          value={note.priority}
          onChange={(e) => onChange(note.id, "priority", e.target.value)}
          className={`w-full text-sm bg-white rounded-md px-2 py-1 border ${currentColor.border} focus:outline-none focus:ring-2 ${currentColor.ring} ${currentColor.text}`}
        >
          <option value="Alta" className="text-red-800">Alta prioridad</option>
          <option value="Media" className="text-amber-800">Media prioridad</option>
          <option value="Baja" className="text-emerald-800">Baja prioridad</option>
        </select>
      </div>
    </div>
  );
}

EditableNoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["Alta", "Media", "Baja"]).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};