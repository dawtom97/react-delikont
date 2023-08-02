import { useRouter } from "next/router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Filters } from "../../src/components/Filters";
import { Loader } from "../../src/components/Loader";
import Products from "../../src/components/Products/Products";
import { magentoSearchProducts } from "../../src/graphql/magentoSearchProducts";
import { MainTemplate } from "../../src/templates/MainTemplate";
import ProductNotFound from "../../src/components/ProductNotFound";

export default function Results() {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState();

  // TODO Możliwe że trzeba będzie dać sort by relevance jako domyślny filtr...
  const [sortMethod, setSortMethod] = useState({
    type: "relevance",
    mode: "DESC",
  });
  const [isLoadingResults, setIsLoadingResults] = useState(true);
  const observer = useRef();
  const lastItemRef = useRef();
  const router = useRouter();
  const params = router.query.search && router.query.search;

  useLayoutEffect(() => {
    magentoSearchProducts(1, sortMethod, params && params[0])
      .then((res) => {
        if (!res?.products) {
          return;
        }
        setIsLoading(true);
        setIsLoadingResults(true);
        setAllProducts([...res.products.items]);
        setPage(res.products.page_info);
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadingResults(false);
      });
  }, [params, sortMethod]);

  const getMoreProducts = useCallback(() => {
    if (page.current_page >= page.total_pages || isLoading) return;
    setIsLoading(true);

    magentoSearchProducts(
      page.current_page + 1,
      sortMethod,
      params && params[0]
    ).then((res) => {
      if (!res?.products) return;
      setPage(res.products.page_info);
      setAllProducts((prev) => [...prev, ...res.products.items]);
      setIsLoading(false);
    });
  }, [isLoading, sortMethod, params, page]);

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

  const handleChangeSortMethod = (e) => {
    const filter = e.target.dataset.filter;
    const sortMode = filter.split(",");
    setSortMethod({
      type: sortMode[0],
      mode: sortMode[1],
    });
  };

  return (
    <MainTemplate>
      <Filters
        msg="Wyniki wyszukiwania"
        onChangeFilter={handleChangeSortMethod}
      />
      {isLoadingResults ? (
        <div className="alternative-loader">
          <Loader />
        </div>
      ) : allProducts.length > 0 ? (
        <Products products={allProducts} lastItem={lastItemRef} />
      ) : (
        <ProductNotFound />
      )}
      {isLoading && <Loader />}
    </MainTemplate>
  );
}
