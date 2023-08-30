import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { magentoAddToCart } from "../graphql/magentoAddToCart";
import { magentoAddToWishlist } from "../graphql/magentoAddToWishlist";
import { magentoCategories } from "../graphql/magentoCategories";
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
import { magentoFeaturedInCategory } from "../graphql/magentoFeaturedInCategory";
import { Loader } from "../components/Loader";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const location = useRouter();
  const [wishlist, setWishlist] = useState();
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState();
  const [orders, setOrders] = useState();
  const [categories, setCategories] = useState([]);
  const [featuredInCategory, setFeaturedInCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    magentoCategories().then((res) => setCategories(res.category.children));
    magentoFeaturedInCategory().then((res) =>
      setFeaturedInCategory(res.products.items)
    );
  }, []);

  useEffect(() => {
    const isBlockedPage =
      // (router.pathname.includes("/podsumowanie") && !isLogged) ||
      router.pathname.includes("/konto") && !isLogged;

    if (isBlockedPage) {
      //router.push("/");
    }
  }, [isLogged, router]);

  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    const email = localStorage.getItem("Email");
    const pass = localStorage.getItem("Password");
    if (email && pass) {
      userLogin({ email: email, password: pass });
    } else {
      console.log("nie mogę zalogować");
    }
  }, []);

  useEffect(() => {
    setWishlist(currentUser?.wishlist);
  }, [currentUser]);

  useEffect(() => {
    setAddresses(currentUser?.addresses);
  }, [currentUser]);

  useEffect(() => {
    setOrders(currentUser?.orders);
  }, [currentUser]);

  const userLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("Email");
    localStorage.removeItem("Password");
    setCurrentUser({});
    setCart();
    location.push("/");
    showModal("Pomyślnie wylogowano");
  };

  const updateUserInfo = (user) => {
    setIsLoading(true);
    magentoUpdateUser(user)
      .then(({ response }) => {
        setCurrentUser({
          addresses,
          wishlist,
          ...response.data.updateCustomer.customer,
        });
        setIsLoading(false);
      })
      .finally(() => showModal("Zaktualizowano dane"));
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
      localStorage.setItem("Email", data.email);
      localStorage.setItem("Password", data.password);
      await magentoLogin().then(({ response }) => {
        setCurrentUser(response.data.customer);
        setAddresses(response.data.customer.addresses);
        showModal("Pomyślnie zalogowano");
      });

      await magentoGetCart().then(({ response }) =>
        setCart(response.data.customerCart)
      );

      setIsLogged(true);
      router.pathname.includes("/zarejestruj") && location.push("/");
    } catch (error) {
      // Tymczasowe sprawdzenie lokalizacji bo wchodziły dwa modale, z kontekstu i auth w momencie rejestracji
      location.pathname === "/" &&
        showModal("Niepoprawne hasło lub adres email", true);
    }
  };

  const editAddress = (address) => {
    setIsLoading(true);
    magentoEditCustomerAddress(address)
      .then((res) => {
        setAddresses((prev) => [
          ...prev.filter(
            (ad) =>
              ad.default_billing !==
                res.response.data.updateCustomerAddress.default_billing ||
              ad.default_shipping == ad.default_billing
          ),
          res.response.data.updateCustomerAddress,
        ]);
        setIsLoading(false);
      })
      .finally(() => showModal("Zaktualizowano adres"));
  };

  const editAdditionalAddress = (address) => {
    setIsLoading(true);
    magentoEditCustomerAddress(address)
      .then(({ response }) => {
        setAddresses((prev) => [
          ...prev.filter(
            (ad) =>
              (ad.default_shipping == ad.default_billing &&
                ad.id !== response.data.updateCustomerAddress.id) ||
              ad.default_shipping !== ad.default_billing
          ),
          response.data.updateCustomerAddress,
        ]);
        setIsLoading(false);
      })
      .finally(() => showModal("Zaktualizowano adres"));
  };

  const createAddress = (address) => {
    setIsLoading(true);
    magentoCreateCustomerAddress(address)
      .then(({ response }) => {
        setAddresses((prev) => [...prev, response.data.createCustomerAddress]);
        setIsLoading(false);
      })
      .finally(() => showModal("Dodano nowy adres"));
  };

  const deleteAddress = (id) => {
    setIsLoading(true);
    magentoDeleteAddress(id)
      .then(({ response }) => {
        setAddresses((prev) => [
          ...prev.filter((address) => address.id !== id),
        ]);
        setIsLoading(false);
      })
      .finally(() => showModal("Usunięto adres"));
  };

  const changeDefaultShippingAddress = (id) => {
    setIsLoading(true);
    magentoSetDefaultShipping(id)
      .then(({ response }) => {
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
        setIsLoading(false);
      })
      .finally(() => showModal("Zmieniono domyślny adres dostawy"));
  };

  const addToWishlist = (sku) => {
    console.log(sku);
    magentoAddToWishlist(sku).then((res) => {
      setWishlist(res?.addProductsToWishlist.wishlist);
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

  const addToCart = (sku, quantity) => {
    if (currentUser) {
      setIsLoading(true);
      magentoAddToCart(cart.id, sku, quantity).then(({ response }) => {
        console.log(response, cart.id, quantity);
        if (response.data?.addProductsToCart?.user_errors?.length > 0) {
          showModal("Niewystarczająca ilość w magazynie");
        } else {
          setCart(response.data?.addProductsToCart.cart);
          showModal("Dodano do koszyka");
        }
        setIsLoading(false);
      });
    } else {
      showModal("Zaloguj się aby dodać do koszyka");
    }
  };

  const removeFromCart = (id) => {
    setIsLoading(true);

    magentoRemoveFromCart(cart.id, id)
      .then(({ response }) => {
        setCart(response.data.removeItemFromCart.cart);
        setIsLoading(false);
      })
      .finally(() => showModal("Usunięto z koszyka"));
  };
  const updateCartQuantity = (uid, quantity) => {
    setIsLoading(true);
    magentoUpdateCartQuantity(cart.id, uid, quantity).then(({ response }) => {
      // sprawdzenie czy jest w magazynie - do dopracowania
      try {
        setCart(response.data.updateCartItems.cart);
        showModal("Zaktualizowano koszyk");
      } catch (e) {
        console.log(e, response);
        showModal("Niewystarczająca ilość w magazynie");
      } finally {
        setIsLoading(false);
      }
    });
  };

  const removeCart = () => setCart();

  const user = {
    token,
    isLogged,
    currentUser,
    wishlist,
    addresses,
    cart,
    orders,
    categories,
    userLogin,
    removeCart,
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
    featuredInCategory,
  };

  return (
    <UserContext.Provider value={user}>
      {children}
      {isLoading ? (
        <div className="alternative-loader">
          <Loader />
        </div>
      ) : null}
    </UserContext.Provider>
  );
};
