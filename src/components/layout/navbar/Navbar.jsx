"use client";

import { ContextMenu } from "@/components";
import { SignIn, SignUp } from "@/components/buttons";
import { ProfilePic } from "@/components/user";
import { useClickOutside } from "@/hooks";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { menuItems } from "@/constants/menuItems";
import "./Navbar.scss";

export default function Navbar() {
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useClickOutside(menuRef, () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {status === "unauthenticated" ? (
          <>
            <li className="navbar__item">
              <SignUp />
            </li>
            <li className="navbar__item">
              <SignIn />
            </li>
          </>
        ) : (
          <li className="navbar__item" ref={menuRef}>
            <button className="navbar__button" onClick={toggleMenu}>
              <ProfilePic />
            </button>
            {isMenuOpen && <ContextMenu items={menuItems} />}
          </li>
        )}
      </ul>
    </nav>
  );
}
