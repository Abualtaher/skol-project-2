import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import SearchBar from "./SearchBar";

function MyNavbar({ query, setQuery, filteredPages }) {
  const [isOpen, setIsOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      allContentfulMenuItem(sort: { order: ASC }) {
        nodes {
          label
          order
          page {
            slug
          }
        }
      }
    }
  `);

  const menuItems = data.allContentfulMenuItem.nodes;

  const getPath = (slug) => {
    if (!slug || slug.trim() === "") return "/home";
    if (slug === "portfolio") return "/portfolio";
    return `/${slug.trim()}`;
  };

  const firstSlugItem = menuItems.find((item) => item.page?.slug);
  const logoPath = getPath(firstSlugItem?.page?.slug);

  return (
    <nav className="bg-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to={logoPath} className="flex items-center">
          <StaticImage
            src="../images/logo.jpg"
            alt="logo"
            placeholder="blurred"
            width={50}
            height={50}
          />
        </Link>

        <div className="hidden md:flex flex-1 justify-center relative">
          <div className="w-64 relative">
            <SearchBar value={query} onChange={setQuery} />

            {query && filteredPages.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 shadow-md mt-1 w-full max-h-64 overflow-auto z-50">
                {filteredPages.map((page) => (
                  <li key={page.id} className="hover:bg-gray-100 px-2 py-1">
                    <Link to={`/${page.slug}`}>{page.title}</Link>
                  </li>
                ))}
              </ul>
            )}

            {query && filteredPages.length === 0 && (
              <div className="absolute bg-white border border-gray-300 shadow-md mt-1 w-full p-2 text-gray-500 z-50">
                No results found
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex space-x-6 items-center justify-end">
          {menuItems.map((item) => {
            const path = getPath(item.page?.slug);
            return (
              <Link key={item.order} to={path} className="hover:text-blue-500">
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden p-2 text-2xl ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <SearchBar value={query} onChange={setQuery} />

          {query && filteredPages.length > 0 && (
            <ul className="bg-white border border-gray-300 shadow-md mt-1 w-full max-h-64 overflow-auto z-50">
              {filteredPages.map((page) => (
                <li key={page.id} className="hover:bg-gray-100 px-2 py-1">
                  <Link to={`/${page.slug}`}>{page.title}</Link>
                </li>
              ))}
            </ul>
          )}

          {query && filteredPages.length === 0 && (
            <div className="bg-white border border-gray-300 shadow-md mt-1 w-full p-2 text-gray-500 z-50">
              No results found
            </div>
          )}

          <ul className="flex flex-col mt-2 space-y-2">
            {menuItems.map((item) => {
              const path = getPath(item.page?.slug);
              return (
                <li key={item.order}>
                  <Link to={path} className="block py-2 hover:text-blue-500">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default MyNavbar;
