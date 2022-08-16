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
  return (
    <MainTemplate>
         <Products/>
    </MainTemplate>
  )
}
