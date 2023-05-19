import { API_URL,headers } from "./config";

export const magentoRegister = async (props) => {


  const query = {
    operationName:"registerUser",
    query: ` mutation {
      createCustomer(
        input: {
          firstname: "${props.firstname}"
          lastname: "${props.lastname}"
          email: "${props.email}"
          password: "${props.password}"
  
        }
      ) {
        customer {
          firstname
          lastname
          email
        }
      }
    }` ,
  }
  const options = {
    method:"POST",
    headers,
    body:JSON.stringify(query)
  }

  try {
    const response = await(await fetch(API_URL,options)).json();
  

    return {
      response,
      status: response.errors ? response.errors[0] : 'success'
    };
  } catch (error) {
    console.log(error)
  }

};
