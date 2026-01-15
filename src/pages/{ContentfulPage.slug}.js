import * as React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage } from "gatsby-plugin-image";

const Page = ({ data }) => {
  const page = data.contentfulPage;
  const portfolioItems = data.allContentfulPortfolioItem?.nodes || [];

  return (
    <Layout>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>

        {page.body && (
          <div className="text-lg text-gray-600 mb-10 max-w-prose">
            {renderRichText(page.body)}
          </div>
        )}

        {page.hero?.gatsbyImageData && (
          <GatsbyImage
            className="rounded-lg shadow-lg my-6"
            image={page.hero.gatsbyImageData}
            alt={page.hero.description}
          />
        )}

        {portfolioItems.length > 0 && (
          <section>
            <ul className="list-disc pl-5 space-y-2 text-left">
              {portfolioItems.map((item) => (
                <li key={item.slug}>
                  <Link to={`/portfolio/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      hero {
        description
        gatsbyImageData(layout: CONSTRAINED, sizes: "800", placeholder: BLURRED)
      }
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
