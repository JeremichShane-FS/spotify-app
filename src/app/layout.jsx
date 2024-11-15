"use client";

import { Footer, Header } from "@/components/layout";
import { AppProvider } from "@/contexts";

import "@/sass/main.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Spotify App</title>
      </head>
      <body className="page">
        <AppProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
