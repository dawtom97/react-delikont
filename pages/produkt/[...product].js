import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SingleProduct } from "../../src/components/SingleProduct/SingleProduct";
import { magentoSingleProduct } from "../../src/graphql/magentoSingleProduct";
import { MainTemplate } from "../../src/templates/MainTemplate";
import { Loader } from "../../src/components/Loader";
import Head from "next/head";
import { magentoProductPaths } from "../../src/graphql/magentoProductPaths";
import { API_URL } from "../../src/graphql/config";

export async function getStaticProps(context) {
  const ctx = context.params.product;
  const url = ctx[ctx.length - 1];

  const product = await magentoSingleProduct(url);

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { products } = await magentoProductPaths();
  const paths = products.items.map((product) => ({
    params: { product: [product.url_key] },
  }));
  return {
    paths,
    fallback: true,
  };
}

const ProductDetails = ({ product: singleProduct }) => {
  const router = useRouter();

  if (router.isFallback) {
    console.log("FALLBACK");
    return <Loader />;
  }

  return (
    <MainTemplate>
      <Head>
        <title>{singleProduct?.name}</title>
        <meta name="description" content={singleProduct?.description.html} />
      </Head>
      <SingleProduct product={singleProduct} />
    </MainTemplate>
  );
};

export default ProductDetails;
