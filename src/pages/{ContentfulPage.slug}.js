import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const Page = ({ data }) => {
  const page = data.contentfulPage;
  const portfolioItems = data.allContentfulPortfolioItem?.nodes || [];

  return (
    <Layout>
      <h1>{page.title}</h1>
      {page.body && <div>{renderRichText(page.body)}</div>}

      {portfolioItems.length > 0 && (
        <section>
          <h2>Portfolio</h2>
          <ul>
            {portfolioItems.map((item) => (
              <li key={item.slug}>
                <Link to={`/portfolio/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      body {
        raw
      }
    }
    allContentfulPortfolioItem(sort: { title: ASC }) {
      nodes {
        title
        slug
      }
    }
  }
`;

export const Head = ({ data }) => <title>{data.contentfulPage.title}</title>;
