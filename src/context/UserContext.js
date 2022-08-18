import Router, { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { magentoLogin } from "../graphql/magentoLogin";
import { magentoUserToken } from "../graphql/magentoUserToken";
import { ModalContext } from "./ModalContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const location = useRouter();
  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    setToken(localStorage.getItem("Bearer"));
    if (token) {
      magentoLogin().then(({ response }) => {
        setCurrentUser(response.data.customer);
      });

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
      await magentoLogin().then(({ response }) => {
        setCurrentUser(response.data.customer);
        showModal("Pomyślnie zalogowano");
      });
      setIsLogged(true);
      location.push("/moje-konto");
    } catch (error) {
      // Tymczasowe sprawdzenie lokalizacji bo wchodziły dwa modale, z kontekstu i auth w momencie rejestracji
     location.pathname === "/" && showModal("Niepoprawne hasło lub adres email", true);
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
