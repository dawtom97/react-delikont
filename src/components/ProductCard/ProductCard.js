import Link from "next/link";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProductPrice } from "./ProductPrice";
import { AiFillHeart } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { motion } from "framer-motion";
import Image from "next/image";
import myImageLoader from "../../utils/imageLoader";

export const Card = styled.article`
  /* width: calc(15% - 10px); */
  border: 1px solid transparent;
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 10%);
  border-radius: 6px;
  background: #fff;
  position: relative;
  padding: 10px;
  font-size: 14px;
  min-height: 415px;
  min-width: 180px;
  flex: 1;
  text-align: center;
  transition: 0.4s;

  /* @media screen and (max-width: 1440px) {
    width: calc(17% - 10px);
  }
  @media screen and (max-width: 1440px) {
    width: calc(20% - 10px);
  }
  @media screen and (max-width: 992px) {
    width: calc(25% - 10px);
  }
  @media screen and (max-width: 768px) {
    width: calc(33% - 10px);
  }
  @media screen and (max-width: 576px) {
    width: calc(50% - 10px);
  } */

  & img {
    width: 100%;
    object-fit: contain;
    cursor: pointer;
  }

  & a {
    display: block;
    min-height: 57px;
    width: 100%;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
`;

export const HeartButton = styled.button`
  right: 5px;
  position: absolute;
  top: 5px;
  cursor: pointer;
  z-index: 10;
  width: 30px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colorPrimary};
  color: ${({ isFavorite }) => (isFavorite ? "#fff" : "#f57c00")};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: ${({ isFavorite }) =>
    isFavorite ? "#f57c00" : "transparent"};
`;

export const ProductCard = forwardRef(({ product, isAlternative }, ref) => {
  const { wishlist, currentUser, addToWishlist, removeFromWishlist, cart } =
    useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(null);
  const { showModal } = useContext(ModalContext);

  const [cartProduct, setCardProduct] = useState();

  useEffect(() => setCardProduct(isCartProduct()), [cart]);

  // console.log(product);

  const isCartProduct = () =>
    cart?.items.find((item) => item.product.id === product.id);

  useEffect(() => {
    const checkFavoriteStatus =
      wishlist &&
      wishlist?.items.find((item) => item.product.id === product.id);
    setIsFavorite(checkFavoriteStatus);
  }, [wishlist, product.id]);

  const handleAddToWishlist = (favorite, productSku = 0) => {
    if (!currentUser?.firstname) {
      showModal("Zaloguj się, aby dodać do ulubionych", true);
      return;
    }
    if (!isFavorite) {
      addToWishlist(productSku);
      setIsFavorite({});
    } else {
      removeFromWishlist(favorite.id);
      setIsFavorite(null);
    }
  };

  // const productDetailsUrl = `/produkt/${product.categories
  //   ?.map((product) => [product.name.replaceAll(" ", "-").toLowerCase()])
  //   .join("/")}/${product.name.replaceAll(" ", "-").toLowerCase()}`;
  // console.log(productDetailsUrl)
  const productDetailsUrl = `/produkt/${product.categories
    ?.map((product) => [product.url_key])
    .join("/")}/${product.url_key}`;

  if (!product) return;

  return (
    <Card
      as={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      ref={ref}
      style={{
        border:
          product.id === cartProduct?.product.id ? "1px solid #f57c00" : null,
      }}
    >
      <HeartButton
        aria-label="Dodaj do ulubionych"
        onClick={() => handleAddToWishlist(isFavorite, product.sku)}
        isFavorite={isFavorite}
      >
        <AiFillHeart />
      </HeartButton>

      <Link href={productDetailsUrl}>
        <div>
          <Image
            // loader={myImageLoader}
            src={product.image?.url}
            priority={true}
            height={150}
            width={120}
            alt={product.name}
          />
          <a style={{ maxHeight: 60 }}>
            {product.name.length > 50
              ? product.name.slice(0, 50) + "..."
              : product.name}
          </a>
        </div>
      </Link>
      <ProductPrice
        cartProduct={cartProduct}
        product={product}
        isAlternative={isAlternative}
      />
    </Card>
  );
});

ProductCard.displayName = ProductCard;
