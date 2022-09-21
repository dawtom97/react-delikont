import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { magentoAddToCart } from "../graphql/magentoAddToCart";
import { magentoAddToWishlist } from "../graphql/magentoAddToWishlist";
import { magentoChangeUserPassword } from "../graphql/magentoChangeUserPassword";
import { magentoCreateCustomerAddress } from "../graphql/magentoCreateCustomerAddress";
import { magentoDeleteAddress } from "../graphql/magentoDeleteAddress";
import { magentoEditCustomerAddress } from "../graphql/magentoEditUserAddress";
import { magentoGetCart } from "../graphql/magentoGetCart";
import { magentoLogin } from "../graphql/magentoLogin";
import { magentoRemoveFromCart } from "../graphql/magentoRemoveFromCart";
import { magentoRemoveFromWishlist } from "../graphql/magentoRemoveFromWishlist";
import { magentoSetDefaultShipping } from "../graphql/magentoSetDefaultShipping";
import { magentoUpdateCartQuantity } from "../graphql/magentoUpdateCartQuantity";
import { magentoUpdateUser } from "../graphql/magentoUpdateUser";
import { magentoUserToken } from "../graphql/magentoUserToken";
import { ModalContext } from "./ModalContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const location = useRouter();
  const [wishlist, setWishlist] = useState();
  const [addresses, setAddresses] = useState();
  const [cart, setCart] =useState();

  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    setToken(localStorage.getItem("Bearer"));
    if (token) {
      magentoLogin().then(({ response }) => {
        console.log(response,currentUser)
        setCurrentUser(response.data.customer);
        setAddresses(response.data.customer?.addresses);
      })
      .catch(er => {
          console.log(er,"CATCHED")       
      }) 
      ;
      magentoGetCart().then(({response})=>setCart(response.data?.customerCart));
      setIsLogged(true);
    } 
    else {
    //  userLogout()
    }

    console.log("Jest token",token)
  }, [token]);

  useEffect(() => {
    setWishlist(currentUser?.wishlist);
  }, [currentUser]);

  useEffect(() => {
    setAddresses(currentUser?.addresses);
  }, [currentUser]);

  const userLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("Bearer");
    setCurrentUser({});
    setCart();
    location.push("/");
    showModal("Pomyślnie wylogowano");
  };

  
  const updateUserInfo = (user) => {
    magentoUpdateUser(user).then(({ response }) =>
      setCurrentUser({
        addresses,
        wishlist,
        ...response.data.updateCustomer.customer,
      })
    );
    showModal("Zaktualizowano dane");

  };
  const changeUserPassword = (passwords) => {
    magentoChangeUserPassword(passwords).then(({ response }) => {
      if (response.errors) {
        showModal("Podano błędne stare hasło");
      } else {
        showModal("Twoje hasło zostało zmienione");
      }
    });
  };

  const userLogin = async (data) => {
    try {
      const getToken = await magentoUserToken(data.email, data.password);
      localStorage.setItem("Bearer", getToken.generateCustomerToken.token);
      await magentoLogin().then(({ response }) => {
        setCurrentUser(response.data.customer);
        // setAddresses([response.data.customer.addresses]);
        showModal("Pomyślnie zalogowano");
      });

      await magentoGetCart().then(({response})=>setCart(response.data.customerCart));

      setIsLogged(true);
      location.push("/konto/moje-konto");
    } catch (error) {
      // Tymczasowe sprawdzenie lokalizacji bo wchodziły dwa modale, z kontekstu i auth w momencie rejestracji
      location.pathname === "/" &&
        showModal("Niepoprawne hasło lub adres email", true);
    }
  };


  const editAddress = (address) => {
    magentoEditCustomerAddress(address).then((res) => {
      setAddresses((prev) => [
        ...prev.filter(
          (ad) =>
            ad.default_billing !==
              res.response.data.updateCustomerAddress.default_billing ||
            ad.default_shipping == ad.default_billing
        ),
        res.response.data.updateCustomerAddress,
      ]);
    });
    showModal("Zaktualizowano adres");
  };

  const editAdditionalAddress = (address) => {
    magentoEditCustomerAddress(address).then(({ response }) => {
      setAddresses((prev) => [
        ...prev.filter(
          (ad) =>
            (ad.default_shipping == ad.default_billing &&
              ad.id !== response.data.updateCustomerAddress.id) ||
            ad.default_shipping !== ad.default_billing
        ),
        response.data.updateCustomerAddress,
      ]);
    });
    showModal("Zaktualizowano adres");
  };

  const createAddress = (address) => {
    magentoCreateCustomerAddress(address).then(({ response }) => {
      setAddresses((prev) => [...prev, response.data.createCustomerAddress]);
    });
    showModal("Dodano nowy adres");
  };

  const deleteAddress = (id) => {
    magentoDeleteAddress(id).then(({ response }) => {
      setAddresses((prev) => [...prev.filter((address) => address.id !== id)]);
    });
    showModal("Usunięto adres");
  };

  const changeDefaultShippingAddress = (id) => {
    magentoSetDefaultShipping(id).then(({ response }) => {
      const previous = addresses.filter((ad) => ad.default_shipping === true);
      previous[0].default_shipping = false;
      setAddresses((prev) => [
        ...prev.filter(
          (ad) =>
            (ad.default_shipping == ad.default_billing &&
              ad.id !== response.data.updateCustomerAddress.id) ||
            ad.default_shipping !== ad.default_billing
        ),
        response.data.updateCustomerAddress,
      ]);
    });

    showModal("Zmieniono domyślny adres dostawy");
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

  const addToCart = (sku,quantity) => {
    console.log(currentUser)
    if(currentUser) {
      magentoAddToCart(cart.id, sku,quantity).then(({response})=>setCart(response.data.addProductsToCart.cart));
      showModal("Dodano do koszyka");
    }
    else {
      showModal("Zaloguj się aby dodać do koszyka")
    } 
  }
  
  const removeFromCart = (id) => {
    magentoRemoveFromCart(cart.id,id).then(({response})=>setCart(response.data.removeItemFromCart.cart));
    showModal("Usunięto z koszyka");
  }
  const updateCartQuantity = (uid,quantity) => {
    console.log(cart.id)
    magentoUpdateCartQuantity(cart.id, uid, quantity).then(({response})=>setCart(response.data.updateCartItems.cart));
    showModal("Zaktualizowano koszyk")
  }


  const user = {
    token,
    isLogged,
    currentUser,
    wishlist,
    addresses,
    cart,
    userLogin,
    userLogout,
    setCurrentUser,
    removeFromWishlist,
    addToWishlist,
    editAddress,
    setAddresses,
    createAddress,
    deleteAddress,
    changeDefaultShippingAddress,
    editAdditionalAddress,
    updateUserInfo,
    changeUserPassword,
    addToCart,
    removeFromCart,
    updateCartQuantity,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
