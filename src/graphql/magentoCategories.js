import { API_URL,headers } from "./config";

export const magentoCategories = async () => {

  const query = {
    oparationName: "fetchCategories",
    query: ` query fetchCategories {
        categoryList(filters:{}) {
            name
            children_count
            children {
                id 
                level
            }
        }
    }`,
    variables: {}
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(query)
  }

  const response = await(await fetch(API_URL,options)).json();
  return response.data;

};






// headers: {
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
// },


  // const result = await axios({
  //   url: API_URL,
  //   method: "post",
  //   withCredentials: false,
  //   data: {
  //     query: `{
  //         categoryList(filters:{}) {
  //             name
  //             children_count
  //             children {
  //                 id 
  //                 level
  //             }
  //         }
  //     }`,
  //   },
  // });
  // const data = result.data;
  // return data;