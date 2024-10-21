"use client";

import { Footer, Header } from "@/components/layout";
import { SessionDebugger } from "@/debug";
import "@/sass/main.scss";
import AuthProvider from "@/services/AuthProvider";

const metadata = {
  title: "Spotify App",
  description:
    "This Spotify application, built with Next.js, integrates the Spotify API to allow users to search for songs, artists, and albums. The app delivers a responsive, seamless experience for music discovery. Future updates will introduce additional features to enhance user engagement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="page">
        <AuthProvider>
          <SessionDebugger />
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
