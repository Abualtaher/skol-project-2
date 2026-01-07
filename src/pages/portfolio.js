import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";

const portfolioPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allContentfulPortfolioItem {
        nodes {
          slug
          title
        }
      }
    }
  `);
  if (!data?.allContentfulPortfolio?.edges) {
    return (
      <Layout>
        <h1>Portfolio</h1>
        <Link to="/">Home</Link>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>Portfolio</h1>
      <Link to="/">Home</Link>
    </Layout>
  );
};

export const Head = () => <title>Portfolio</title>;

export default portfolioPage;
