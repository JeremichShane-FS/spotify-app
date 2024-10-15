import { Footer, Navbar } from "@/components/layout";
import "@/sass/main.scss";

export const metadata = {
  title: "Spotify App",
  description:
    "This Spotify application, built with Next.js, integrates the Spotify API to allow users to search for songs, artists, and albums. The app delivers a responsive, seamless experience for music discovery. Future updates will introduce additional features to enhance user engagement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="page">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
