import {
  createContext,
  useState,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import API from "../api/axios";

export const AppContext = createContext();

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const key = `${action.item._id}-${action.item.selectedColor}-${action.item.selectedSize}`;

      const existing = state.find((i) => i.key === key);

      if (existing) {
        return state.map((i) =>
          i.key === key
            ? {
                ...i,
                qty: i.qty + 1,
              }
            : i,
        );
      }

      return [
        ...state,
        {
          ...action.item,
          key,
          qty: 1,
        },
      ];
    }

    case "REMOVE":
      return state.filter((i) => i.key !== action.key);

    case "UPDATE_QTY":
      return state
        .map((i) =>
          i.key === action.key
            ? {
                ...i,
                qty: action.qty,
              }
            : i,
        )
        .filter((i) => i.qty > 0);

    case "SET_CART":
      return action.items;

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState([]);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  // AUTO LOGIN FROM TOKEN
  useEffect(() => {
    loadProducts();

    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const { data } = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser({
          ...data,
          avatar: data.name?.[0]?.toUpperCase() || "U",
        });

        await loadCart();

        await loadOrders();

        await loadWishlist();

        // console.log("Wishlist loaded after login");
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    loadUser();
  }, []);

  // AUTO LOAD CART
  const loadCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data.cart?.items) return;

      dispatch({
        type: "SET_CART",
        items: data.cart.items.map((item) => ({
          _id: item.product._id,
          cartItemId: item._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          selectedColor: item.color,
          selectedSize: item.size,
          qty: item.qty,
          key: `${item.product._id}-${item.color}-${item.size}`,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // LOAD ORDER

  async function loadOrders() {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const { data } = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadWishlist() {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const { data } = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Wishlist API response:", data);

      setWishlist(data.wishlist.map((product) => product._id));
    } catch (error) {
      console.error(error);
    }
  }

  // LOGIN
  async function login(email, password) {
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      setUser({
        ...data.user,
        avatar: data.user.name[0].toUpperCase(),
      });

      await loadCart();

      await loadOrders();

      await loadWishlist(); 

      showToast("Logged in successfully");
      return true;
    } catch (error) {
      console.error(error);

      showToast(error.response?.data?.message || "Login failed", "error");

      return false;
    }
  }

  // REGISTER
  async function register(name, email, password) {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      return await login(email, password);
    } catch (error) {
      console.error(error);

      showToast(
        error.response?.data?.message || "Registration failed",
        "error",
      );

      return false;
    }
  }

  // LOGOUT
  function logout() {
    localStorage.removeItem("token");

    setUser(null);

    setWishlist([]);

    dispatch({
      type: "CLEAR",
    });

    showToast("Logged out");
  }

  // CART
  async function addToCart(product, selectedColor, selectedSize) {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please login first", "error");
      return;
    }

    try {
      await API.post(
        "/cart/add",
        {
          productId: product._id,
          qty: 1,
          color: selectedColor,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await loadCart();

      showToast(`${product.name} added to cart`);
    } catch (error) {
      console.error(error);

      showToast("Failed to add item", "error");
    }
  }

  async function updateCartItem(productId, qty) {
    const token = localStorage.getItem("token");

    try {
      await API.put(
        `/cart/update/${productId}`,
        { qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await loadCart();
    } catch (error) {
      console.error(error);

      showToast("Failed to update cart", "error");
    }
  }

  async function removeCartItem(productId) {
    const token = localStorage.getItem("token");

    try {
      await API.delete(`/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await loadCart();
    } catch (error) {
      console.error(error);

      showToast("Failed to remove item", "error");
    }
  }
  // ORDER
  async function placeOrder(shippingInfo) {
    const token = localStorage.getItem("token");

    try {
      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      }));

      const { data } = await API.post(
        "/orders",
        {
          orderItems,
          shippingAddress: shippingInfo,
          totalPrice: cartTotal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await API.delete("/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "CLEAR",
      });

      showToast("Order placed successfully! 🎉");

      return data.order;
    } catch (error) {
      console.error(error);

      showToast(
        error.response?.data?.message || "Failed to place order",
        "error",
      );

      return null;
    }
  }
  async function loadProducts() {
    try {
      const { data } = await API.get("/products");

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  }
  // WISHLIST
  async function toggleWishlist(productId) {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please login first", "error");
      return;
    }

    try {
      const { data } = await API.post(
        "/wishlist/toggle",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWishlist(data.wishlist);
    } catch (error) {
      console.error(error);

      showToast("Failed to update wishlist", "error");
    }
  }
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        products,
        cart,
        dispatch,
        updateCartItem,
        removeCartItem,
        cartCount,
        cartTotal,
        orders,
        loadOrders,
        placeOrder,
        wishlist,
        toggleWishlist,
        addToCart,
        showToast,
        toast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
