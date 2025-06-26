import React, { useEffect } from "react";
import LayoutComp from "../../../global/layout";
import { Breadcrumb, Button, Col, ConfigProvider, message, Row } from "antd";
import { useAuth } from "../../../../context/AuthContext";
import { useOrder } from "../../../../context/OrderContext";
import CardTitleStep from "../../../global/title/cardTitleStep";
import { IconCreditCardPay } from "@tabler/icons-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ConfigComp from "../../../global/layout/configComp";
import HeaderComp from "../../../global/layout/header";
import FooterComp from "../../landing/footer";

export default function RedirectComp() {
  const navigate = useNavigate();
  const { setSize, resMessage, setResMessage, token, authUser } = useAuth();
  const {
    currStep,
    setCurrStep,
    resMessageOrder,
    resPayment,
    linkPayment,
    orderDetail,
    getOrderDetail,
  } = useOrder();

  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setCurrStep(2);
  }, [setCurrStep]);

  useEffect(() => {
    console.log("token", token);
    console.log("authUser", authUser);

    if (!token && !authUser) {
      setResMessage(["error", "Log In First!"]);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [token, authUser, setResMessage, navigate]);

  useEffect(() => {
    if (resMessage && resMessage.length === 2) {
      const [type, content] = resMessage;
      messageApi[type](content);
    }
  }, [resMessage, messageApi]);

  useEffect(() => {
    if (resMessageOrder && resMessageOrder.length === 2) {
      const [type, content] = resMessageOrder;
      messageApi[type](content);
    }
  }, [resMessageOrder, messageApi]);

  // useEffect(() => {
  //     if (resPayment?.status === "pending") {
  //     const timer = setTimeout(() => {
  //         window.open(linkPayment, "_blank");
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //     }
  // }, [resPayment, linkPayment]);

  // useEffect(() => {
  //     if (!resPayment || !resPayment.order_id) return;

  //     console.log("Start interval to check payment status");
  //     const interval = setInterval(async () => {
  //         try {
  //             console.log("Fetching payment status...");
  //             const response = await axios.get(
  //                 `${import.meta.env.VITE_API_BE}/invoices/${resPayment.id}`
  //             );
  //             const updatedStatus = response.data?.data?.status;
  //             console.log("Updated status:", updatedStatus);

  //             if (["paid", "success", "settlement"].includes(updatedStatus)) {
  //                 clearInterval(interval);
  //                 navigate("/complete");
  //                 // setTimeout(() => {
  //                 //     localStorage.removeItem("linkPayment");
  //                 //     localStorage.removeItem("resPayment");
  //                 // }, 1000);
  //             }
  //         } catch (error) {
  //             console.error("Failed to fetch payment status:", error);
  //         }
  //     }, 5000);

  //     return () => {
  //         console.log("Clearing interval...");
  //         clearInterval(interval);
  //     };
  // }, [resPayment, navigate]);

  useEffect(() => {
    const orderId = searchParams.get("order");

    if (!orderId) {
      navigate("/");
    } else {
      getOrderDetail(orderId);
    }
  }, []);

  useEffect(() => {
    if (orderDetail) {
      console.log("orderDetail", orderDetail);
    }

    if (orderDetail?.status === "pending") {
      const timer = setTimeout(() => {
        window.open(linkPayment, "_blank");
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (orderDetail?.status === "success") {
      navigate(`/complete?order=${orderDetail.id}`);
    }

    if (orderDetail?.status === "failed") {
      navigate("/");
    }
  }, [orderDetail]);

  return (
    <>
      {contextHolder}
      <ConfigComp>
        <HeaderComp />
        <div className="lg:pt-[100px] md:pt-[80px] pt-[70px] lg:px-[50px] md:px-[30px] px-[20px]">
          <div
            style={{
              marginBottom: setSize(20, 16, 12),
            }}
          >
            <img src="/assets-v2/banner/little-1.png" width={"100%"} />
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FF6B00",
              },
              components: {
                Select: {
                  colorBgContainer: "#FFFFFF",
                  colorTextPlaceholder: "#84888E",
                  colorText: "#000000",
                  colorBorder: "#A5ABB3",
                  controlHeight: setSize(32, 28, 28),
                  fontSize: setSize(12, 10, 10),
                  borderRadius: 4,
                  colorBgElevated: "#FFFFFF",
                  optionSelectedBg: "#E83600",
                  optionSelectedColor: "#FFFFFF",
                  fontSizeIcon: setSize(12, 10, 8),
                },
                DatePicker: {
                  controlHeight: setSize(34, 32, 32),
                  fontSize: setSize(12, 10, 10),
                  borderRadius: 4,
                  colorBorder: "#A5ABB3",
                  fontSizeIcon: setSize(12, 10, 8),
                  cellWidth: setSize(40, 30, 25),
                  colorTextPlaceholder: "#84888E",
                },
                Button: {
                  controlHeight: setSize(32, 24, 24),
                  fontSize: setSize(12, 10, 10),
                },
                Breadcrumb: {
                  fontSize: setSize(11, 10, 9),
                  fontFamily: "Noto Sans KR",
                  itemColor: "#FF6B00",
                  lastItemColor: "#FF6B00",
                  linkColor: "#FF6B00",
                  separatorMargin: 3,
                },
                Input: {
                  fontSize: setSize(12, 10, 8),
                },
                Card: {
                  colorBorderSecondary: "#A5ABB3",
                },
              },
            }}
          >
            <Breadcrumb
              items={[
                {
                  title: (
                    <a href="/menu" style={{ textDecoration: "underline" }}>
                      MENU
                    </a>
                  ),
                },
                {
                  title: (
                    <a href="/menu" style={{ textDecoration: "underline" }}>
                      CHECKOUT PROCESS
                    </a>
                  ),
                },
                {
                  title: (
                    <span style={{ textDecoration: "underline" }}>
                      CONFIRM ORDER
                    </span>
                  ),
                },
              ]}
            />
            <Row align={"bottom"}>
              <Col span={setSize(12, 12, 24)}>
                <div className="text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px]">
                  Make Your Payment
                </div>
                <div className="text-[#818182] leading-3 font-[Noto Sans KR] font-semibold lg:text-[14px] md:text-[12px] text-[10px] pt-1">
                  Any question or remarks? Just write us a message!
                </div>
              </Col>
            </Row>
          </ConfigProvider>
        </div>
        <Row
          justify={"center"}
          align={"center"}
          style={{ padding: setSize(10, 8, 5) }}
        >
          <Col
            span={setSize(12, 18, 20)}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #A5ABB3",
              marginTop: setSize(15, 12, 10),
              borderRadius: 10,
              padding: setSize(20, 16, 12),
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconCreditCardPay color="#287D3C" size={setSize(18, 16, 14)} />
              <div
                style={{
                  color: "#287D3C",
                  fontSize: setSize(14, 12, 12),
                  fontWeight: 600,
                  paddingLeft: 5,
                }}
              >
                PAY NOW!
              </div>
            </div>
            <div
              style={{
                fontSize: setSize(24, 22, 20),
                fontWeight: 600,
                padding: "10px 0",
              }}
            >
              Make the Payment to Proceed your Order!
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/img-payment.jpg"
                style={{ width: "50%" }}
                alt="Payment"
              />
            </div>
            <div className="lg:text-[12px] md:text-[10px] text-[10px]">
              You will automatically be directed in 3 seconds to the payment
              page or
            </div>
            <Link to={resPayment?.invoice?.payment_link_url} target="_blank">
              <Button
                size={setSize("middle", "medium", "medium")}
                type="primary"
                style={{
                  border: "1px solid #E83600",
                  borderRadius: 50,
                  width: "80%",
                  fontSize: setSize(12, 10, 10),
                }}
              >
                Click Here to Pay your Order!
              </Button>
            </Link>
          </Col>
        </Row>
        <FooterComp />
      </ConfigComp>
    </>
  );
}
