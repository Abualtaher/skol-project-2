import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";

import { Container } from "../styles/layout.module.css";

const Layout = ({ children }) => {
  const [query, setQuery] = React.useState("");

  const data = useStaticQuery(graphql`
    query {
      allContentfulPage {
        nodes {
          id
          title
          slug
        }
      }
    }
  `);

  const pages = data.allContentfulPage.nodes;
  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={Container}>
      <header className="relative z-50">
        <MyNavbar
          query={query}
          setQuery={setQuery}
          filteredPages={filteredPages}
        />
      </header>

      <main className="flex-1 pt-28 px-4 max-w-7xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-gray-100 border-t mt-12">
        <MyFooter />
      </footer>
    </div>
  );
};

export default Layout;
