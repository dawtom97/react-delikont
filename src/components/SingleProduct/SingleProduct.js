import React, { useContext, useEffect, useState } from "react";
import * as Styled from "./styles";
import { Heading } from "../Heading";
import { ProductPrice } from "../ProductPrice";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { magentoAddToWishlist } from "../../graphql/magentoAddToWishlist";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import Link from "next/link";
import { magentoRemoveFromWishlist } from "../../graphql/magentoRemoveFromWishlist";

export const SingleProduct = ({ product }) => {
  const [isActive, setIsActive] = useState(1);
  const [activeContent, setActiveContent] = useState(0);
  const { showModal } = useContext(ModalContext);
  const { currentUser } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    const checkFavoriteStatus =
      currentUser &&
      currentUser?.wishlist?.items.find(
        (item) => item.product.id === product.id
      );
    setIsFavorite(checkFavoriteStatus);
  }, [currentUser, product.id]);

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

  const handleAddToWishlist = (productId, wishlistId = 0, productSku = 0) => {
    if (!currentUser.firstname) {
      showModal("Zaloguj się, aby dodać do ulubionych");
      return;
    }

    if (!isFavorite) {
      magentoAddToWishlist(productSku);
      showModal("Dodano do ulubionych");
      // trzeba rozwiązać problem braku odswiezania
      setIsFavorite({});
      console.log(isFavorite);
    } else {
      magentoRemoveFromWishlist(productId, wishlistId);
      showModal("Usunięto z ulubionych");
      setIsFavorite(null);
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.UpperInfo>
        <Styled.ImageBox>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image.url} alt={product.name} />
          <Styled.HeartButton
            onClick={() =>
              handleAddToWishlist(
                isFavorite?.id,
                currentUser?.wishlist?.id,
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
          <ProductPrice product={product} />
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
                  NA <Link href="/konto/lista-zyczen">LIŚCIE ŻYCZEŃ</Link>
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
