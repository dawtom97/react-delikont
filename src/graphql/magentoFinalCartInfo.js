import { API_URL,headers } from "./config";

export const magentoFinalCartInfo = async(id) => {
    const query = {
        operationName:"finalCartInfo",
        query: `
        {
            cart(cart_id: "${id}") {
              email
              billing_address {
                city
                country {
                  code
                  label
                }
                firstname
                lastname
                postcode
                region {
                  code
                  label
                }
                street
                telephone
              }
              shipping_addresses {
                firstname
                lastname
                street
                city
                postcode
                region {
                  code
                  label
                }
                country {
                  code
                  label
                }
                telephone
                available_shipping_methods {
                  amount {
                    currency
                    value
                  }
                  available
                  carrier_code
                  carrier_title
                  error_message
                  method_code
                  method_title
                  price_excl_tax {
                    value
                    currency
                  }
                  price_incl_tax {
                    value
                    currency
                  }
                }
                selected_shipping_method {
                  amount {
                    value
                    currency
                  }
                  carrier_code
                  carrier_title
                  method_code
                  method_title
                }
              }
              items {
                id
                product {
                  name
                  sku
                }
                quantity
                errors {
                  code
                  message
                }
              }
              available_payment_methods {
                code
                title
              }
              selected_payment_method {
                code
                title
              }
              applied_coupons {
                code
              }
              prices {
                grand_total {
                  value
                  currency
                }
                subtotal_excluding_tax {
                  value
                }
                subtotal_including_tax {
                  value
                }
                applied_taxes {
                  label
                  amount {
                    value
                  }
                }
              }
            }
          }`
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
}