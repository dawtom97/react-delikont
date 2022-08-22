import { API_URL, headers } from "./config";

export const magentoCreateCustomerAddress = async () => {
  const query = {
    operationName: "createCustomerAddress",
    query: `mutation {
            createCustomerAddress(input: {
              region: {
                region: "Silesia"
                region_id: 23
              }
              country_code: PL
              street: ["123 Main Street"]
              telephone: "7777777777"
              postcode: "77777"
              city: "Phoenix"
              firstname: "Bob"
              lastname: "Loblaw"
              default_shipping: true
              default_billing: false

            }) {
              id
              region {
                region
                region_id
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

  console.log(options.headers.Authorization)

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
