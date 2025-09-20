import events from "../../../assets/cronograma1.jpg";

const CronogramaBan = () => {
  return (
    <div className="relative w-full h-auto bg-gradient-to-r from-[#2C003E] via-[#7c3669] to-[#D17CB2]">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between 
                      text-white px-6 sm:px-10 md:px-16 py-6 md:py-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="text-orange-500">Consulta</span> el cronograma <br />
            del proceso de admisión
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto md:mx-0">
            Descubre las fechas clave y acompaña a tu hijo en cada etapa
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-2 md:mt-0">
          <img
            src={events}
            alt="Evento institucional"
            className="w-[200px] sm:w-[260px] md:w-[340px] lg:w-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CronogramaBan;