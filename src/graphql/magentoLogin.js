import { API_URL,headers } from "./config";


export const magentoLogin = async () => {
    const query = {
        operationName:"loginUser",
        query: `query {
            customer {
                firstname
                lastname
                email
                wishlist {
                    id
                    items_count
                    sharing_code
                    updated_at
                    items {
                      id
                      qty
                      description
                      added_at
                      product {
                        sku
                        name
                        id
                      }
                    }
                  }
            }
        }`,
    }
    const options = {
        method:"POST",
        headers:{
            ...headers,
            'Authorization': 'Bearer ' + localStorage.getItem("Bearer")
        },
        body: JSON.stringify(query)
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
