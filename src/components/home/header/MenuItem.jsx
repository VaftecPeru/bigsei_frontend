import { Link, useNavigate } from "react-router-dom"

const MenuItem = ({ item, isOpen, onToggle }) => {
    const navigate = useNavigate();
    return (
        <div className="relative dropdown-menu h-full flex-grow flex">
            {item.link ? (
                <Link
                    to={item.link}
                    className="relative z-10 h-28 flex items-center justify-center px-6 font-semibold transition-all
                        text-2xl xl:text-xl lg:text-lg md:text-md sm:text-base
                        text-[#00264A] dark:text-gray-300 hover:text-[#C9002B] dark:hover:text-gray-100"
                >
                    {item.title}
                </Link>
            ) : (
                <button
                    onClick={() => {
                        onToggle();
                        navigate(`/${item.title}`);
                    }}
                    className={`relative z-10 h-28 flex items-center justify-center px-6 text-2xl xl:text-xl lg:text-lg md:text-md sm:text-base font-semibold transition-all
            ${isOpen ? "bg-[#eaf2fa] text-[#C9002B] dark:bg-gray-800" : "text-[#00264A] dark:text-gray-300"}
            hover:text-[#C9002B] dark:hover:text-gray-100`}
                >
                    {item.title}
                    {item.items || item.subcategories || item.description || item.subjects || item.featured ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className={`size-6 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    ) : null}
                </button>
            )}
        </div>
    )
}

export default MenuItem
