import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Esto asegura que el scroll se suba al inicio
  }, [pathname]) // Solo se ejecuta cuando la ruta cambia

  return null
}
