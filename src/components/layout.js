import * as React from "react";
import MyNavbar from "./myNavbar";
import { container } from "../styles/layout.module.css";
import SearchBar from "./SearchBar";
import { graphql, useStaticQuery } from "gatsby";

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
    <div className={container}>
      <header>
        <nav>
          <MyNavbar />
        </nav>

        <SearchBar value={query} onChange={setQuery} />
        {query && (
          <ul
            style={{
              background: "#fff",
              border: "1px solid #ccc",
              padding: "10px",
              position: "absolute",
              zIndex: 1000,
            }}
          >
            {filtered.length ? (
              filtered.map((page) => (
                <li key={page.id}>
                  <a href={`/${page.slug}`}>{page.title}</a>
                </li>
              ))
            ) : (
              <li>No results found</li>
            )}
          </ul>
        )}
      </header>

      <main className="flex flex-col items-center">{children}</main>

      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
