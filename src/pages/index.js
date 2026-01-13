import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  const pages = data.allContentfulPage.nodes;

  return (
    <Layout pages={pages}>
      <h1>Home</h1>
      {/* Optional: display filtered results here if you want */}
    </Layout>
  );
};

export const query = graphql`
  query {
    allContentfulPage {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

export const Head = () => <title>Home</title>;

export default IndexPage;
