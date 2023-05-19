import { API_URL, headers } from "./config";

export const magentoSetShippingAddressOnCart = async (id, address) => {

  const query = {
    operationName: "setShippingAddressOnCart",
    query: `mutation {
        setShippingAddressesOnCart(
          input: {
            cart_id: "${id}"
            shipping_addresses: [
              {
                address: {
                    firstname: "${address.firstname}"
                    lastname: "${address.lastname}"
                    street: ["${address.street}"]
                    city: "${address.city}"
                  region:"${address.region.region}"

                  telephone: "${address.telephone}"
                  postcode: "${address.postcode}"
                  country_code: ${address.country_code}
                  save_in_address_book: false
                },
              }
            ]
          }
        ) {
          cart {
            shipping_addresses {
              firstname
              lastname
              street
              city
              region {
                code
                label
              }
              postcode
              telephone
              country {
                code
                label
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

    return {
      response,
      status: response.errors ? response.errors[0] : "success",
    };
  } catch (error) {
    console.log(error);
  }
};
