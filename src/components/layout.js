import * as React from "react";
import MyNavBar from "./MyNavbar";
import { Link } from "gatsby";
import { container } from "../styles/layout.module.css";
const Layout = ({ children }) => {
  return (
    <div className={container}>
      <header>
        <nav>
          <MyNavBar />
        </nav>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
