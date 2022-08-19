import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SingleProduct } from "../../src/components/SingleProduct/SingleProduct";
import { magentoSingleProduct } from "../../src/graphql/magentoSingleProduct";
import { MainTemplate } from "../../src/templates/MainTemplate";

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

  if (!singleProduct) return "Loading...";

  return (
    <MainTemplate>
      <SingleProduct product={singleProduct}/>
    </MainTemplate>
  );
};

export default ProductDetails;
