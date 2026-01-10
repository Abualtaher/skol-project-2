import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const PortfolioItemPage = ({ data }) => {
  const item = data.contentfulPortfolioItem;

  return (
    <Layout>
      <h1>{item.title}</h1>
      <p>{item.slug}</p>
      {item.description && <div>{renderRichText(item.description)}</div>}

      {item.images?.map((image) => {
        return (
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={image.description || item.title}
            className="photo mx-auto"
          />
        );
      })}

      {item.image?.description && <p>{item.image.description}</p>}
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
