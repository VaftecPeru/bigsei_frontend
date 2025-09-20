import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function ModuloCurso() {
    return (
        <div>
            <div className="flex justify-center items-center py-4 border-b-2">
                <div className="flex space-x-16 text-md items-center font-bold">
                    <Link to="/detalles-curso/hacer" className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-square-check mr-2"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                        Hacer
                    </Link>
                    <Link
                        to="/detalles-curso/conversaciones"
                        className="flex"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        Conversaciones
                    </Link>
                    <Link
                        to="/detalles-curso/progreso"
                        className="flex"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                        Progreso
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export function Hacer() {
    const [semanaActiva, setSemanaActiva] = useState(1);

    const semanasData = {
        1: {
            titulo: "Semana 1: Fundamentos de Ciberseguridad",
            secciones: [
                {
                    titulo: "Introducción a la Ciberseguridad",
                    descripcion: "Conceptos básicos y panorama actual de amenazas digitales.",
                    imagen: "https://ejemplo.com/ciberseguridad-basica.jpg",
                    modulos: [
                        { id: "1.1", titulo: "¿Qué es la ciberseguridad?", tipo: "video", duracion: "05:12" },
                        { id: "1.2", titulo: "Tipos de amenazas digitales", tipo: "articulo" },
                        { id: "1.3", titulo: "Historia de la ciberseguridad", tipo: "video", duracion: "07:45" },
                        { id: "1.4", titulo: "Glosario de términos", tipo: "descarga" },
                        { id: "1.5", titulo: "Casos de estudio recientes", tipo: "video", duracion: "10:20" },
                        { id: "1.6", titulo: "Principios de confidencialidad", tipo: "articulo" },
                        { id: "1.7", titulo: "Foro: Experiencias personales", tipo: "discusion" },
                        { id: "1.8", titulo: "Infografía de amenazas", tipo: "descarga" },
                        { id: "1.9", titulo: "Autoevaluación inicial", tipo: "cuestionario" }
                    ]
                },
                {
                    titulo: "Amenazas Comunes",
                    descripcion: "Identificación y análisis de las amenazas más frecuentes.",
                    imagen: "https://ejemplo.com/amenazas-comunes.jpg",
                    modulos: [
                        { id: "1.10", titulo: "Malware: Virus y ransomware", tipo: "video", duracion: "08:30" },
                        { id: "1.11", titulo: "Phishing y engaños", tipo: "video", duracion: "06:15" },
                        { id: "1.12", titulo: "Ataques DDoS", tipo: "articulo" },
                        { id: "1.13", titulo: "Ingeniería social", tipo: "video", duracion: "09:40" },
                        { id: "1.14", titulo: "Lista de amenazas actuales", tipo: "descarga" },
                        { id: "1.15", titulo: "Simulador de phishing", tipo: "herramienta" },
                        { id: "1.16", titulo: "Análisis de caso real", tipo: "video", duracion: "12:00" },
                        { id: "1.17", titulo: "Guía de detección", tipo: "descarga" },
                        { id: "1.18", titulo: "Cuestionario de amenazas", tipo: "cuestionario" }
                    ]
                },
                {
                    titulo: "Protección Básica",
                    descripcion: "Medidas esenciales para seguridad personal y profesional.",
                    imagen: "https://ejemplo.com/proteccion-basica.jpg",
                    modulos: [
                        { id: "1.19", titulo: "Contraseñas seguras", tipo: "video", duracion: "06:50" },
                        { id: "1.20", titulo: "Autenticación en dos pasos", tipo: "tutorial" },
                        { id: "1.21", titulo: "Actualizaciones de seguridad", tipo: "articulo" },
                        { id: "1.22", titulo: "Copias de seguridad", tipo: "video", duracion: "07:30" },
                        { id: "1.23", titulo: "Configuración segura", tipo: "guia" },
                        { id: "1.24", titulo: "Herramientas básicas", tipo: "video", duracion: "10:15" },
                        { id: "1.25", titulo: "Foro: Buenas prácticas", tipo: "discusion" },
                        { id: "1.26", titulo: "Checklist de seguridad", tipo: "descarga" },
                        { id: "1.27", titulo: "Ejercicio práctico", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        2: {
            titulo: "Semana 2: Autenticación",
            secciones: [
                {
                    titulo: "Fundamentos de Redes Seguras",
                    descripcion: "Principios de seguridad en comunicaciones digitales.",
                    imagen: "https://ejemplo.com/redes-seguras.jpg",
                    modulos: [
                        { id: "2.1", titulo: "Conceptos de redes", tipo: "video", duracion: "08:20" },
                        { id: "2.2", titulo: "Protocolos seguros", tipo: "articulo" },
                        { id: "2.3", titulo: "Encriptación básica", tipo: "video", duracion: "09:15" },
                        { id: "2.4", titulo: "Tipos de conexiones", tipo: "articulo" },
                        { id: "2.5", titulo: "Demostración: WPA3", tipo: "video", duracion: "07:40" },
                        { id: "2.6", titulo: "Vulnerabilidades comunes", tipo: "articulo" },
                        { id: "2.7", titulo: "Foro: Experiencias con redes", tipo: "discusion" },
                        { id: "2.8", titulo: "Guía de configuración", tipo: "descarga" },
                        { id: "2.9", titulo: "Test de conocimientos", tipo: "cuestionario" }
                    ]
                },
                {
                    titulo: "VPN y Conexiones Seguras",
                    descripcion: "Protección de datos en tránsito mediante redes privadas.",
                    imagen: "https://ejemplo.com/vpn-seguras.jpg",
                    modulos: [
                        { id: "2.10", titulo: "¿Qué es una VPN?", tipo: "video", duracion: "06:25" },
                        { id: "2.11", titulo: "Cómo funciona", tipo: "video", duracion: "05:40" },
                        { id: "2.12", titulo: "Tipos de VPN", tipo: "articulo" },
                        { id: "2.13", titulo: "Configurar una VPN", tipo: "tutorial" },
                        { id: "2.14", titulo: "Proveedores recomendados", tipo: "articulo" },
                        { id: "2.15", titulo: "Demostración práctica", tipo: "video", duracion: "10:10" },
                        { id: "2.16", titulo: "Foro: Recomendaciones", tipo: "discusion" },
                        { id: "2.17", titulo: "Comparativa de servicios", tipo: "descarga" },
                        { id: "2.18", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Firewalls y Protección Perimetral",
                    descripcion: "Sistemas de defensa para redes corporativas y personales.",
                    imagen: "https://ejemplo.com/firewalls.jpg",
                    modulos: [
                        { id: "2.19", titulo: "Introducción a firewalls", tipo: "video", duracion: "07:15" },
                        { id: "2.20", titulo: "Tipos de firewalls", tipo: "articulo" },
                        { id: "2.21", titulo: "Configuración básica", tipo: "tutorial" },
                        { id: "2.22", titulo: "Reglas de filtrado", tipo: "video", duracion: "09:30" },
                        { id: "2.23", titulo: "Firewalls de nueva generación", tipo: "articulo" },
                        { id: "2.24", titulo: "Simulador de firewall", tipo: "herramienta" },
                        { id: "2.25", titulo: "Foro: Casos prácticos", tipo: "discusion" },
                        { id: "2.26", titulo: "Plantilla de reglas", tipo: "descarga" },
                        { id: "2.27", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        3: {
            titulo: "Semana 3: Malware",
            secciones: [
                {
                    titulo: "Protección de Equipos",
                    descripcion: "Seguridad en computadoras y dispositivos personales.",
                    imagen: "https://ejemplo.com/proteccion-equipos.jpg",
                    modulos: [
                        { id: "3.1", titulo: "Antivirus y antimalware", tipo: "video", duracion: "08:45" },
                        { id: "3.2", titulo: "Comparativa de soluciones", tipo: "articulo" },
                        { id: "3.3", titulo: "Configuración segura", tipo: "video", duracion: "07:20" },
                        { id: "3.4", titulo: "Actualizaciones críticas", tipo: "articulo" },
                        { id: "3.5", titulo: "Demostración: Análisis de malware", tipo: "video", duracion: "10:15" },
                        { id: "3.6", titulo: "Herramientas de diagnóstico", tipo: "articulo" },
                        { id: "3.7", titulo: "Foro: Problemas comunes", tipo: "discusion" },
                        { id: "3.8", titulo: "Guía de mantenimiento", tipo: "descarga" },
                        { id: "3.9", titulo: "Ejercicio de limpieza", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Seguridad Móvil",
                    descripcion: "Protección de smartphones y tablets contra amenazas.",
                    imagen: "https://ejemplo.com/seguridad-movil.jpg",
                    modulos: [
                        { id: "3.10", titulo: "Amenazas móviles", tipo: "video", duracion: "06:30" },
                        { id: "3.11", titulo: "Configuración segura", tipo: "tutorial" },
                        { id: "3.12", titulo: "Apps de seguridad", tipo: "articulo" },
                        { id: "3.13", titulo: "Protección de datos", tipo: "video", duracion: "07:50" },
                        { id: "3.14", titulo: "BYOD (Bring Your Own Device)", tipo: "articulo" },
                        { id: "3.15", titulo: "Demostración: App segura", tipo: "video", duracion: "05:45" },
                        { id: "3.16", titulo: "Foro: Recomendaciones", tipo: "discusion" },
                        { id: "3.17", titulo: "Checklist móvil", tipo: "descarga" },
                        { id: "3.18", titulo: "Auditoría de dispositivo", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "IoT y Dispositivos Conectados",
                    descripcion: "Riesgos y protección para el Internet de las Cosas.",
                    imagen: "https://ejemplo.com/iot-seguridad.jpg",
                    modulos: [
                        { id: "3.19", titulo: "Qué es IoT", tipo: "video", duracion: "05:20" },
                        { id: "3.20", titulo: "Vulnerabilidades comunes", tipo: "articulo" },
                        { id: "3.21", titulo: "Casos de hackeo", tipo: "video", duracion: "08:15" },
                        { id: "3.22", titulo: "Configuración segura", tipo: "tutorial" },
                        { id: "3.23", titulo: "Dispositivos más vulnerables", tipo: "articulo" },
                        { id: "3.24", titulo: "Herramientas de análisis", tipo: "video", duracion: "06:40" },
                        { id: "3.25", titulo: "Foro: Experiencias IoT", tipo: "discusion" },
                        { id: "3.26", titulo: "Guía de compra segura", tipo: "descarga" },
                        { id: "3.27", titulo: "Análisis de dispositivo", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        4: {
            titulo: "Semana 4: Redes y comunicaciones",
            secciones: [
                {
                    titulo: "Fundamentos de Criptografía",
                    descripcion: "Principios matemáticos y técnicas básicas de encriptación.",
                    imagen: "https://ejemplo.com/criptografia-basica.jpg",
                    modulos: [
                        { id: "4.1", titulo: "Historia de la criptografía", tipo: "video", duracion: "07:30" },
                        { id: "4.2", titulo: "Conceptos matemáticos", tipo: "articulo" },
                        { id: "4.3", titulo: "Cifrado simétrico", tipo: "video", duracion: "08:45" },
                        { id: "4.4", titulo: "Cifrado asimétrico", tipo: "video", duracion: "09:20" },
                        { id: "4.5", titulo: "Funciones hash", tipo: "articulo" },
                        { id: "4.6", titulo: "Demostración: Herramientas", tipo: "video", duracion: "06:15" },
                        { id: "4.7", titulo: "Foro: Aplicaciones prácticas", tipo: "discusion" },
                        { id: "4.8", titulo: "Glosario criptográfico", tipo: "descarga" },
                        { id: "4.9", titulo: "Ejercicio de cifrado", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Protocolos Criptográficos",
                    descripcion: "Implementaciones prácticas en comunicaciones seguras.",
                    imagen: "https://ejemplo.com/protocolos-cripto.jpg",
                    modulos: [
                        { id: "4.10", titulo: "SSL/TLS", tipo: "video", duracion: "08:10" },
                        { id: "4.11", titulo: "PGP y correo seguro", tipo: "video", duracion: "07:25" },
                        { id: "4.12", titulo: "SSH", tipo: "articulo" },
                        { id: "4.13", titulo: "VPNs criptográficas", tipo: "video", duracion: "06:40" },
                        { id: "4.14", titulo: "Firma digital", tipo: "articulo" },
                        { id: "4.15", titulo: "Demostración: Configuración", tipo: "video", duracion: "09:50" },
                        { id: "4.16", titulo: "Foro: Problemas comunes", tipo: "discusion" },
                        { id: "4.17", titulo: "Guía de protocolos", tipo: "descarga" },
                        { id: "4.18", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Aplicaciones Prácticas",
                    descripcion: "Uso cotidiano de técnicas criptográficas.",
                    imagen: "https://ejemplo.com/aplicaciones-cripto.jpg",
                    modulos: [
                        { id: "4.19", titulo: "Contraseñas seguras", tipo: "video", duracion: "05:45" },
                        { id: "4.20", titulo: "Almacenamiento cifrado", tipo: "tutorial" },
                        { id: "4.21", titulo: "Comunicaciones seguras", tipo: "video", duracion: "07:30" },
                        { id: "4.22", titulo: "Criptomonedas básico", tipo: "articulo" },
                        { id: "4.23", titulo: "Herramientas recomendadas", tipo: "articulo" },
                        { id: "4.24", titulo: "Demostración: Uso práctico", tipo: "video", duracion: "08:20" },
                        { id: "4.25", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "4.26", titulo: "Checklist criptográfico", tipo: "descarga" },
                        { id: "4.27", titulo: "Proyecto práctico", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        5: {
            titulo: "Semana 5: Criptografía",
            secciones: [
                {
                    titulo: "Autenticación y Autorización",
                    descripcion: "Sistemas para verificar y gestionar accesos.",
                    imagen: "https://ejemplo.com/autenticacion.jpg",
                    modulos: [
                        { id: "5.1", titulo: "Principios de autenticación", tipo: "video", duracion: "06:20" },
                        { id: "5.2", titulo: "MFA (Multi-Factor Auth)", tipo: "video", duracion: "07:45" },
                        { id: "5.3", titulo: "Protocolos (OAuth, SAML)", tipo: "articulo" },
                        { id: "5.4", titulo: "Biometría", tipo: "video", duracion: "05:30" },
                        { id: "5.5", titulo: "Gestión de permisos", tipo: "articulo" },
                        { id: "5.6", titulo: "Demostración: Configuración", tipo: "video", duracion: "08:15" },
                        { id: "5.7", titulo: "Foro: Retos implementación", tipo: "discusion" },
                        { id: "5.8", titulo: "Guía de mejores prácticas", tipo: "descarga" },
                        { id: "5.9", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Gestión de Accesos",
                    descripcion: "Control y monitoreo de privilegios de usuario.",
                    imagen: "https://ejemplo.com/gestion-accesos.jpg",
                    modulos: [
                        { id: "5.10", titulo: "Modelo de privilegios", tipo: "video", duracion: "06:45" },
                        { id: "5.11", titulo: "Principio de mínimo privilegio", tipo: "articulo" },
                        { id: "5.12", titulo: "Herramientas IAM", tipo: "video", duracion: "07:20" },
                        { id: "5.13", titulo: "Auditoría de accesos", tipo: "articulo" },
                        { id: "5.14", titulo: "Provisionamiento", tipo: "video", duracion: "05:50" },
                        { id: "5.15", titulo: "Demostración: Herramienta IAM", tipo: "video", duracion: "09:10" },
                        { id: "5.16", titulo: "Foro: Casos reales", tipo: "discusion" },
                        { id: "5.17", titulo: "Plantilla de políticas", tipo: "descarga" },
                        { id: "5.18", titulo: "Ejercicio de auditoría", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Identity Providers",
                    descripcion: "Soluciones empresariales para gestión de identidad.",
                    imagen: "https://ejemplo.com/identity-providers.jpg",
                    modulos: [
                        { id: "5.19", titulo: "Qué es un IdP", tipo: "video", duracion: "05:15" },
                        { id: "5.20", titulo: "Azure AD", tipo: "video", duracion: "06:40" },
                        { id: "5.21", titulo: "Okta", tipo: "articulo" },
                        { id: "5.22", titulo: "Google Identity", tipo: "articulo" },
                        { id: "5.23", titulo: "Comparativa", tipo: "articulo" },
                        { id: "5.24", titulo: "Demostración: Configuración", tipo: "video", duracion: "08:30" },
                        { id: "5.25", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "5.26", titulo: "Guía de selección", tipo: "descarga" },
                        { id: "5.27", titulo: "Proyecto integrador", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        6: {
            titulo: "Semana 6: Seguridad de la red",
            secciones: [
                {
                    titulo: "Fundamentos Cloud Security",
                    descripcion: "Principios de seguridad en entornos cloud.",
                    imagen: "https://ejemplo.com/cloud-security.jpg",
                    modulos: [
                        { id: "6.1", titulo: "Modelo de responsabilidad", tipo: "video", duracion: "06:25" },
                        { id: "6.2", titulo: "Amenazas específicas", tipo: "articulo" },
                        { id: "6.3", titulo: "Configuración segura", tipo: "video", duracion: "07:40" },
                        { id: "6.4", titulo: "CSPM", tipo: "articulo" },
                        { id: "6.5", titulo: "Demostración: AWS básico", tipo: "video", duracion: "08:15" },
                        { id: "6.6", titulo: "Herramientas nativas", tipo: "articulo" },
                        { id: "6.7", titulo: "Foro: Retos cloud", tipo: "discusion" },
                        { id: "6.8", titulo: "Checklist configuración", tipo: "descarga" },
                        { id: "6.9", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Protección de Datos en la Nube",
                    descripcion: "Estrategias para asegurar información en cloud.",
                    imagen: "https://ejemplo.com/proteccion-cloud.jpg",
                    modulos: [
                        { id: "6.10", titulo: "Encriptación en reposo/tránsito", tipo: "video", duracion: "07:10" },
                        { id: "6.11", titulo: "Gestión de claves", tipo: "video", duracion: "06:35" },
                        { id: "6.12", titulo: "DLP en la nube", tipo: "articulo" },
                        { id: "6.13", titulo: "Copias de seguridad", tipo: "video", duracion: "05:50" },
                        { id: "6.14", titulo: "Proveedores comparados", tipo: "articulo" },
                        { id: "6.15", titulo: "Demostración: Azure", tipo: "video", duracion: "09:20" },
                        { id: "6.16", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "6.17", titulo: "Guía de buenas prácticas", tipo: "descarga" },
                        { id: "6.18", titulo: "Ejercicio de protección", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Arquitecturas Cloud Seguras",
                    descripcion: "Diseño de soluciones seguras en la nube.",
                    imagen: "https://ejemplo.com/arquitecturas-cloud.jpg",
                    modulos: [
                        { id: "6.19", titulo: "Zero Trust", tipo: "video", duracion: "06:45" },
                        { id: "6.20", titulo: "Microsegmentación", tipo: "articulo" },
                        { id: "6.21", titulo: "SASE", tipo: "video", duracion: "07:30" },
                        { id: "6.22", titulo: "CASB", tipo: "articulo" },
                        { id: "6.23", titulo: "Patrones de diseño", tipo: "articulo" },
                        { id: "6.24", titulo: "Demostración: Implementación", tipo: "video", duracion: "10:15" },
                        { id: "6.25", titulo: "Foro: Casos reales", tipo: "discusion" },
                        { id: "6.26", titulo: "Plantilla de arquitectura", tipo: "descarga" },
                        { id: "6.27", titulo: "Proyecto final", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        7: {
            titulo: "Semana 7: Cuando tus defensas fallan",
            secciones: [
                {
                    titulo: "Marco Legal",
                    descripcion: "Regulaciones y leyes de ciberseguridad.",
                    imagen: "https://ejemplo.com/marco-legal.jpg",
                    modulos: [
                        { id: "7.1", titulo: "GDPR", tipo: "video", duracion: "08:15" },
                        { id: "7.2", titulo: "Ley de protección de datos", tipo: "articulo" },
                        { id: "7.3", titulo: "HIPAA", tipo: "video", duracion: "07:30" },
                        { id: "7.4", titulo: "SOX", tipo: "articulo" },
                        { id: "7.5", titulo: "Comparativa global", tipo: "articulo" },
                        { id: "7.6", titulo: "Demostración: Evaluación", tipo: "video", duracion: "06:45" },
                        { id: "7.7", titulo: "Foro: Implementación", tipo: "discusion" },
                        { id: "7.8", titulo: "Guía de cumplimiento", tipo: "descarga" },
                        { id: "7.9", titulo: "Ejercicio de análisis", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Estándares de Seguridad",
                    descripcion: "Normativas y certificaciones internacionales.",
                    imagen: "https://ejemplo.com/estandares-seguridad.jpg",
                    modulos: [
                        { id: "7.10", titulo: "ISO 27001", tipo: "video", duracion: "07:20" },
                        { id: "7.11", titulo: "NIST CSF", tipo: "video", duracion: "06:40" },
                        { id: "7.12", titulo: "PCI-DSS", tipo: "articulo" },
                        { id: "7.13", titulo: "CIS Controls", tipo: "articulo" },
                        { id: "7.14", titulo: "Certificaciones", tipo: "articulo" },
                        { id: "7.15", titulo: "Demostración: Implementación", tipo: "video", duracion: "08:50" },
                        { id: "7.16", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "7.17", titulo: "Plantilla de políticas", tipo: "descarga" },
                        { id: "7.18", titulo: "Ejercicio de mapeo", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Auditoría de Seguridad",
                    descripcion: "Procesos de evaluación y mejora continua.",
                    imagen: "https://ejemplo.com/auditoria-seguridad.jpg",
                    modulos: [
                        { id: "7.19", titulo: "Metodologías", tipo: "video", duracion: "06:30" },
                        { id: "7.20", titulo: "Herramientas", tipo: "video", duracion: "07:15" },
                        { id: "7.21", titulo: "Pentesting básico", tipo: "articulo" },
                        { id: "7.22", titulo: "Informes", tipo: "video", duracion: "05:45" },
                        { id: "7.23", titulo: "Remediación", tipo: "articulo" },
                        { id: "7.24", titulo: "Demostración: Proceso completo", tipo: "video", duracion: "09:20" },
                        { id: "7.25", titulo: "Foro: Retos", tipo: "discusion" },
                        { id: "7.26", titulo: "Checklist auditoría", tipo: "descarga" },
                        { id: "7.27", titulo: "Simulación auditoría", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        8: {
            titulo: "Semana 8: Gestión de riesgos de seguridad",
            secciones: [
                {
                    titulo: "Detección de Amenazas",
                    descripcion: "Sistemas y técnicas para identificar brechas.",
                    imagen: "https://ejemplo.com/deteccion-amenazas.jpg",
                    modulos: [
                        { id: "8.1", titulo: "SIEM", tipo: "video", duracion: "07:40" },
                        { id: "8.2", titulo: "Indicadores de compromiso", tipo: "articulo" },
                        { id: "8.3", titulo: "Threat Intelligence", tipo: "video", duracion: "08:20" },
                        { id: "8.4", titulo: "Monitoreo continuo", tipo: "articulo" },
                        { id: "8.5", titulo: "Demostración: Herramientas", tipo: "video", duracion: "09:15" },
                        { id: "8.6", titulo: "Análisis de logs", tipo: "articulo" },
                        { id: "8.7", titulo: "Foro: Casos reales", tipo: "discusion" },
                        { id: "8.8", titulo: "Guía de detección", tipo: "descarga" },
                        { id: "8.9", titulo: "Ejercicio de análisis", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Manejo de Incidentes",
                    descripcion: "Protocolos para contener y erradicar amenazas.",
                    imagen: "https://ejemplo.com/manejo-incidentes.jpg",
                    modulos: [
                        { id: "8.10", titulo: "Plan de respuesta", tipo: "video", duracion: "06:50" },
                        { id: "8.11", titulo: "Contención", tipo: "video", duracion: "07:25" },
                        { id: "8.12", titulo: "Eradicación", tipo: "articulo" },
                        { id: "8.13", titulo: "Recuperación", tipo: "video", duracion: "06:40" },
                        { id: "8.14", titulo: "Lecciones aprendidas", tipo: "articulo" },
                        { id: "8.15", titulo: "Demostración: Simulación", tipo: "video", duracion: "10:05" },
                        { id: "8.16", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "8.17", titulo: "Plantilla de respuesta", tipo: "descarga" },
                        { id: "8.18", titulo: "Simulación de incidente", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Recuperación Post-Incidente",
                    descripcion: "Restauración de sistemas y mejora de defensas.",
                    imagen: "https://ejemplo.com/recuperacion-incidentes.jpg",
                    modulos: [
                        { id: "8.19", titulo: "Análisis forense básico", tipo: "video", duracion: "08:10" },
                        { id: "8.20", titulo: "BCP/DRP", tipo: "video", duracion: "07:35" },
                        { id: "8.21", titulo: "Comunicación de crisis", tipo: "articulo" },
                        { id: "8.22", titulo: "Mejora continua", tipo: "video", duracion: "06:50" },
                        { id: "8.23", titulo: "Herramientas de recuperación", tipo: "articulo" },
                        { id: "8.24", titulo: "Demostración: Proceso completo", tipo: "video", duracion: "09:40" },
                        { id: "8.25", titulo: "Foro: Lecciones", tipo: "discusion" },
                        { id: "8.26", titulo: "Proyecto final integrador", tipo: "ejercicio" },
                        { id: "8.27", titulo: "Despedida de curso", tipo: "imagen" }
                    ]
                }
            ]
        }
    };

    const semanaActual = semanasData[semanaActiva] || semanasData[1];

    return (
        <div>
            {/* Selector de semanas */}
            <div className="flex flex-col items-start ml-[512px] mt-16">
                <div
                    className="flex justify-center w-16 mb-1 transition-all duration-300"
                    style={{ transform: `translateX(${(semanaActiva - 1) * 80}px)` }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="blue"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
                        <div
                            key={week}
                            onClick={() => setSemanaActiva(week)}
                            className="relative group"
                        >
                            <span className={`bg-blue-900 text-white p-2 rounded-md w-16 h-24 flex flex-col items-center justify-center 
                                transition-all duration-200 cursor-pointer
                                ${week === semanaActiva ? 'ring-2 ring-blue-400 scale-105' : ''}
                                group-hover:bg-blue-700 group-hover:shadow-md`}
                            >
                                <p className="text-sm">Semana</p>
                                <p className="text-lg">{week}</p>
                                <p className="font-bold text-xs">
                                    {week === semanaActiva ? 'Abierto' : 'Cerrado'}
                                </p>
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contenido principal */}
            <div>
                {/* Banner de ayuda */}
                <div className="border border-gray-800 mt-12 w-[650px] p-4 mx-[490px]">
                    <h1 className="font-bold text-blue-900 text-lg">Uso de Bigsei</h1>
                    <p className="text-base">¿Necesitas ayuda? Visita nuestra <span className="text-blue-900 font-bold">página de ayuda</span> con toda la información necesaria para sacarle el máximo provecho.</p>
                </div>

                {/* Título de la semana */}
                <div className="mx-[490px] mt-8">
                    <h1 className="font-bold pb-2 border-b border-black text-xl">{semanaActual.titulo}</h1>
                </div>

                {/* Contenido de las secciones */}
                {semanaActual.secciones.map((seccion, index) => (
                    <div key={index} className="mx-[490px] mt-8">
                        {/* Encabezado de sección */}
                        <div className="flex items-start">
                            <div className="mr-4 flex-1">
                                <h2 className="font-bold text-lg">{seccion.titulo}</h2>
                                <p className="mt-2 text-gray-700">{seccion.descripcion}</p>
                            </div>
                            <img
                                src={seccion.imagen}
                                className="w-36 h-auto rounded-lg object-cover"
                                alt={seccion.titulo}
                            />
                        </div>

                        {/* Lista de módulos */}
                        <div className="mt-6 space-y-3 mb-10">
                            {seccion.modulos.map((modulo) => (
                                <div
                                    key={modulo.id}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Link
                                        to={`/detalles-curso/detalle-modulo/${modulo.id}`}
                                        className="font-medium border border-gray-300 px-2 py-1 rounded-md bg-gray-50 hover:bg-blue-900 hover:text-white transition-colors"
                                    >
                                        {modulo.id}
                                    </Link>
                                    <div className="flex items-center flex-1">
                                        <p className="font-medium">{modulo.titulo}</p>
                                        {modulo.duracion && (
                                            <p className="ml-6 text-gray-600 text-sm">{modulo.duracion}</p>
                                        )}
                                    </div>
                                    <span className="text-gray-400 text-sm capitalize">{modulo.tipo}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Conversation() {
    const conversaciones = [
        { id: 1, titulo: "Dudas sobre el ejercicio práctico", respuestas: 5, activa: true },
        { id: 2, titulo: "Material complementario recomendado", respuestas: 2, activa: false },
        { id: 3, titulo: "Problemas con la plataforma", respuestas: 8, activa: true }
    ];

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm max-w-2xl mx-auto mt-6">
            <h2 className="font-bold text-lg text-blue-800 mb-4">Conversaciones activas</h2>

            <div className="space-y-3">
                {conversaciones.map((conv) => (
                    <div key={conv.id} className={`p-3 rounded-lg border ${conv.activa ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
                        <h3 className="font-medium">{conv.titulo}</h3>
                        <p className="text-sm text-gray-600">{conv.respuestas} respuestas</p>
                    </div>
                ))}
            </div>

            <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">
                Ver todas las conversaciones →
            </button>
        </div>
    );
}

export function Progreso() {
    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm max-w-4xl mx-auto">
            <h2 className="font-bold text-lg text-blue-800 mb-4">Tu progreso en el curso</h2>

            <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((modulo) => (
                    <div key={modulo} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                            ${modulo === 1 ? 'bg-blue-600 text-white' :
                                modulo <= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {modulo}
                        </div>
                        <span className="text-xs mt-1">
                            {modulo === 1 ? 'En curso' :
                                modulo <= 3 ? 'Completado' : 'Pendiente'}
                        </span>
                    </div>
                ))}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: '45%' }}
                ></div>
            </div>
            <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-600">Módulo 1 de 8</p>
                <p className="text-sm text-gray-600">45% completado</p>
            </div>
        </div>
    );
}

export function DetalleModulo() {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState(null);

    const semanasData = {
        1: {
            titulo: "Semana 1: Fundamentos de Ciberseguridad",
            secciones: [
                {
                    titulo: "Introducción a la Ciberseguridad",
                    descripcion: "Conceptos básicos y panorama actual de amenazas digitales.",
                    imagen: "https://ejemplo.com/ciberseguridad-basica.jpg",
                    modulos: [
                        { id: "1.1", titulo: "¿Qué es la ciberseguridad?", tipo: "video", duracion: "05:12" },
                        { id: "1.2", titulo: "Tipos de amenazas digitales", tipo: "articulo" },
                        { id: "1.3", titulo: "Historia de la ciberseguridad", tipo: "video", duracion: "07:45" },
                        { id: "1.4", titulo: "Glosario de términos", tipo: "descarga" },
                        { id: "1.5", titulo: "Casos de estudio recientes", tipo: "video", duracion: "10:20" },
                        { id: "1.6", titulo: "Principios de confidencialidad", tipo: "articulo" },
                        { id: "1.7", titulo: "Foro: Experiencias personales", tipo: "discusion" },
                        { id: "1.8", titulo: "Infografía de amenazas", tipo: "descarga" },
                        { id: "1.9", titulo: "Autoevaluación inicial", tipo: "cuestionario" }
                    ]
                },
                {
                    titulo: "Amenazas Comunes",
                    descripcion: "Identificación y análisis de las amenazas más frecuentes.",
                    imagen: "https://ejemplo.com/amenazas-comunes.jpg",
                    modulos: [
                        { id: "1.10", titulo: "Malware: Virus y ransomware", tipo: "video", duracion: "08:30" },
                        { id: "1.11", titulo: "Phishing y engaños", tipo: "video", duracion: "06:15" },
                        { id: "1.12", titulo: "Ataques DDoS", tipo: "articulo" },
                        { id: "1.13", titulo: "Ingeniería social", tipo: "video", duracion: "09:40" },
                        { id: "1.14", titulo: "Lista de amenazas actuales", tipo: "descarga" },
                        { id: "1.15", titulo: "Simulador de phishing", tipo: "herramienta" },
                        { id: "1.16", titulo: "Análisis de caso real", tipo: "video", duracion: "12:00" },
                        { id: "1.17", titulo: "Guía de detección", tipo: "descarga" },
                        { id: "1.18", titulo: "Cuestionario de amenazas", tipo: "cuestionario" }
                    ]
                },
                {
                    titulo: "Protección Básica",
                    descripcion: "Medidas esenciales para seguridad personal y profesional.",
                    imagen: "https://ejemplo.com/proteccion-basica.jpg",
                    modulos: [
                        { id: "1.19", titulo: "Contraseñas seguras", tipo: "video", duracion: "06:50" },
                        { id: "1.20", titulo: "Autenticación en dos pasos", tipo: "tutorial" },
                        { id: "1.21", titulo: "Actualizaciones de seguridad", tipo: "articulo" },
                        { id: "1.22", titulo: "Copias de seguridad", tipo: "video", duracion: "07:30" },
                        { id: "1.23", titulo: "Configuración segura", tipo: "guia" },
                        { id: "1.24", titulo: "Herramientas básicas", tipo: "video", duracion: "10:15" },
                        { id: "1.25", titulo: "Foro: Buenas prácticas", tipo: "discusion" },
                        { id: "1.26", titulo: "Checklist de seguridad", tipo: "descarga" },
                        { id: "1.27", titulo: "Ejercicio práctico", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        2: {
            titulo: "Semana 2: Autenticación",
            secciones: [
                {
                    titulo: "Fundamentos de Redes Seguras",
                    descripcion: "Principios de seguridad en comunicaciones digitales.",
                    imagen: "https://ejemplo.com/redes-seguras.jpg",
                    modulos: [
                        { id: "2.1", titulo: "Conceptos de redes", tipo: "video", duracion: "08:20" },
                        { id: "2.2", titulo: "Protocolos seguros", tipo: "articulo" },
                        { id: "2.3", titulo: "Encriptación básica", tipo: "video", duracion: "09:15" },
                        { id: "2.4", titulo: "Tipos de conexiones", tipo: "articulo" },
                        { id: "2.5", titulo: "Demostración: WPA3", tipo: "video", duracion: "07:40" },
                        { id: "2.6", titulo: "Vulnerabilidades comunes", tipo: "articulo" },
                        { id: "2.7", titulo: "Foro: Experiencias con redes", tipo: "discusion" },
                        { id: "2.8", titulo: "Guía de configuración", tipo: "descarga" },
                        { id: "2.9", titulo: "Test de conocimientos", tipo: "cuestionario" }
                    ]
                },
                {
                    titulo: "VPN y Conexiones Seguras",
                    descripcion: "Protección de datos en tránsito mediante redes privadas.",
                    imagen: "https://ejemplo.com/vpn-seguras.jpg",
                    modulos: [
                        { id: "2.10", titulo: "¿Qué es una VPN?", tipo: "video", duracion: "06:25" },
                        { id: "2.11", titulo: "Cómo funciona", tipo: "video", duracion: "05:40" },
                        { id: "2.12", titulo: "Tipos de VPN", tipo: "articulo" },
                        { id: "2.13", titulo: "Configurar una VPN", tipo: "tutorial" },
                        { id: "2.14", titulo: "Proveedores recomendados", tipo: "articulo" },
                        { id: "2.15", titulo: "Demostración práctica", tipo: "video", duracion: "10:10" },
                        { id: "2.16", titulo: "Foro: Recomendaciones", tipo: "discusion" },
                        { id: "2.17", titulo: "Comparativa de servicios", tipo: "descarga" },
                        { id: "2.18", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Firewalls y Protección Perimetral",
                    descripcion: "Sistemas de defensa para redes corporativas y personales.",
                    imagen: "https://ejemplo.com/firewalls.jpg",
                    modulos: [
                        { id: "2.19", titulo: "Introducción a firewalls", tipo: "video", duracion: "07:15" },
                        { id: "2.20", titulo: "Tipos de firewalls", tipo: "articulo" },
                        { id: "2.21", titulo: "Configuración básica", tipo: "tutorial" },
                        { id: "2.22", titulo: "Reglas de filtrado", tipo: "video", duracion: "09:30" },
                        { id: "2.23", titulo: "Firewalls de nueva generación", tipo: "articulo" },
                        { id: "2.24", titulo: "Simulador de firewall", tipo: "herramienta" },
                        { id: "2.25", titulo: "Foro: Casos prácticos", tipo: "discusion" },
                        { id: "2.26", titulo: "Plantilla de reglas", tipo: "descarga" },
                        { id: "2.27", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        3: {
            titulo: "Semana 3: Malware",
            secciones: [
                {
                    titulo: "Protección de Equipos",
                    descripcion: "Seguridad en computadoras y dispositivos personales.",
                    imagen: "https://ejemplo.com/proteccion-equipos.jpg",
                    modulos: [
                        { id: "3.1", titulo: "Antivirus y antimalware", tipo: "video", duracion: "08:45" },
                        { id: "3.2", titulo: "Comparativa de soluciones", tipo: "articulo" },
                        { id: "3.3", titulo: "Configuración segura", tipo: "video", duracion: "07:20" },
                        { id: "3.4", titulo: "Actualizaciones críticas", tipo: "articulo" },
                        { id: "3.5", titulo: "Demostración: Análisis de malware", tipo: "video", duracion: "10:15" },
                        { id: "3.6", titulo: "Herramientas de diagnóstico", tipo: "articulo" },
                        { id: "3.7", titulo: "Foro: Problemas comunes", tipo: "discusion" },
                        { id: "3.8", titulo: "Guía de mantenimiento", tipo: "descarga" },
                        { id: "3.9", titulo: "Ejercicio de limpieza", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Seguridad Móvil",
                    descripcion: "Protección de smartphones y tablets contra amenazas.",
                    imagen: "https://ejemplo.com/seguridad-movil.jpg",
                    modulos: [
                        { id: "3.10", titulo: "Amenazas móviles", tipo: "video", duracion: "06:30" },
                        { id: "3.11", titulo: "Configuración segura", tipo: "tutorial" },
                        { id: "3.12", titulo: "Apps de seguridad", tipo: "articulo" },
                        { id: "3.13", titulo: "Protección de datos", tipo: "video", duracion: "07:50" },
                        { id: "3.14", titulo: "BYOD (Bring Your Own Device)", tipo: "articulo" },
                        { id: "3.15", titulo: "Demostración: App segura", tipo: "video", duracion: "05:45" },
                        { id: "3.16", titulo: "Foro: Recomendaciones", tipo: "discusion" },
                        { id: "3.17", titulo: "Checklist móvil", tipo: "descarga" },
                        { id: "3.18", titulo: "Auditoría de dispositivo", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "IoT y Dispositivos Conectados",
                    descripcion: "Riesgos y protección para el Internet de las Cosas.",
                    imagen: "https://ejemplo.com/iot-seguridad.jpg",
                    modulos: [
                        { id: "3.19", titulo: "Qué es IoT", tipo: "video", duracion: "05:20" },
                        { id: "3.20", titulo: "Vulnerabilidades comunes", tipo: "articulo" },
                        { id: "3.21", titulo: "Casos de hackeo", tipo: "video", duracion: "08:15" },
                        { id: "3.22", titulo: "Configuración segura", tipo: "tutorial" },
                        { id: "3.23", titulo: "Dispositivos más vulnerables", tipo: "articulo" },
                        { id: "3.24", titulo: "Herramientas de análisis", tipo: "video", duracion: "06:40" },
                        { id: "3.25", titulo: "Foro: Experiencias IoT", tipo: "discusion" },
                        { id: "3.26", titulo: "Guía de compra segura", tipo: "descarga" },
                        { id: "3.27", titulo: "Análisis de dispositivo", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        4: {
            titulo: "Semana 4: Redes y comunicaciones",
            secciones: [
                {
                    titulo: "Fundamentos de Criptografía",
                    descripcion: "Principios matemáticos y técnicas básicas de encriptación.",
                    imagen: "https://ejemplo.com/criptografia-basica.jpg",
                    modulos: [
                        { id: "4.1", titulo: "Historia de la criptografía", tipo: "video", duracion: "07:30" },
                        { id: "4.2", titulo: "Conceptos matemáticos", tipo: "articulo" },
                        { id: "4.3", titulo: "Cifrado simétrico", tipo: "video", duracion: "08:45" },
                        { id: "4.4", titulo: "Cifrado asimétrico", tipo: "video", duracion: "09:20" },
                        { id: "4.5", titulo: "Funciones hash", tipo: "articulo" },
                        { id: "4.6", titulo: "Demostración: Herramientas", tipo: "video", duracion: "06:15" },
                        { id: "4.7", titulo: "Foro: Aplicaciones prácticas", tipo: "discusion" },
                        { id: "4.8", titulo: "Glosario criptográfico", tipo: "descarga" },
                        { id: "4.9", titulo: "Ejercicio de cifrado", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Protocolos Criptográficos",
                    descripcion: "Implementaciones prácticas en comunicaciones seguras.",
                    imagen: "https://ejemplo.com/protocolos-cripto.jpg",
                    modulos: [
                        { id: "4.10", titulo: "SSL/TLS", tipo: "video", duracion: "08:10" },
                        { id: "4.11", titulo: "PGP y correo seguro", tipo: "video", duracion: "07:25" },
                        { id: "4.12", titulo: "SSH", tipo: "articulo" },
                        { id: "4.13", titulo: "VPNs criptográficas", tipo: "video", duracion: "06:40" },
                        { id: "4.14", titulo: "Firma digital", tipo: "articulo" },
                        { id: "4.15", titulo: "Demostración: Configuración", tipo: "video", duracion: "09:50" },
                        { id: "4.16", titulo: "Foro: Problemas comunes", tipo: "discusion" },
                        { id: "4.17", titulo: "Guía de protocolos", tipo: "descarga" },
                        { id: "4.18", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Aplicaciones Prácticas",
                    descripcion: "Uso cotidiano de técnicas criptográficas.",
                    imagen: "https://ejemplo.com/aplicaciones-cripto.jpg",
                    modulos: [
                        { id: "4.19", titulo: "Contraseñas seguras", tipo: "video", duracion: "05:45" },
                        { id: "4.20", titulo: "Almacenamiento cifrado", tipo: "tutorial" },
                        { id: "4.21", titulo: "Comunicaciones seguras", tipo: "video", duracion: "07:30" },
                        { id: "4.22", titulo: "Criptomonedas básico", tipo: "articulo" },
                        { id: "4.23", titulo: "Herramientas recomendadas", tipo: "articulo" },
                        { id: "4.24", titulo: "Demostración: Uso práctico", tipo: "video", duracion: "08:20" },
                        { id: "4.25", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "4.26", titulo: "Checklist criptográfico", tipo: "descarga" },
                        { id: "4.27", titulo: "Proyecto práctico", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        5: {
            titulo: "Semana 5: Criptografía",
            secciones: [
                {
                    titulo: "Autenticación y Autorización",
                    descripcion: "Sistemas para verificar y gestionar accesos.",
                    imagen: "https://ejemplo.com/autenticacion.jpg",
                    modulos: [
                        { id: "5.1", titulo: "Principios de autenticación", tipo: "video", duracion: "06:20" },
                        { id: "5.2", titulo: "MFA (Multi-Factor Auth)", tipo: "video", duracion: "07:45" },
                        { id: "5.3", titulo: "Protocolos (OAuth, SAML)", tipo: "articulo" },
                        { id: "5.4", titulo: "Biometría", tipo: "video", duracion: "05:30" },
                        { id: "5.5", titulo: "Gestión de permisos", tipo: "articulo" },
                        { id: "5.6", titulo: "Demostración: Configuración", tipo: "video", duracion: "08:15" },
                        { id: "5.7", titulo: "Foro: Retos implementación", tipo: "discusion" },
                        { id: "5.8", titulo: "Guía de mejores prácticas", tipo: "descarga" },
                        { id: "5.9", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Gestión de Accesos",
                    descripcion: "Control y monitoreo de privilegios de usuario.",
                    imagen: "https://ejemplo.com/gestion-accesos.jpg",
                    modulos: [
                        { id: "5.10", titulo: "Modelo de privilegios", tipo: "video", duracion: "06:45" },
                        { id: "5.11", titulo: "Principio de mínimo privilegio", tipo: "articulo" },
                        { id: "5.12", titulo: "Herramientas IAM", tipo: "video", duracion: "07:20" },
                        { id: "5.13", titulo: "Auditoría de accesos", tipo: "articulo" },
                        { id: "5.14", titulo: "Provisionamiento", tipo: "video", duracion: "05:50" },
                        { id: "5.15", titulo: "Demostración: Herramienta IAM", tipo: "video", duracion: "09:10" },
                        { id: "5.16", titulo: "Foro: Casos reales", tipo: "discusion" },
                        { id: "5.17", titulo: "Plantilla de políticas", tipo: "descarga" },
                        { id: "5.18", titulo: "Ejercicio de auditoría", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Identity Providers",
                    descripcion: "Soluciones empresariales para gestión de identidad.",
                    imagen: "https://ejemplo.com/identity-providers.jpg",
                    modulos: [
                        { id: "5.19", titulo: "Qué es un IdP", tipo: "video", duracion: "05:15" },
                        { id: "5.20", titulo: "Azure AD", tipo: "video", duracion: "06:40" },
                        { id: "5.21", titulo: "Okta", tipo: "articulo" },
                        { id: "5.22", titulo: "Google Identity", tipo: "articulo" },
                        { id: "5.23", titulo: "Comparativa", tipo: "articulo" },
                        { id: "5.24", titulo: "Demostración: Configuración", tipo: "video", duracion: "08:30" },
                        { id: "5.25", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "5.26", titulo: "Guía de selección", tipo: "descarga" },
                        { id: "5.27", titulo: "Proyecto integrador", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        6: {
            titulo: "Semana 6: Seguridad de la red",
            secciones: [
                {
                    titulo: "Fundamentos Cloud Security",
                    descripcion: "Principios de seguridad en entornos cloud.",
                    imagen: "https://ejemplo.com/cloud-security.jpg",
                    modulos: [
                        { id: "6.1", titulo: "Modelo de responsabilidad", tipo: "video", duracion: "06:25" },
                        { id: "6.2", titulo: "Amenazas específicas", tipo: "articulo" },
                        { id: "6.3", titulo: "Configuración segura", tipo: "video", duracion: "07:40" },
                        { id: "6.4", titulo: "CSPM", tipo: "articulo" },
                        { id: "6.5", titulo: "Demostración: AWS básico", tipo: "video", duracion: "08:15" },
                        { id: "6.6", titulo: "Herramientas nativas", tipo: "articulo" },
                        { id: "6.7", titulo: "Foro: Retos cloud", tipo: "discusion" },
                        { id: "6.8", titulo: "Checklist configuración", tipo: "descarga" },
                        { id: "6.9", titulo: "Ejercicio de configuración", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Protección de Datos en la Nube",
                    descripcion: "Estrategias para asegurar información en cloud.",
                    imagen: "https://ejemplo.com/proteccion-cloud.jpg",
                    modulos: [
                        { id: "6.10", titulo: "Encriptación en reposo/tránsito", tipo: "video", duracion: "07:10" },
                        { id: "6.11", titulo: "Gestión de claves", tipo: "video", duracion: "06:35" },
                        { id: "6.12", titulo: "DLP en la nube", tipo: "articulo" },
                        { id: "6.13", titulo: "Copias de seguridad", tipo: "video", duracion: "05:50" },
                        { id: "6.14", titulo: "Proveedores comparados", tipo: "articulo" },
                        { id: "6.15", titulo: "Demostración: Azure", tipo: "video", duracion: "09:20" },
                        { id: "6.16", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "6.17", titulo: "Guía de buenas prácticas", tipo: "descarga" },
                        { id: "6.18", titulo: "Ejercicio de protección", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Arquitecturas Cloud Seguras",
                    descripcion: "Diseño de soluciones seguras en la nube.",
                    imagen: "https://ejemplo.com/arquitecturas-cloud.jpg",
                    modulos: [
                        { id: "6.19", titulo: "Zero Trust", tipo: "video", duracion: "06:45" },
                        { id: "6.20", titulo: "Microsegmentación", tipo: "articulo" },
                        { id: "6.21", titulo: "SASE", tipo: "video", duracion: "07:30" },
                        { id: "6.22", titulo: "CASB", tipo: "articulo" },
                        { id: "6.23", titulo: "Patrones de diseño", tipo: "articulo" },
                        { id: "6.24", titulo: "Demostración: Implementación", tipo: "video", duracion: "10:15" },
                        { id: "6.25", titulo: "Foro: Casos reales", tipo: "discusion" },
                        { id: "6.26", titulo: "Plantilla de arquitectura", tipo: "descarga" },
                        { id: "6.27", titulo: "Proyecto final", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        7: {
            titulo: "Semana 7: Cuando tus defensas fallan",
            secciones: [
                {
                    titulo: "Marco Legal",
                    descripcion: "Regulaciones y leyes de ciberseguridad.",
                    imagen: "https://ejemplo.com/marco-legal.jpg",
                    modulos: [
                        { id: "7.1", titulo: "GDPR", tipo: "video", duracion: "08:15" },
                        { id: "7.2", titulo: "Ley de protección de datos", tipo: "articulo" },
                        { id: "7.3", titulo: "HIPAA", tipo: "video", duracion: "07:30" },
                        { id: "7.4", titulo: "SOX", tipo: "articulo" },
                        { id: "7.5", titulo: "Comparativa global", tipo: "articulo" },
                        { id: "7.6", titulo: "Demostración: Evaluación", tipo: "video", duracion: "06:45" },
                        { id: "7.7", titulo: "Foro: Implementación", tipo: "discusion" },
                        { id: "7.8", titulo: "Guía de cumplimiento", tipo: "descarga" },
                        { id: "7.9", titulo: "Ejercicio de análisis", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Estándares de Seguridad",
                    descripcion: "Normativas y certificaciones internacionales.",
                    imagen: "https://ejemplo.com/estandares-seguridad.jpg",
                    modulos: [
                        { id: "7.10", titulo: "ISO 27001", tipo: "video", duracion: "07:20" },
                        { id: "7.11", titulo: "NIST CSF", tipo: "video", duracion: "06:40" },
                        { id: "7.12", titulo: "PCI-DSS", tipo: "articulo" },
                        { id: "7.13", titulo: "CIS Controls", tipo: "articulo" },
                        { id: "7.14", titulo: "Certificaciones", tipo: "articulo" },
                        { id: "7.15", titulo: "Demostración: Implementación", tipo: "video", duracion: "08:50" },
                        { id: "7.16", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "7.17", titulo: "Plantilla de políticas", tipo: "descarga" },
                        { id: "7.18", titulo: "Ejercicio de mapeo", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Auditoría de Seguridad",
                    descripcion: "Procesos de evaluación y mejora continua.",
                    imagen: "https://ejemplo.com/auditoria-seguridad.jpg",
                    modulos: [
                        { id: "7.19", titulo: "Metodologías", tipo: "video", duracion: "06:30" },
                        { id: "7.20", titulo: "Herramientas", tipo: "video", duracion: "07:15" },
                        { id: "7.21", titulo: "Pentesting básico", tipo: "articulo" },
                        { id: "7.22", titulo: "Informes", tipo: "video", duracion: "05:45" },
                        { id: "7.23", titulo: "Remediación", tipo: "articulo" },
                        { id: "7.24", titulo: "Demostración: Proceso completo", tipo: "video", duracion: "09:20" },
                        { id: "7.25", titulo: "Foro: Retos", tipo: "discusion" },
                        { id: "7.26", titulo: "Checklist auditoría", tipo: "descarga" },
                        { id: "7.27", titulo: "Simulación auditoría", tipo: "ejercicio" }
                    ]
                }
            ]
        },
        8: {
            titulo: "Semana 8: Gestión de riesgos de seguridad",
            secciones: [
                {
                    titulo: "Detección de Amenazas",
                    descripcion: "Sistemas y técnicas para identificar brechas.",
                    imagen: "https://ejemplo.com/deteccion-amenazas.jpg",
                    modulos: [
                        { id: "8.1", titulo: "SIEM", tipo: "video", duracion: "07:40" },
                        { id: "8.2", titulo: "Indicadores de compromiso", tipo: "articulo" },
                        { id: "8.3", titulo: "Threat Intelligence", tipo: "video", duracion: "08:20" },
                        { id: "8.4", titulo: "Monitoreo continuo", tipo: "articulo" },
                        { id: "8.5", titulo: "Demostración: Herramientas", tipo: "video", duracion: "09:15" },
                        { id: "8.6", titulo: "Análisis de logs", tipo: "articulo" },
                        { id: "8.7", titulo: "Foro: Casos reales", tipo: "discusion" },
                        { id: "8.8", titulo: "Guía de detección", tipo: "descarga" },
                        { id: "8.9", titulo: "Ejercicio de análisis", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Manejo de Incidentes",
                    descripcion: "Protocolos para contener y erradicar amenazas.",
                    imagen: "https://ejemplo.com/manejo-incidentes.jpg",
                    modulos: [
                        { id: "8.10", titulo: "Plan de respuesta", tipo: "video", duracion: "06:50" },
                        { id: "8.11", titulo: "Contención", tipo: "video", duracion: "07:25" },
                        { id: "8.12", titulo: "Eradicación", tipo: "articulo" },
                        { id: "8.13", titulo: "Recuperación", tipo: "video", duracion: "06:40" },
                        { id: "8.14", titulo: "Lecciones aprendidas", tipo: "articulo" },
                        { id: "8.15", titulo: "Demostración: Simulación", tipo: "video", duracion: "10:05" },
                        { id: "8.16", titulo: "Foro: Experiencias", tipo: "discusion" },
                        { id: "8.17", titulo: "Plantilla de respuesta", tipo: "descarga" },
                        { id: "8.18", titulo: "Simulación de incidente", tipo: "ejercicio" }
                    ]
                },
                {
                    titulo: "Recuperación Post-Incidente",
                    descripcion: "Restauración de sistemas y mejora de defensas.",
                    imagen: "https://ejemplo.com/recuperacion-incidentes.jpg",
                    modulos: [
                        { id: "8.19", titulo: "Análisis forense básico", tipo: "video", duracion: "08:10" },
                        { id: "8.20", titulo: "BCP/DRP", tipo: "video", duracion: "07:35" },
                        { id: "8.21", titulo: "Comunicación de crisis", tipo: "articulo" },
                        { id: "8.22", titulo: "Mejora continua", tipo: "video", duracion: "06:50" },
                        { id: "8.23", titulo: "Herramientas de recuperación", tipo: "articulo" },
                        { id: "8.24", titulo: "Demostración: Proceso completo", tipo: "video", duracion: "09:40" },
                        { id: "8.25", titulo: "Foro: Lecciones", tipo: "discusion" },
                        { id: "8.26", titulo: "Proyecto final integrador", tipo: "ejercicio" },
                        { id: "8.27", titulo: "Despedida de curso", tipo: "imagen" }
                    ]
                }
            ]
        }
    };

    const [openWeek, setOpenWeek] = useState(null);
    const [openSections, setOpenSections] = useState({});

    const toggleWeek = (weekNumber) => {
        setOpenWeek(openWeek === weekNumber ? null : weekNumber);
        setOpenSections({});
    };

    const toggleSection = (weekNumber, sectionIndex) => {
        setOpenSections(prev => ({
            ...prev,
            [weekNumber]: prev[weekNumber] === sectionIndex ? null : sectionIndex
        }));
    };

    const getIconForType = (type) => {
        const icons = {
            video: '🎬',
            articulo: '📄',
            descarga: '📥',
            discusion: '💬',
            cuestionario: '📝',
            herramienta: '🛠️',
            tutorial: '📋',
            guia: '📘',
            ejercicio: '✏️'
        };
        return icons[type] || '📌';
    };

    const getBorderColorForType = (type) => {
        const colors = {
            video: 'border-red-500',
            articulo: 'border-blue-500',
            descarga: 'border-purple-500',
            discusion: 'border-yellow-500',
            cuestionario: 'border-teal-500',
            herramienta: 'border-orange-700',
            tutorial: 'border-green-600',
            guia: 'border-indigo-600',
            ejercicio: 'border-emerald-500'
        };
        return colors[type] || 'border-gray-300';
    };

    const findModuleIndex = () => {
        if (!selectedModule) return { week: -1, section: -1, module: -1 };

        for (const [weekNumber, weekData] of Object.entries(semanasData)) {
            for (const [sectionIndex, section] of weekData.secciones.entries()) {
                const moduleIndex = section.modulos.findIndex(mod => mod.id === selectedModule.id);
                if (moduleIndex !== -1) {
                    return {
                        week: Number(weekNumber),
                        section: sectionIndex,
                        module: moduleIndex
                    };
                }
            }
        }
        return { week: -1, section: -1, module: -1 };
    };

    const navigateModule = (direction) => {
        const { week, section, module } = findModuleIndex();
        if (week === -1) return;

        const weekData = semanasData[week];
        const sectionData = weekData.secciones[section];

        let nextModule;
        if (direction === 'next') {
            if (module < sectionData.modulos.length - 1) {
                nextModule = sectionData.modulos[module + 1];
            } else if (section < weekData.secciones.length - 1) {
                nextModule = semanasData[week].secciones[section + 1].modulos[0];
            } else if (week < Object.keys(semanasData).length) {
                const nextWeek = semanasData[week + 1];
                if (nextWeek) {
                    nextModule = nextWeek.secciones[0].modulos[0];
                }
            }
        } else { // previous
            if (module > 0) {
                nextModule = sectionData.modulos[module - 1];
            } else if (section > 0) {
                const prevSection = weekData.secciones[section - 1];
                nextModule = prevSection.modulos[prevSection.modulos.length - 1];
            } else if (week > 1) {
                const prevWeek = semanasData[week - 1];
                if (prevWeek) {
                    const prevSections = prevWeek.secciones;
                    nextModule = prevSections[prevSections.length - 1].modulos[
                        prevSections[prevSections.length - 1].modulos.length - 1
                    ];
                }
            }
        }

        if (nextModule) {
            handleModuleClick(nextModule);
        }
    };


    useEffect(() => {
        if (moduleId) {
            // Buscar en todas las semanas, secciones y módulos
            for (const [weekNumber, weekData] of Object.entries(semanasData)) {
                for (const section of weekData.secciones) {
                    const foundModule = section.modulos.find(mod => mod.id === moduleId);
                    if (foundModule) {
                        setSelectedModule(foundModule);
                        // Abrir automáticamente la semana y sección correspondiente
                        setOpenWeek(Number(weekNumber));
                        const sectionIndex = weekData.secciones.indexOf(section);
                        setOpenSections({ [weekNumber]: sectionIndex });
                        break;
                    }
                }
                if (selectedModule) break;
            }
        }
    }, [moduleId]);

    const handleModuleClick = (modulo) => {
        setSelectedModule(modulo);
        navigate(`/detalles-curso/detalle-modulo/${modulo.id}`, { replace: true });
    };


    return (
        <div className="flex">
            <div className="max-w-sm p-6 border-r border-gray-500">
                <div className="space-y-4">
                    {Object.entries(semanasData).map(([weekNumber, weekData]) => (
                        <div key={weekNumber} className="rounded-lg overflow-hidden shadow-md">
                            <button
                                onClick={() => toggleWeek(Number(weekNumber))}
                                className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-200 ${openWeek === Number(weekNumber) ? 'text-black' : 'hover:bg-gray-200'
                                    }`}
                            >
                                <span className="text-base font-semibold">{weekData.titulo}</span>
                                <span className="text-md">
                                    {openWeek === Number(weekNumber) ? '−' : '+'}
                                </span>
                            </button>

                            {openWeek === Number(weekNumber) && (
                                <div className="bg-gray-50 p-4 space-y-3">
                                    {weekData.secciones.map((seccion, sectionIndex) => (
                                        <div key={sectionIndex} className="rounded-md overflow-hidden">
                                            <button
                                                onClick={() => toggleSection(Number(weekNumber), sectionIndex)}
                                                className={`w-full px-5 py-3 text-left flex justify-between items-center transition-colors duration-200 ${openSections[weekNumber] === sectionIndex ? 'text-black' : 'hover:bg-gray-200'
                                                    }`}
                                            >
                                                <span className="font-medium">{seccion.titulo}</span>
                                                <span>
                                                    {openSections[weekNumber] === sectionIndex ? '−' : '+'}
                                                </span>
                                            </button>

                                            {openSections[weekNumber] === sectionIndex && (
                                                <div className="bg-white p-4">
                                                    <div className="space-y-4">
                                                        {seccion.modulos.map(modulo => (
                                                            <div
                                                                key={modulo.id}
                                                                className={`border-l-4 ${getBorderColorForType(modulo.tipo)} p-3 rounded shadow-sm hover:shadow-md transition-shadow w-full cursor-pointer ${selectedModule?.id === modulo.id ? 'bg-blue-50' : ''}`}
                                                                onClick={() => handleModuleClick(modulo)}
                                                            >
                                                                <div className="flex items-start space-x-3">
                                                                    <span className="text-2xl">{getIconForType(modulo.tipo)}</span>
                                                                    <div className="flex-1">
                                                                        <h4 className="font-medium text-gray-800">{modulo.titulo}</h4>
                                                                        {modulo.duracion && (
                                                                            <span className="text-xs text-gray-500 block">{modulo.duracion}</span>
                                                                        )}
                                                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded capitalize">
                                                                            {modulo.tipo}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 p-6 relative">
                {selectedModule ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <p className="border border-gray-500 mb-4 font-bold inline-block px-2 py-1">
                                    {selectedModule.id}
                                </p>
                                <p>Has completado 0 de 1 pasos en el módulo {selectedModule.id}</p>
                            </div>
                            <hr />

                            {selectedModule.tipo === 'video' && (
                                <div className="bg-gray-200 aspect-video flex items-center justify-center mb-4 mt-8 rounded-lg relative">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl">🎬</span>
                                        <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                                            {selectedModule.duracion || '00:00'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedModule.tipo === 'articulo' && (
                                <div className="bg-blue-50 border border-blue-200 aspect-[4/3] flex items-center justify-center mb-4 mt-8 rounded-lg">
                                    <span className="text-4xl">📄</span>
                                </div>
                            )}

                            {selectedModule.tipo === 'descarga' && (
                                <div className="bg-purple-50 border border-purple-200 aspect-square flex flex-col items-center justify-center mb-4 mt-8 rounded-lg p-4">
                                    <span className="text-4xl mb-2">📥</span>
                                    <span className="text-sm text-center text-purple-800">Archivo disponible para descarga</span>
                                </div>
                            )}

                            {selectedModule.tipo === 'discusion' && (
                                <div className="bg-yellow-50 border border-yellow-200 aspect-[16/9] flex items-center justify-center mb-4 mt-8 rounded-lg">
                                    <span className="text-4xl">💬</span>
                                </div>
                            )}

                            {selectedModule.tipo === 'cuestionario' && (
                                <div className="bg-teal-50 border border-teal-200 aspect-[3/2] flex items-center justify-center mb-4 mt-8 rounded-lg relative">
                                    <span className="text-4xl">📝</span>
                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs shadow-sm">
                                        {selectedModule.preguntas || '5'} preguntas
                                    </div>
                                </div>
                            )}

                            {selectedModule.tipo === 'herramienta' && (
                                <div className="bg-orange-50 border border-orange-200 aspect-video flex items-center justify-center mb-4 mt-8 rounded-lg">
                                    <span className="text-4xl">🛠️</span>
                                </div>
                            )}

                            {selectedModule.tipo === 'tutorial' && (
                                <div className="bg-green-50 border border-green-200 aspect-[16/9] flex items-center justify-center mb-4 mt-8 rounded-lg">
                                    <span className="text-4xl">📋</span>
                                </div>
                            )}

                            {selectedModule.tipo === 'guia' && (
                                <div className="bg-indigo-50 border border-indigo-200 aspect-[3/4] flex items-center justify-center mb-4 mt-8 rounded-lg p-4">
                                    <div className="text-center">
                                        <span className="text-4xl block mb-2">📘</span>
                                        <span className="text-sm text-indigo-800">Guía completa paso a paso</span>
                                    </div>
                                </div>
                            )}

                            {selectedModule.tipo === 'ejercicio' && (
                                <div className="bg-emerald-50 border border-emerald-200 aspect-square flex items-center justify-center mb-4 mt-8 rounded-lg relative">
                                    <span className="text-4xl">✏️</span>
                                    <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded-full text-xs shadow-sm">
                                        Práctico
                                    </div>
                                </div>
                            )}

                            {selectedModule.tipo === 'imagen' && (
                                <div className="flex justify-center mt-4 mb-4">
                                    <img src="data:image/jpeg;base64,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" />
                                </div>
                            )}


                            <h2 className="text-2xl font-bold mb-4">{selectedModule.titulo}</h2>
                            {selectedModule.id === "8.27" ? (
                                <div className="p-4 bg-gray-50 rounded-lg mt-4">
                                    <p>Felicitaciones por terminar la semana 8. Este podría ser un buen momento para compartir tu logro con familiares, amigos o colegas</p>
                                    <div className="flex mt-8 items-center">
                                        <div>
                                            <h1 className="font-bold text-lg mb-4">Lleva tu carrera al siguiente nivel.</h1>
                                            <p className="text-sm">Compra este curso o suscribete a Unlimited ahora para recibir beneficios adicionales un impulso a tu carrera.</p>
                                            <button className="text-xs bg-blue-900 text-white px-4 py-2">Descubre más</button>
                                        </div>
                                        <img src="data:image/jpeg;base64,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" />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <span className="text-4xl mr-3">{getIconForType(selectedModule.tipo)}</span>
                                    <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full capitalize">
                                        {selectedModule.tipo}
                                    </span>
                                    {selectedModule.duracion && (
                                        <span className="ml-3 text-gray-500">{selectedModule.duracion}</span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between mb-4 mt-16">
                            <button
                                onClick={() => navigateModule('prev')}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => navigateModule('next')}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Selecciona un módulo para ver sus detalles</p>
                    </div>
                )}
            </div>
        </div>
    );
}