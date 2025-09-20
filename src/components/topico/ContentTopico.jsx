import './Topico.css'

export const ContentTopico = ({children, classNama}) => {
  return (
    <div className={`${classNama} `}>
           {children}
    </div>
  )
}
