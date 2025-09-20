import { DocumentItem } from "./DocumentItem";

export const DocumentsList = ({ documents ,setIsModalOpen, isModalOpen,data,setIsDataModal}) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
        
        {data.map((_)=>(
             <DocumentItem 
             isModalOpen={isModalOpen}
             setIsModalOpen={setIsModalOpen}
              info={_}
              setIsDataModal={setIsDataModal}
              />
        ))}
         
      </div>
      
    );
  };
  