import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ModalDesing } from './ModalDesing';
 
import style from './style.module.css';
import { AiFillFile, AiOutlineComment, AiOutlineClockCircle } from "react-icons/ai";
import { FechaComponent } from './FechaModal';
import { Button } from '../pacientes/Buttom';
 

export const ModalPacientes = () => {
    const { formState: { errors }, reset, register, handleSubmit } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonActive, setButtonActive] = useState("general");

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const buttons = [
        {
            id: "general",
            label: "General",
            icon: <AiFillFile size={16} />,
            className: "text-gray-700 rounded-md",
        },
        {
            id: "comments",
            label: "Comentarios",
            icon: <AiOutlineComment size={16} />,
            className: "text-gray-700   rounded-md",
        },
        {
            id: "schedule",
            label: "Horario",
            icon: <AiOutlineClockCircle size={16} />,
            className: "text-gray-700   rounded-md",
        },
    ];

    // Memorizar contenido según el botón activo
    const content = useMemo(() => {
        switch (buttonActive) {
            case "general":
                return <FechaComponent buttonActive={buttonActive} key={buttonActive}/>;
            case "comments":
                return <FechaComponent buttonActive={buttonActive} key={buttonActive}/>;
            case "schedule":
                return <FechaComponent buttonActive={buttonActive} key={buttonActive}/>;
            default:
                return null;
        }
    }, [buttonActive]);

    return (
        <div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleOpenModal}>
                Añadir Reserva Medica
            </Button>
            <ModalDesing isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className={`${style['card-dashboad-input-pacientes']}`}>
                    <div className="flex gap-4">
                        {buttons.map((button) => (
                            <button
                                onClick={() => setButtonActive(button.id)}
                                key={button.id}
                                className={`
                                    ${button.id === buttonActive ? 'bg-gray-800 text-white' : ''}
                                    flex items-center gap-2 px-4 py-2 ${button.className}
                                    transition-all duration-300 ease-in-out`}
                            >
                                {button.icon}
                                <span>{button.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Contenido con transición */}
                    <div className="transition-all duration-300 ease-in-out">
                        {content}
                    </div>
                </div>
            </ModalDesing>
        </div>
    );
};
