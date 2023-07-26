import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Filters } from "../src/components/Filters";
import { Heading } from "../src/components/Heading";
import { Loader } from "../src/components/Loader";
import Products from "../src/components/Products/Products";
import { magentoFeatured } from "../src/graphql/magentoFeatured";
import { magentoProducts } from "../src/graphql/magentoProducts";
import { MainTemplate } from "../src/templates/MainTemplate";
import ModalComponent from "../src/components/CodesModal/ModalComponent";
import { AnimatePresence } from "framer-motion";




export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortMethod, setSortMethod] = useState({
    type: "relevance",
    mode: "ASC",
  });
  const observer = useRef();
  const lastItemRef = useRef();
  const [zipcode,setZipcode] = useState("");

  const close = () => {
    localStorage.setItem("zipcode","checked")
    if(localStorage.getItem("zipcode")) {
      setZipcode("checked")
    }
    
  }

  useEffect(() => {
    setZipcode(localStorage.getItem("zipcode"))
    magentoProducts(1, sortMethod).then((res) => {
      setAllProducts([...res.products.items]);
      setPage(res.products.page_info);
    });
  }, [sortMethod]);

  useEffect(() => {
    magentoFeatured(1).then((res) => {
      setFeaturedProducts([...res.products.items]);
    });
  }, []);

  const getMoreProducts = useCallback(() => {
    if (page.current_page >= page.total_pages || isLoading) return;
    setIsLoading(true);

    magentoProducts(page.current_page + 1, sortMethod).then((res) => {
      setPage(res.products.page_info);
      setAllProducts((prev) => [...prev, ...res.products.items]);
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
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {!zipcode ? (
            <ModalComponent handleClose={close} />
          ): null}
        </AnimatePresence>
        <Heading level="h1">Polecane produkty</Heading>

        <Products products={featuredProducts} />

        <Filters
          msg="Wszystkie produkty"
          onChangeFilter={handleChangeSortMethod}
        />
        {!allProducts.length ? (
          <div className="alternative-loader">
            <Loader />
          </div>
        ) : (
          <Products products={allProducts} lastItem={lastItemRef} />
        )}

        {isLoading && <Loader />}
      </MainTemplate>
    </>
  );
}
