const ButtonRipple = ({ children, className }) => {
  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");

    ripple.style.cssText = `
      position: absolute;
      background: white;
      border-radius: 50%;
      opacity: 0.5;
      pointer-events: none;
      animation: ripple 0.6s linear;
    `;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    // Eliminar el ripple después de la animación
    setTimeout(() => {
      ripple.remove();
    }, 600); // Duración de la animación
  };

  return (
    <button
      onClick={createRipple}
      className={`flex justify-between ease all 0.3s w-full
      h-full my-6items-center relative overflow-hidden
      text-white font-semibold rounded-lg focus:outline-none transition-all duration-300 hover:bg-gray-200
      ${className}`}

      style={{ background: "transparent" }}
    >
      {children}
    </button>
  );
};

export { ButtonRipple };
