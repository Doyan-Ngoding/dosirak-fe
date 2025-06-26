import axios from "axios";
import dayjs from "dayjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { useAuth } from "./AuthContext";
import { useRestaurant } from "./RestaurantContext";

const OrderContext = createContext(null);

const Order = ({ children }) => {
  const { authUser } = useAuth();

  const navigate = useNavigate();

  const [menuSearched, setMenuSearched] = useState();

  const [cart, setCart] = useLocalStorage("cart");
  const [selectedMenu, setSelectedMenu] = useState(cart ? cart : []);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [packingFee, setPackingFee] = useState(0);
  const [promo, setPromo] = useState(0);
  const [total, setTotal] = useState(0);
  const [formatAmount, setFormatAmount] = useLocalStorage("formatAmount");

  const [currStep, setCurrStep] = useState(1);

  const [orderMethod, setOrderMethod] = useState("IMMEDIATELY");
  const [editAbleAddress, setEditAbleAddress] = useState(false);
  const [addressUser, setAddressUser] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useLocalStorage("selectedDate");
  const [selectedTempDate, setSelectedTempDate] =
    useLocalStorage("selectedTempDate");
  const [selectedTempTime, setSelectedTempTime] =
    useLocalStorage("selectedTempTime");

  const [isLoading, setIsLoading] = useState(false);
  const [resMessageOrder, setResMessageOrder] = useState();

  const [orderTemp, setOrderTemp] = useLocalStorage("orderTemp");

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [activeKey, setActiveKey] = useState(0);

  const [resPayment, setResPayment] = useLocalStorage("resPayment");
  const [linkPayment, setLinkPayment] = useLocalStorage("linkPayment");
  const [newResPayment, setNewResPayment] = useLocalStorage("newResPayment");
  const [resCallback, setResCallback] = useLocalStorage("resCallback");
  const [resHistory, setResHistory] = useLocalStorage("resHistory");
  const [resOrder, setResOrder] = useLocalStorage("resOrder");

  const [selectedResto, setSelectedResto] = useLocalStorage("selectedResto");

  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [addressUserCurr, setAddressUserCurr] =
    useLocalStorage("addressUserCurr");
  const [messageAddress, setMessageAddress] = useState();

  const [resQuotationTemp, setResQuotationTemp] = useState();

  const [suggestionAddress, setSuggestionAddress] = useState([]);

  const [orderDetail, setOrderDetail] = useState();

  const addQty = (id, variant, size) => {
    if (variant && size) {
      setSelectedMenu((prevCart) =>
        prevCart.map((item) =>
          item.id === id && item.variant === variant && item.size === size
            ? {
                ...item,
                qty: item.qty + 1,
                subTotal: (item.qty + 1) * item.price,
              }
            : item
        )
      );
    } else {
      setSelectedMenu((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty + 1,
                subTotal: (item.qty + 1) * item.price,
              }
            : item
        )
      );
    }
  };

  const subQty = (id, variant, size) => {
    if (variant && size) {
      setSelectedMenu((prevCart) => {
        const updatedCart = prevCart
          .map((item) =>
            item.id === id && item.variant === variant && item.size === size
              ? {
                  ...item,
                  qty: item.qty - 1,
                  subTotal: (item.qty - 1) * item.price,
                }
              : item
          )
          .filter((item) => item.qty > 0);
        return updatedCart;
      });
    } else {
      setSelectedMenu((prevCart) => {
        const updatedCart = prevCart
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  qty: item.qty - 1,
                  subTotal: (item.qty - 1) * item.price,
                }
              : item
          )
          .filter((item) => item.qty > 0);
        return updatedCart;
      });
    }
  };

  const handleAddOrder = async () => {
    setIsLoading(true);
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    if (totalQty < 15) {
      setResMessageOrder(["error", "Minimum order is 15 items"]);
      return;
    }
    if (totalQty > 200) {
      setResMessageOrder(["error", "Maximum order is 200 items"]);
      return;
    }

    const resto = JSON.parse(localStorage.getItem("subRestoAddress"));
    const users = JSON.parse(localStorage.getItem("addressUserCurr"));
    await axios
      .post(`${import.meta.env.VITE_API_BE}/orders`, {
        user_id: authUser.id,
        detail_menus: selectedMenu || cart,
        pre_order: dayjs(selectedDate).format("YYYY-MM-DD HH:mm:ss"),
        amount: total,
        address_order: addressUserCurr.address,
        sub_restaurant_id: resto.id,
      })
      .then((res) => {
        setOrderTemp(res.data.order);
        setLinkPayment(res.data?.order?.invoice.payment_link_url);
        setTimeout(() => {
          setSelectedMenu();
          setSelectedDate();
          setSubTotal();
          setTotal();
          setPromo();
          localStorage.removeItem("cart");
          localStorage.removeItem("orderTemp");
          localStorage.removeItem("formatAmount");
          localStorage.removeItem("selectedDate");
          localStorage.removeItem("selectedTempDate");
          localStorage.removeItem("selectedTempTime");
          setIsLoading(false);
          setResPayment(res.data.order);
          navigate(`/payment?order=${res.data.order.id}`);
          localStorage.removeItem("formatAmount");
        }, 2000);
        // axios
        //   .post(`${import.meta.env.VITE_API_BE}/deliveries/quotation`, {
        //     orders_id: res.data.order?.id,
        //     scheduled_at: dayjs(selectedDate).format("YYYY-MM-DD HH:mm:ss"),
        //     service_type: "SEDAN",
        //     stop: [resto, users],
        //   })
        //   .then((resQuo) => {
        //     axios
        //       .post(`${import.meta.env.VITE_API_BE}/create-payment`, {
        //         customer_details: {
        //           id: authUser.id,
        //           name: authUser.name,
        //           // email: authUser.email,
        //           // phone: authUser.phone
        //         },
        //         item_details: res.data.order?.detailMenus.map((item) => ({
        //           description:
        //             item.name +
        //             (item.variant ? " - " + item.variant : "") +
        //             (item.size ? " - " + item.size : ""),
        //           quantity: item.qty,
        //           price: item.price,
        //           // item_id: item.id
        //         })),
        //         amount: formatAmount,
        //         payment_type: "payment_link",
        //         due_days: 1,
        //         notes: "dev",
        //         orders_id: res.data.order?.id,
        //       })
        //       .then((response) => {
        //         setIsLoading(false);
        //         setResPayment(response.data.data);
        //       });
        // .catch(error => {
        //     setIsLoading(false)
        //     setResMessageOrder(['error', error.response?.data?.message || "Failed to Make a payment!"])
        // })
        // });
        // .catch(err => {
        //     setIsLoading(false)
        //     setResMessageOrder(['error', err.response?.data?.message || "Failed to Make a quotation!"])
        // })
      });
    // .catch(err => {
    //     setIsLoading(false)
    //     setResMessageOrder(['error', err.response?.data?.message || "Failed to Make a Order!"])
    // })
  };

  const handleAddPayment = async () => {
    setIsLoading(true);
    await axios
      .post(`${import.meta.env.VITE_API_BE}/create-payment`, {
        customer_details: {
          id: authUser.id,
          name: authUser.name,
        },
        item_details: orderTemp.detailMenus.map((item) => ({
          description: item.name,
          quantity: item.qty,
          price: item.price,
          item_id: item.id,
        })),
        amount: formatAmount,
        payment_type: "payment_link",
        due_days: 1,
        notes: "tesnote",
      })
      .then((res) => {
        setIsLoading(false);
        setResPayment(res.data);
        setTimeout(() => {
          setSelectedMenu();
          setSelectedDate();
          setSubTotal();
          setTotal();
          setPromo();
          localStorage.removeItem("cart");
          localStorage.removeItem("orderTemp");
          localStorage.removeItem("formatAmount");
          navigate("/complete");
          localStorage.removeItem("formatAmount");
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        setResMessageOrder([
          "error",
          err.response?.data?.message || "Failed to Make a Order!",
        ]);
      });
  };

  const handleGetInvoice = async (id) => {
    setIsLoading(true);
    await axios
      .get(`${import.meta.env.VITE_API_BE}/invoices/${id}`)
      .then((res) => {
        setIsLoading(false);
        setNewResPayment(res.data.data);
        // console.log(res.data.data)
        axios
          .post(`${import.meta.env.VITE_URL_BE}/callback`, {
            order_id: res.data.data?.order_id,
            transaction_status: res.data.data?.status,
            fraud_status: "accept",
          })
          .then((response) => {
            setIsLoading(false);
            setResCallback(response.data.success);
            axios
              .post(`${import.meta.env.VITE_API_BE}/create-history`, {
                order_id: res.data.data?.orders_id,
                payment_method: res.data.data?.payment_type,
              })
              .then((responses) => {
                setResHistory(responses.data.data);
                setResOrder(responses.data.order[0]);
              })
              .catch((err) => {
                setResMessageOrder([
                  "error",
                  err.response?.data?.message || "Failed to create history!",
                ]);
              });
          })
          .catch((err) => {
            setIsLoading(false);
            setResMessageOrder([
              "error",
              err.response?.data?.message || "Failed to callback!",
            ]);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setResMessageOrder([
          "error",
          err.response?.data?.message || "Failed to get a Invoice!",
        ]);
      });
  };

  const validAddress = async (address) => {
    console.log("validAddress address", address);

    await axios
      .get(`https://us1.locationiq.com/v1/search.php`, {
        params: {
          key: import.meta.env.VITE_LOCATIONIQ_API_KEY,
          q: address,
          format: "json",
        },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setLongitude(res.data[0].lon);
          setLatitude(res.data[0].lat);
          setAddressUserCurr({
            coordinates: {
              lat: res.data[0].lat,
              lng: res.data[0].lon,
            },
            address: address,
          });
          setEditAbleAddress(false);
        }
      })
      .catch((err) => {
        setMessageAddress(["error", "Address is not valid!"]);
        setLatitude();
        setLongitude();
        localStorage.removeItem("addressUserCurr");
        setEditAbleAddress(true);
      });
  };

  const validAddress2 = async (lng, lat) => {
    await axios
      .get(`https://us1.locationiq.com/v1/reverse`, {
        params: {
          key: import.meta.env.VITE_LOCATIONIQ_API_KEY,
          lat: lat,
          lon: lng,
          format: "json",
        },
      })
      .then((res) => {
        // console.log(res.data);

        if (res.data) {
          setLongitude(res.data.lon);
          setLatitude(res.data.lat);
          setAddressUser(res.data.display_name);
          // console.log(res.data.display_name, 'disni');

          setAddressUserCurr({
            coordinates: {
              lat: res.data.lat,
              lng: res.data.lon,
            },
            address: res.data.display_name,
          });
          setEditAbleAddress(false);
        }
      })
      .catch((err) => {
        setMessageAddress(["error", "Address is not valid!"]);
        setLatitude();
        setLongitude();
        localStorage.removeItem("addressUserCurr");
        setEditAbleAddress(true);
      });
  };

  const handleCreateQuotationTemp = async () => {
    const resto = JSON.parse(localStorage.getItem("subRestoAddress"));
    const users = JSON.parse(localStorage.getItem("addressUserCurr"));
    await axios
      .post(`${import.meta.env.VITE_API_BE}/deliveries/quotation-temp`, {
        service_type: "SEDAN",
        stop: [resto, users],
      })
      .then((res) => {
        if (res.data) {
          setDeliveryFee(res.data.data.data.priceBreakdown.total);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageAddress(["error", "Address is out of service!"]);
      });
  };

  const showPosition = (pos) => {
    const crd = pos.coords;
    validAddress2(crd.longitude, crd.latitude);
  };

  const getSuggestionAddress = async (address) => {
    console.log(address, "address");
    await axios
      .get(`https://us1.locationiq.com/v1/search.php`, {
        params: {
          key: import.meta.env.VITE_LOCATIONIQ_API_KEY,
          q: address,
          format: "json",
        },
      })
      .then((res) => {
        console.log(res.data);

        setSuggestionAddress(
          res.data.map((item) => ({
            value: item.display_name,
            label: item.display_name,
            coordinates: {
              lat: item.lat,
              lng: item.lon,
            },
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);

  const getOrderDetail = async (id) => {
    await axios
      .get(`${import.meta.env.VITE_API_BE}/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrderDetail(res.data.order);
      })
      .catch((err) => {
        console.log(err);
        setResMessageOrder([
          "error",
          err.response?.data?.message || "Failed to get a Order Detail!",
        ]);
      });
  };

  const state = {
    menuSearched,
    setMenuSearched,

    cart,
    setCart,
    selectedMenu,
    setSelectedMenu,
    subTotal,
    setSubTotal,
    deliveryFee,
    setDeliveryFee,
    packingFee,
    setPackingFee,
    promo,
    setPromo,
    total,
    setTotal,
    formatAmount,
    setFormatAmount,

    currStep,
    setCurrStep,

    orderMethod,
    setOrderMethod,

    editAbleAddress,
    setEditAbleAddress,
    addressUser,
    setAddressUser,

    showDatePicker,
    setShowDatePicker,
    selectedDate,
    setSelectedDate,
    selectedTempDate,
    setSelectedTempDate,
    selectedTempTime,
    setSelectedTempTime,

    addQty,
    subQty,

    isLoading,
    setIsLoading,
    resMessageOrder,
    setResMessageOrder,
    handleAddOrder,

    orderTemp,
    setOrderTemp,

    selectedPayment,
    setSelectedPayment,
    activeKey,
    setActiveKey,

    resPayment,
    setResPayment,
    linkPayment,
    setLinkPayment,
    newResPayment,
    setNewResPayment,
    resCallback,
    setResCallback,
    resHistory,
    setResHistory,
    resOrder,
    setResOrder,

    handleAddPayment,
    handleGetInvoice,

    selectedResto,
    setSelectedResto,

    longitude,
    setLongitude,
    latitude,
    setLatitude,
    addressUserCurr,
    setAddressUserCurr,
    messageAddress,
    setMessageAddress,
    validAddress,
    validAddress2,

    resQuotationTemp,
    setResQuotationTemp,
    handleCreateQuotationTemp,

    suggestionAddress,
    setSuggestionAddress,
    getSuggestionAddress,

    orderDetail,
    setOrderDetail,
    getOrderDetail,
  };

  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error(`useOrder must be use within a Network Performance`);
  }
  return context;
};

export default Order;
