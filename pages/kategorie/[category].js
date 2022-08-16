import React from 'react';
import { MainTemplate } from '../../src/templates/MainTemplate';
import {useParams} from 'react';
import { useRouter } from 'next/router';

const CategoryPage = () => {
  const {query} = useRouter();

  return (
    <MainTemplate>
          <h2>{query.category}</h2>
    </MainTemplate>
  )
}

export default CategoryPage