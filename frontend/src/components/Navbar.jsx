import React, { useState } from 'react';
import { Menu, X, Cpu } from "lucide-react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navbar items including History
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Models", path: "/models" },
    { name: "Features", path: "/features" },
    { name: "Docs", path: "/docs" },
    { name: "Contact", path: "/contact" },
    { name: "History", path: "/history" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#101828] backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-14 items-center">

          {/* Logo with AI Icon */}
          <div className="flex items-center gap-2">
            <Cpu className="text-blue-400" size={22} />
            <NavLink
              to="/"
              className="text-lg font-semibold tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
            >
              AI Project
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative group transition ${
                    isActive ? "text-blue-400" : "text-gray-300"
                  }`
                }
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 space-y-3 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // close menu on click
              className={({ isActive }) =>
                `block transition ${
                  isActive ? "text-blue-400" : "text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
