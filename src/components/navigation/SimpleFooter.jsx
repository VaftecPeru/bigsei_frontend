import React from "react"

function SimpleFooter() {
  return (
    <footer className="bg-darkBlue text-gray-400 py-4 px-8 flex items-center justify-between">
      <span>2024 © Copyright</span>
      <div className="flex items-center">
        <img
          src="/img/6.png"
          alt="Logo"
          className="h-auto w-20 mr-2"
        />
      </div>
    </footer>
  )
}

export default SimpleFooter
