import { useEffect, useState } from "react";
import { Filters } from "../src/components/Filters";
import { Heading } from "../src/components/Heading";
import Products from "../src/components/Products/Products";
import { magentoProducts } from "../src/graphql/magentoProducts";
import { MainTemplate } from "../src/templates/MainTemplate";

export default function Home() {
  const [allProducts, setAllProducts] = useState();
  const [producents, setProducents] = useState();

  useEffect(() => {
    magentoProducts().then((res) => setAllProducts(res.products.items));
  }, []);

  console.log(allProducts);

  return (
    <MainTemplate>
      <Heading level='h1'>Strona główna</Heading>
      <Filters/>
      {!allProducts ? "Loading..." : <Products products={allProducts} />}
    </MainTemplate>
  );
}
