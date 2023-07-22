import { API_URL, headers } from "./config";

export const magentoFeaturedInCategory = async () => {
  const query = {
    operationName: "fetchProducts",
    query: `query fetchFeaturedInCategoryProducts {
        products(filter:{featured_in_category:{eq:1}}) {
            page_info{
               total_pages
               current_page
            }
            items {
              id
              url_key
              name
              sku
              format
              format_ceny
              ciezar_w_jednostkach
              featured_in_category
              featured_product
              stock_status
              attribute_set_id
              manufacturer
              image {
                url
                label
                position
                disabled
              }
              small_image {
                url
                label
                position
                disabled
              }
              thumbnail {
                url
                label
                position
                disabled
              }
              price_tiers {
                quantity
                discount {
                  percent_off
                  amount_off
                }
                final_price {
                  value
                  currency
                }
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
                  discount {
                    amount_off
                    percent_off
                  }
                  fixed_product_taxes {
                    label
                    amount {
                      value
                      currency
                    }
                  }
                }
              }
              url_rewrites {
                parameters {
                  name
                  value
                }
              }
              categories {
                id
                url_key
                name
                position
                is_anchor
                url_suffix
                products {
                  items {
                    id
                    sku
                  }
                }
              }
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
