import React from 'react';

function StatCard({
    title,
    value,
    icon,
    percentage,
    description,
    bgColor = 'bg-white',
    iconBgColor = 'bg-gradient-to-br from-indigo-100 to-purple-100',
    iconColor = 'text-indigo-600',
    percentageBgColor = 'bg-gradient-to-r from-emerald-100 to-teal-100',
    percentageTextColor = 'text-emerald-700',
    borderColor = 'border-gray-100',
    accentColor = 'from-indigo-500 to-purple-500'
}) {
    return (
        <div className={`
    relative
    flex flex-col justify-between p-6 rounded-2xl shadow-lg 
    border ${borderColor} ${bgColor}
    backdrop-blur-sm bg-opacity-90
    isolate // Esto crea un nuevo contexto de apilamiento aislado
`}>
            {/* Gradiente con z-index bajo para que quede detrás */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-5 -z-10`}></div>

            <div className="flex justify-between items-start relative z-10"> 
                <div>
                    <h3 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{title}</h3>
                    <p className="mt-3 text-4xl font-extrabold text-gray-900">
                        {value}
                        <span className="absolute ml-2 inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </p>
                </div>
                <div className={`
                    flex items-center justify-center w-14 h-14 rounded-2xl ${iconBgColor} ${iconColor} p-3
                    shadow-md
                `}>
                    {icon}
                </div>
            </div>

            <div className="mt-6 relative -z-10">
                <div className="flex items-center space-x-3">
                    <span className={`
                        text-sm font-bold px-3 py-1.5 rounded-full ${percentageBgColor} ${percentageTextColor}
                        shadow-sm
                    `}>
                        {percentage > 0 ? `↑ ${percentage}%` : percentage < 0 ? `↓ ${Math.abs(percentage)}%` : `${percentage}%`}
                    </span>
                    <span className="text-xs text-gray-600 font-medium tracking-wide">{description}</span>
                </div>
            </div>
        </div>
    );
}

export default StatCard;