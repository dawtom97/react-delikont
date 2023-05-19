import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { magentoGetPage } from '../src/graphql/magentoGetPage';
import { MainTemplate } from '../src/templates/MainTemplate';

const PrivacyPolicy = () => {
 
  const [page,setPage] = useState();

  useEffect(()=>{
     magentoGetPage("polityka-prywatnosci")
     .then(res=> setPage(res.cmsPage))
     .catch(err=>console.log(err))
  },[])

  return (
    <MainTemplate>
        <Head>
            <title>{page?.title}</title>
        </Head>

        <div dangerouslySetInnerHTML={{__html:page?.content}}/>

    </MainTemplate>
  )
}

export default PrivacyPolicy;
