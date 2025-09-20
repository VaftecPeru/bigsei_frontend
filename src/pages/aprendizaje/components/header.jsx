import { useEffect, useState } from "react"
import { AiOutlineLogin } from "react-icons/ai"
import {
    Bars3Icon,
} from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import MenuItem from "@/components/home/header/MenuItem"
import MenuContent from "@/components/home/header/MenuContent"
import MobileMenu from "@/components/home/header/MobileMenu"
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { FutureLearnForm } from "@/components/ux/ModalMaestria"
const menuItemsData = [
    {
        title: "Temas",
        subjects: {
            subtitle: "Subjects",
            items: [
                {
                    text: "Business & Management", topics: [
                        { topic_title: "Big Data & Analytics", link: "/" },
                        { topic_title: "Business Ethics", link: "/" },
                        { topic_title: "Business Strategy", link: "/" },
                        { topic_title: "Communication", link: "/" },
                        { topic_title: "Construction", link: "/" },
                        { topic_title: "CRM", link: "/" },
                        { topic_title: "Data Analytics", link: "/" },
                        { topic_title: "Data Visualisation", link: "/" },
                        { topic_title: "Decision-making", link: "/" },
                        { topic_title: "Digital Marketing", link: "/" },
                        { topic_title: "Entrepreneurship", link: "/" },
                        { topic_title: "Excel", link: "/" },
                    ]
                },
                { text: "Creative Arts & Media", topics: [] },
                { text: "Healthcare & Medicine", topics: [] },
                { text: "History", topics: [] },
                { text: "IT & Computer Science", topics: [] },
                { text: "Language", topics: [] },
                { text: "Law", topics: [] },
                { text: "Literature", topics: [] },
                { text: "Nature & Environment", topics: [] },
                { text: "Politics & Society", topics: [] },
                { text: "Psychology & Mental Health", topics: [] },
                { text: "Science, Engineering & Maths", topics: [] },
                { text: "Study Skills", topics: [] },
                { text: "Teaching", topics: [] },
            ]
        },
        featured: {
            subtitle: "Featured Courses",
            items: [
                {
                    category: "Short Course",
                    title: "Academic Writing in English for ESL Learners",
                    image: "https://picsum.photos/100/100",
                    link: "/",
                },
                {
                    category: "Short Course",
                    title: "Critical Thinking at University: An Introduction",
                    image: "https://picsum.photos/100/100",
                    link: "/",
                },
                {
                    category: "Short Course",
                    title: "An Introduction to Programming Using Python",
                    image: "https://picsum.photos/100/100",
                    link: "/",
                },
                {
                    category: "Short Course",
                    title: "Introduction to Digital Media",
                    image: "https://picsum.photos/100/100",
                    link: "/",
                },
            ]
        }
    },
    {
        title: "Cursos",
        subcategories: [
            {
                category: "Short Online Courses",
                items: [
                    { text: "Explore Courses with Unlimited", link: "/" },
                    { text: "ExpertTracks", link: "/" },
                    { text: "Premium Courses", link: "/" },
                    { text: "All Short Online Courses", link: "/" },
                ],
            },
            {
                category: "Online Certifications",
                items: [
                    { text: "Microcredentials", link: "/" },
                    { text: "Bootcamps", link: "/" },
                    { text: "All Online Certifications", link: "/" },
                ],
            },
        ],
    },
    {
        title: "Grados",
        link: "/web/grados",
    },
    {
        title: "Empresa",
        description: "Contenido del Item 3",
    },
    {
        title: "Eventos",
        description: "Contenido del Item 3",
    },
    {
        title: "Aprendizaje",
        link: "/web/aprendizaje",
    },
]

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [openItem, setOpenItem] = useState(null)
    const [openSearch, setOpenSearch] = useState(false)
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-menu") && !event.target.closest(".dropdown-card")) {
                setOpenItem(null)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    return (
        <header className="border-b-2 w-full bg-white dark:bg-[#00264A] dark:border-white relative h-[70px]">
            <nav className="mx-auto flex items-center px-8 gap-4 h-full w-full">
                {/* Logo */}
                <div className="flex flex-none p-1.5">
                    <Link to="/" className="p-2 flex items-center">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt="Image logo"
                            src="/img/full_bigsei_fontblue.png"
                            className="block dark:hidden w-auto h-auto max-w-[60px] sm:max-w-[100px] min-w-[50px]"
                        />
                        <img
                            alt="Image logo dark"
                            src="/img/6.png"
                            className="hidden dark:block w-auto h-auto max-w-[60px] sm:max-w-[100px] min-w-[50px]"
                        />
                    </Link>
                </div>

                {/* Título y universidad */}
                <p className="font-bold">Introducción a la ciberseguridad</p>
                <p className="text-gray-500">La Universidad Abierta</p>

                {/* Bloque de "Actualice para obtener acceso completo" */}
                <div className="bg-yellow-400 flex items-center h-[70px] ml-auto">
                    <div className="p-4 text-bold">
                        <p>Actualice para obtener acceso completo</p>
                        <p className="text-sm">Desbloquear por $59</p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </div>

                {/* Ícono de notificaciones con badge */}
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-bell"
                    >
                        <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                    </svg>
                    {/* Badge de notificaciones */}
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        5
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;