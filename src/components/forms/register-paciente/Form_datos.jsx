 
export const Form_datos = ({children, name, className}) => {
  return (
    <fieldset className="border-[3px] border-slate-300 rounded-lg bg-white p-4 w-full mt-0  ">
        <legend className="text-[17px] font-semibold text-gray-800">
             {name}   
        </legend>
        <div className={className}>
            {children}
        </div>
    </fieldset>
  )
}
