
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Select Dishes", path: "/select-dish" },
    { name: "Pantry", path: "/pantry" },
    { name: "Suggestions", path: "/suggestions" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-cuisine-green"
          >
            <div className="h-8 w-8">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6C8.68629 6 6 8.68629 6 12H18C18 8.68629 15.3137 6 12 6Z" fill="currentColor"/>
                <path d="M8 15H16V17C16 18.1046 15.1046 19 14 19H10C8.89543 19 8 18.1046 8 17V15Z" fill="currentColor"/>
                <path d="M10.5 11C10.5 11.8284 9.82843 12.5 9 12.5C8.17157 12.5 7.5 11.8284 7.5 11C7.5 10.1716 8.17157 9.5 9 9.5C9.82843 9.5 10.5 10.1716 10.5 11Z" fill="currentColor"/>
                <path d="M16.5 11C16.5 11.8284 15.8284 12.5 15 12.5C14.1716 12.5 13.5 11.8284 13.5 11C13.5 10.1716 14.1716 9.5 15 9.5C15.8284 9.5 16.5 10.1716 16.5 11Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-display font-bold text-xl">CuisineConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="font-medium text-gray-600 hover:text-cuisine-green transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-cuisine-green hover:bg-cuisine-green/90">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-full overflow-auto bg-white p-6 md:hidden transition-all duration-200 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-lg font-medium text-gray-600 hover:text-cuisine-green"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-cuisine-green hover:bg-cuisine-green/90 w-full">
            Sign In
          </Button>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
