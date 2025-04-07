    import React, { useEffect, useState } from "react";
    import { Button, Col, Row, Input, Select } from "antd";
    import { useOrder } from "../../../../context/OrderContext";
    import { useAuth } from "../../../../context/AuthContext";

    const { Option, OptGroup } = Select;

    export default function CardTotal({ handleClick }) {
    const { setSize, authUser } = useAuth(); // Tambahkan authUser
    const {
        selectedMenu,
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
        setCart,
        formatAmount,
        setFormatAmount,
    } = useOrder();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("GoPay");

    useEffect(() => {
        if (selectedMenu) {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        setCart(selectedMenu);
        }
    }, [selectedMenu]);

    useEffect(() => {
        setTotal(
        parseFloat(subTotal || 0) +
        parseFloat(deliveryFee || 0) -
        parseFloat(promo || 0)
        );
        setFormatAmount({
        vat: 0,
        discount: promo,
        shipping: deliveryFee,
        });
    }, [subTotal, deliveryFee, promo]);

    // Set nama customer dari auth
    useEffect(() => {
        if (authUser?.name) {
        setCustomerName(authUser.name);
        }
    }, [authUser]);

    return (
        <>
        <Row
            align={"middle"}
            gutter={setSize([0, 20], [0, 18], [0, 14])}
            className="bg-white lg:p-5 md:p-3.5 p-3 rounded-lg mt-2.5"
        >
            <Col>
            <div className="text-[#393939] font-bold lg:text-[24px] md:text-[20px] text-[16px]">
                CHECKOUT
            </div>
            </Col>

            {/* Nama Customer */}
            <Col span={24} style={{ paddingTop: 10 }}>
            <div
                style={{
                fontWeight: 600,
                fontSize: setSize(18, 16, 14),
                marginBottom: 5,
                }}
            >
                Nama Customer
            </div>
            <Input
                size="large"
                value={customerName}
                disabled // opsional: atau gunakan readOnly
            />
            </Col>

            {/* Email */}
            <Col span={24} style={{ paddingTop: 10 }}>
            <div
                style={{
                fontWeight: 600,
                fontSize: setSize(18, 16, 14),
                marginBottom: 5,
                }}
            >
                Email
            </div>
            <Input
                size="large"
                placeholder="Masukkan email (opsional)"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
            />
            </Col>

            {/* Nomor HP */}
            <Col span={24} style={{ paddingTop: 10 }}>
            <div
                style={{
                fontWeight: 600,
                fontSize: setSize(18, 16, 14),
                marginBottom: 5,
                }}
            >
                Nomor HP
            </div>
            <Input
                size="large"
                placeholder="Masukkan nomor HP (opsional)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
            />
            </Col>

            {/* Metode Pembayaran */}
            <Col span={24} style={{ paddingTop: 15 }}>
            <div
                style={{
                fontWeight: 600,
                fontSize: setSize(18, 16, 14),
                marginBottom: 5,
                }}
            >
                Metode Pembayaran
            </div>
            <Select
                style={{ width: "100%", marginBottom: 20 }}
                size="large"
                placeholder="Pilih metode pembayaran"
                value={paymentMethod}
                onChange={(value) => setPaymentMethod(value)}
            >
                <OptGroup label="E-Wallet">
                <Option value="GoPay">GoPay</Option>
                <Option value="GoPayLater">GoPayLater</Option>
                <Option value="ShopeePay">ShopeePay</Option>
                <Option value="ShopeePayLater">ShopeePayLater</Option>
                <Option value="i.saku">i.saku</Option>
                <Option value="QRIS">QRIS</Option>
                </OptGroup>
                <OptGroup label="Virtual Account">
                <Option value="BCA">BCA</Option>
                <Option value="Mandiri">Mandiri</Option>
                <Option value="BNI">BNI</Option>
                <Option value="BRI">BRI</Option>
                <Option value="Permata">Permata</Option>
                </OptGroup>
                <OptGroup label="Kartu Kredit/Debit">
                <Option value="VISA">VISA</Option>
                <Option value="Mastercard">Mastercard</Option>
                <Option value="JCB">JCB</Option>
                <Option value="AMEX">AMEX</Option>
                </OptGroup>
                <OptGroup label="Retail">
                <Option value="Alfamart">Alfamart</Option>
                <Option value="Alfamidi">Alfamidi</Option>
                <Option value="Dandan">Dandan</Option>
                <Option value="Indomaret">Indomaret</Option>
                </OptGroup>
                <OptGroup label="PayLater">
                <Option value="Akulaku">Akulaku</Option>
                <Option value="Kredivo">Kredivo</Option>
                </OptGroup>
            </Select>
            </Col>

            {/* Ringkasan Biaya */}
            <Col span={24}>
            <Row align="middle" justify="space-between">
                <Col span={12} style={{ fontWeight: 600, fontSize: setSize(18, 16, 14) }}>
                Sub Total
                </Col>
                <Col span={12} style={{ textAlign: "end" }}>
                Rp. {subTotal ? parseFloat(subTotal).toLocaleString() : "0"}
                </Col>
            </Row>
            </Col>
            <Col span={24}>
            <Row align="middle" justify="space-between">
                <Col span={12} style={{ fontWeight: 600, fontSize: setSize(18, 16, 14) }}>
                Delivery Fee
                </Col>
                <Col span={12} style={{ textAlign: "end" }}>
                Rp. {deliveryFee ? parseFloat(deliveryFee).toLocaleString() : "0"}
                </Col>
            </Row>
            </Col>
            <Col span={24}>
            <Row align="middle" justify="space-between">
                <Col span={12} style={{ fontWeight: 600, fontSize: setSize(18, 16, 14) }}>
                Promo
                </Col>
                <Col span={12} style={{ textAlign: "end", color: "#E83600" }}>
                Rp. {promo ? parseFloat(promo).toLocaleString() : "0"}
                </Col>
            </Row>
            </Col>
            <Col span={24} style={{ paddingTop: 10, borderTop: "1px solid grey" }}>
            <Row align="middle" justify="space-between">
                <Col span={12} style={{ fontWeight: 700, fontSize: setSize(20, 18, 16) }}>
                Total
                </Col>
                <Col span={12} style={{
                textAlign: "end",
                fontWeight: 700,
                fontSize: setSize(24, 22, 20),
                }}>
                Rp. {total ? parseFloat(total).toLocaleString() : "0"}
                </Col>
            </Row>
            </Col>

            {/* Tombol Order */}
            <Col span={24} style={{ paddingTop: 15 }}>
            <Button
                type="primary"
                size={setSize("large", "medium", "medium")}
                style={{ width: "100%", borderRadius: 50 }}
                onClick={() =>
                handleClick({
                    paymentMethod,
                    customer_details: {
                    id: authUser.id,
                    name: authUser.name,
                    email: customerEmail || null,
                    phone: customerPhone || null,
                    },
                })
                }
            >
                {`Order Now!`}
            </Button>
            </Col>
        </Row>
        </>
    );
}
