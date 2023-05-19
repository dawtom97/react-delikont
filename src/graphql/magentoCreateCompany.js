import { API_URL, headers } from "./config";

export const magentoCreateCompany = async (props) => {
  const query = {
    operationName: "createCompany",
    query: `mutation {
            createCompany(input: {
              company_name: "${props.company_name}"
              company_email:"${props.company_email}"
              company_admin: {
                email: "${props.company_email}"
                firstname: "${props.company_admin}"
                lastname:"${props.company_admin}"
              }
              legal_name: "${props.company_name}"
              legal_address: {
                street: [
                  "${props.company_street}"
                ]
                city: "${props.company_city}"
                region: {
                  region_code: "${props.company_region_code}"
                }
                postcode: "${props.company_postcode}"
                country_id: ${props.company_country_code}
                telephone: "${props.telephone}"
              }
            }){
              company {
                id
                name
                company_admin {
                  email
                  firstname
                  lastname
                }
                legal_address {
                  street
                  city
                  region {
                    region_code
                    region_id
                  }
                  postcode
                  telephone
                }
              }
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
   
    return {
      response,
      status: response.errors ? response.errors[0] : "success",
    };
  } catch (error) {
    console.log(error);
  }
};
