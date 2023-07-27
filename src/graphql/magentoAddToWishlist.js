import { API_URL,headers } from "./config";



export const magentoAddToWishlist = async (sku) => {
    const query = {
        operationName:"addToWishlist",
        query: `mutation ($sku:String = "${sku}") {
            addProductsToWishlist(
              wishlistId: 0
              wishlistItems: [
                { sku: $sku, quantity: 1 }
              ]
            ) {
              wishlist {
                id
                items_count
                items {
                  id
                  qty
                  cytax
                  product {
                    url_key
                    id
                    format
                    format_ceny
                    ciezar_w_jednostkach
                    featured_in_category
                    featured_product 
                    name
                    sku
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
                }
              }
              user_errors {
                code
                message
              }
            }
          }`
    };

    const options = {
        method:"post",
        headers: {
            ...headers,
            'Authorization': 'Bearer ' + localStorage.getItem("Bearer")
        },
        body:JSON.stringify(query)
    }

    const response = await (await fetch(API_URL,options)).json();

    return response.data;

}