import React from "react"

const SecureInput = ({
    icon: Icon,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    required = false,
    pattern,
    errorMessage,
}) => (
    <div className="relative flex items-center border border-gray-300 rounded-lg p-2 focus-within:border-blue-500 focus-within:shadow-md">
        <div className="flex items-center justify-center w-10 h-10 text-blue-500">
            <Icon className="w-6 h-6" />
        </div>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            pattern={pattern}
            className="flex-1 border-none outline-none focus:ring-0 text-sm p-2"
        />
    </div>
)

export default SecureInput
