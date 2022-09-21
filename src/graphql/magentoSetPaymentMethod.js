import { API_URL, headers } from "./config";

export const magentoSetPaymentMethod = async (id) => {
  const query = {
    operationName: "setPaymentMethod",
    query:`
    mutation {
        setPaymentMethodOnCart(input: {
            cart_id: "${id}"
            payment_method: {
                code: "banktransfer"
            }
        }) {
          cart {
            selected_payment_method {
              code
              title
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
};
