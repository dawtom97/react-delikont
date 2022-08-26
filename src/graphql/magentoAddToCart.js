import { API_URL,headers } from "./config";

export const magentoAddToCart = async (cartId,sku,quantity) => {
    const query = {
        operationName:"addToCart",
        query: `mutation {
            addProductsToCart(
              cartId: "${cartId}"
              cartItems: [
                {
                  quantity: ${quantity}
                  sku: "${sku}"
                }
              ]
            ) {
              cart {
                items {
                  product {
                    name
                    sku
                  }
                  quantity
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