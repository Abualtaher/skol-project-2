const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allContentfulPortfolioItem {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }
  const items = result.data.allContentfulPortfolioItem.nodes;

  items.forEach((item) => {
    createPage({
      path: `/portfolio/${item.slug}`,
      component: path.resolve("./src/templates/portfolio-item.js"),
      context: {
        slug: item.slug,
      },
    });
  });
};
