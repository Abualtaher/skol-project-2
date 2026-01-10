import * as React from "react";
import MyNavbar from "./myNavbar";
import { container } from "../styles/layout.module.css";
const Layout = ({ children }) => {
  return (
    <div className={container}>
      <header>
        <nav>
          <MyNavbar />
        </nav>
      </header>
      <main className="flex flex-col items-center">{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
