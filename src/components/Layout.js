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
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full relative z-50">
        <MyNavbar
          query={query}
          setQuery={setQuery}
          filteredPages={filteredPages}
        />
      </header>

      <main className="pt-28 px-4 w-full max-w-4xl mx-auto flex-1">
        {children}
      </main>

      <footer className="w-full bg-gray-100 border-t mt-12">
        <MyFooter />
      </footer>
    </div>
  );
};

export default Layout;
