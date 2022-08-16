import Head from 'next/head'
import Products from '../src/components/Products/Products'
import { MainTemplate } from '../src/templates/MainTemplate'


export default function Home() {
  return (
    <MainTemplate>
         <Products/>
    </MainTemplate>
  )
}
