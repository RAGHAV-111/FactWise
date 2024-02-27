import { useState } from "react";
import NavLinks from "./NavLinks";
import { styled } from "styled-components";
import Logo from "../../logo/logo61.webp";
import { AiOutlineMenu } from "react-icons/ai";
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => {
    setOpen(false)
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "#about", label: "About", smooth: true },
    { to: "#amenities", label: "Amenities", smooth: true },
    { to: "#specification", label: "Specification", smooth: true },
    { to: "#gallery", label: "Gallery", smooth: true },
  ];


  return (
    <NavWrapper className="bg-[#14274a]">
      <nav  className="z-50  navlink uppercase shadow-lg relative w-full bg-[#14274a] ">
        <div className="flex items-center font-medium justify-between px-10 bg-[#14274a]">
          <div className="z-50 md:w-auto w-full flex justify-between ">
            <div className="flex items-center  bg-transparent">
              <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  className="md:cursor-pointer  lg:h-16 md:h-16 sm:h-11 h-11"
                />
              </Link>
            </div>

            <div
              className="text-3xl md:hidden mr-5 mt-2 "
              onClick={() => setOpen(!open)}
            >
              <AiOutlineMenu
                className="text-gray-300"
                name={`${open ? "close" : "menu"}`}
              />
            </div>
          </div>



          <ul className="md:flex hidden items-center gap-3 tracking-widest">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  smooth={link.smooth}
                  className="relative text-white text-sm px-4 py-2 leading-none rounded-full hover:text-[#e0b973]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile nav */}
          <ul
            className={`
    md:hidden bg-[#14274a] fixed w-full top-0 overflow-y-auto cursor-pointer bottom-0 py-24 pl-4
    duration-500 ${open ? "left-0" : "left-[-100%]"}
  `}
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  onClick={closeMenu}
                  smooth={link.smooth}
                  className="py-4 px-3 inline-block relative text-white flex-between bg-transparent p-3 before:  transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-800  before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </nav>
    </NavWrapper>
  );
};
const NavWrapper = styled.div`
  .navlink {
    background: white ;
    opacity: 0.9;
  }
  @media screen and (max-width: 768px) {
    .navlink {
      background: white;

      // opacity: 0.9;
    }
  }
`;
export default Navbar;
