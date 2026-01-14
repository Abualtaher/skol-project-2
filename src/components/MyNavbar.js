import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import SearchBar from "./SearchBar";

function MyNavbar({ query, setQuery }) {
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

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-7xl w-full grid grid-cols-3 items-center mx-auto p-4 gap-4">
        {/* Left Column — Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <StaticImage
            src="../images/logo.jpg"
            alt="logo"
            placeholder="blurred"
            width={50}
            height={50}
          />
        </Link>

        {/* Center Column — Search */}
        <div className="hidden md:flex justify-center">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* Right Column — Menu + Toggle */}
        <div className="flex items-center justify-end gap-4">
          {/* Mobile search button (optional later) */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div id="navbar-menu" className="hidden md:block">
            <ul className="font-medium flex flex-row space-x-8 rtl:space-x-reverse">
              {menuItems.map((item) => {
                const path =
                  !item.page?.slug || item.page.slug === ""
                    ? "/"
                    : item.page.slug === "portfolio"
                    ? "/portfolio"
                    : `/${item.page.slug}`;

                return (
                  <li key={item.order}>
                    <Link
                      to={path}
                      className="text-heading hover:text-fg-brand py-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Mobile Search + Menu dropdown below */}
        {isOpen && (
          <div className="col-span-3 flex flex-col gap-4 md:hidden">
            <SearchBar value={query} onChange={setQuery} />
            <ul className="font-medium flex flex-col space-y-2">
              {menuItems.map((item) => {
                const path =
                  !item.page?.slug || item.page.slug === ""
                    ? "/"
                    : item.page.slug === "portfolio"
                    ? "/portfolio"
                    : `/${item.page.slug}`;

                return (
                  <li key={item.order}>
                    <Link
                      to={path}
                      className="block py-2 text-heading hover:text-fg-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MyNavbar;
