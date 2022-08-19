import { API_URL, headers } from "./config";

export const magentoRemoveFromWishlist = async (productId, wishlistId) => {
  const query = {
    operationName: "removeFromWishlist",
    query: `mutation ($productId:ID! = "${productId}", $wishlistId: ID! = "${wishlistId}"){
            removeProductsFromWishlist(
            wishlistId: $wishlistId
            wishlistItemsIds: [
              $productId
            ]){
              wishlist {
                id
                items_count
                  items {
                    id
                    product {
                      uid
                      id
                      name
                      sku
                      price_range {
                        minimum_price {
                          regular_price  {
                            currency
                            value
                          }
                        }
                        maximum_price {
                          regular_price {
                            currency
                            value
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
          }`,
  };
  const options = {
    method: "post",
    headers: {
      ...headers,
      Authorization: "Bearer " + localStorage.getItem("Bearer"),
    },
    body: JSON.stringify(query),
  };

  const response = await (await fetch(API_URL, options)).json();

  return response;
};
