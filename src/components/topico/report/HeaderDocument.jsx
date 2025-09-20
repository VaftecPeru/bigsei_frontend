export const HeaderDocument = ({ documentCount }) => {
    return (
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-white">Reporte Documento</h2>
        <span className="text-sm text-gray-500">Tienes {documentCount} documentos</span>
      </div>
    );
  };
  