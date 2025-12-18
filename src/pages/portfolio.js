import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";

const portfolioPage = () => {
  return (
    <Layout>
      <h1>Portfolio</h1>
      <Link to="/">Home</Link>
    </Layout>
  );
};

export const Head = () => <title>Portfolio</title>;

export default portfolioPage;
