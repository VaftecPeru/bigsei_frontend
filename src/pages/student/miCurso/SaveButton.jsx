
export const SaveButton = ({setIsActive,isActive}) => {
 
    return (
      <button 
      onClick={()=>setIsActive(!isActive)}
      className="bg-pink-500 text-white font-medium py-2 px-6 rounded hover:bg-pink-600 transition duration-200">
        Guardar y pasar al curso
      </button>
    );
  };