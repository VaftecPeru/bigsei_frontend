const logos = ["logo1.png", "logo2.png", "logo3.png", "logo4.png","logo5.png"];

const LogoCarouselCombo = () => {
return (
    <div className="w-full max-w-5xl mx-auto py-4">
    <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide justify-center">
        {logos.map((logo, index) => (
        <img
            key={index}
            src={`/img/logos/${logo}`}
            alt={`Logo ${index}`}
            className="h-8 w-auto flex-shrink-0 hover:scale-105 transition-transform duration-300"
        />
        ))}
    </div>
    </div>
);
};

export default LogoCarouselCombo;
