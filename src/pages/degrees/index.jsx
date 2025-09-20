import { EducationalFooter } from "@/components/ui/footer/EducationalFooter";
import Header from "@/components/layout/Header";
import Introduction from "./introduction";

const Index = () => {
  return (
    <div className="bg-gradient-to-b from-[#00264A] via-[#004B93] to-[#ffeef1]">
      <header>
        <Header />
        <Introduction />
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
