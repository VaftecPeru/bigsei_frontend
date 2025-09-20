import { Bell, MoreVertical, Image, Smile, Paperclip, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate, useParams } from 'react-router-dom'

export default function CourseMessage() {
    const navigate = useNavigate()
    const { id } = useParams();
    const gotActividades = () => {
        navigate(`/director/cursos/${id}`);
};

    return (

        <Card className="w-full max-w-7xl mx-auto shadow-none border-0">
            
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 bg-white px-4 py-2">
                <nav className="-mb-px flex space-x-8">
                    <a onClick={gotActividades} className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer">
                        Actividades
                    </a>
                    <a className="border-b-2 border-blue-500 pb-4 px-1 text-sm font-medium text-blue-600">
                        Mensajería
                    </a>
                    {/* <a className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        Encuesta
                    </a> */}
                </nav>
            </div>

            <div className="grid md:grid-cols-[350px_1fr]">
                
                <div className="border-r">
                    <Card className="rounded-none border-0 shadow-none bg-blue-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-white text-xs">👤</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-sm">Foro</h3>
                                        <span className="text-xs text-gray-500">15 Min</span>
                                    </div>
                                    <p className="text-xs text-gray-600">Nombre del curso</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-0 shadow-none hover:bg-gray-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-yellow-400 text-xs">Z</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-sm">Docente</h3>
                                        <span className="text-xs text-gray-500">12:36 PM</span>
                                    </div>
                                    <p className="text-xs text-gray-600">Nombre del docente</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-0 shadow-none hover:bg-gray-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-pink-50 text-xs">C</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-sm">CloudOTP</h3>
                                        <span className="text-xs text-gray-500">12:36 PM</span>
                                    </div>
                                    <p className="text-xs text-gray-600 truncate">798508 is your veri...</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                
                <div className="flex flex-col h-[calc(80vh-4rem)]">
                    <div className="border-b p-4 flex justify-between items-center">
                        <h2 className="text-lg font-medium">Foro</h2>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-4 space-y-6 overflow-auto">
                        <div className="flex gap-4">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>D</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Docente</span>
                                    <span className="text-xs text-gray-500">Friday 2:20pm</span>
                                </div>
                                <Card className="mt-2 bg-gray-50 border shadow-sm">
                                    <CardContent className="p-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                                                <Image className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Latest design screenshot.jpg</p>
                                                <p className="text-xs text-gray-500">1.2 MB</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-md">
                                <p className="text-xs text-gray-500 text-center mb-1">Thursday, Jan 4 • 6:21 PM</p>
                                <p className="text-sm">
                                    Welcome to Our Gatekeeper. Download the app here:
                                    <br />
                                    iPhone: <a href="https://apple.co/3tmQC3j" className="text-blue-600">https://apple.co/3tmQC3j</a>
                                    <br />
                                    Android: <a href="https://bit.ly/3d60jEK" className="text-blue-600">https://bit.ly/3d60jEK</a>
                                    <br />
                                    Login with 025G811558
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Escribir el mensaje"
                                className="flex-1"
                            />
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Smile className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Image className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Paperclip className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
