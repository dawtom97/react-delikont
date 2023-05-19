import { API_URL, headers } from "./config";

export const magentoGetCart = async () => {
  const query = {
    operationName: "createCart",
    query: `
        query {
            customerCart {
              id
              prices {
                grand_total{
                  value
                  currency
                }
             
        
              }
              
        
              items {
                id
                uid
              
                product {
                  id
                  url_key
                  name
                  sku
                  uid
                  format
                  format_ceny
                  ciezar_w_jednostkach
                  stock_status
                  only_x_left_in_stock
                  meta_keyword
                  meta_description
                  special_price
                  special_from_date
                  special_to_date
                  attribute_set_id
                  manufacturer
                  canonical_url
                  description {
                    html
                  }
                  short_description {
                    html
                  }
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
                  new_from_date
                  new_to_date
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
                  options_container
                  created_at
                  updated_at
                  country_of_manufacture
                  type_id
                  websites {
                    id
                    name
                    code
                    sort_order
                    default_group_id
                    is_default
                  }
                  product_links {
                    sku
                    link_type
                    linked_product_sku
                    linked_product_type
                    position
                  }
                  media_gallery {
                    url
                    label
                    position
                    disabled
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
                  gift_message_available
                  url_rewrites {
                    parameters {
                      name
                      value
                    }
                  }
                  related_products {
                    id
                    name
                    sku
                  }
                  upsell_products {
                    id
                    name
                    sku
                  }
                  crosssell_products {
                    id
                    name
                    sku
                  }
                  categories {
                    id
                    url_key
                    name
                    position
                    is_anchor
                    url_suffix
                    description
                    display_mode
                    meta_keywords
                    path_in_store
                    default_sort_by
                    meta_description
                    custom_layout_update_file
                    available_sort_by
                    products {
                      items {
                        id
                        sku
                      }
                    }
                    cms_block {
                      title
                      content
                      identifier
                    }
                  }
                }
                quantity
              }
            }
          }
        `,
  };
  const options = {
    method: "POST",
    headers: {
      ...headers,
      Authorization: "Bearer " + localStorage.getItem("Bearer"),
    },
    body: JSON.stringify(query),
  };
  try {
    const response = await (await fetch(API_URL, options)).json();
    return {
      response,
      status: response.errors ? response.errors[0] : "success",
    };
  } catch (error) {
    console.log(error);
  }
};
