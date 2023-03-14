import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { BrowserRouter } from 'react-router-dom';


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
     <main>{children}</main>
      <Footer />
    </>
  );
}
