import * as React from "react";

import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <h1 h1 className="bg-red-500 text-white p-10">
        Home
      </h1>
    </Layout>
  );
};
export const Head = () => <title>Home</title>;

export default IndexPage;
