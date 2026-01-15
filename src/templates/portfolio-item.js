import * as React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const PortfolioItemPage = ({ data }) => {
  const item = data.contentfulPortfolioItem;

  return (
    <Layout>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">{item.title}</h1>

        <p className="text-lg text-gray-600 mb-10">{item.slug}</p>

        {item.description && (
          <div className="text-lg text-gray-600 mb-10 max-w-prose">
            {renderRichText(item.description)}
          </div>
        )}

        {item.images?.map((image) => (
          <GatsbyImage
            key={image.description || image.gatsbyImageData.images.fallback.src}
            className="rounded-lg shadow-lg my-6"
            image={image.gatsbyImageData}
            alt={image.description || item.title}
          />
        ))}

        {item.image?.description && (
          <p className="text-gray-600 mt-2">{item.image.description}</p>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    contentfulPortfolioItem(slug: { eq: $slug }) {
      slug
      title
      description {
        raw
      }
      images {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 500)
        description
      }
    }
  }
`;

export const Head = ({ data }) => (
  <title>{data.contentfulPortfolioItem.title}</title>
);

export default PortfolioItemPage;
