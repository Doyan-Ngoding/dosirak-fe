import React, { useEffect, useRef, useState } from 'react'
import LayoutComp from '../../global/layout'
import HeaderOrder from './header'
import CategoryMenu from '../../global/menu/categoryMenu'
import { useMenu } from '../../../context/MenuContext'
import CardMenu from '../../global/menu/cardMenu'
import { 
    Anchor,
    Col,
    ConfigProvider,
    Input,
    Layout,
    Row,
    Select, 
} from 'antd'
import SiderOrder from './sider'
import { useOrder } from '../../../context/OrderContext'
import { useAuth } from '../../../context/AuthContext'
import ContentListComp from '../menu/contentList'
import LoginStandard from '../../global/modal/loginStandard'
import ForgotStandard from '../../global/modal/forgotStandard'
import VerifyStandard from '../../global/modal/verifyStandard'
import ResetStandard from '../../global/modal/resetStandard'
import SignupStandard from '../../global/modal/signupStandard'
import LoginMobile from '../../global/modal/loginMobile'
import ForgotMobile from '../../global/modal/forgotMobile'
import VerifyMobile from '../../global/modal/verifyMobile'
import ResetMobile from '../../global/modal/resetMobile'
import SignupMobile from '../../global/modal/signupMobile'
import { useRestaurant } from '../../../context/RestaurantContext'
import { IconCircleChevronDownFilled, IconPaperBag, IconSearch, IconXboxXFilled } from '@tabler/icons-react'
import CardMenuHome from '../../global/menu/cardMenuHome'
const { Header, Content, Footer, Sider } = Layout;

