import { API_URL, headers } from "./config";

export const magentoSetShippingMethodOnCart = async (id) => {
  const query = {
    operationName: "setShippingMethodOnCart",
    query: `mutation {
            setShippingMethodsOnCart(
              input: {
                cart_id: "${id}",
                shipping_methods: [
                  {
                    carrier_code: "flatrate"
                    method_code: "flatrate"
                  }
                ]
              }
            ) {
              cart {
                shipping_addresses {
                  selected_shipping_method {
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                    amount {
                      value
                      currency
                    }
                  }
                }
              }
            }
          }`,
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
    console.log(response);
    return {
      response,
      status: response.errors ? response.errors[0] : "success",
    };
  } catch (error) {
    console.log(error);
  }
};
