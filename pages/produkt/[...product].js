import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SingleProduct } from "../../src/components/SingleProduct/SingleProduct";
import { magentoSingleProduct } from "../../src/graphql/magentoSingleProduct";
import { MainTemplate } from "../../src/templates/MainTemplate";
import {Loader} from '../../src/components/Loader'
import Head from "next/head";
import { magentoProductPaths } from "../../src/graphql/magentoProductPaths";
import { API_URL } from "../../src/graphql/config";

export async function getStaticProps (context) {
  const ctx = context.params.product
  const url = ctx[ctx.length - 1]

  const product = await magentoSingleProduct(url)

  return {
    props: {
      product
    },
    revalidate:10
  }
}

export async function getStaticPaths () {
 const {products} = await magentoProductPaths()
// const query = {
//   operationName: "fetchProducts",
//   query: `query fetchProducts {
//       products(search: "",pageSize:10000) {
//           page_info{
//              total_pages
//              current_page
//           }
//           items {
//             id
//             url_key
//             name
//             sku        
//           }
//         }
//   }`,
// };
// const headers = {
//   "Content-type": "application/json"
//  }


// const options = {
//   method: "post",
//   headers,
//   body: JSON.stringify(query),
// };

// const response = await (await fetch(API_URL, options)).json();

 const paths = products.items.map((product) => ({
  params: { product:[product.url_key] },
}))
 return {
   paths,
   fallback:true
 }
}


const ProductDetails = ({product:singleProduct}) => {
//  const [singleProduct, setSingleProduct] = useState();

  // const {
  //   query: { product },
  // } = useRouter();
  // const urlKey = product && product[product.length - 1];

  // useEffect(() => {

  //  // magentoProductPaths().then(r => console.log(r.products.items.map(i => i.url_key)))

  //   magentoSingleProduct(urlKey)
  //     .then((res) => setSingleProduct(res))
  //     .catch((err) => console.log(err));
  // }, [urlKey]);
  const router = useRouter()
  console.log(router)

  if(router.isFallback) {
     console.log("FALLBACK")
     return <Loader/>
  }

  return (
    <MainTemplate>
      
      <Head>
        <title>{singleProduct?.name}</title>
      </Head>
      <SingleProduct product={singleProduct}/>
     
    </MainTemplate>
  );
};

export default ProductDetails;
