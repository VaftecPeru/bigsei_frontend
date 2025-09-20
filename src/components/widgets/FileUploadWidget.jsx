import { CloudUpload, Pencil, Trash } from 'lucide-react'
import React, { useState } from 'react'

function FileUploadWidget({ label, id }) {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0]
        setFile(uploadedFile)
    }

    const handleEdit = () => {
        document.getElementById(id).click()
    }

    const handleRemove = () => {
        setFile(null)
    }

    //Pronto lo añadiré al utils.js
    const truncateFileName = (name, maxLength = 20) => {
        if (name.length <= maxLength) return name;
        const extIndex = name.lastIndexOf(".");
        const extension = extIndex !== -1 ? name.slice(extIndex) : "";
        const baseName = name.slice(0, extIndex !== -1 ? extIndex : name.length);
        const truncatedBase = baseName.slice(0, maxLength - extension.length - 3);
        return `${truncatedBase}...${extension}`;
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex w-full items-start gap-2">
                {/* Cargar */}
                <div className="flex-1 bg-gray-200 p-2 rounded-lg">
                    <div
                        className={`border-2 bg-white border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center ${file ? "text-gray-800" : "text-gray-500"
                            }`}
                    >
                        {!file ? (
                            <>
                                <input
                                    type="file"
                                    id={id}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor={id} className="cursor-pointer flex items-center gap-2">
                                    <CloudUpload />
                                    Subir
                                </label>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-center mb-2">
                                    Archivo:{" "}
                                    <span className="font-medium">
                                        {truncateFileName(file.name)}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </>
                        )}
                    </div>
                </div>
                {/* Botones de acción */}
                <div className="flex flex-col gap-1">
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="p-2 rounded-lg bg-gray-200 text-black hover:text-white hover:bg-gray-800 transition-all duration-300"
                    >
                        <Pencil className="w-3 h-3" />
                    </button>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="p-2 rounded-lg bg-gray-200 text-black hover:text-white hover:bg-gray-800 transition-all duration-300"
                    >
                        <Trash className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FileUploadWidget