"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export default function FloatingContactButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        window.open("https://www.google.com", "_blank");
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed bottom-12 right-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 z-50 flex items-center ${
                isHovered ? "pr-10" : "pr-0"
            }`}
            aria-label="Calculate"
        >
            <span className="p-6">
                <Calculator className="h-12 w-12" />
            </span>
            <span
                className={`text-2xl font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isHovered ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
                }`}
            >
                Calculate
            </span>
        </button>
    );
}
