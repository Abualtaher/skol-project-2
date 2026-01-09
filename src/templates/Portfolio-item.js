import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PortfolioItemPage = ({ data }) => {
  const item = data.contentfulPortfolioItem;
  const image = getImage(item.image);
  return (
    <Layout>
      <h1>{item.title}</h1>
      <p>{item.slug}</p>

      {image && (
        <GatsbyImage
          image={image}
          alt={item.image?.description || item.title}
        />
      )}
      {item.image?.description && <p>{item.image.description}</p>}
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    contentfulPortfolioItem(slug: { eq: $slug }) {
      slug
      title
      image {
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
