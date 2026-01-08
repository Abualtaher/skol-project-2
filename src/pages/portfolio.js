import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";

const PortfolioPage = ({ data }) => {
  const items = data.allContentfulPortfolioItem.nodes;
  return (
    <Layout>
      <h1>Portfolio</h1>
      <ul>
        {items.map((items) => (
          <li key={items.slug}>
            <Link to={`/portfolio/${items.slug}`}>{items.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export const query = graphql`
  {
    allContentfulPortfolioItem {
      nodes {
        title
        slug
      }
    }
  }
`;

export const Head = () => <title>Portfolio</title>;

export default PortfolioPage;
