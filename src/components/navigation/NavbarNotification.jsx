import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'

export default function NavbarNotification() {
    const [notifications, setNotifications] = useState([
        { id: 1, title: "New message", description: "You have a new message from John", read: false },
        { id: 2, title: "Meeting reminder", description: "Team meeting in 30 minutes", read: false },
        { id: 3, title: "Task completed", description: "Project X has been marked as complete", read: true },
    ])

    const unreadCount = notifications.filter((n) => !n.read).length

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })))
    }

    const markAsRead = (id) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative bg-yellow-100">
                    <Bell className="h-5 w-5 text-yellow-600" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notificaciones</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Notificaciones</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            Tienes {unreadCount} notificaciones sin leer
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} onSelect={() => markAsRead(notification.id)}>
                        <div className="flex flex-col space-y-1">
                            <p className={`text-sm font-medium leading-none ${notification.read ? 'text-muted-foreground' : ''}`}>
                                {notification.title}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {notification.description}
                            </p>
                        </div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={markAllAsRead}>
                    <span className="text-xs">Marcar todas como leído</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span className="text-xs">Ver todas las notificaciones</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}