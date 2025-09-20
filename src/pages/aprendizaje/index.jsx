import { EducationalFooter } from "@/components/ui/footer/EducationalFooter";
import Header from "@/components/layout/Header";
import Introduccion from "./introduccion";

const Index = () => {
    return (
      <div className=" bg-gradient-to-b from-[#00264A] via-[#004B93] to-[#ffeef1]">
        <header>
          <Header />
          <Introduccion />
        </header>
        <main>
        </main>
        <footer>
          <EducationalFooter />
        </footer>
      </div>
    );
  };

  export default Index;