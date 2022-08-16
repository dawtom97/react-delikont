import axios from "axios";

export const magentoRegister = (props) => {
  axios({
    url: API_URL,
    method: "post",
    data: {
      mutation: `{
            createCustomer(
              input: {
                firstname: ${props.name}
                lastname: ${props.lastname}
                email: ${props.email}
                password: ${props.password}
                is_subscribed: ${props.is_subscribed}
              }
            ) {
              customer {
                firstname
                lastname
                email
                is_subscribed
              }
            }
          }`,
    },
  });
};
