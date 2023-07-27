import Image from 'next/image'
import React from 'react'
import notFound from '../../public/notFound.png'
import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
  text-align: center;
  & span {
    display: block;
    margin-top: 10px;
  }
  & a {
    color: orange;
  }
`

const ProductNotFound = () => {
  return (
    <Wrapper>
        <Image src={notFound} width={300} alt="Nie znaleziono produktu"/>
        <span>Niestety, nie udało się znaleźć produktu</span>
        <span>Wróć na <Link href="/">stronę główną</Link></span>
    </Wrapper>
  )
}

export default ProductNotFound