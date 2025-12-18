import * as React from "react";
import { Link } from "gatsby";
import { container } from "../styles/layout.module.css";
const Layout = ({ children }) => {
  return (
    <div className={container}>
      <header>
        <h1>Wisam</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
