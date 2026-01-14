import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const Page = ({ data }) => {
  const page = data.contentfulPage;
  const portfolioItems = data.allContentfulPortfolioItem?.nodes || [];

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      {page.body && (
        <div className="text-lg text-gray-600 mb-10">
          {renderRichText(page.body)}
        </div>
      )}

      {portfolioItems.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Portfolio
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {portfolioItems.map((item) => (
              <li className="leading-relaxed" key={item.slug}>
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
