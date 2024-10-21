import { SearchBox } from "@/components";
import Link from "next/link";
import { Navbar } from "..";

import { ROOT } from "@/constants/paths";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Link href={ROOT}>
        <svg className="header__logo">
          <use href="/images/svg/sprite.svg#spotify" />
        </svg>
      </Link>
      <div className="header__search">
        <SearchBox />
      </div>
      <div className="header__navbar">
        <Navbar />
      </div>
    </header>
  );
}
