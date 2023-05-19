import { API_URL, headers } from "./config";

export const magentoDeleteAddress = async (id) => {
  const query = {
    operationName: "deleteCustomerAddress",
    query: `mutation {
            deleteCustomerAddress(id:${id})
            
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
