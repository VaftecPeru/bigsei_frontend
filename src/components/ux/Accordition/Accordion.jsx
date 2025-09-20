import { useState } from "react";
import { motion } from "framer-motion";

export const AccordionDesign = ({ title, content, bulletPoints, id }) => {
  const [activeAccordionId, setActiveAccordionId] = useState(null);
  
  const toggleAccordion = (clickedId) => {
    setActiveAccordionId((prevId) => (prevId === clickedId ? null : clickedId));
  };
  
  const isActive = activeAccordionId === id;
  
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left py-4 flex justify-between items-center"
        onClick={() => toggleAccordion(id)}
        aria-expanded={isActive}
      >
        <span className="text-pink-600 text-xl font-bold">{title}</span>
        <span className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-pink-600"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-gray-700">
          {content && <p className="mb-2">{content}</p>}
          
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="list-disc pl-5 space-y-1">
              {bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};