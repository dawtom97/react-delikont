import { API_URL, headers } from "./config";

export const magentoCountryQuery = async (code) => {
  const query = {
    operationName: "countryQuery",
    query: `query ($code:String = "${code}"){
            country(id: $code) {
                id
                two_letter_abbreviation
                three_letter_abbreviation
                full_name_locale
                full_name_english
                available_regions {
                    id
                    code
                    name
                }
            }
        }`,
  };

  const options = {
    method:"post",
    headers,
    body:JSON.stringify(query)
  };

  try {
    const response = await(await fetch(API_URL,options)).json();
    return response.data
  } catch (error) {
    console.log(error)
  }

};
