import axios from 'axios';
import { API_URL } from './config';

export const magentoCategories = () => {
    axios({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://185.200.44.108/graphql",
      },
      url: API_URL,
      method: "post",
      data: {
        query: `{
          categoryList(filters:{}) {
              name
              children_count
              children {
                  id 
                  level
              }
          }
      }`,
      },
    });
  };