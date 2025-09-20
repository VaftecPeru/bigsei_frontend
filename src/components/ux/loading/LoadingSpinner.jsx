import { useState, useEffect } from 'react';

export function TimedLoadingSpinner() {
  const [visible, setVisible] = useState(true);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 600);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00264A]">

      <div className="flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <svg className="w-[320px] h-[100px]" viewBox="0 0 320 100">
            <text
              x="20%"
              y="70"
              className="text-[60px] font-black fill-transparent stroke-white stroke-[2px] animate-dash"
            >
              Bigsei
            </text>
            <text
              x="20%"
              y="70"
              className="text-[60px] font-black fill-white opacity-0 animate-fillText"
            >
              Bigsei
            </text>
          </svg>

          {/* Línea más larga y más abajo */}
          <div className="mt-2 w-[180px] h-[10px] bg-[#C9002B] rounded-md opacity-0 animate-underline" />
        </div>
      </div>
    </div>
  );
}
