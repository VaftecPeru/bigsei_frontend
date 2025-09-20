import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
    return (
        <Link
            to={`/student/cursos/${course.id}`} // Usar el ID del curso
            className={`${course.bgColor} shadow-md p-6 rounded-lg transform transition-transform hover:scale-105 cursor-pointer flex flex-col`}
        >
            <div className="min-h-[2rem] mb-3">
                <h3 className={`text-base font-bold ${course.textColor}`}>
                    {course.title}
                </h3>
                {/* <p className="text-xs text-gray-500">{course.code} - {course.credits} créditos</p> */}
            </div>

            <hr className={`${course.bgColor} h-0.5 rounded-full mb-4`} />

            <div className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-2 items-start text-sm">
                <div className="contents">
                    <img src="/img/icons/user.svg" alt="" className="mt-0.5" />
                    <span className="text-gray-700">{course.teacher}</span>
                </div>

                <div className="contents">
                    <img src="/img/icons/calendar-2.svg" alt="" className="mt-0.5" />
                    <span className="text-gray-700">
                        {course.day}
                    </span>
                </div>

                <div className="contents">
                    <img src="/img/icons/clock.svg" alt="" className="mt-0.5" />
                    <span className="text-gray-700">
                        {course.time}
                    </span>
                </div>

                <div className="contents">
                    <img src="/img/icons/location.svg" alt="" className="mt-0.5" />
                    <span className="text-gray-700">{course.location}</span>
                </div>
            </div>
        </Link>
    );
}