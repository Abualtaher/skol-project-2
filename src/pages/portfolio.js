import * as React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const PortfolioPage = ({ data }) => {
  const items = data.allContentfulPortfolioItem.nodes;
  return (
    <Layout>
      <h1>Portfolio</h1>
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <Link to={`/portfolio/${item.slug}`}>
              {item.title}
              {item.description && (
                <div>{renderRichText(item.description)}</div>
              )}
            </Link>
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
        description {
          raw
        }
      }
    }
  }
`;

export const Head = () => <title>Portfolio</title>;

export default PortfolioPage;
