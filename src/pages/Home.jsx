import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/home/Banner";
import Partners from "@/components/home/Partners";
import Stats from "@/components/shared/Stats";
import Courses from "@/components/home/courses/Courses";
import CtaFinal from "@/components/home/CtaFinal";
import CtaInicio from "@/components/home/CtaInicio";
import Pricing from "@/components/home/Pricing";
import MotivationalBanner from "@/components/home/BannerMotivational";
import Promotions from "@/components/home/Promotions";
import { Suspense, lazy, useState } from "react";
import FreeCourses from "@/components/home/FreeCourses";
import Description from "@/components/home/Description";
import Beneficios from "@/components/home/Beneficios";
import InvierteHoy from "@/components/home/InvierteHoy";
import ContenidoCalidad from "@/components/home/ContenidoCalidad";
import SolicitarDemo from "@/components/home/SolicitarDemo";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ModalSuscripcion } from "@/components/ux/modal/ModalSuscripcion";
import {  TimedLoadingSpinner } from "@/components/ux/loading/LoadingSpinner";



const Carrusel = lazy(() => import("@/components/home/Carrusel"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));

const Home = () => {
  const [isActive, setIsActive] = useState(false)
  return (
    <div
      className="bg-gradient-to-b from-[#00264A] via-[#004B93] to-[#C9002B] 
  dark:from-[#00264A] dark:via-[#004B93] dark:to-[#C9002B] 
  w-full min-h-screen overflow-x-hidden"
    >

      <TimedLoadingSpinner/>
      <header className="z-50">
        <Banner />
        <Header />
      </header>
      <main className="z-20">
        <Suspense fallback={<div>Loading...</div>}>
          <Carrusel />
          <CtaInicio
            isActive={isActive}
            setIsActive={setIsActive}
          />

          
          <Courses />
          <MotivationalBanner />
          <Partners />
          <Beneficios />
          <InvierteHoy />
          {/* <Testimonials /> */}
          {/* <Stats /> */}
          {/* <Pricing /> */}
          <FreeCourses />
          <Description />
          <ContenidoCalidad />
          <SolicitarDemo />
          {/* <Promotions /> */}
          {/* <CtaFinal /> */}
        </Suspense>
      </main>

      <footer className="bg-gradient-to-r from-[#000000] via-[#213C69] to-[#213C69]">
        {/* Main container with building/skyline background image */}
        <div
          className=" xl:flex w-full mx-auto relative h-[450px]  justify-center"
          style={{
            backgroundImage: `url("/bg/Rectangle.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center bottom"
          }}
        >
          {/* Content overlay positioned at the bottom */}
          <div className="absolute bottom-[0] w-full px-4 bg-transparent">
            {/* White skyline silhouette overlay */}

            {/* Content row - positioned above the white skyline */}
            <div className="w-[80%] mx-auto px-8 py-4 relative z-10">
              <div className="flex flex-col md:flex-row justify-around gap-8 items-center md:items-start">
                {/* Logo */}
                <div className="flex flex-col items-center md:items-start">
                  <img src="/img/full_bigsei_fontblue.png" alt="BIGSEI Logo" className="h-[50px] w-[100px]" />
                </div>

                {/* Text content */}
                <div className="flex flex-col text-center md:text-left max-w-md mt-5">
                <p className="text-sm text-gray-400">
                © 2025 Bigsei. Todos los derechos reservados.
                </p>
                </div>

                {/* Social media icons */}
                <div className="flex gap-4 justify-center items-end">
                  {[
                    { icon: <FaFacebook />, color: "bg-blue-600" },
                    { icon: <FaTwitter />, color: "bg-blue-400" },
                    { icon: <FaInstagram />, color: "bg-pink-500" },
                    { icon: <FaLinkedin />, color: "bg-blue-800" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 flex justify-center items-center rounded-full text-white text-sm cursor-pointer transition-transform transform hover:scale-110 shadow-lg ${item.color}`}
                    >
                      {item.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {isActive && (
        <ModalSuscripcion
          isActive={isActive}
          setIsActive={setIsActive}
        />
      )}

    </div>
  );
};

export default Home;
