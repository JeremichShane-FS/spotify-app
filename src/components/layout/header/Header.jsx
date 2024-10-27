import { SearchBox } from "@/components";
import { useSpotifySearch } from "@/hooks";
import { Navbar } from "..";

import { SpotifySVG } from "@/components/icons";
import { ROOT } from "@/constants/paths";

import { useRouter } from "next/navigation";
import "./Header.scss";

export default function Header() {
  const { query, setQuery } = useSpotifySearch();
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    setQuery("d");
    console.log("Logo clicked", query);
    router.push(ROOT);
  };

  return (
    <header className="header">
      <div className="header__logo--link" onClick={handleClick}>
        <SpotifySVG />
      </div>
      <div className="header__search">
        <SearchBox />
      </div>
      <div className="header__navbar">
        <Navbar />
      </div>
    </header>
  );
}
