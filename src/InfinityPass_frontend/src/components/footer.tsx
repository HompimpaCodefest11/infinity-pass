const Footer = () => {
    return (
      <footer className="w-full bg-black text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Top Section: Brand Info & Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Brand Info */}
            <div className="flex flex-col space-y-3">
                <img 
                src="/logo-white.png" 
                alt="Infinity Pass Logo"
                className="h-20 w-auto transition-all duration-500"
                />
            </div>
  
            {/* Navigation Links */}
            <div className="flex flex-col space-y-2">
              <a href="#about" className="hover:text-gray-200 transition">About</a>
              <a href="#services" className="hover:text-gray-200 transition">Services</a>
              <a href="#contact" className="hover:text-gray-200 transition">Contact</a>
            </div>
          </div>
  
          {/* Large "Say Hello" Text */}
          <div className="text-9xl text-white text-center mt-12">Say Hello!</div>
  
          {/* Bottom Section: Social Media & Copyright */}
          <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col items-center text-sm text-gray-500">
            {/* Social Media Links */}
            <div className="flex space-x-6 mb-2">
              <a href="#" className="hover:text-gray-200 transition">Facebook</a>
              <a href="#" className="hover:text-gray-200 transition">Twitter</a>
              <a href="#" className="hover:text-gray-200 transition">Instagram</a>
            </div>
            {/* Copyright Text */}
            <p>&copy; {new Date().getFullYear()} Infinity Pass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  