import { useRouter } from "next/router";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Filters } from "../../src/components/Filters";
import { Loader } from "../../src/components/Loader";
import Products from "../../src/components/Products/Products";
import { UserContext } from "../../src/context/UserContext";
import { magentoCategoryProducts } from "../../src/graphql/magentoCategoryProducts";
import { MainTemplate } from "../../src/templates/MainTemplate";

export default function CategoryPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [sortMethod, setSortMethod] = useState({
    type: "relevance",
    mode: "ASC",
  });
  const observer = useRef();
  const lastItemRef = useRef();
  const { query } = useRouter();
  const { categories } = useContext(UserContext);

  useEffect(() => {
    setCurrentCategory(
      categories.filter((x) => x.url_key === query.category)[0]
    );
  }, [categories, query]);

  useLayoutEffect(() => {
    if (!currentCategory) return;
    setIsLoading(true);
    magentoCategoryProducts(1, sortMethod, currentCategory.id).then((res) => {
      setAllProducts([...res.products.items]);
      setPage(res.products.page_info);
      setIsLoading(false);
    });

    // return () => setAllProducts([]);
  }, [sortMethod, currentCategory]);

  console.log("JEST", isLoading);

  // useEffect(()=>{
  //  return () => setAllProducts([])
  // },[currentCategory])

  const getMoreProducts = useCallback(() => {
    if (page.current_page >= page.total_pages || isLoading) return;
    setMoreLoading(true);

    magentoCategoryProducts(
      page.current_page + 1,
      sortMethod,
      currentCategory.id
    ).then((res) => {
      setPage(res.products.page_info);
      setAllProducts((prev) => [...prev, ...res.products.items]);
      setMoreLoading(false);
    });
  }, [page, moreLoading]);

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
    <>
      <MainTemplate>
        <Filters
          msg={currentCategory?.name}
          onChangeFilter={handleChangeSortMethod}
        />
        {!allProducts.length ? (
          <div className="alternative-loader">{<Loader />}</div>
        ) : (
          <Products products={allProducts} lastItem={lastItemRef} />
        )}

        {isLoading && allProducts.length ? (
          <div className="alternative-loader">
            <Loader />
          </div>
        ) : null}
        {moreLoading && <Loader />}
      </MainTemplate>
    </>
  );
}
