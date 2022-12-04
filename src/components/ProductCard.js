import Link from "next/link";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProductPrice } from "./ProductPrice";
import { AiFillHeart } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";

export const Card = styled.article`
  width: calc(15% - 10px);
  border: 1px solid #ebebeb;
  position: relative;
  padding: 10px;
  font-size: 14px;
  min-height: 460px;
  min-width: 180px;
  flex: 1;
  text-align: center;

  @media screen and (max-width: 1440px) {
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
  }

  & img {
    width: 100%;
    height: 150px;
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
  const { wishlist, currentUser, addToWishlist, removeFromWishlist } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(null);
  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    const checkFavoriteStatus =
      wishlist &&
      wishlist?.items.find((item) => item.product.id === product.id);
    setIsFavorite(checkFavoriteStatus);
  }, [wishlist, product.id]);

  const handleAddToWishlist = (favorite, productSku = 0) => {
    if (!currentUser?.firstname) {
      showModal("Zaloguj się, aby dodać do ulubionych",true);
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


  const productDetailsUrl = `/produkt/${product.categories
    ?.map((product) => [product.url_key])
    .join("/")}/${product.url_key}`;

  if (!product) return;

  return (
    <Card ref={ref}>
      <HeartButton
        onClick={() => handleAddToWishlist(isFavorite, product.sku)}
        isFavorite={isFavorite}
      >
        <AiFillHeart />
      </HeartButton>

      <Link href={productDetailsUrl}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image?.url}
            layout="responsive"
            alt={product.name}
          />
          <a>
            {product.name} {product.weight}G
          </a>
        </div>
      </Link>
      <ProductPrice product={product} isAlternative={isAlternative} />
    </Card>
  );
});

ProductCard.displayName = ProductCard;
