
import { API_URL, headers } from "./config";

export const magentoUpdateUser = async (props) => {
//  console.log(props, "props")
  const query = {
    operationName: "editCustomer",
    query: `mutation {
            updateCustomer(
              input: {
                firstname: "${props.firstname}"
                lastname: "${props.lastname}"
              }
            ) {
              customer {
                firstname
                lastname
                email
              }
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
    const response = await (await fetch(API_URL, options)).json();;
    return {
      response,
      status: response.errors ? response.errors[0] : "success",
    };
  } catch (error) {
    console.log(error);
  }
};
