import React, { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant/10 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto w-full">
        {/* Name / Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "home")}
          className="font-headline text-lg md:text-xl font-bold text-on-surface hover:text-primary transition-colors cursor-pointer select-none"
        >
          Manash Harsh
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`font-sans text-sm font-medium transition-colors relative duration-300 pb-1 cursor-pointer ${
                    activeSection === item.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <button
            onClick={onOpenResume}
            className="ml-4 px-5 py-2 text-sm font-semibold bg-primary text-on-primary rounded hover:bg-primary/95 hover:shadow-[0_0_15px_rgba(159,204,239,0.45)] transition-all duration-300 cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-on-surface p-1 focus:outline-none cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav dropdown drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0a1122] border-b border-outline-variant/25 transition-all duration-300 animate-slide-down">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-1.5 font-sans text-sm font-semibold cursor-pointer ${
                    activeSection === item.id ? "text-primary" : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-outline-variant/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 px-4 font-bold text-sm bg-primary text-on-primary rounded text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
