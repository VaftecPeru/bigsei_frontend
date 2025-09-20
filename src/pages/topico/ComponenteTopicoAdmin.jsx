import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, GraduationCap, FileText } from 'lucide-react';

const MedicalTopicsDashboard = () => {
  const stats = [
    {
      title: "Tópicos Activos",
      value: "12",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      color: "border-l-4 border-blue-500"
    },
    {
      title: "Estudiantes Inscritos",
      value: "45",
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      color: "border-l-4 border-emerald-500"
    },
    {
      title: "Profesores",
      value: "8",
      icon: <GraduationCap className="h-6 w-6 text-violet-500" />,
      color: "border-l-4 border-violet-500"
    },
    {
      title: "Recursos Disponibles",
      value: "24",
      icon: <FileText className="h-6 w-6 text-amber-500" />,
      color: "border-l-4 border-amber-500"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenido al Panel de Tópicos Médicos
        </h1>
        <p className="text-gray-600">
          Panel Administrativo - Sección Académica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-lg transition-shadow ${stat.color}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Tópicos Más Activos
            </h2>
            <div className="space-y-4">
              {[
                { name: "Anatomía Clínica", students: 15, progress: 75 },
                { name: "Farmacología", students: 12, progress: 60 },
                { name: "Patología", students: 18, progress: 85 }
              ].map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{topic.name}</p>
                    <p className="text-sm text-gray-500">
                      {topic.students} estudiantes
                    </p>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Próximas Evaluaciones
            </h2>
            <div className="space-y-4">
              {[
                { title: "Examen Final - Anatomía", date: "15 Feb 2025" },
                { title: "Presentación - Farmacología", date: "18 Feb 2025" },
                { title: "Quiz - Patología", date: "20 Feb 2025" }
              ].map((exam, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{exam.title}</p>
                    <p className="text-sm text-gray-500">{exam.date}</p>
                  </div>
                  <div className="text-sm text-blue-500 font-medium">
                    Ver detalles
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalTopicsDashboard;