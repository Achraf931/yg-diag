import { useState, useEffect } from 'react';

const Accordion = ({ title, children, isOpen, setIsOpen, isDisabled }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    setAccordionOpen(isOpen);
  }, [isOpen]);

  const toggleAccordion = () => {
    if (!isDisabled) {
      setAccordionOpen(!accordionOpen);
      setIsOpen(); // Appel à setIsOpen pour mettre à jour l'état dans SubQuestion
    }
  };

  return (
    <div className="py-2">
      <button onClick={toggleAccordion} className="flex justify-between w-full">
        <span>{title}</span>
        <svg
          className={`fill-secondary shrink-0 ml-8 transform origin-center transition duration-200 ease-out ${accordionOpen ? "rotate-180" : ""}`}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className="transform origin-center transition duration-200 ease-out"
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen ? "rotate-180" : ""}`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-sm ${
          accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
