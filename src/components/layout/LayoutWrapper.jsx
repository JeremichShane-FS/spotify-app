"use client";

import { Footer, Header } from "@/components/layout";
import { SessionDebugger } from "@/debug";

export default function LayoutWrapper({ children }) {
  return (
    <>
      <SessionDebugger />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
