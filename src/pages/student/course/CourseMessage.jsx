import { useState } from "react"
import { PaperclipIcon as PaperClipIcon, SmileIcon as FaceSmileIcon, ImageIcon, FileTypeIcon as DocumentIcon, ChevronRightIcon } from 'lucide-react'


//default
function Forum() {
    const [message, setMessage] = useState("")

    return (
        <div className="h-screen flex flex-col">


            <div className="flex flex-1 overflow-hidden">
                {/* Left barra SIde */}
                <div className="w-64 border-r bg-gray-50
            hidden
            md:flex
                ">
                    <div className="p-4">
                        <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">F</div>
                            <div>
                                <h3 className="font-medium">Foro</h3>
                                <p className="text-sm text-gray-500">Nombre del curso</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <ParticipantItem
                                letter="D"
                                name="Docente"
                                time="12:36 PM"
                                bgColor="bg-yellow-200"
                            />
                            <ParticipantItem
                                letter="C"
                                name="CloudOTP"
                                message="esperando..."
                                time="12:36 PM"
                                bgColor="bg-red-200"
                            />
                        </div>
                    </div>
                </div>

                {/* centro Chat Area */}
                <div className="flex-1 flex flex-col
             
                ">
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="flex items-start space-x-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                D
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium">Docente</span>
                                    <span className="text-sm text-gray-500">Friday 2:00pm</span>
                                </div>
                                <div className="mt-1 p-2 bg-gray-100 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <ImageIcon className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">imagen.jpg</span>
                                        <span className="text-xs text-gray-500">1.2 MB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                        <div className="flex items-end space-x-2">
                            <div className="flex-1 bg-gray-100 rounded-lg p-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Escrieb tu mensaje"
                                    className="w-full bg-transparent outline-none"
                                />
                            </div>
                            <div className="flex space-x-2">
                                <ActionButton Icon={FaceSmileIcon} />
                                <ActionButton Icon={ImageIcon} />
                                <ActionButton Icon={DocumentIcon} />
                                <ActionButton Icon={PaperClipIcon} />
                                <button className="p-2 bg-blue-500 text-white rounded-lg">
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



function ParticipantItem({ letter, name, message, time, bgColor }) {
    return (
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
            <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
                {letter}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{name}</h4>
                {message && <p className="text-sm text-gray-500 truncate">{message}</p>}
            </div>
            <span className="text-xs text-gray-500">{time}</span>
        </div>
    )
}

function ActionButton({ Icon }) {
    return (
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <Icon className="w-5 h-5" />
        </button>
    )
}




export default function MensajeriaPage() {



    return (
        <div className="h-full w-full overflow-hidden p-6">


            <Forum></Forum>


        </div>
    )
}