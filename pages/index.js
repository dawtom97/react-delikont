import { useEffect, useState } from 'react'
import Products from '../src/components/Products/Products'
import { magentoProducts } from '../src/graphql/magentoProducts'
import { MainTemplate } from '../src/templates/MainTemplate'


// export const getStaticProps = () => {
//   const res = magentoProducts();
//   console.log(res)

//   return {
//     props: {
//       products: res
//     }
//   }
// }


export default function Home({products}) {
  const [prod,setProducts] = useState()

  useEffect(()=>{
      
      setProducts(magentoProducts());
      console.log(prod);
  },[])


  return (
    <MainTemplate>
         <Products/>
    </MainTemplate>
  )
}
