const stats = [
  {
    id: 1,
    name: " de nuestros estudiantes consiguieron empleo en 6 meses.",
    value: "95%",
  },
  { id: 2, name: "estudiantes han confiado en nosotros.", value: "+50,000" },
  { id: 3, name: "Estudiantes certificados", value: "44 millones" },
  {
    id: 4,
    name: "Países recomiendan a sus estudiantes usar nuestra plataforma",
    value: "+30",
  },
  { id: 5, name: "Estudiantes certificados", value: "44 millones" },
  { id: 6, name: "Estudiantes certificados", value: "44 millones" },
];

const Stats = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 ">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-3"
            >
              <dt className="text-lg text-gray-200">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-50 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
