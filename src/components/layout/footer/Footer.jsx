import { setCopyright } from "@/utilities/setCopyright";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <p>{setCopyright("Spotify")}</p>
    </footer>
  );
}
