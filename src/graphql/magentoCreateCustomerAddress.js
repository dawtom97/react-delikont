import { API_URL, headers } from "./config";

export const magentoCreateCustomerAddress = async (props,isShipping = false, isBilling = false) => {
  console.log(props);
  const query = {
    operationName: "createCustomerAddress",
    query: `mutation {
            createCustomerAddress(input: {
              region: {
                region: "${props.region}"  
              }
              country_code: ${props.country_code}
              street: ["${props.street}"]
              telephone: "${props.telephone}"
              postcode: "${props.postcode}"
              city: "${props.city}"
              firstname: "${props.firstname}"
              lastname: "${props.lastname}"
              default_shipping: ${isShipping}
              default_billing: ${isBilling}

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
