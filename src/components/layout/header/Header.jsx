import { SearchBox } from "@/components";
import Link from "next/link";
import { Navbar } from "..";

import { SpotifySVG } from "@/components/icons";
import { ROOT } from "@/constants/paths";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Link href={ROOT}>
        <SpotifySVG />
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
