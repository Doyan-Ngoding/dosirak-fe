    import React, { useEffect } from "react";
    import LayoutComp from "../../../global/layout";
    import { Button, Col, message, Row } from "antd";
    import { useAuth } from "../../../../context/AuthContext";
    import { useOrder } from "../../../../context/OrderContext";
    import CardTitleStep from "../../../global/title/cardTitleStep";
    import { IconCreditCardPay } from "@tabler/icons-react";
    import { useNavigate } from "react-router-dom";
    import axios from "axios";

    export default function RedirectComp() {
    const navigate = useNavigate();
    const { setSize, resMessage, setResMessage, token, authUser } = useAuth();
    const { currStep, setCurrStep, resMessageOrder, resPayment } = useOrder();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setCurrStep(2);
    }, [setCurrStep]);

    useEffect(() => {
        if (!token && !authUser) {
        setResMessage(["error", "Log In First!"]);
        setTimeout(() => {
            navigate("/order");
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

    useEffect(() => {
            if (resPayment?.status === "pending") {
            const timer = setTimeout(() => {
                navigate(`/payment-details/${resPayment?.order_id}`, {
                state: { payment: resPayment },
                });
            }, 3000);
            return () => clearTimeout(timer);
            }
        }, [resPayment, navigate]);

            useEffect(() => {
                if (!resPayment || !resPayment.order_id) return;
            
                console.log("Start interval to check payment status");
                const interval = setInterval(async () => {
                try {
                    console.log("Fetching payment status...");
                    const response = await axios.get(
                    `${import.meta.env.VITE_API_BE}/invoices/${resPayment.id}`
                    );
                    const updatedStatus = response.data?.data?.status;
                    console.log("Updated status:", updatedStatus);
            
                    if (["paid", "success", "settlement"].includes(updatedStatus)) {
                    clearInterval(interval);
                    navigate("/complete");
                    }
                } catch (error) {
                    console.error("Failed to fetch payment status:", error);
                }
                }, 5000);
            
                return () => {
                console.log("Clearing interval...");
                clearInterval(interval);
                };
            }, [resPayment, navigate]);

    // ✅ Function to send payment invoice data
    const handleSendInvoice = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BE}/payment-invoice`,
            resPayment,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
      
          const orderId = response.data?.data?.order_id; // <- dari response
          console.log("✅ Invoice sent:", response.data);
      
          navigate(`/payment-details/${orderId}`, {
            state: { payment: response.data?.data }, // jika ingin lempar datanya juga
          });
        } catch (error) {
          console.error("❌ Failed to send invoice:", error);
          messageApi.error("Failed to send payment data to server");
        }
      };

    return (
        <>
        {contextHolder}
        <LayoutComp>
            <div style={{ backgroundColor: "#F4F6F9", width: "100%" }}>
            <Row
                style={{
                padding: setSize(
                    "30px 80px 10px 80px",
                    "30px 50px 10px 50px",
                    "30px 30px 10px 30px"
                ),
                }}
            >
                <Col span={24}>
                <CardTitleStep
                    step={currStep}
                    subTitle={"Complete the Step!"}
                    title={"PAYMENT"}
                />
                </Col>
            </Row>
            <Row
                justify={"center"}
                align={"center"}
                style={{ padding: setSize(10, 8, 5) }}
            >
                <Col
                span={setSize(12, 18, 20)}
                style={{
                    backgroundColor: "#FFFFFF",
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
                        fontSize: setSize(16, 14, 12),
                        fontWeight: 600,
                        paddingLeft: 5,
                    }}
                    >
                    PAY NOW!
                    </div>
                </div>
                <div
                    style={{
                    fontSize: setSize(32, 28, 24),
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
                <div className="lg:text-[16px] md:text-[14px] text-[12px]">
                    You will automatically be directed in 3 seconds to the payment
                    page or
                </div>
                <Button
                    size={setSize("large", "medium", "medium")}
                    type="primary"
                    style={{
                    border: "1px solid #E83600",
                    borderRadius: 50,
                    width: "80%",
                    }}
                    onClick={handleSendInvoice}
                >
                    Click Here to Pay your Order!
                </Button>
                </Col>
            </Row>
            </div>
        </LayoutComp>
        </>
    );
}
