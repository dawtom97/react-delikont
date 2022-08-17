import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { magentoLogin } from "../graphql/magentoLogin";
import { magentoUserToken } from "../graphql/magentoUserToken";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [errors, setErrors] = useState();
  const location = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("Bearer"));
    if (token) {
      magentoLogin().then((res) => setCurrentUser(res?.customer));
      setIsLogged(true);
    }
  }, [token]);

  const userLogout = () => {
    setIsLogged(false);
    localStorage.setItem("Bearer", "");
    setCurrentUser({});
    location.push("/");
  };

  const userLogin = async (data) => {
    try {
      const getToken = await magentoUserToken(data.email, data.password);
      localStorage.setItem("Bearer", getToken.generateCustomerToken.token);
      await magentoLogin().then((res) => setCurrentUser(res?.customer));
      setIsLogged(true);
      location.push("/moje-konto");
    } catch (error) {
      console.log(error);
      setErrors("Błędny email lub hasło");
    }
  };

  const user = {
    token,
    isLogged,
    currentUser,
    userLogin,
    userLogout,
    setCurrentUser,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
