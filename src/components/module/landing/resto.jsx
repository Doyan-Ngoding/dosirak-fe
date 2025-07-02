import React from "react";
import { useRestaurant } from "../../../context/RestaurantContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../../context/OrderContext";
import { Button, Col } from "antd";
import { IconChevronCompactRight, IconChevronRight } from "@tabler/icons-react";

export default function RestoComp() {
  const navigate = useNavigate();

//   const listNearRestaurant = [
//     {
//       name: "KDosirak",
//     //   image: "https://via.placeholder.com/150",
//     },
//   ];

//   const setSize = (lg, md, sm) => {
//     return lg;
//   };

//   const setSelectedResto = (name) => {
//     console.log("name", name);
//   };

  const {
      listNearRestaurant,
  } = useRestaurant();

  const {
      setSize
  } = useAuth();

  const {
      setSelectedResto
  } = useOrder()

  return (
    <>
      <div className="lg:py-[50px] md:py-[30px] py-[20px] text-center px-10">
        <div className="text-[#818182] leading-1 font-[Noto Sans KR] font-semibold lg:text-[16px] md:text-[14px] text-[10px]">
          What We Serve
        </div>
        <div className="text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px] lg:pt-5 md:pt-4 pt-3">
          Food Tastes Better With KDosirak!
        </div>
        <div className="flex overflow-x-auto space-x-10 w-full no-scrollbar mt-10 lg:justify-center md:justify-center">
          {listNearRestaurant &&
            listNearRestaurant.map((value, key) => (
              <>
                <Col
                  key={key}
                  span={setSize(4, 6, 12)}
                  style={{
                    border: "1px solid lightGrey",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: setSize("250px", "250px", "180px"),
                  }}
                >
                  <div
                    style={{
                      height: setSize("60%", "55%", "55%"),
                      paddingBottom: "15px",
                    }}
                  >
                    <img
                      // src={`/assets/more-resto/${value.name}.png`}
                      src={`${import.meta.env.VITE_API_BE_BASE_URL}/${value.image}`}
                      alt={value.name}
                    //   onError={(e) => {
                    //     e.target.onerror = null;
                    //     e.target.src = `/assets/${value.image}`;
                    //   }}
                      style={{
                        maxWidth: "100%",
                        height: "100%",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      size={setSize("small", "small", "small")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0 auto",
                        borderRadius: 50,
                        color: "#FF6B00",
                        borderColor: "#FF6B00",
                        fontSize: setSize(12, 10, 8),
                      }}
                      onClick={() => (
                        setSelectedResto(value.name),
                        navigate(`/menu?s=${value.name}`)
                      )}
                    >
                      See Restaurant Menu{" "}
                      <IconChevronRight
                        size={setSize(14, 12, 10)}
                        color="#FF6B00"
                      />
                    </Button>
                  </div>
                </Col>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
