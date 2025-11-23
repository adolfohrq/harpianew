import React, { useState, useEffect } from 'react';
import { NavLink } from '../types';
import { Menu, X, Camera } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  links: NavLink[];
}

export const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled || isMobileOpen
          ? 'bg-harpia-black/90 backdrop-blur-md border-white/10 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2">
          <Camera strokeWidth={1.5} className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" />
          <span className="font-serif font-bold text-2xl tracking-widest text-white">
            HARPIA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-[0.2em] font-light uppercase transition-colors duration-300 relative py-2
                  ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 after:ease-out
                  ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-harpia-black border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isMobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center py-12 gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-serif text-2xl tracking-widest transition-colors ${
                location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};