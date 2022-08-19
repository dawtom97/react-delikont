import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../Heading";
import { ProductPrice } from "../ProductPrice";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { magentoAddToWishlist } from "../../graphql/magentoAddToWishlist";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import Link from "next/link";
import { magentoRemoveFromWishlist } from "../../graphql/magentoRemoveFromWishlist";

export const Wrapper = styled.div`
  margin-top: 50px;
`;
export const UpperInfo = styled.div`
  display: flex;
  gap: 30px;
`;

export const BottomInfo = styled.div`
  margin-top: 80px;
`;

export const ImageBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const HeartButton = styled.button`
  position: absolute;
  right: 30px;
  top: 0;
  cursor: pointer;
  width: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colorPrimary};
  color: ${({ isFavorite }) => (isFavorite ? "#fff" : "#f57c00")};
  font-size: 20px;
  text-align: center;
  line-height: 44px;
  height: 40px;
  background-color: ${({ isFavorite }) =>
    isFavorite ? "#f57c00" : "transparent"};
`;

export const TextBox = styled.div`
  flex: 1;
  text-align: center;

  & div {
    width: initial;
  }
  & > button {
    width: 300px;
    height: 40px;
    margin-top: 20px;
  }

  & > div > p {
    text-align: left;
    margin-top: 30px;
  }
`;
export const InnerContent = styled.div`
  font-size: 13px;
  color: #282828;
`;
export const ContentSwitchBox = styled.div`
  border-bottom: 2px solid #ddd;
  display: flex;
  margin-bottom: 25px;
  gap: 30px;
`;
export const SwitchSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #414b56;
  display: block;
  padding: 5px 15px;
  height: 35px;
  cursor: pointer;

  border-bottom: 3px solid transparent;
  transition: 0.4s;

  &:nth-of-type(${({ isActive }) => isActive}) {
    border-bottom: 3px solid #f57c00;
  }
`;
export const StatusMsg = styled.p`
  display: flex;
  align-items: center;
  font-size: 13px;

  & > svg {
    margin-right: 12px;
    color: ${({ isOutOfStock }) => (isOutOfStock ? "#ff1515" : "#f57c00")};
  }

  & a {
    text-decoration: underline;
  }
`;

export const SingleProduct = ({ product }) => {
  const [isActive, setIsActive] = useState(1);
  const [activeContent, setActiveContent] = useState(0);
  const { showModal } = useContext(ModalContext);
  const { currentUser } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(null);



  useEffect(() => {
    const checkFavoriteStatus = currentUser && currentUser?.wishlist?.items.find(
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

  const handleAddToWishlist = (productId,wishlistId = 0,productSku = 0) => {

    if(!currentUser.firstname) {
      showModal("Zaloguj się, aby dodać do ulubionych");
      return;
    }

    if(!isFavorite) {
      magentoAddToWishlist(productSku);
      showModal("Dodano do ulubionych");
      // trzeba rozwiązać problem braku odswiezania 
      setIsFavorite({});
      console.log(isFavorite);
    }
    else {
      magentoRemoveFromWishlist(productId, wishlistId);
      showModal("Usunięto z ulubionych");
      setIsFavorite(null);
    }
  
  };

  return (
    <Wrapper>
      <UpperInfo>
        <ImageBox>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image.url} alt={product.name} />
          <HeartButton
            onClick={() => handleAddToWishlist(isFavorite?.id,currentUser?.wishlist?.id,product.sku)}
            isFavorite={isFavorite}
          >
            <AiFillHeart />
          </HeartButton>
        </ImageBox>

        <TextBox>
          <Heading level="h1">
            {product.name} {product.weight}g
          </Heading>
          <ProductPrice product={product} />
          <div>
            {product.stock_status === "IN_STOCK" ? (
              <StatusMsg>
                <FaCheckCircle /> W MAGAZYNIE
              </StatusMsg>
            ) : (
              <StatusMsg isOutOfStock>
                <FaCheckCircle /> BRAK W MAGAZYNIE
              </StatusMsg>
            )}
            {isFavorite ? (
              <StatusMsg>
                <AiFillHeart />
                <span>
                  NA <Link href="/konto/lista-zyczen">LIŚCIE ŻYCZEŃ</Link>
                </span>
              </StatusMsg>
            ) : null}

            <p>
              <strong>SKU</strong> {product.sku}
            </p>
          </div>
        </TextBox>
      </UpperInfo>

      <BottomInfo>
        <ContentSwitchBox>
          {infoChunks.map((chunk, index) => (
            <SwitchSpan
              onClick={() => handleActiveInfo(index)}
              isActive={isActive}
              key={index}
            >
              {chunk.name}
            </SwitchSpan>
          ))}
        </ContentSwitchBox>
        <InnerContent
          dangerouslySetInnerHTML={{
            __html: `${infoChunks[activeContent].content}`,
          }}
        ></InnerContent>
      </BottomInfo>
    </Wrapper>
  );
};
