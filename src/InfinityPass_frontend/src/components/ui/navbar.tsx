import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-transparent/50 dark:bg-white/10 border border-black/50 shadow-sm z-50 rounded-full px-8 py-3 flex items-center justify-between w-[90%] max-w-4xl">
      <a href="#" className="text-lg font-bold text-black">
        Infinity Pass
      </a>

      <div className="hidden md:flex gap-8">
        <NavItem href="#features">Features</NavItem>
        <NavItem href="#about">About</NavItem>
        <NavItem href="#contact">Contact</NavItem>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[90%] max-w-sm bg-black/80 dark:bg-white/10 backdrop-blur-md border border-black/50 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <NavItem href="#features" onClick={() => setIsOpen(false)}>Features</NavItem>
              <NavItem href="#about" onClick={() => setIsOpen(false)}>About</NavItem>
              <NavItem href="#contact" onClick={() => setIsOpen(false)}>Contact</NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-black text-lg font-light hover:text-gray-300 transition"
  >
    {children}
  </a>
);

export default Navbar;
