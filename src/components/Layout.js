import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";

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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="relative z-50">
        <MyNavbar
          query={query}
          setQuery={setQuery}
          filteredPages={filteredPages}
        />
      </header>

      {/* Main content */}
      <main className="flex-1 pt-28 px-4 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12">
        <MyFooter />
      </footer>
    </div>
  );
};

export default Layout;
