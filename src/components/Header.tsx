// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '../assets/icons/logo.png'
// import { useNavigate } from 'react-router-dom';
// import '../styles/Header.css'; // Add this import
// import DarkModeToggle from './DarkModeToggle';

// function Header() {
//     const navigate = useNavigate()
//     return(
//         <div onClick={() => navigate('/')} className="header-container">
//             <div className="header-icon w-20">
//                 <img
//                     src={logo}
//                     alt="Taskopolis Icon"
//                     className="taskopolis-icon"
//                 />
//             </div>
//             <div className="header-title">
//                 <h3 className="title-text text-charcoal-900">Taskopolis</h3>
//             </div>
//             <div className='flex z-10 relative left-16'>
//                 <DarkModeToggle/>
//             </div>
            
//         </div>
//     )
// }
// export default Header;

"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
  NavbarButton,
} from "../components/ui/resizable-navbar";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Socials",
      link: "#socials",
    },
  ];
  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems
          items={navItems}
        />
        {/* <NavbarButton href="/login">Sign In</NavbarButton> */}
        <div className="flex align-middle justify-center  gap-7 w-[30%]">
        <NavbarButton variant="primary" href="/signup">Sign Up</NavbarButton>
        <DarkModeToggle/>
        </div>
        
      </NavBody>

      <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className=" dark:bg-oxford_blue-500"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-white"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full justify-center flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign Up
              </NavbarButton>
              <DarkModeToggle />
            </div>
          </MobileNavMenu>
        </MobileNav>
    </Navbar>
  );
};
