import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { magentoAddToWishlist } from "../graphql/magentoAddToWishlist";
import { magentoEditCustomerAddress } from "../graphql/magentoEditUserAddress";
import { magentoLogin } from "../graphql/magentoLogin";
import { magentoRemoveFromWishlist } from "../graphql/magentoRemoveFromWishlist";
import { magentoUserToken } from "../graphql/magentoUserToken";
import { ModalContext } from "./ModalContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const location = useRouter();
  const [wishlist, setWishlist] = useState();
  const [addresses, setAddresses] = useState();
  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    setToken(localStorage.getItem("Bearer"));
    if (token) {
      magentoLogin().then(({ response }) => {
        setCurrentUser(response.data.customer);
        setAddresses(response.data.customer.addresses)
      });
      console.log(token)

      setIsLogged(true);
    }
  }, [token]);

  useEffect(() => {
    setWishlist(currentUser?.wishlist);
  }, [currentUser]);

  useEffect(() => {
    setAddresses(currentUser?.addresses);
  }, [currentUser]);

  const userLogout = () => {
    setIsLogged(false);
    localStorage.setItem("Bearer", "");
    setCurrentUser({});
    location.push("/");
    showModal("Pomyślnie wylogowano");
  };

  const userLogin = async (data) => {
    try {
      const getToken = await magentoUserToken(data.email, data.password);
      localStorage.setItem("Bearer", getToken.generateCustomerToken.token);
      await magentoLogin()
      .then(({ response }) => {
        setCurrentUser(response.data.customer);
       // setAddresses([response.data.customer.addresses]);
        showModal("Pomyślnie zalogowano");
      })   
      ;
      setIsLogged(true);
      location.push("/konto/moje-konto");
    } catch (error) {
      // Tymczasowe sprawdzenie lokalizacji bo wchodziły dwa modale, z kontekstu i auth w momencie rejestracji
      location.pathname === "/" &&
        showModal("Niepoprawne hasło lub adres email", true);
    }
  };

  const editAddress = (address) => {
    magentoEditCustomerAddress(address).then(res=>{
      setAddresses([...addresses.filter((ad) => ad.default_billing !== res.response.data.updateCustomerAddress.default_billing),res.response.data.updateCustomerAddress])
    });
    showModal("Zaktualizowano adres");
  };

  const addToWishlist = (sku) => {
    magentoAddToWishlist(sku).then((res) => {
      console.log(res);
      setWishlist(res.addProductsToWishlist.wishlist);
    });
    showModal("Dodano do ulubionych");
  };

  const removeFromWishlist = (id) => {
    // do dopracowania, może być sytuacja ze id produktu wishlisty pokryje się z id produktu w sklepie!
    const productStatus =
      wishlist &&
      wishlist?.items.find((item) => item.id === id || item.product.id === id);
    magentoRemoveFromWishlist(productStatus?.id, wishlist?.id).then((res) => {
      setWishlist(res.removeProductsFromWishlist.wishlist);
    });
    showModal("Usunięto z ulubionych");
  };

  const user = {
    token,
    isLogged,
    currentUser,
    wishlist,
    addresses,
    userLogin,
    userLogout,
    setCurrentUser,
    removeFromWishlist,
    addToWishlist,
    editAddress,
    setAddresses
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
