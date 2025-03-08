import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode separately
  const [navbarStyle, setNavbarStyle] = useState({
    bg: "bg-white/50 text-black", // Default light style
    mobileBg: "bg-white/100",
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section"); // Get all sections
      let newStyle = {
        bg: "bg-white/50 text-black", // Default light navbar
        mobileBg: "bg-white/100",
      };
      let darkModeActive = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          if (section.classList.contains("dark-section")) {
            darkModeActive = true;
            newStyle = {
              bg: "bg-gradient-to-t from-black via-black to-black-950 bg-black/50 text-white drop-shadow-[0_1px_5px_rgba(100,100,100,0.4)]", 
              mobileBg: "bg-gradient-to-t from-black via-black to-black-950 bg-black drop-shadow-[0_1px_5px_rgba(100,100,100,0.4)]",
            };
          }
        }
      });

      setNavbarStyle(newStyle);
      setIsDarkMode(darkModeActive); // Update dark mode state
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 backdrop-blur-md shadow-sm z-50 rounded-full px-8 py-3 flex items-center justify-between w-[90%] max-w-4xl ${navbarStyle.bg}`}
    >
      <a href="#">
        {/* ✅ Fix: Use `isDarkMode` for Logo Switching */}
        <img 
          src={isDarkMode ? "/logo-white.png" : "/logo-black.png"} 
          alt="Infinity Pass Logo" 
          className="h-8 w-auto transition-all duration-500"
        />
      </a>

      <div className="hidden md:flex gap-8">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/news">News</NavItem>
        <NavItem href="/subscribe">Subscribe</NavItem>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[90%] max-w-sm backdrop-blur-md rounded-2xl shadow-lg ${navbarStyle.mobileBg}`}
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <NavItem href="/" onClick={() => setIsOpen(false)}>Home</NavItem>
              <NavItem href="/news" onClick={() => setIsOpen(false)}>News</NavItem>
              <NavItem href="/subscribe" onClick={() => setIsOpen(false)}>Subscribe</NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <div className="relative group">
    <a
      href={href}
      onClick={onClick}
      className="text-lg font-light hover:text-gray-600 transition duration-300"
    >
      {children}
    </a>
    {/* Underline Effect */}
    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-current scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
  </div>
);

export default Navbar;
