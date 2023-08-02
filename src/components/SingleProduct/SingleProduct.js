import React, { useContext, useEffect, useState } from "react";
import * as Styled from "./styles";
import { Heading } from "../Heading";
import { ProductPrice } from "../ProductCard/ProductPrice";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import Link from "next/link";
import Image from "next/image";

export const SingleProduct = ({ product }) => {
  const [isActive, setIsActive] = useState(1);
  const [activeContent, setActiveContent] = useState(0);
  const { showModal } = useContext(ModalContext);
  const { wishlist,currentUser, removeFromWishlist, addToWishlist, cart } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(null);

  const [cartProduct, setCardProduct] = useState();

  useEffect(() => setCardProduct(isCartProduct()), [cart]);

  const isCartProduct = () =>
    cart?.items.find((item) => item.product.id === product.id);

  useEffect(() => {
    const checkFavoriteStatus =
      wishlist &&
      wishlist?.items.find(
        (item) => item.product.id === product.id
      );
    setIsFavorite(checkFavoriteStatus);
  }, [wishlist, product.id]);

  const infoChunks = [
    {
      name: "O PRODUKCIE",
      content: product.description.html,
    },
    {
      name: "SKŁADNIKI",
      content: "",
    },
    {
      name: "WARTOŚCI ODŻYWCZE",
      content: "",
    },
    {
      name: "OSTRZEŻENIA I POZOSTAŁE INFORMACJE",
      content: "",
    },
    {
      name: "INFORMACJE PRODUCENTA",
      content: "",
    },
  ];
  const handleActiveInfo = (index) => {
    setIsActive(index + 1);
    setActiveContent(index);
  };

  const handleAddToWishlist = (favorite, productSku = 0) => {
    if (!currentUser?.firstname) {
      showModal("Zaloguj się, aby dodać do ulubionych");
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

  return (
    <Styled.Wrapper>
      <Styled.UpperInfo>
        <Styled.ImageBox>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image src={product.image.url} alt={product.name} layout="fill" objectFit="contain" />
          <Styled.HeartButton
            onClick={() =>
              handleAddToWishlist(
                isFavorite,
                product.sku
              )
            }
            isFavorite={isFavorite}
          >
            <AiFillHeart />
          </Styled.HeartButton>
        </Styled.ImageBox>

        <Styled.TextBox>
          <Heading level="h1">
            {product.name} {product.weight}g
          </Heading>
          <ProductPrice cartProduct={cartProduct}  product={product} />
          <div>
            {product.stock_status === "IN_STOCK" ? (
              <Styled.StatusMsg>
                <FaCheckCircle /> W MAGAZYNIE
              </Styled.StatusMsg>
            ) : (
              <Styled.StatusMsg isOutOfStock>
                <FaCheckCircle /> BRAK W MAGAZYNIE
              </Styled.StatusMsg>
            )}
            {isFavorite ? (
              <Styled.StatusMsg>
                <AiFillHeart />
                <span>
                  NA <Link href="/lista-zyczen">LIŚCIE ŻYCZEŃ</Link>
                </span>
              </Styled.StatusMsg>
            ) : null}

            <p>
              <strong>SKU</strong> {product.sku}
            </p>
          </div>
        </Styled.TextBox>
      </Styled.UpperInfo>

      <Styled.BottomInfo>
        <Styled.ContentSwitchBox>
          {infoChunks.map((chunk, index) => (
            <Styled.SwitchSpan
              onClick={() => handleActiveInfo(index)}
              isActive={isActive}
              key={index}
            >
              {chunk.name}
            </Styled.SwitchSpan>
          ))}
        </Styled.ContentSwitchBox>
        <Styled.InnerContent
          dangerouslySetInnerHTML={{
            __html: `${infoChunks[activeContent].content}`,
          }}
        ></Styled.InnerContent>
      </Styled.BottomInfo>
    </Styled.Wrapper>
  );
};
