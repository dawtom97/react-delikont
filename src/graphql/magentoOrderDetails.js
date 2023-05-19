import { API_URL,headers } from "./config";

export const magentoOrderDetails = async (number) => {
  const query = {
    operationName:"orderDetails",
    query: `
    {
        customer {
          orders(filter: {number: {eq: "${number}"}}) {
            total_count
            items {
              id
              number
              order_date
              status
              items {
                product_name
                product_sku
                product_url_key
                product_sale_price {
                  value
                }
                product_sale_price {
                  value
                  currency
                }
                quantity_ordered
                quantity_invoiced
                quantity_shipped
              }
              carrier
              shipments {
                id
                number
                items {
                  product_name
                  quantity_shipped
                }
              }
              total {
                base_grand_total {
                  value
                  currency
                }
                grand_total {
                  value
                  currency
                }
                total_tax {
                  value
                }
                subtotal {
                  value
                  currency
                }
                taxes {
                  amount {
                    value
                    currency
                  }
                  title
                  rate
                }
                total_shipping {
                  value
                }
                shipping_handling {
                  amount_including_tax {
                    value
                  }
                  amount_excluding_tax {
                    value
                  }
                  total_amount {
                    value
                  }
                  taxes {
                    amount {
                      value
                    }
                    title
                    rate
                  }
                }
                discounts {
                  amount {
                    value
                    currency
                  }
                  label
                }
              }
            }
          }
        }
      }
    `
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