import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    cartValue: "45.99"
  });

  const userLogout = () => setIsLogged(false);
  const userLogin = () => setIsLogged(true);

  const user = {
    isLogged,
    currentUser,
    userLogin,
    userLogout,
    setCurrentUser
  };

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};
