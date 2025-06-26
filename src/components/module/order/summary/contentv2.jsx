import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Input,
  message,
  Row,
  Select,
  Card,
  AutoComplete,
} from "antd";
import {
  IconBuildingStore,
  IconCalendarWeek,
  IconChevronDown,
  IconChevronRight,
  IconClock,
  IconMapPin,
  IconNotes,
  IconPencilMinus,
  IconSearch,
  IconToolsKitchen2,
  IconXboxXFilled,
  IconCircleMinus,
  IconCirclePlusFilled,
  IconTicket,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useOrder } from "../../../../context/OrderContext";
import debounce from "lodash.debounce";

export default function OrderSummaryContent() {
  const navigate = useNavigate();

  const { setSize, authUser, isStandard, token, resMessage, setResMessage } =
    useAuth();

  const {
    selectedTempDate,
    setSelectedTempDate,
    selectedTempTime,
    setSelectedTempTime,
    editAbleAddress,
    setEditAbleAddress,
    selectedDate,
    setSelectedDate,
    addressUser,
    setAddressUser,
    messageAddress,
    validAddress,
    validAddress2,
    addressUserCurr,
    handleCreateQuotationTemp,
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
    cart,
    setCart,
    formatAmount,
    setFormatAmount,
    addQty,
    subQty,
    handleAddOrder,
    handleAddPayment,
    resMessageOrder,
    setResMessageOrder,
    suggestionAddress,
    getSuggestionAddress,
  } = useOrder();

  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [validMessage, setValidMessage] = useState();
  const [qtyTemp, setQtyTemp] = useState(0);
  const [searchAddress, setSearchAddress] = useState(addressUserCurr?.address);

  const disabledDate = (current) => {
    return current && current < dayjs().add(1, "day").endOf("day");
  };

  const showPosition = (pos) => {
    const crd = pos.coords;
    validAddress2(crd.longitude, crd.latitude);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      validAddress(authUser && authUser.location);
    }
  }, []);

  const clickedMap = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
  };
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (messageAddress && messageAddress.length === 2) {
      const [type, content] = messageAddress;
      messageApi[type](content);
    }
  }, [messageAddress]);

  useEffect(() => {
    if (localStorage.getItem("subRestoAddress") && addressUserCurr) {
      handleCreateQuotationTemp();
    }
  }, [localStorage.getItem("subRestoAddress"), addressUserCurr]);

  useEffect(() => {
    if (selectedTempDate && selectedTempTime) {
      setSelectedDate(
        `${dayjs(selectedTempDate && selectedTempDate)
          .subtract(1, "day")
          .format("YYYY-MM-DD")} ${
          selectedTempTime && selectedTempTime.slice(0, 2)
        }:00:00`
      );
    }
  }, [selectedTempDate, selectedTempTime]);

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
      parseFloat(subTotal) + parseFloat(deliveryFee) + parseFloat(promo)
    );
    setFormatAmount({
      vat: 0,
      discount: promo,
      shipping: deliveryFee,
    });
  }, [subTotal, deliveryFee, promo]);

  useEffect(() => {
    if (validMessage && validMessage.length === 2) {
      const [type, content] = validMessage;
      messageApi[type](content);
    }
  }, [validMessage, messageApi]);

  useEffect(() => {
    setQtyTemp(cart.reduce((sum, item) => sum + (item.qty || 0), 0));
  }, [cart]);

  useEffect(() => {
    if (resMessage && resMessage.length === 2) {
      const [type, content] = resMessage;
      messageApi[type](content);
    }
  }, [resMessage]);

  useEffect(() => {
    if (resMessageOrder && resMessageOrder.length === 2) {
      const [type, content] = resMessageOrder;
      messageApi[type](content);
    }
  }, [resMessageOrder]);

  useEffect(() => {
    if (!token && !authUser) {
      setResMessage(["error", "Log In First!"]);
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
    } else if (!selectedMenu) {
      setResMessage(["error", "Select The Menu First!"]);
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
    } else if (authUser && authUser.role !== "user") {
      setResMessage(["error", "You Can't Access this Page!"]);
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
    }
  }, [token, authUser, cart]);

  const handleSelect = (value, option) => {
    console.log("addressUserCurr", addressUserCurr);
    console.log("handleSelect value", value);
    console.log("handleSelect option", option);
    setAddressUser(option);
    setSearchAddress(option.label);
  };

  const handleSearchAddress = (value) => {
    getSuggestionAddress(value);
  };

  const debouncedFetch = useCallback(
    debounce((val) => handleSearchAddress(val), 500),
    []
  );

  const saveAddress = () => {
    validAddress(addressUser.label);
  };

  return (
    <>
      {contextHolder}
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
                Confirm Order
              </div>
              <div className="text-[#818182] leading-3 font-[Noto Sans KR] font-semibold lg:text-[14px] md:text-[12px] text-[10px] pt-1">
                Make sure all the order is right to your appetite
              </div>
            </Col>
            <Col span={setSize(12, 12, 24)}>
              <Row
                align={"middle"}
                gutter={[12, 6]}
                style={{
                  marginTop: setSize(0, 0, 10),
                }}
              >
                <Col span={12}>
                  <DatePicker
                    allowClear={true}
                    showNow={false}
                    value={
                      selectedTempDate &&
                      dayjs(selectedTempDate).subtract(1, "day")
                    }
                    onChange={(e) => {
                      setSelectedTempDate(dayjs(e).add(1, "day")),
                        setOpenDate(true);
                    }}
                    open={openDate}
                    onOpenChange={() => setOpenDate(true)}
                    style={{
                      width: "100%",
                    }}
                    format={"dddd, DD MMM YYYY"}
                    prefix={
                      <IconCalendarWeek
                        color="#2F2F2F"
                        size={setSize(14, 12, 10)}
                        style={{
                          marginRight: 5,
                        }}
                      />
                    }
                    suffixIcon={
                      <IconChevronDown
                        color="#FF6B00"
                        size={setSize(14, 12, 10)}
                      />
                    }
                    clearIcon={
                      <IconXboxXFilled
                        color="#FF6B00"
                        size={setSize(14, 12, 10)}
                      />
                    }
                    placeholder="Order Date"
                    disabledDate={disabledDate}
                    width={"100%"}
                    panelRender={(date) => (
                      <div>
                        {openAlert && (
                          <div className="flex justify-between items-center bg-[#FFD39A] lg:m-3 md:m-2 m-2 lg:rounded-[8px] md:rounded-[6px] rounded-[4px] px-2 py-1.5">
                            <div className="lg:text-[12px] md:text-[10px] text-[8px] flex justify-start items-center">
                              <IconNotes
                                size={setSize(14, 12, 10)}
                                style={{
                                  marginRight: 3,
                                }}
                              />
                              Please place orders at least 2 days before
                            </div>
                          </div>
                        )}
                        <div>{date}</div>
                        <div className="lg:px-5 md:px-3 px-2 pb-2">
                          <Button
                            type="primary"
                            style={{
                              width: "100%",
                              borderRadius: 50,
                            }}
                            onClick={() => setOpenDate(false)}
                          >
                            Select Date
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                </Col>
                <Col span={12}>
                  <Select
                    allowClear={true}
                    style={{
                      width: "100%",
                    }}
                    prefix={
                      <IconClock
                        color="#2F2F2F"
                        size={setSize(14, 12, 10)}
                        style={{
                          marginRight: 5,
                        }}
                      />
                    }
                    suffixIcon={
                      <IconChevronDown
                        color="#FF6B00"
                        size={setSize(14, 12, 10)}
                      />
                    }
                    placeholder="Delivery Time"
                    options={[
                      { value: "08.00 - 09.00", label: "08.00 - 09.00" },
                      { value: "09.00 - 10.00", label: "09.00 - 10.00" },
                      { value: "10.00 - 11.00", label: "10.00 - 11.00" },
                      { value: "11.00 - 12.00", label: "11.00 - 12.00" },
                      { value: "12.00 - 13.00", label: "12.00 - 13.00" },
                      { value: "13.00 - 14.00", label: "13.00 - 14.00" },
                    ]}
                    open={openTime}
                    onDropdownVisibleChange={() => setOpenTime(true)}
                    onChange={(e) => {
                      setOpenTime(true), setSelectedTempTime(e);
                    }}
                    value={selectedTempTime}
                    dropdownRender={(menu) => (
                      <>
                        <div className="lg:p-3 md:p-3 p-2">
                          <div className="font-[Noto Sans KR] font-semibold text-black lg:text-[14px] lg:pb-3 md:text-[12px] md:pb-2 text-[10px] pb-1">
                            Select Time Delivery
                          </div>
                          <div>{menu}</div>
                          <div className="lg:mt-3 md:mt-2 mt-1">
                            <Button
                              type="primary"
                              style={{
                                width: "100%",
                                borderRadius: 50,
                              }}
                              onClick={() => setOpenTime(false)}
                            >
                              Select Time
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                    optionRender={(option) => (
                      <>
                        <div className="flex justify-between items-center">
                          <div>{option.data.label}</div>
                          <div>
                            <IconChevronRight size={setSize(14, 12, 10)} />
                          </div>
                        </div>
                      </>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="lg:pt-[50px] md:pt-[30px] pt-[20px]">
            <div>
              <div
                style={{
                  color: "#393939",
                  fontSize: setSize(12, 10, 9),
                  fontWeight: 500,
                  marginBottom: setSize(10, 8, 8),
                }}
              >
                Confirm Address
              </div>

              {addressUserCurr?.address}

              <AutoComplete
                style={{
                  width: "100%",
                }}
                options={suggestionAddress}
                onSearch={debouncedFetch}
                onSelect={handleSelect}
                onChange={(e) => {
                  console.log("onChange e", e);
                  setSearchAddress(e);
                }}
                value={searchAddress}
                disabled={editAbleAddress ? false : true}
              >
                <Input
                  placeholder="Enter delivery address"
                  // value={searchAddress}
                  prefix={
                    <IconMapPin
                      size={setSize(14, 12, 10)}
                      color="#838383"
                      style={{
                        marginRight: setSize(5, 3, 0),
                        marginTop: "-2px",
                      }}
                    />
                  }
                  suffix={
                    <div
                      className="input-address"
                      onClick={() => setEditAbleAddress(!editAbleAddress)}
                    >
                      {editAbleAddress ? (
                        <Button
                          type="primary"
                          onClick={saveAddress}
                          size="small"
                          style={{
                            fontSize: setSize(12, 10, 8),
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <>
                          <IconPencilMinus size={setSize(14, 12, 10)} />
                          <div
                            style={{
                              paddingLeft: 5,
                              fontSize: setSize(12, 10, 8),
                            }}
                          >
                            Change Address
                          </div>
                        </>
                      )}
                    </div>
                  }
                />
              </AutoComplete>
              {/* <Input 
                                 prefix={
                                    <IconMapPin 
                                        size={setSize(14, 12, 10)}
                                        color='#838383'
                                        style={{
                                            marginRight: setSize(5, 3, 0),
                                            marginTop: '-2px'
                                        }}
                                    />
                                }
                                suffix={
                                    <div
                                        className='input-address'
                                        onClick={() => setEditAbleAddress(!editAbleAddress)}
                                    >
                                        {
                                            editAbleAddress ? (
                                                <Button
                                                    type='primary'
                                                    onClick={() => validAddress(addressUser)}
                                                    size='small'
                                                    style={{
                                                        fontSize: setSize(12, 10, 8)
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                            ) : (
                                                <>
                                                    <IconPencilMinus 
                                                        size={setSize(14, 12, 10)}
                                                    />
                                                    <div
                                                        style={{
                                                            paddingLeft: 5,
                                                            fontSize: setSize(12, 10, 8)
                                                        }}
                                                    >
                                                        Change Address
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                }
                                placeholder='Enter delivery address'
                                disabled={editAbleAddress ? false : true}
                                value={addressUser}
                                onChange={(e) => setAddressUser(e.target.value)}
                            /> */}
            </div>
            <div>
              <Row gutter={setSize([24, 0], [12, 0], [0, 0])}>
                <Col span={setSize(16, 14, 24)}>
                  <Row
                    align={"middle"}
                    gutter={setSize([0, 10], [0, 8], [0, 6])}
                    className="bg-white rounded-lg lg:mt-10 md:mt-8 mt-5"
                  >
                    <Col span={24}>
                      <div className="text-[#393939] font-bold lg:text-[14px] md:text-[12px] text-[11px]">
                        ORDER LIST
                      </div>
                    </Col>
                    {qtyTemp < 15 && (
                      <Col span={24}>
                        <div className="bg-[#FFD39A] font-[Noto Sans KR] w-full flex justify-center items-center w-fit m-auto lg:text-[16px] lg:py-2 lg:px-10 md:text-[12px] md:py-1.5 md:px-8 text-[9px] py-1 px-3 lg:rounded-[8px] md:rounded-[8px] rounded-[4px]">
                          For your convenience, please ensure your order
                          comprises at least 15 meals.
                        </div>
                      </Col>
                    )}
                    {selectedMenu &&
                      selectedMenu.map((value) => (
                        <Col span={24}>
                          <Card>
                            <Row
                              justify={"space-between"}
                              align={"middle"}
                              gutter={[12, 12]}
                            >
                              <Col
                                span={setSize(3, 5, 5)}
                                style={{
                                  height: setSize(70, 60, 50),
                                }}
                              >
                                <div
                                  className={`bg-cover bg-center bg-no-repeat rounded-sm h-[100%] w-[100%] aspect-square`}
                                  style={{ backgroundImage: `url('${import.meta.env.VITE_API_BE.replace(/api/g, '')}${value.image}')` }}
                                />
                              </Col>
                              <Col span={setSize(18, 19, 19)}>
                                <Row>
                                  <Col span={24}>
                                    <div className="lg:text-[12px] md:text-[10px] text-[8px] font-semibold">
                                      {value.name}
                                    </div>
                                    {value.variant && value.size && (
                                      <div className="text-[9px] lg:text-[10px] md:text-[9px]">
                                        {value.name}, {value.variant},{" "}
                                        {value.size}
                                      </div>
                                    )}
                                    {isStandard && (
                                      <div className="lg:text-[12px] md:text-[10px] text-[10px] font-semibold font-[Montserrat] mt-1.5">
                                        Rp.{" "}
                                        {value.price
                                          ? parseFloat(
                                              value.price
                                            ).toLocaleString()
                                          : "-"}
                                      </div>
                                    )}
                                  </Col>
                                  {!isStandard && (
                                    <Col span={24}>
                                      <Row
                                        justify="space-between"
                                        align="middle"
                                        gutter={[30, 30]}
                                      >
                                        <Col span={16}>
                                          <div className="lg:text-[12px] md:text-[10px] text-[10px] font-semibold">
                                            Rp.{" "}
                                            {value.price
                                              ? parseFloat(
                                                  value.price
                                                ).toLocaleString()
                                              : "-"}
                                          </div>
                                        </Col>
                                        <Col span={8}>
                                          <Row
                                            justify={"space-between"}
                                            align={"middle"}
                                          >
                                            <Col>
                                              <div className="icon-hover">
                                                <IconCircleMinus
                                                  size={setSize(18, 16, 14)}
                                                  style={{
                                                    marginTop: 3,
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    subQty(
                                                      value.id,
                                                      value.variant || null,
                                                      value.size || null
                                                    )
                                                  }
                                                />
                                              </div>
                                            </Col>
                                            <Col>
                                              <div
                                                className="menu-price-2"
                                                style={{
                                                  fontSize: setSize(14, 12, 12),
                                                }}
                                              >
                                                {value.qty ? value.qty : "0"}
                                              </div>
                                            </Col>
                                            <Col>
                                              <div className="icon-hover-2">
                                                <IconCirclePlusFilled
                                                  size={setSize(18, 16, 14)}
                                                  style={{
                                                    marginTop: 3,
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    addQty(
                                                      value.id,
                                                      value.variant || null,
                                                      value.size || null
                                                    )
                                                  }
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                              {isStandard && (
                                <Col span={3}>
                                  <Row justify="space-between" align="middle">
                                    <Col className="icon-hover">
                                      <IconCircleMinus
                                        size={setSize(18, 16, 14)}
                                        style={{
                                          marginTop: 3,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => subQty(value.id)}
                                      />
                                    </Col>
                                    <Col className="menu-price-2">
                                      {value.qty ? value.qty : "0"}
                                    </Col>
                                    <Col className="icon-hover-2">
                                      <IconCirclePlusFilled
                                        size={setSize(18, 16, 14)}
                                        style={{
                                          marginTop: 3,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => addQty(value.id)}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              )}
                            </Row>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </Col>
                <Col span={setSize(8, 10, 24)}>
                  <Row
                    align={"middle"}
                    justify={"end"}
                    gutter={[0, 12]}
                    className="bg-white lg:p-5 md:p-3.5 p-3 lg:mt-10 md:mt-8 mt-5 rounded-lg border border-[#A5ABB3]"
                  >
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconTicket
                        color="#FF6B00"
                        size={setSize(18, 16, 14)}
                        style={{}}
                      />
                      <div className="text-[#393939] font-semibold lg:text-[14px] md:text-[12px] text-[11px] pl-2.5">
                        VOUCHER
                      </div>
                    </Col>
                    <Col span={24}>
                      <Input size="middle" placeholder="Input Code Voucher" />
                    </Col>
                  </Row>
                  <Row
                    align={"middle"}
                    gutter={setSize([0, 20], [0, 18], [0, 14])}
                    className="bg-white lg:p-5 md:p-3.5 p-3 rounded-lg mt-2.5 border border-[#A5ABB3]"
                  >
                    <Col>
                      <div className="text-[#393939] font-bold lg:text-[14px] md:text-[12px] text-[11px]">
                        CHECKOUT
                      </div>
                    </Col>
                    <Col span={24}>
                      <Row align={"middle"} justify={"space-between"}>
                        <Col
                          span={12}
                          style={{
                            fontWeight: 600,
                            fontSize: setSize(12, 10, 10),
                          }}
                        >
                          Sub Total
                        </Col>
                        <Col
                          span={12}
                          style={{
                            paddingRight: 10,
                            fontWeight: 500,
                            fontSize: setSize(12, 10, 10),
                            textAlign: "end",
                          }}
                        >
                          Rp.{" "}
                          {subTotal
                            ? parseFloat(subTotal).toLocaleString()
                            : "0"}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Row align={"middle"} justify={"space-between"}>
                        <Col
                          span={12}
                          style={{
                            fontWeight: 600,
                            fontSize: setSize(12, 10, 10),
                          }}
                        >
                          Delivery Fee
                          <br />
                          <div
                            style={{
                              fontWeight: 400,
                              fontSize: setSize(12, 10, 10),
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          ></div>
                        </Col>
                        <Col
                          span={12}
                          style={{
                            paddingRight: 10,
                            fontWeight: 500,
                            fontSize: setSize(12, 10, 10),
                            textAlign: "end",
                          }}
                        >
                          <span
                            style={{
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {/* <s style={{ fontSize: 14 }}>Rp. {deliveryFee ? parseFloat(deliveryFee).toLocaleString() : '0'}</s> */}
                            <span style={{ paddingLeft: 10, color: "#000000" }}>
                              Rp.{" "}
                              {deliveryFee
                                ? parseFloat(deliveryFee).toLocaleString()
                                : "0"}
                            </span>
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    {/* <Col
                                            span={24}
                                        >
                                            <Row
                                                align={"middle"}
                                                justify={"space-between"} 
                                            >
                                                <Col
                                                    span={12}
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: setSize(18, 16, 14),
                                                    }}
                                                >
                                                    Packing Fee
                                                </Col>
                                                <Col
                                                    span={12}
                                                    style={{
                                                        paddingRight: 10,
                                                        fontWeight: 500,
                                                        fontSize: setSize(16, 14, 14),
                                                        textAlign: 'end'
                                                    }}
                                                >
                                                    Rp. {packingFee ? parseFloat(packingFee).toLocaleString() : '0'}
                                                </Col>
                                            </Row>
                                        </Col> */}
                    <Col span={24}>
                      <Row align={"middle"} justify={"space-between"}>
                        <Col
                          span={12}
                          style={{
                            fontWeight: 600,
                            fontSize: setSize(12, 10, 10),
                          }}
                        >
                          Promo
                        </Col>
                        <Col
                          span={12}
                          style={{
                            paddingRight: 10,
                            fontWeight: 500,
                            fontSize: setSize(12, 10, 10),
                            textAlign: "end",
                            color: "#E83600",
                          }}
                        >
                          Rp. {promo ? parseFloat(promo).toLocaleString() : "0"}
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        paddingTop: 10,
                        borderTop: "1px solid grey",
                      }}
                    >
                      <Row align={"middle"} justify={"space-between"}>
                        <Col
                          span={12}
                          style={{
                            fontWeight: 700,
                            fontSize: setSize(14, 12, 12),
                          }}
                        >
                          Total
                        </Col>
                        <Col
                          span={12}
                          style={{
                            paddingRight: 10,
                            fontWeight: 700,
                            fontSize: setSize(14, 12, 12),
                            textAlign: "end",
                          }}
                        >
                          Rp. {total ? parseFloat(total).toLocaleString() : "0"}
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        paddingTop: 10,
                      }}
                    >
                      <Button
                        type="primary"
                        size={setSize("middle", "middle", "middle")}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                        }}
                        disabled={
                          deliveryFee === 0 || qtyTemp < 15 ? true : false
                        }
                        onClick={handleAddOrder}
                      >
                        {`Process Order`}{" "}
                        <IconChevronRight size={setSize(14, 12, 10)} />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </ConfigProvider>
      </div>
    </>
  );
}
