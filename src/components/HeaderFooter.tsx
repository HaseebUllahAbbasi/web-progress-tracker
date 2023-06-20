import React, { ReactNode } from 'react';
import AppNavbar from "../components/Navbar";

interface HeaderFooterProps {
  children: ReactNode;
}

const HeaderFooter: React.FC<HeaderFooterProps> = ({ children }) => {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
};

export default HeaderFooter;