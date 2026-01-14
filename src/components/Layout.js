import * as React from "react";
import MyNavbar from "./MyNavbar";
import SearchBar from "./SearchBar";
import { graphql, useStaticQuery } from "gatsby";
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
  const filtered = pages.filter((page) =>
    page.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 shadow-lg bg-white">
        <div className="flex flex-col gap-3 w-full max-w-7xl mx-auto px-4 py-3">
          <MyNavbar />

          {/* Search (right aligned) */}
          <div className="flex justify-end">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>

        {/* Results dropdown */}
        {query && (
          <ul className="absolute bg-white border border-gray-300 shadow-md p-3 z-50 w-64 right-4">
            {filtered.length ? (
              filtered.map((page) => (
                <li
                  key={page.id}
                  className="hover:bg-gray-100 px-2 py-1 rounded"
                >
                  <a href={`/${page.slug}`}>{page.title}</a>
                </li>
              ))
            ) : (
              <li>No results found</li>
            )}
          </ul>
        )}
      </header>

      {/* CONTENT */}
      <main className="grow flex flex-col items-center pt-28 px-4">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 border-t mt-12">
        <MyFooter />
      </footer>
    </div>
  );
};

export default Layout;
