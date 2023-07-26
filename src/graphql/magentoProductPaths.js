import { API_URL, headers, PRODUCTS_PER_PAGE } from "./config";

export const magentoProductPaths = async () => {
  const query = {
    operationName: "fetchProducts",
    query: `query fetchProducts {
        products(search: "",pageSize:10000) {
            page_info{
               total_pages
               current_page
            }
            items {
              id
              url_key
              name
              sku        
            }
          }
    }`,
  };

  const options = {
    method: "post",
    headers,
    body: JSON.stringify(query),
  };

  const response = await (await fetch(API_URL, options)).json();

  return response.data;
};