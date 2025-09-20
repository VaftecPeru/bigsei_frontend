/*
---------------VERSION ANTIGUA -----------
import * as React from "react"
const MOBILE_BREAKPOINT = 768
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}*/


//No es un breakpoint de mobile como tal por eso suele ocurrir errores en el diseno de codigo
//en tailwind se usa el breakpoint-md: "768px" para dispositivos grandes se usara
//la medida sm	sm:	640px (Móviles grandes)
//Mejoras en esta version -  Código más reutilizable - Más legible - Fácil de modificar
import { useState, useEffect } from "react";

/**
 * Custom Hook que recibe una media query y devuelve si se cumple o no.
 * @param {string} query - Media query a evaluar (Ej: "(max-width: 768px)")
 * @returns {boolean} - `true` si la media query se cumple, `false` en caso contrario.
 */
export function useMobile(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const onChange = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Custom hoook para detectar si el dispositivo es móvil.
 * 
 * - No es un breekpont de **móvil exacto**, pero `md: 768px` es el más uado en **Tailwind css**.  
 * - Para dispositivos más pequeños, Tailwind usa `sm: 640px` (móviles grandes).  
 *
 * @returns {boolean} - `true` si el ancho de pantalla es menor a 768px.
 */
export function useIsMobile() {
  return useMobile("(max-width: 767px)"); // 768px - 1 para evitar errores
}