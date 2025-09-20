import { DocumentsList } from "./DocumentList";
import { HeaderDocument } from "./HeaderDocument";

export const DocumentsApp = ({setIsModalOpen,isModalOpen,data,setIsDataModal}) => {
   
  
    return (
      <div className="  mx-auto bg-gray-50 p-4">
        <HeaderDocument documentCount={data.length} />
         
        <DocumentsList 
        setIsDataModal={setIsDataModal}
        data={data}
          setIsModalOpen={setIsModalOpen}  isModalOpen={isModalOpen}/>
      </div>
    );
  };
  