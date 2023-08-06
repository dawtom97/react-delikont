import { API_URL, headers, PRODUCTS_PER_PAGE } from "./config";

export const magentoCategoryProducts = async (page, sort, category) => {
  console.log(page, sort, category);
  const query = {
    operationName: "fetchProducts",
    query: `query fetchProducts( $page:Int = ${page}) {
        products(search: "",pageSize:${PRODUCTS_PER_PAGE},currentPage:$page, sort: {${sort.type}:${sort.mode}}) 
    {
        page_info{
          total_pages
          current_page
       }
       items {
         id
         url_key
         name
         cytax
         sku
         cartequantity
         format
         format_ceny
         ciezar_w_jednostkach
         featured_in_category
         featured_product
         stock_status
         only_x_left_in_stock
         meta_keyword
         meta_description
         attribute_set_id
         manufacturer
         canonical_url
         image {
           url
           label
           position
           disabled
         }
         ... on PhysicalProductInterface {
           weight
         }
         price_range {
           minimum_price {
             regular_price {
               value
               currency
             }
             final_price {
               value
               currency
             }
             fixed_product_taxes {
               label
               amount {
                 value
                 currency
               }
             }
           }
           maximum_price {
             fixed_product_taxes {
               label
               amount {
                 value
                 currency
               }
             }
           }
         }

         categories {
           id
           url_key
           name
           products {
             items {
               id
               sku
             }
           }
         }}
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
