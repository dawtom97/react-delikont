import { API_URL, headers } from "./config";

export const magentoEditCustomerAddress = async (props) => {
  const query = {
    operationName: "editCustomerAddress",
    query: `mutation {
            updateCustomerAddress(id:${props.id}, input: {
              region: {
                region: "${props.region}" 
              }
              firstname: "${props.firstname}",
              lastname:"${props.lastname}"
              country_code: ${props.country_code}
              street: ["${props.street}"]
              telephone: "${props.telephone}"
              postcode: "${props.postcode}"
              city: "${props.city}"
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
      'Authorization': "Bearer " + localStorage.getItem("Bearer"),
    },
    body: JSON.stringify(query),
  };
  try {
    const response = await (await fetch(API_URL, options)).json();
    console.log(response)
    return {
      response,
      status: response.errors ? response.errors[0] : "success",
    };
  } catch (error) {
    console.log(error);
  }
};
