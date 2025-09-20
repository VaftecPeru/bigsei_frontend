import { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    name: "Judith Black",
    position: "CEO of Workcation",
    testimonial:
      "“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
  },
  {
    id: 2,
    name: "John Doe",
    position: "Founder of TechCorp",
    testimonial:
      "“Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod augue non magna vehicula fermentum.”",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
  },
  {
    id: 3,
    name: "Alice Johnson",
    position: "Marketing Specialist",
    testimonial:
      "“Fusce a felis gravida, luctus nisl vel, dictum eros. Ut at volutpat urna. Aenean tristique magna vitae gravida tincidunt.”",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
  },
  {
    id: 4,
    name: "Sophia Turner",
    position: "Product Manager",
    testimonial:
      "“Curabitur interdum justo non ligula malesuada, ac tincidunt metus dignissim. Vivamus vitae ex a ante gravida convallis.”",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
  },
  {
    id: 5,
    name: "Mark Stevens",
    position: "CTO of DevTech",
    testimonial:
      "“In eget justo nec libero vulputate vestibulum sit amet nec justo. Nulla facilisi. Integer nec lacinia ipsum. Cras id ante risus.”",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
  },
  {
    id: 6,
    name: "Emily Davis",
    position: "Lead Designer",
    testimonial:
      "“Maecenas volutpat neque sit amet arcu aliquam, eu dictum neque condimentum. Nunc euismod mi id justo tempus, a rutrum nulla fermentum.”",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(2); // Índice inicial (tercer elemento)

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="lg:max-w-4xl bg-white w-full m-auto flex items-center flex-col rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105">
        <img alt="Logo" src="" className="mx-auto h-16 mt-8" />
        <figure className="mt-12 px-6 text-center">
          <blockquote className="text-xl font-semibold text-gray-800 sm:text-2xl/9 italic transition-all duration-300">
            <p className="h-auto max-h-28 overflow-hidden">
              {testimonialsData[currentIndex].testimonial}
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              alt={testimonialsData[currentIndex].name}
              src={testimonialsData[currentIndex].image}
              className="mx-auto h-24 w-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="mt-6 mb-2.5 lg:mb-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">
                {testimonialsData[currentIndex].name}
              </div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600">
                {testimonialsData[currentIndex].position}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Carrusel con testimonios */}
      <div className="mt-12 w-full gap-8 flex lg:justify-center overflow-x-auto pb-4 scroll-smooth mx-auto items-center px-4 py-2 rounded-md">
        {/* Flecha izquierda */}
        <button
          onClick={handlePrev}
          className="relative left-4 z-10 p-2 lg:hidden md:hidden sm:hidden bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          &#8592;
        </button>

        {/* Carrusel */}
        <div className="flex gap-4 mx-auto overflow-hidden">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`cursor-pointer transform transition-all duration-200 hover:scale-110 hover:shadow-lg my-1 ${
                index === currentIndex
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-50"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                alt={testimonial.name}
                src={testimonial.image}
                className="lg:h-16 lg:w-16 sm:h-10 sm:w-10 min-h-16 min-w-16 w-full h-full rounded-full border-4 border-white shadow-md"
              />
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          onClick={handleNext}
          className="relative right-4 lg:hidden md:hidden sm:hidden z-10 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
