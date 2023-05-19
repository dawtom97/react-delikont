import { API_URL, headers } from "./config";

export const magentoGetPage = async (identifier) => {
  const query = {
    operationName: "getPage",
    query: `
    query {
        cmsPage(identifier: "${identifier}") {
          identifier
          url_key
          title
          content
          content_heading
          page_layout
          meta_title
          meta_description
          meta_keywords
        }
      }
    `
  };
  const options = {
    method:"post",
    headers,
    body: JSON.stringify(query)
  };

  const response = await (await fetch(API_URL,options)).json();

  return response.data
};