export default function OrderComp() {

    const {
        listMenuGroupedCategory,
        tabCategory, 
        tabRestaurant,
        listMenuGroupedRestaurant,
        listMenu,
    } = useMenu();

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        cart, setCart,
        selectedResto,
        addressUserCurr,
    } = useOrder();

    const {
        listNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
        listSubRestaurant, setListSubRestaurant,
        selectedSubRestaurant, setSelectedSubRestaurant,
        subRestoAddress, setSubRestoAddress,
        getDetailSubRestaurant,
        currSelectedResto,
    } = useRestaurant()

    const {
        modalLogin, setModalLogin,
        modalSignup, setModalSignup,
        modalOtp, setModalOtp,
        modalReset, setModalReset,
        modalForgot, setModalForgot,
        setSize,
        isMobile,
        handleLogin,
        handleRegister,
        authUser,
        isLoading,
        token
    } = useAuth();

    const addedToCart = (menuItem) => { 
        setSelectedMenu(
            (prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.id === menuItem.id
                        ? { ...item, qty: item.qty + 1, subTotal: (item.qty + 1) * item.price }
                        : item
                );
                const isExisting = prevCart.find((item) => item.id === menuItem.id);
            
                if (!isExisting) {
                    updatedCart.push({ ...menuItem, qty: 1, subTotal: menuItem.price });
                }
                
                return updatedCart;                
            }
        )
    }

    useEffect(() => {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        setCart(selectedMenu)
    }, [selectedMenu]);
   
    const [searchText, setSearchText] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    const [currTabResto, setCurrTabResto] = useState([]);

    useEffect(() => {
        setFilteredData(
            currTabResto ? (
                listMenuGroupedRestaurant
                .map((category) => {
                    const filteredMenu = category.menu.filter(
                        (menuItem) =>
                            currTabResto.includes(menuItem.restaurant_name)
                    );
    
                    return filteredMenu.length > 0 ? { ...category, menu: filteredMenu } : null;
                })
                .filter(Boolean)
            ) : (
                listMenuGroupedRestaurant
            )
        )
    }, [listMenuGroupedRestaurant, currTabResto]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
    
        if (!value || value === null) {
            setFilteredData(
                selectedResto ? (
                    listMenuGroupedRestaurant
                    .map((category) => {
                        const filteredMenu = category.menu.filter(
                            (menuItem) =>
                                menuItem.restaurant_name.includes(selectedResto)
                        );
        
                        return filteredMenu.length > 0 ? { ...category, menu: filteredMenu } : null;
                    })
                    .filter(Boolean)
                ) : (
                    listMenuGroupedRestaurant
                )
            );
            return;
        }
        
        const filtered = listMenuGroupedRestaurant
        .map((category) => {
            const filteredMenu = category.menu.filter(
                (menuItem) =>
                    menuItem.name.toLowerCase().includes(value) ||
                    menuItem.description.toLowerCase().includes(value) 
                    // menuItem.restaurant_name.toLowerCase().includes(value)
            );

            return filteredMenu.length > 0 ? { ...category, menu: filteredMenu } : null;
        })
        .filter(Boolean);
    
        setFilteredData(filtered);
    };

    const handleSearchResto = (e) => {
        const value = e.toLowerCase();
    
        if (!value || value === null) {
            setFilteredData(listMenuGroupedRestaurant);
            return;
        }
        
        const filtered = listMenuGroupedRestaurant
        .map((category) => {
            const filteredMenu = category.menu.filter(
                (menuItem) =>
                    menuItem.restaurant_name.toLowerCase().includes(value)
            );

            return filteredMenu.length > 0 ? { ...category, menu: filteredMenu } : null;
        })
        .filter(Boolean);
    
        setFilteredData(filtered);
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    useEffect(() => {
        setCurrTabResto(
            (localStorage.getItem("selectedResto") && typeof localStorage.getItem("selectedResto") === "string") ? [selectedResto] 
            : (
                tabRestaurant ? tabRestaurant : []
            )
        )
    }, [localStorage.getItem("selectedResto"), tabRestaurant]);

    // console.log(addressUserCurr, 'disni');
    
    // function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //     const R = 6371;
    //     const dLat = (lat2 - lat1) * Math.PI / 180;
    //     const dLon = (lon2 - lon1) * Math.PI / 180;
    //     const a =
    //       Math.sin(dLat/2) * Math.sin(dLat/2) +
    //       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    //       Math.sin(dLon/2) * Math.sin(dLon/2)
    //     ;
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //     return R * c;
    // }

    // const userLat = addressUserCurr.coordinates.lat;  
    // const userLon = addressUserCurr.coordinates.lng; 
    // let nearestResto = null;
    // let minDistance = Infinity;

    // listSubRestaurant.forEach(resto => {
    // const distance = getDistanceFromLatLonInKm(userLat, userLon, resto.latitude, resto.longitude);
    // if (distance < minDistance) {
    //     minDistance = distance;
    //     nearestResto = resto;
    // }
    // });

    // console.log(nearestResto, minDistance);

    return (
        <>
            <LayoutComp>
                <Row
                    style={{
                        backgroundColor: '#F4F6F9'
                    }}
                >
                    <Col
                        span={selectedMenu.length > 0 ? setSize(18, 16, 24) : 24}
                        style={{
                            backgroundColor: "#ffffff"
                        }}
                    >
                        <div
                            style={{
                            padding: setSize("50px 80px", "30px 50px", "30px")
                            }}
                        >
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Select: {
                                            // fontSizeIcon: setSize(24, 10, 8),
                                            colorText: '#FFFFFF'
                                        }
                                    }
                                }}
                            >
                                <Row
                                    align={'bottom'}
                                    justify={'space-between'}
                                    className='lg:mb-14 md:mb-10 mb-10'
                                >
                                    <Col
                                        span={setSize(12, 24, 24)}
                                    >
                                        <div
                                            className='text-[#6B6B6B80] text-[20px] font-semibold'
                                        >
                                            Our Menu
                                        </div>
                                        <div
                                            className='title'
                                        >
                                            READY TO ORDER?
                                        </div>
                                    </Col>
                                    {
                                        isMobile && selectedMenu.length > 0 && (
                                            <Col
                                                span={setSize(6, 8, 24)}
                                                style={{
                                                    top: "20px",  
                                                }}
                                            >
                                                <SiderOrder /> 
                                            </Col>
                                        )
                                    }
                                    <Col
                                        span={setSize(12, 24, 24)}
                                        className='mt-10'
                                    >
                                        <Row
                                            justify={setSize("end", "end", "start")}
                                            align={"bottom"}
                                        >
                                            <Col
                                                className='lg:w-[50%] md:w-[40%] w-[100%]'
                                            >
                                                <Select
                                                    placeholder={'Select restaurant near you'}
                                                    allowClear={false}
                                                    options={
                                                        listSubRestaurant.map(val => ({
                                                            label: val.name, 
                                                            value: val.id
                                                        }))
                                                    }
                                                    value={currSelectedResto ? currSelectedResto : selectedSubRestaurant}
                                                    onChange={(e) => {setSelectedSubRestaurant(e), getDetailSubRestaurant((e))}}
                                                    className='lg:w-[95%] md:w-[90%] w-[100%] texxt-white'
                                                    suffixIcon={
                                                        <IconCircleChevronDownFilled 
                                                            color='#FFFFFF'
                                                            size={setSize(30, 28, 26)}
                                                        />
                                                    }
                                                />
                                            </Col>
                                            <Col
                                                className='lg:w-[45%] md:w-[40%] w-[100%]'
                                            >
                                                <Input 
                                                    placeholder='Search your menu here'
                                                    style={{ borderRadius: 50 }}
                                                    className='lg:w-[100%] md:w-[100%] w-[100%] rounded-[50px] lg:mt-0 md:mt-0 mt-5'
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    suffix={
                                                        <div
                                                            className='bg-[#FA5523] rounded-full lg:py-1.5 px-1.5 py-[5px]'
                                                        >
                                                            <IconSearch 
                                                                color='#FFFFFF'
                                                                size={setSize(20, 16, 14)}
                                                            />
                                                        </div>  
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </ConfigProvider>
                            <div
                                className="sticky lg:top-[75px] md:top-[65px] top-[55px] z-1 bg-white w-auto text-[Plus Jakarta Sans]"
                            >
                                <div
                                    className="overflow-x-auto whitespace-nowrap custom-scroll border-b border-gray-500 mb-5"
                                >
                                    <Anchor
                                        direction="horizontal"
                                        className="inline-flex space-x-4"
                                        targetOffset={150}
                                        items={
                                            currTabResto ? currTabResto.map((value) => ({
                                                key: value,
                                                href: '#'+value,
                                                title: value,
                                            })) : []
                                        }
                                    />
                                </div>
                            </div>
                            {
                                filteredData.map((value) => (
                                    <>
                                        <div
                                            id={value.restaurant} 
                                            className='pb-20'
                                        >
                                            <div
                                                className='lg:text-3xl md:text-2xl text-lg text-[#6B6B6B] font-semibold'
                                            >
                                                {value.restaurant} Menu, 
                                            </div>
                                            <div
                                                className='bg-[#FFD39A] font-[Plus Jakarta Sans] flex justify-center items-center w-[100%] m-auto lg:text-[16px] lg:py-2 lg:px-10 md:text-[12px] md:py-1.5 md:px-8 text-[9px] py-1 px-3 lg:rounded-[8px] md:rounded-[8px] rounded-[4px] my-3' 
                                            >
                                                <IconPaperBag size={setSize(22, 18, 14)} style={{ marginRight: setSize(10, 8, 5) }} /> For your convenience, please ensure your order comprises at least 15 meals.
                                            </div>
                                            <Row
                                                className='pt-5'
                                                gutter={[28, 28]}
                                            >
                                                {
                                                    value.menu.map((value, key) => (
                                                        <>
                                                            <Col
                                                                span={
                                                                    setSize(selectedMenu.length > 0 ? 8 : 6, selectedMenu.length > 0 ? 12 : 8, 12)
                                                                }
                                                            >
                                                                <CardMenuHome 
                                                                    image={value.image}
                                                                    restaurant={value.restaurant_name}
                                                                    title={value.name}
                                                                    desc={value.description}
                                                                    price={value.price || (Number(JSON.parse(value.variant)[0].sizes[0]?.base_price) || 0)}
                                                                    stock={value.qty}
                                                                    showResto={false}
                                                                    id_menu={value.id}
                                                                    addToCart={() => {addedToCart(value)}}
                                                                    detail={value}
                                                                    isParent={value.is_parent_menu}
                                                                />
                                                            </Col>
                                                        </>
                                                    ))
                                                }
                                            </Row>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </Col>
                    {
                        !isMobile && selectedMenu.length > 0 && (
                            <Col
                                span={setSize(6, 8, 24)}
                                style={{
                                    position: "sticky",
                                    top: "75px", 
                                    height: "100%", 
                                    overflowY: "auto", 
                                }}
                            >
                                <SiderOrder /> 
                            </Col>
                        )
                    }
                </Row>
                <style>
                {`
                    .ant-anchor-link {
                        width: ${setSize('200px', '150px', '100px')};
                        text-align: center;
                        display: inline-block;
                        transition: all 0.3s ease;
                        white-space: nowrap;
                    }

                    .ant-anchor-link-active > a {
                        background-color: rgba(255, 69, 0, 0.1);
                        color: #ff4500; 
                        width: ${setSize('200px', '150px', '100px')};
                        border-radius: 0px;
                        display: inline-block;
                        text-align: center;
                        font-weight: 700;
                    }
                `}
                </style>
                {
                    !isMobile ? (
                        <>
                            <LoginStandard 
                                isOpen={modalLogin}
                                setIsOpen={setModalLogin}
                                action={handleLogin}
                                loading={isLoading}
                            />
                            <ForgotStandard 
                                isOpen={modalForgot}
                                setIsOpen={setModalForgot}
                            />
                            <VerifyStandard 
                                isOpen={modalOtp}
                                setIsOpen={setModalOtp}
                            />
                            <ResetStandard 
                                isOpen={modalReset}
                                setIsOpen={setModalReset}
                            />
                            <SignupStandard 
                                isOpen={modalSignup}
                                setIsOpen={setModalSignup}
                            />
                        </>
                    ) : (
                        <>
                            <LoginMobile 
                                isOpen={modalLogin}
                                setIsOpen={setModalLogin}
                                action={handleLogin}
                                loading={isLoading}
                            />
                            <ForgotMobile 
                                isOpen={modalForgot}
                                setIsOpen={setModalForgot}
                            />
                            <VerifyMobile 
                                isOpen={modalOtp}
                                setIsOpen={setModalOtp}
                            />
                            <ResetMobile 
                                isOpen={modalReset}
                                setIsOpen={setModalReset}
                            />
                            <SignupMobile 
                                isOpen={modalSignup}
                                setIsOpen={setModalSignup}
                            />
                        </>
                    )
                }
            </LayoutComp>
        </>
    )
}
