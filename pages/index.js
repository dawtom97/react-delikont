import { useCallback, useEffect, useRef, useState } from "react";
import { Filters } from "../src/components/Filters";
import { Heading } from "../src/components/Heading";
import Products from "../src/components/Products/Products";
import { magentoProducts } from "../src/graphql/magentoProducts";
import { MainTemplate } from "../src/templates/MainTemplate";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();
  const lastItemRef = useRef();

  useEffect(() => {
    magentoProducts(1).then((res) => {
      setAllProducts([...res.products.items]);
      setPage(res.products.page_info);
    });
  }, []);

  const getMoreProducts = useCallback(() => {
    if (page.current_page >= page.total_pages || isLoading) return;
    setIsLoading(true);

    magentoProducts(page.current_page + 1).then((res) => {
      setPage(res.products.page_info);
      setAllProducts(prev=>[...prev, ...res.products.items]);
      setIsLoading(false);
    });
  }, [page, isLoading]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getMoreProducts();
        }
      },
      {
        root: document,
        threshold: 1,
      }
    );
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [getMoreProducts]);

  

  return (
    <MainTemplate>
      <Heading level="h1">Strona główna</Heading>
      <Filters />
      {!allProducts ? (
        "Loading..."
      ) : (
        <Products products={allProducts} lastItem={lastItemRef} />
      )}
      {isLoading && <h1>LOADING</h1>}
    </MainTemplate>
  );
}
