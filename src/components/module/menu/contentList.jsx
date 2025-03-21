import React, { useEffect, useState } from 'react'
import { Anchor, Button, Col, ConfigProvider, DatePicker, Input, Row, Select } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useMenu } from '../../../context/MenuContext';
import SplitTitle from '../../global/split/title';
import CardMenuHome from '../../global/menu/cardMenuHome';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';
import { IconBuildingStore, IconCalendarWeek, IconChevronDown, IconChevronRight, IconClock, IconNotes, IconSearch, IconToolsKitchen2, IconXboxXFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRestaurant } from '../../../context/RestaurantContext';

export default function ContentListComp() {

    const navigate = useNavigate()

    const {
        setSize
    } = useAuth()

    const {
        listMenuGroupedRestaurant,
        tabCategory, 
        tabRestaurant,
        listMenu,
        listCategory,
        selectedCategory, setSelectedCategory,
    } = useMenu();
    
    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        cart, setCart,
        setSelectedDate,
        selectedTempDate, setSelectedTempDate,
        selectedTempTime, setSelectedTempTime,
        selectedResto, setSelectedResto,
    } = useOrder();

    const {
        newListSubRestaurant,
        selectedSubRestaurant, setSelectedSubRestaurant,
        getDetailSubRestaurant,
    } = useRestaurant()

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
        if (selectedMenu && selectedMenu.length > 0) {
            setSelectedResto(selectedMenu[0].restaurant_name)
        } else {
            localStorage.removeItem("selectedResto")
        }
    }, [selectedMenu]);
    
    const disabledDate = (current) => {
        return current && current < dayjs().add(1, 'day').endOf('day');
    };

    const [searchText, setSearchText] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredTab, setFilteredTab] = useState([]);
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);

    useEffect(() => {
        setFilteredData(listMenuGroupedRestaurant)
    }, [listMenuGroupedRestaurant]);

    useEffect(() => {
        setFilteredTab(tabRestaurant)
    }, [tabRestaurant]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
    
        if (!value || value === null) {
            setFilteredData(listMenuGroupedRestaurant);
            setFilteredTab(tabRestaurant)
            return;
        }
        
        const filtered = listMenuGroupedRestaurant.filter((item) => 
            item.restaurant.toLowerCase().includes(value)
        );
        const filteredTabs = tabRestaurant.filter(r => r.toLowerCase().includes(value.toLowerCase()));
    
        setFilteredData(filtered);
        setFilteredTab(filteredTabs)
    };

    return (
        <>
             <div
                className='lg:pt-[100px] md:pt-[80px] pt-[50px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                className='text-[#A5ABB3] font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    WHAT WE SERVE
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                borderRadius: setSize(12, 6, 4),
                                colorBgContainer: '#FFFFFF',
                                colorTextPlaceholder: '#000000',
                                colorText: '#000000',
                                colorBorder: '#D9D9D9',
                                controlHeight: setSize(42, 22, 18),
                                fontSize: setSize(14, 12, 10),
                                colorBgElevated: '#FFFFFF',
                                optionSelectedBg: '#FFFFFF'
                            },
                            Input: {
                                controlHeight: setSize(42, 28, 22),
                                fontSize: setSize(14, 12, 10),
                            }
                        }
                    }}
                >
                    <div
                        className='flex justify-between items-center'
                    >
                        <div
                            className='flex items-center'
                        >
                            <div 
                                className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px] lg:pr-5 md:pr-3 pr-2'
                            >
                                OUR MENU
                            </div>
                        </div>
                        {
                            (
                                <div>
                                    <Input 
                                        placeholder='Search restaurant here'
                                        style={{ borderRadius: 50, width: setSize(350, 250, 200) }}
                                        value={searchText}
                                        onChange={handleSearch}
                                        suffix={
                                            <div
                                                className='bg-[#FA5523] rounded-full lg:py-1 md:py-1 md:px-1 px-1 py-1'
                                            >
                                                <IconSearch 
                                                    color='#FFFFFF'
                                                    size={setSize(16, 10, 8)}
                                                />
                                            </div>  
                                        }
                                        prefix={
                                            <IconBuildingStore 
                                                color='#FA5523'
                                                size={setSize(22, 14, 12)}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            )
                        }
                    </div>
                </ConfigProvider>
            </div>
            <div
                className='lg:pt-[50px] md:pt-[30px] pt-[20px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#E83600',
                        },
                        components: {
                            Select: {
                                colorBgContainer: '#FFFFFF',
                                colorTextPlaceholder: '#6B6B6B',
                                colorText: '#000000',
                                colorBorder: '#A5ABB3',
                                controlHeight: setSize(42, 28, 20),
                                fontSize: setSize(18, 12, 10),
                                borderRadius: setSize(8, 6, 4),
                                colorBgElevated: '#FFFFFF',
                                optionSelectedBg: '#E83600',
                                optionSelectedColor: '#FFFFFF',
                                fontSizeIcon: setSize(14, 10, 8)
                            },
                            DatePicker: {
                                controlHeight: setSize(38, 32, 28),
                                fontSize: setSize(18, 12, 10),
                                borderRadius: setSize(8, 6, 4),
                                colorBorder: '#A5ABB3',
                                fontSizeIcon: setSize(14, 10, 8),
                                cellWidth: setSize(50, 30, 25),
                                colorTextPlaceholder: '#6B6B6B'
                            },
                            Button: {
                                controlHeight: setSize(38, 24, 18),
                                fontSize: setSize(16, 12, 10),
                            }
                        }
                    }}
                >
                    <Row
                        justify={"space-between"}
                        align={"middle"}
                        style={{
                            marginBottom: 12
                        }}
                        gutter={[24, 6]}
                    >
                        <Col
                            span={setSize(8, 8, 24)}
                        >
                            <Select 
                                allowClear={true}
                                style={{
                                    width: '100%'
                                }}
                                prefix={
                                    <IconToolsKitchen2 
                                        color='#FA5523'
                                        size={setSize(24, 14, 12)}
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                }
                                placeholder="Category Menu"
                                options={
                                    listCategory && listCategory.map(val => ({
                                        label: val.name, 
                                        value: val.name
                                    }))
                                }
                                value={selectedCategory}
                                onChange={(e) => {setSelectedCategory(e), setOpenCategory(true)}}
                                open={openCategory}
                                onDropdownVisibleChange={() => setOpenCategory(true)}
                                dropdownRender={(menu) => (
                                    <>
                                        <div 
                                            className='lg:p-5 md:p-3 p-2'
                                        >
                                            <div
                                                className='font-[Source Sans Pro] font-semibold text-black lg:text-[18px] lg:pb-3 md:text-[12px] md:pb-2 text-[10px] pb-1'
                                            >
                                                What Are You Craving?
                                            </div>
                                            <div>
                                                {menu}
                                            </div>
                                            <div
                                                className='lg:mt-3 md:mt-2 mt-1'
                                            >
                                                <Button
                                                    type='primary'
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: 50
                                                    }}
                                                    onClick={() => {setOpenCategory(false), handleSearchCatrgory(selectedCategory)}}
                                                >
                                                    Select Category
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                                optionRender={(option) => (
                                    <>
                                        <div
                                            className='flex justify-between items-center'
                                        >
                                            <div>
                                                {option.data.label}
                                            </div>
                                            <div>
                                                <IconChevronRight 
                                                    size={setSize(24, 18, 12)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            />
                        </Col>
                        <Col
                            span={setSize(8, 8, 12)}
                        >
                            <DatePicker 
                                allowClear={true}
                                showNow={false}
                                value={selectedTempDate && dayjs(selectedTempDate).subtract(1, 'day')}
                                onChange={(e) => {setSelectedTempDate(dayjs(e).add(1, 'day')), setOpenDate(true)}}
                                open={openDate}
                                onOpenChange={() => setOpenDate(true)}
                                style={{
                                    width: '100%'
                                }}
                                format={"dddd, DD MMM YYYY"}
                                prefix={
                                    <IconCalendarWeek 
                                        color='#FA5523'
                                        size={setSize(24, 14, 12)}
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                }
                                suffixIcon={
                                    <IconChevronDown 
                                        size={setSize(24, 14, 12)}
                                    />
                                }
                                clearIcon={
                                    <IconXboxXFilled 
                                        size={setSize(18, 12, 12)}
                                    />
                                }
                                placeholder='Order Date'
                                disabledDate={disabledDate} 
                                width={"100%"}
                                panelRender={(date) => (
                                    <div>
                                        {
                                            openAlert && (
                                                <div
                                                    className='flex justify-between items-center bg-[#FFD39A] lg:m-3 md:m-2 m-2 lg:rounded-[8px] md:rounded-[6px] rounded-[4px] px-2 py-1.5'
                                                >
                                                    <div
                                                        className='lg:text-[15px] md:text-[10px] text-[8px] flex justify-start items-center'
                                                    >
                                                        <IconNotes 
                                                            size={setSize(20, 14, 12)}
                                                            style={{
                                                                marginRight: 2
                                                            }}
                                                        />
                                                        Please place orders at least 2 days before
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div>
                                            {date}
                                        </div>
                                        <div
                                            className='lg:px-5 md:px-3 px-2 pb-2'
                                        >
                                            <Button
                                                type='primary'
                                                style={{
                                                    width: '100%',
                                                    borderRadius: 50
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
                        <Col
                            span={setSize(8, 8, 12)}
                        >   
                            <Select 
                                allowClear={true}
                                style={{
                                    width: '100%'
                                }}
                                prefix={
                                    <IconClock 
                                        color='#FA5523'
                                        size={setSize(24, 14, 12)}
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                }
                                placeholder="Delivery Time"
                                options={[
                                    { value: '08.00 - 09.00', label: '08.00 - 09.00' },
                                    { value: '09.00 - 10.00', label: '09.00 - 10.00' },
                                    { value: '10.00 - 11.00', label: '10.00 - 11.00' },
                                    { value: '11.00 - 12.00', label: '11.00 - 12.00' },
                                    { value: '12.00 - 13.00', label: '12.00 - 13.00' },
                                    { value: '13.00 - 14.00', label: '13.00 - 14.00' },
                                ]}
                                open={openTime}
                                onDropdownVisibleChange={() => setOpenTime(true)}
                                onChange={(e) => {setOpenTime(true), setSelectedTempTime(e)}}
                                value={selectedTempTime}
                                dropdownRender={(menu) => (
                                    <>
                                        <div className='lg:p-5 md:p-3 p-2'>
                                            <div
                                                className='font-[Source Sans Pro] font-semibold text-black lg:text-[18px] lg:pb-3 md:text-[12px] md:pb-2 text-[10px] pb-1'
                                            >
                                                Select Time Delivery
                                            </div>
                                            <div>
                                                {menu}
                                            </div>
                                            <div
                                                className='lg:mt-3 md:mt-2 mt-1'
                                            >
                                                <Button
                                                    type='primary'
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: 50
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
                                        <div
                                            className='flex justify-between items-center'
                                        >
                                            <div>
                                                {option.data.label}
                                            </div>
                                            <div>
                                                <IconChevronRight 
                                                    size={setSize(24, 18, 12)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            />
                        </Col>
                    </Row>
                </ConfigProvider>
                {/* <div
                    className="sticky lg:top-[68px] md:top-[50px] top-[35px] z-10 bg-white w-auto text-[Plus Jakarta Sans]"
                >
                    <div
                        className="overflow-x-auto whitespace-nowrap custom-scroll border-b border-gray-500"
                    >
                        <Anchor
                            direction="horizontal"
                            className="inline-flex space-x-4"
                            targetOffset={15}
                            items={
                                tabRestaurant ? filteredTab.map((value) => ({
                                    key: value,
                                    href: '#'+value,
                                    title: value,
                                })) : []
                            }
                        />
                    </div>
                </div> */}
                <div
                    // className='lg:pt-10 md:pt-7 pt-5'
                >
                    {
                        listMenuGroupedRestaurant && filteredData.map((value, key) => (
                            <>
                                <div
                                    id={value.restaurant}
                                    style={{
                                        borderBottom: '1px solid darkgrey'
                                    }}
                                >
                                    <div
                                        // justify={'start'}
                                        // align={'middle'}
                                        // gutter={[12, 12]}
                                        style={{
                                            paddingBottom: setSize(60, 40, 30),
                                            paddingTop: setSize(60, 40, 30),
                                            display: 'flex',
                                            // margin: 'auto'
                                        }}
                                    >
                                        <Col
                                            span={setSize(6, 6, 8)}
                                            style={{
                                                position: 'relative',
                                                zIndex: 10,
                                                margin: 'auto'
                                            }}
                                        >
                                            <div
                                                className="flex items-center justify-center m-auto border border-[#E83600] w-fit rounded-[50%] lg:p-5 md:p-3 p-2"
                                                style={{
                                                    height: setSize(120, 70, 50),
                                                    width: setSize(120, 70, 50),
                                                }}
                                            >
                                                <img src={`/assets${value.restaurant_image}`} style={{ width: setSize(120, 70, 50) }}  />
                                            </div>   
                                            <div
                                                className='text-center text-[#E83600] lg:py-5 lg:text-[30px] md:py-2 md:text-[20px] py-2 text-[16px]'
                                                style={{
                                                    fontFamily: 'Bebas Neue'
                                                }}
                                            >
                                                {value.restaurant}
                                            </div>
                                            <div
                                                className="flex items-center justify-center"
                                            >
                                                <ConfigProvider
                                                    theme={{
                                                        components: {
                                                            Select: {
                                                                colorBgContainer: '#FFFFFF',
                                                                colorTextPlaceholder: '#6B6B6B',
                                                                colorText: '#000000',
                                                                colorBorder: '#A5ABB3',
                                                                controlHeight: setSize(42, 28, 20),
                                                                fontSize: setSize(14, 10, 8),
                                                                borderRadius: 50,
                                                                colorBgElevated: '#FFFFFF',
                                                                optionSelectedBg: '#E83600',
                                                                optionSelectedColor: '#FFFFFF',
                                                                fontSizeIcon: setSize(14, 10, 8)
                                                            },
                                                        }
                                                    }}
                                                >
                                                    <Select 
                                                        placeholder="Select branch near you"
                                                        options={
                                                            newListSubRestaurant.filter(item => item.restaurant.name === value.restaurant).map(val => ({
                                                                label: val.name, 
                                                                value: val.id
                                                            }))
                                                        }
                                                        value={newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === selectedSubRestaurant) ? selectedSubRestaurant : undefined}
                                                        defaultValue={newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === selectedSubRestaurant) ? selectedSubRestaurant : undefined}
                                                        onChange={(e) => {setSelectedSubRestaurant(e), getDetailSubRestaurant((e))}}
                                                        className='lg:w-[95%] md:w-[90%] w-[100%]'
                                                        style={{
                                                            width: 'auto'
                                                        }}
                                                    />
                                                </ConfigProvider>
                                            </div>
                                        </Col>
                                        <div
                                            className='flex overflow-x-auto space-x-4 pb-4 w-full custom-scrolls'
                                        >
                                            {
                                                value.menu.map((value, key) => (
                                                    <Col
                                                        span={setSize(6, 6, 12)}
                                                        // style={{
                                                        //     width: '30vw'
                                                        // }}
                                                    >
                                                        <CardMenuHome 
                                                            image={value.image}
                                                            title={value.name}
                                                            desc={value.description}
                                                            restaurant={value.restaurant_name}
                                                            price={value.price}
                                                            stock={value.qty}
                                                            showResto={false}
                                                            addToCart={() => {addedToCart(value)}}
                                                            isMenu={true}
                                                            id_menu={value.id}
                                                            detail={value}
                                                        />
                                                    </Col>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
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
            </div>
        </>
    )
}
