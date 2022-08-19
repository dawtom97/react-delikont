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
                  product {
                    name
                    sku
                    id
                    image {
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

    return response;

}