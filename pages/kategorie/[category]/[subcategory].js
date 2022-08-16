import { useRouter } from 'next/router'
import React from 'react'
import { MainTemplate } from '../../../src/templates/MainTemplate'

const Subcategory = () => {
  const {query} = useRouter();

  return (
    <MainTemplate>
       <h2>{query.subcategory}</h2>
    </MainTemplate>
  )
}

export default Subcategory