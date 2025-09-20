import { ChevronRightIcon, Edit3Icon } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostItBoard() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("pendientes")) || [];
    setNotes(storedNotes);
  }, []);

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pendientes de la semana</h2>
        <Link
          to="/director/pendientes"
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Edit3Icon className="size-4 mr-1" />
          <span className="text-sm font-medium">Crear</span>
          <ChevronRightIcon className="size-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Alta", "Media", "Baja"].map((priority) => (
          <div key={priority} className="flex flex-col gap-3">
            <div className="flex items-center mb-2">
              <PriorityBadge priority={priority} />
              <span className="ml-2 text-sm font-medium text-gray-600">
                {priority} prioridad
              </span>
            </div>
            {notes
              .filter((note) => note.priority === priority)
              .map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            {notes.filter((note) => note.priority === priority).length === 0 && (
              <div className="text-sm text-gray-400 italic p-3 bg-gray-50 rounded-lg">
                No hay pendientes
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const colorMap = {
    Alta: "bg-red-500",
    Media: "bg-amber-400",
    Baja: "bg-emerald-500",
  };

  return (
    <span
      className={`inline-block w-3 h-3 rounded-full ${colorMap[priority]}`}
      aria-label={`Prioridad ${priority}`}
    />
  );
}

function NoteCard({ note }) {
  const [isChecked, setIsChecked] = useState(false);
  const colorMap = {
    Alta: "border-red-100 bg-red-50 hover:bg-red-100 text-red-800",
    Media: "border-amber-100 bg-amber-50 hover:bg-amber-100 text-amber-800",
    Baja: "border-emerald-100 bg-emerald-50 hover:bg-emerald-100 text-emerald-800",
  };

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${colorMap[note.priority]} ${
        isChecked ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start">
        <button
          onClick={() => setIsChecked(!isChecked)}
          className={`mt-1 flex-shrink-0 rounded-full border ${
            isChecked ? "bg-white border-gray-300" : "bg-white border-gray-300"
          }`}
          aria-label={isChecked ? "Marcar como pendiente" : "Marcar como completado"}
        >
          <svg
            className={`w-4 h-4 ${isChecked ? "text-green-500 block" : "text-gray-300"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <div className="ml-3">
          <h3 className={`font-medium ${isChecked ? "line-through" : ""}`}>
            {note.title}
          </h3>
          {note.description && (
            <p className="text-sm mt-1 text-gray-600">{note.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["Alta", "Media", "Baja"]).isRequired,
  }).isRequired,
};

PriorityBadge.propTypes = {
  priority: PropTypes.oneOf(["Alta", "Media", "Baja"]).isRequired,
};