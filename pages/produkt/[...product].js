import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SingleProduct } from "../../src/components/SingleProduct/SingleProduct";
import { magentoSingleProduct } from "../../src/graphql/magentoSingleProduct";
import { MainTemplate } from "../../src/templates/MainTemplate";
import {Loader} from '../../src/components/Loader'
import Head from "next/head";

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState();


  const {
    query: { product },
  } = useRouter();
  const urlKey = product && product[product.length - 1];

  useEffect(() => {

    magentoSingleProduct(urlKey)
      .then((res) => setSingleProduct(res))
      .catch((err) => console.log(err));
  }, [urlKey]);

  return (
    <MainTemplate>
      
      <Head>
        <title>{singleProduct?.name}</title>
      </Head>
      {singleProduct ? <SingleProduct product={singleProduct}/> : <Loader/>}
    </MainTemplate>
  );
};

export default ProductDetails;
