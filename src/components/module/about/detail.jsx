import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Button, Carousel, Col, ConfigProvider, Row } from "antd";

export default function DetailComp() {
  const { setSize, token, setModalLogin } = useAuth();
  const navigate = useNavigate();
  const CarouselChildComp = () => (
    <div className="text-center flex justify-center">
      <div className="absolute lg:bottom-10 md:bottom-10 bottom-5">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                borderRadius: 50,
                borderRadiusSM: 50,
                fontSize: setSize(16, 14, 12),
                colorBgContainer: "#FF6B00",
                colorText: "#FFFFFF",
                defaultBorderColor: "#FF6B00",
              },
            },
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="text-[#FFFFFF] font-[Montserrat] font-bold lg:text-[30px] md:text-[20px] text-[14px]">
              A Korean Mother's Touch to Your Desk
            </div>
            <div className="max-w-[600px] flex justify-center items-center w-[100%] mt-5">
              <div className="text-[#FFFFFF] font-[Plus Jakarta Sans] font-normal lg:text-[18px] md:text-[16px] text-[14px]">
                KDosirak is not just a food delivery service, but a cultural
                messenger delivering the essence of Korean food culture.
              </div>
            </div>
            <div className="mt-5">
              <Button
                type="primary"
                size={setSize("large", "medium", "small")}
                style={{
                  width: setSize("200px", "150px", "100px"),
                  borderRadius: 50,
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <div>Order Now!</div>
              </Button>
            </div>
          </div>
        </ConfigProvider>
      </div>
      <div className="absolute lg:bottom-10 md:bottom-10 bottom-5 font-[Noto Sans KR] text-white"></div>
    </div>
  );

  const AboutItem = [
    {
      id: 1,
      korTitle: "정성",
      image: "/assets-v2/images/Eating.png",
      title: "Jeongseong",
      subtitle: "Sincerity",
      description:
        "All food is prepared with a mother’s touch, we value a cooking process that focuses on quality.",
    },
    {
      id: 2,
      korTitle: "균형",
      image: "/assets-v2/images/Cooking.png",
      title: "Gyunhyeong",
      subtitle: "Balance",
      description:
        "We believe in meals that nourish both the body and the soul, bring a perfect balance of taste to you.",
    },
    {
      id: 3,
      korTitle: "균형",
      image: "/assets-v2/images/Pizzasharing.png",
      title: "Gongyu",
      subtitle: "Sharing",
      description:
        "Good food is meant to be shared, create moments of togetherness through meals that spark joy.",
    },
  ];

  const PurposeItem = [
    [
      {
        id: 1,
        image: "/assets-v2/images/Purpose_1.png",
        logo: "/assets-v2/images/Logo_Purpose_1.png",
        title: "Freshness",
        description:
          "All meals are made-to-order with ingredients sourced daily.",
      },
      {
        id: 2,
        image: "/assets-v2/images/Purpose_2.png",
        logo: "/assets-v2/images/Logo_Purpose_2.png",
        title: "Sustainability",
        description:
          "We minimize waste and use eco-friendly packaging wherever possible.",
      },
    ],
    [
      {
        id: 3,
        image: "/assets-v2/images/Purpose_3.png",
        logo: "/assets-v2/images/Logo_Purpose_3.png",
        title: "Authenticity",
        description:
          "Recipes stay true to Korean culinary roots, with a modern local touch.",
      },
      {
        id: 4,
        image: "/assets-v2/images/Purpose_4.png",
        logo: "/assets-v2/images/Logo_Purpose_4.png",
        title: "Community",
        description:
          "We’re here to nourish not just individuals, but relationships.",
      },
    ],
  ];

  const StepItem = [
    {
      id: 1,
      title: "Select your menu",
      description:
        "Choose from our fine menu selection of delicious Korean restaurants in various places.",
    },
    {
      id: 2,
      title: "Add Quantity & Pay",
      description:
        "Order for yourself or for your team in just a few clicks for minimum order at 15 meals.",
    },
    {
      id: 3,
      title: "Delivery to Your Door",
      description:
        "We deliver right on time, just select your schedule and location within 10–20km radius, hot & ready to eat.",
    },
    {
      id: 4,
      title: "Enjoy Your Meal",
      description: "No hassle, no stress — just sit down and savor every bite.",
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          {/* TODO: Change speed to 10000 */}
          <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={10000}>
            <div
              className={`bg-[url(/assets-v2/images/Carousel_1.png)] bg-cover ${setSize(
                "bg-left",
                "bg-left",
                "bg-left"
              )} bg-no-repeat ${setSize(
                "h-[80vh]",
                "h-[400px]",
                "h-[250px]"
              )} w-full max-w-full xl:w-[100%]`}
            >
              <CarouselChildComp />
            </div>
            <div
              className={`bg-[url(/assets-v2/images/Carousel_2.png)] bg-cover bg-center bg-no-repeat ${setSize(
                "h-[80vh]",
                "h-[400px]",
                "h-[250px]"
              )} w-full max-w-full xl:w-[100%]`}
            >
              <CarouselChildComp />
            </div>
            <div
              className={`bg-[url(/assets-v2/images/Carousel_3.png)] bg-cover bg-center bg-no-repeat ${setSize(
                "h-[80vh]",
                "h-[400px]",
                "h-[250px]"
              )} w-full max-w-full xl:w-[100%]`}
            >
              <CarouselChildComp />
            </div>
          </Carousel>
        </Col>
      </Row>
      <div className="text-center px-5 flex flex-col justify-center items-center md:mt-5">
        <div className="flex flex-col justify-center items-center">
          <div className="text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px]">
            About KDosirak
          </div>
          <div className="mt-2 max-w-[70%]">
            <span className="text-[#818182] font-[Noto Sans KR] font-normal lg:text-[20px] md:text-[16px] text-[14px]">
              Kdosirak began with a simple craving — for the warmth of homemade
              Korean lunchboxes far from home. What started as weekend meal
              preps for friends has now become a shared table for hundreds.”
            </span>
          </div>
          <div className="mt-8 flex justify-center items-center gap-10 flex-col md:flex-col lg:flex-row">
            {AboutItem.map((item) => (
              <div
                key={item.id}
                className="border border-[#D8D8D8] p-2 h-[400px] w-[400px] rounded-3xl flex flex-col justify-center items-center px-6 relative"
                style={{
                  background:
                    "linear-gradient(180deg, #FFC397 -6.88%, #FFFFFF 45.53%)",
                }}
              >
                <div
                  className="text-[#FFC498] font-[Noto Sans KR] font-bold lg:text-[100px] md:text-[90px] text-[80px] absolute top-0 right-0"
                  style={{
                    lineHeight: "100px",
                  }}
                >
                  {item.korTitle}
                </div>
                <img
                  src={item.image}
                  alt="about-1"
                  style={{
                    zIndex: 10,
                    height: "100%",
                    maxHeight: "160px",
                    maxWidth: "200px",
                    width: setSize("80%", "80%", "80%"),
                    objectFit: "contain",
                  }}
                />
                <div className="text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px]">
                  <span>{item.title}</span>
                </div>
                <div className="text-[#FF6B00] font-[Noto Sans KR] font-normal lg:text-[24px] md:text-[20px] text-[16px]">
                  <span>{item.subtitle}</span>
                </div>
                <div className="text-[#818182] font-[Noto Sans KR] font-medium lg:text-[16px] md:text-[14px] text-[12px] mt-4">
                  <span>{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-col lg:flex-row lg:px-40">
          <div className="md:max-w-[100%] text-left md:text-center lg:text-left p-2 w-[100%] gap-4">
            <div className="mb-4 text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[20px] md:text-[16px] text-[14px]">
              How it works
            </div>
            <div className="mb-10 text-[##1A1A1A] font-[Noto Sans KR] font-bold lg:text-[38px] md:text-[30px] text-[24px]">
              Made with Heart, Served with Purpose
            </div>
            <div className="text-[#818182] font-[Noto Sans KR] font-normal lg:text-[20px] md:text-[16px] text-[14px] pr-6">
              At Kdosirak, we do more than serve food — we serve sincerity,
              balance, and the spirit of sharing. Every lunchbox is a reflection
              of our core values: freshness, authenticity, sustainability, and
              community.
            </div>
            <div className="mt-5">
              <Button
                type="primary"
                size={setSize("large", "medium", "small")}
                style={{
                  width: setSize("300px", "250px", "200px"),
                  borderRadius: 10,
                }}
              >
                <div className="flex items-center">
                  <div>Get to Know Us Better</div>
                  <img
                    src="/assets-v2/images/Arrow_Right.png"
                    alt="arrow-right"
                    className="w-[20px] h-[20px] ml-2"
                  />
                </div>
              </Button>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:flex-row md:align-middle md:justify-center md:gap-10 lg:gap-0">
            {PurposeItem.map((item, indexi) => (
              <div className="flex flex-col gap-5 md:gap-10 lg:gap-5" key={indexi}>
                {item.map((item, indexj) => (
                  <div
                    className="flex flex-row gap-5 md:flex-col"
                    key={PurposeItem[indexi][indexj].id}
                  >
                    <div
                      className="border border-[#F4F4F4] rounded-md p-4 w-[400px] h-[200px] flex flex-col items-left"
                      style={{
                        backgroundImage: `url(${PurposeItem[indexi][indexj].image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "right",
                      }}
                    >
                      <div className="flex mt-auto">
                        <img
                          src={PurposeItem[indexi][indexj].logo}
                          alt="purpose-1"
                          className="w-[32px] h-[32px] mr-4"
                        />
                        <div className="my-auto text-[#1A1A1A] font-[Noto Sans KR] font-semibold lg:text-[20px] md:text-[16px] text-[14px]">
                          {PurposeItem[indexi][indexj].title}
                        </div>
                      </div>
                      <div className="text-left mt-6 text-[#383838] font-[Plus Jakarta Sans] font-normal lg:text-[16px] md:text-[14px] text-[12px]">
                        {PurposeItem[indexi][indexj].description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 md:px-40 px-0 lg:px-96 lg:mt-15">
          <div className="text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[24px] md:text-[20px] text-[16px]">
            What drives us
          </div>
          <div className="text-[#1A1A1A] font-[Plus Jakarta Sans] font-bold lg:text-[38px] md:text-[30px] text-[24px] mt-2">
            We understand and engage with your audience more deeper.
          </div>
          <div className="text-[#383838] font-[Plus Jakarta Sans] font-normal lg:text-[16px] md:text-[14px] text-[12px] mt-4">
            There are 3 steps process that we conducted in Yom Team to deliver
            amazing output. We believe, by knowing the audience interest for
            each personal level, we can make a moment in the right time to
            communicate easily with appropriate tone-of-voice and deliver the
            right message.
          </div>
        </div>
        <div className="mt-10 flex gap-4 flex-col lg:flex-row lg:mt-15">
          {StepItem.map((item) => (
            <div
              key={item.id}
              className="flex text-left flex-col w-[330px] h-[250px] bg-[#F9FAFC] gap-4 p-4"
            >
              <div className="text-[#1A1A1A] font-[Plus Jakarta Sans] font-medium lg:text-[24px] md:text-[20px] text-[16px]">
                {"0" + item.id}
              </div>
              <div className="text-[#1A1A1A] font-[Plus Jakarta Sans] font-bold lg:text-[24px] md:text-[20px] text-[16px]">
                {item.title}
              </div>
              <div className="text-[#383838] font-[Plus Jakarta Sans] font-normal lg:text-[16px] md:text-[14px] text-[12px]">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:pt-[50px] md:pt-[30px] pt-[20px] lg:px-[50px] md:px-[30px] px-[20px] pb-10">
        <div
          style={{
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <img
            src="/assets-v2/banner/about-1.png"
            alt="about-1"
            style={{
              height: "100%",
              maxWidth: "100%",
              width: setSize("100%", "100%", "100%"),
              display: "inline-block",
            }}
          />
          <img
            src="/assets-v2/banner/about-2.png"
            alt="about-2"
            style={{
              height: "100%",
              maxWidth: "100%",
              width: setSize("100%", "100%", "100%"),
              display: "inline-block",
            }}
            className="lg:mt-8 md:mt-5 mt-3"
          />
        </div>
      </div>
      {/* <div className="fixed bottom-0 w-full">
        <div className="bg-[#FF6B00] font-[Noto Sans KR] text-white flex justify-center space-x-5 lg:p-2 md:p-1 p-1 lg:text-[12px] md:text-[10px] text-[8px]">
          <div>© 2025</div>
          <div>KDOSIRAK</div>
          <div>ALL RIGHTS RESERVED</div>
        </div>
      </div> */}

      {/* </ConfigComp> */}
    </>
  );
}
