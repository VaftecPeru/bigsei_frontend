import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-[#00264A] w-full py-8 px-6 flex items-center justify-between">
            {/* Logo BIGSEI */}
            <Link to="/" className="flex items-center space-x-2">
                <img
                    src="/img/6.png"
                    alt="Logo"
                    className="w-auto h-auto max-w-[100px] sm:max-w-[150px] min-w-[80px]"
                />
            </Link>

            {/* Buscador a la derecha */}
            <form className="relative w-72">
                <input
                    type="search"
                    id="search-overlay"
                    className="w-full py-2 px-4 pl-10 rounded-md text-sm bg-white text-gray-700 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Explora BigSei..."
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </form>
        </header>
    );
}
