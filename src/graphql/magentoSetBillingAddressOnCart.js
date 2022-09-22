import { API_URL, headers } from "./config";

export const magentoSetBillingAddressOnCart = async (id, address) => {
    console.log("tuta",address)
  const query = {
    operationName: "setBillingAddressOnCart",
    query: `
        mutation {
            setBillingAddressOnCart(
              input: {
                cart_id: "${id}"
                billing_address: {
                  address: {
                    firstname: "${address.firstname}"
                    lastname: "${address.lastname}"
                    street: ["${address.street}"]
                    city: "${address.city}"
                  region: "${address.region.region}"
                  telephone: "${address.telephone}"
                  postcode: "${address.postcode}"
                  country_code: ${address.country_code}
                  save_in_address_book: false
                  }
                  same_as_shipping: false
                }
              }
            ) {
              cart {
                billing_address {
                  firstname
                  lastname
                  company
                  street
                  city
                  region{
                    code
                    label
                  }
                  postcode
                  telephone
                  country{
                    code
                    label
                  }
                }
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
    console.log(response);
    return {
      response,
      status: response.errors ? response.errors[0] : "success",
    };
  } catch (error) {
    console.log(error);
  }
};
