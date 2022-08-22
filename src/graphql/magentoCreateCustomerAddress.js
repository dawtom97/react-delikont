import { API_URL, headers } from "./config";

export const magentoCreateCustomerAddress = async (props) => {
  console.log(props);
  const query = {
    operationName: "createCustomerAddress",
    query: `mutation {
            createCustomerAddress(input: {
              region: {
                region: "${props.region.region}"
                region_id: "${props.region.region_id}"
              }
              country_code: ${props.country_code}
              street: ["${props.street}"]
              telephone: "${props.telephone}"
              postcode: "${props.postcode}"
              city: "${props.city}"
              firstname: "${props.firstname}"
              lastname: "${props.lastname}"
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

  console.log(options.headers.Authorization);

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
