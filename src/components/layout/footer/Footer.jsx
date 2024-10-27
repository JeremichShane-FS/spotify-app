import { setCopyright } from "@/utilities/setCopyright";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p>{setCopyright("Spotify")}</p>
    </footer>
  );
}
