import { ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const MenuContent = ({ item }) => {
    const [selectedSubject, setSelectedSubject] = useState(null)

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full justify-center">

            {/* Si el item tiene "Subjects" y "Featured" */}
            {item.subjects && item.featured && (
                <>
                    {/* Subjects - Lista de Temas */}
                    <div className="md:col-span-1 p-2 overflow-y-auto">
                        {item.subjects.subtitle && <h3 className="text-lg font-bold">{item.subjects.subtitle}</h3>}
                        <ul className="mt-2 space-y-2">
                            {item.subjects.items.map((subject, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setSelectedSubject(selectedSubject === index ? null : index)}
                                        className="hover:text-blue-500 flex items-center justify-between w-full"
                                    >
                                        <span>{subject.text}</span>
                                        <ChevronRightIcon className={`h-4 w-4 transition-transform ${selectedSubject === index ? "rotate-90" : "rotate-0"}`} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Topics (solo si hay un Subject seleccionado y tiene topics) */}
                    <div className={`${selectedSubject !== null  ? "md:col-span-1" : "hidden"} p-2 overflow-y-auto`}>
                        {selectedSubject !== null && (
                            <>
                                <h3 className="text-lg font-bold">Topics</h3>
                                <ul className="mt-2 space-y-2">
                                    {item.subjects.items[selectedSubject].topics.map((topic, i) => (
                                        <li key={i}>
                                            <Link to={topic.link} className="hover:text-blue-500">
                                                {topic.topic_title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    {/* Featured Courses - Cursos Destacados */}
                    <div className={`${selectedSubject !== null ? "md:col-span-1" : "md:col-span-2"} p-2 overflow-y-auto`}>
                        {item.featured.subtitle && <h3 className="text-lg font-bold mb-3">{item.featured.subtitle}</h3>}
                        <div className={`grid grid-cols-1 ${selectedSubject !== null ? "sm:grid-cols-1" : "sm:grid-cols-2"} gap-4`}>
                            {item.featured.items.map((course, index) => (
                                <Link
                                    key={index}
                                    to={course.link}
                                    className="block bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <img src={course.image} alt={course.title} className="w-full h-32 object-cover" />
                                    <div className="p-4">
                                        <p className="text-sm text-gray-500">{course.category}</p>
                                        <h4 className="text-md font-semibold">{course.title}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Si es un curso con subcategorías */}
            {item.subcategories && (
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {item.subcategories.map((subcategory, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-bold">{subcategory.category}</h3>
                            <ul className="mt-2 space-y-2">
                                {subcategory.items.map((link, i) => (
                                    <li key={i}>
                                        <Link to={link.link} className="hover:text-blue-500">
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Enlace Directo */}
            {item.link && (
                <div className="md:col-span-3">
                    <Link to={item.link} className="text-blue-600 hover:underline text-lg font-semibold">
                        {item.title}
                    </Link>
                </div>
            )}

            {/* Descripción */}
            {item.description && (
                <div className="md:col-span-3">
                    <p className="mt-2">{item.description}</p>
                </div>
            )}
        </div>
    )
}

export default MenuContent
