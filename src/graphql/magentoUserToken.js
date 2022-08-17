import { API_URL,headers } from "./config";


export const magentoUserToken = async (email,password) => {
    const query = {
        operationName:"fetchUser",
        query: `mutation fetchUser($email:String = "${email}", $password:String = "${password}") {
            generateCustomerToken(
                email: $email,
                password:$password
            ) {
                token
            }
        }`,
        variables:{}
    }
    const options = {
        method:"POST",
        headers,
        body: JSON.stringify(query)
    }
    try {
        const response = await(await fetch(API_URL,options)).json();
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
  
};

