import { useState } from "react";
import { ImageUp } from "lucide-react";
import InfoStudent from "@/components/forms/InfoStudent";

export default function Registro() {
    const defaultImage = "/img/default-avatar.jpg";
    const [imageUrl, setImageUrl] = useState(defaultImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-auto bg-gray-200 flex flex-col items-center">
            {/* Banner con imagen de perfil */}
            <div
                className="relative w-full h-32 bg-cover bg-center"
                style={{ backgroundImage: `url('/img/library-bg.jpg')` }}
            >
                <div className="absolute bottom-[-90px] left-1/2 transform -translate-x-1/2">
                    <div className="relative w-40 h-40 bg-gray-200 rounded-full border-4 border-gray-600 shadow-lg flex items-center justify-center">
                        <img
                            src={imageUrl}
                            alt="User Avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute bottom-0 right-0">
                            <label
                                htmlFor="avatar-upload"
                                className="cursor-pointer bg-white text-gray-600 border-2 border-gray-600 p-2 rounded-full shadow-lg flex items-center"
                            >
                                <ImageUp className="h-6 w-6" />
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Espacio para la imagen de perfil (90px = altura del offset) */}
            <div className="h-[90px]"></div>

            <div className="w-[70%] px-4 mt-4"> 
                <InfoStudent />
            </div>
        </div>
    );
}