import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon} from "lucide-react";
import PropTypes from "prop-types";

const PopoverMenu = ({ title, items }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={`flex items-center gap-x-1 hover:scale-110 text-lg font-semibold transition-all duration-200 hover:text-[#C9002B]  ${
              open ? "text-[#C9002B] scale-110" : "text-[#00264A]"
            }`}
          >
            {title}
            <ChevronDownIcon
              aria-hidden="true"
              className={`size-6 flex-none transition-all duration-200 ${
                open ? "rotate-180 text-[#C9002B]" : "rotate-0 text-[#00264A]"
              }`}
            />
          </PopoverButton>

          <PopoverPanel
            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition-all duration-200"
          >
            <div className="p-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  onClick={() => document.activeElement.blur()}
                  className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon aria-hidden="true" className="size-6 text-gray-600" />
                  </div>
                  <div className="flex-auto">
                    <a href={item.href} className="block font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </PopoverPanel>
          
        </>
      )}
    </Popover>
  );
};

PopoverMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      description: PropTypes.string,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

export default PopoverMenu;
