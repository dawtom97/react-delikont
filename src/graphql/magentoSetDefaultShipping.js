import { API_URL, headers } from "./config";

export const magentoSetDefaultShipping = async (id) => {
  const query = {
    operationName: "editCustomerAddress",
    query: `mutation {
            updateCustomerAddress(id:${id}, input: {
              default_shipping: true
            }) {
              id
              region {
                region         
              }
              country_code
              street
              telephone
              postcode
              city
              firstname
              lastname
              default_shipping
              default_billing
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
