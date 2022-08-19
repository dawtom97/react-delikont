import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading } from '../Heading'
import { ProductPrice } from '../ProductPrice'

export const Wrapper = styled.div`
  margin-top:50px;
`
export const UpperInfo = styled.div`
 display: flex;
`

export const BottomInfo = styled.div`
  margin-top: 80px;
`

export const ImageBox = styled.div`
  flex:1;
`
export const TextBox = styled.div`
  flex:1;
  text-align: center;

  & div {
    width:initial
  }
  &> button {
    width: 300px;
    height: 40px;
    margin-top: 20px;
  }

  & >div > p {
    text-align: left;
    margin-top:30px;
  }
 
`
export const InnerContent = styled.div`
  font-size: 13px;
  color:#282828;


`
export const ContentSwitchBox = styled.div`
 border-bottom: 2px solid #ddd;
 display: flex;
 margin-bottom: 25px;
 gap:30px;

`
export const SwitchSpan = styled.span `
    font-size: 14px;
    font-weight: 400;
    color: #414b56;
    display: block;
    padding: 5px 15px;
    height: 35px;
    cursor: pointer;
   // border-bottom: ${({isActive}) => isActive ? '3px solid #f57c00' : null};
   border-bottom: 3px solid transparent;
   transition: 0.4s;

    &:nth-of-type(${({isActive}) => isActive}) {
        border-bottom:3px solid #f57c00;
    }
`


export const SingleProduct = ({product}) => {

    const [isActive,setIsActive] = useState(1);
    const [activeContent,setActiveContent] = useState(0);

    const infoChunks = [
        {
            name:"O PRODUKCIE",
            content:product.description.html
        },
        {
            name:"SKŁADNIKI",
            content:""
        },
        {
            name:"WARTOŚCI ODŻYWCZE",
            content:""
        },
        {
            name:"OSTRZEŻENIA I POZOSTAŁE INFORMACJE",
            content:""
        },
        {
            name:"INFORMACJE PRODUCENTA",
            content:""
        }
    ]
  const handleActiveInfo = (index)=> {
      setIsActive(index + 1);
      setActiveContent(index);
  }

  return (
    <Wrapper>
        <UpperInfo>
            <ImageBox>
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image.url} alt={product.name}/>
            </ImageBox>

            <TextBox>
               <Heading level="h1">{product.name} {product.weight}g</Heading>
               <ProductPrice product={product}/>
               <div>
                <p><strong>SKU</strong> {product.sku}</p>
               </div>
            </TextBox>
 
        </UpperInfo>


        <BottomInfo>
              <ContentSwitchBox >
                {infoChunks.map((chunk,index) =>(
                   <SwitchSpan onClick={()=>handleActiveInfo(index)} isActive={isActive} key={index}>{chunk.name}</SwitchSpan>
                ))}
              </ContentSwitchBox>
              <InnerContent dangerouslySetInnerHTML={{__html: `${infoChunks[activeContent].content}`}}>
               
              </InnerContent>
        </BottomInfo>

    </Wrapper>
  )
}
