import React, { useEffect, useState } from 'react'
import { Anchor, Breadcrumb, Button, Col, ConfigProvider, DatePicker, Input, Row, Select } from 'antd'
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
        showHistory, setShowHistory
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
        currSelectedResto, setCurrSelectedResto
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

    useEffect(() => {
        if (selectedTempDate && selectedTempTime) {
            setSelectedDate(
                `${dayjs(selectedTempDate && selectedTempDate).subtract(1, 'day').format('YYYY-MM-DD')} ${selectedTempTime && selectedTempTime.slice(0, 2)}:00:00`
            );
        }
    }, [selectedTempDate, selectedTempTime]);

    return (
        <>
            <div
                className='lg:pt-[30px] md:pt-[20px] pt-[15px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#FF6B00',
                        },
                        components: {
                            Select: {
                                colorBgContainer: '#FFFFFF',
                                colorTextPlaceholder: '#84888E',
                                colorText: '#000000',
                                colorBorder: '#A5ABB3',
                                controlHeight: setSize(32, 28, 28),
                                fontSize: setSize(12, 10, 10),
                                borderRadius: 4,
                                colorBgElevated: '#FFFFFF',
                                optionSelectedBg: '#E83600',
                                optionSelectedColor: '#FFFFFF',
                                fontSizeIcon: setSize(12, 10, 8)
                            },
                            DatePicker: {
                                controlHeight: setSize(34, 32, 32),
                                fontSize: setSize(12, 10, 10),
                                borderRadius: 4,
                                colorBorder: '#A5ABB3',
                                fontSizeIcon: setSize(12, 10, 8),
                                cellWidth: setSize(40, 30, 25),
                                colorTextPlaceholder: '#84888E'
                            },
                            Button: {
                                controlHeight: setSize(32, 24, 24),
                                fontSize: setSize(12, 10, 10),
                            },
                        }
                    }}
                >
                    <Row
                        align={"bottom"}
                    >
                        <Col
                            span={setSize(12, 12, 24)}
                        >
                            <div 
                                className='text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px]'
                            >
                                Schedule your delivery time
                            </div>
                            <div
                                className='text-[#818182] leading-3 font-[Noto Sans KR] font-semibold lg:text-[14px] md:text-[12px] text-[10px] pt-1'
                            >
                                Pick the time that works best for you, and we’ll make sure your food arrives fresh and on time
                            </div>
                        </Col>
                        <Col
                            span={setSize(12, 12, 24)}
                        >
                            <Row
                                align={"middle"}
                                gutter={[12, 6]}
                                style={{
                                    marginTop: setSize(0, 0, 10)
                                }}
                            >
                                <Col
                                    span={12}
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
                                                color='#2F2F2F'
                                                size={setSize(14, 12, 10)}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            />
                                        }
                                        suffixIcon={
                                            <IconChevronDown 
                                                color='#FF6B00'
                                                size={setSize(14, 12, 10)}
                                            />
                                        }
                                        clearIcon={
                                            <IconXboxXFilled 
                                                color='#FF6B00'
                                                size={setSize(14, 12, 10)}
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
                                                                className='lg:text-[12px] md:text-[10px] text-[8px] flex justify-start items-center'
                                                            >
                                                                <IconNotes 
                                                                    size={setSize(14, 12, 10)}
                                                                    style={{
                                                                        marginRight: 3
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
                                    span={12}
                                >   
                                    <Select 
                                        allowClear={true}
                                        style={{
                                            width: '100%'
                                        }}
                                        prefix={
                                            <IconClock 
                                                color='#2F2F2F'
                                                size={setSize(14, 12, 10)}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            />
                                        }
                                        suffixIcon={
                                            <IconChevronDown 
                                                color='#FF6B00'
                                                size={setSize(14, 12, 10)}
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
                                                <div className='lg:p-3 md:p-3 p-2'>
                                                    <div
                                                        className='font-[Noto Sans KR] font-semibold text-black lg:text-[14px] lg:pb-3 md:text-[12px] md:pb-2 text-[10px] pb-1'
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
                                                            size={setSize(14, 12, 10)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ConfigProvider>
            </div>
            <div
                className='lg:pt-[50px] md:pt-[30px] pt-[20px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
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
                </div>
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
                                                        value={newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === currSelectedResto) ? currSelectedResto : (newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === selectedSubRestaurant) ? selectedSubRestaurant : undefined)}
                                                        defaultValue={newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === currSelectedResto) ? currSelectedResto : (newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === selectedSubRestaurant) ? selectedSubRestaurant : undefined)}
                                                        onChange={(e) => {setSelectedSubRestaurant(e), getDetailSubRestaurant((e)), setCurrSelectedResto(e)}}
                                                        className='lg:w-[95%] md:w-[90%] w-[100%]'
                                                        style={{
                                                            width: '90%'
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
                                                        span={setSize(6, 8, 12)}
                                                        // style={{
                                                        //     width: '30vw'
                                                        // }}
                                                    >
                                                        <CardMenuHome 
                                                            image={value.image}
                                                            title={value.name}
                                                            desc={value.description}
                                                            restaurant={value.restaurant_name}
                                                            price={value.price || (Number(JSON.parse(value.variant)[0].sizes[0]?.base_price) || 0)} 
                                                            stock={value.qty}
                                                            showResto={false}
                                                            addToCart={() => {addedToCart(value)}}
                                                            isMenu={true}
                                                            id_menu={value.id}
                                                            detail={value}
                                                            isParent={value.is_parent_menu}
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
                </div> */}
                {
                        listMenuGroupedRestaurant && listMenuGroupedRestaurant.map((value, key) => {
                            return (
                                <>
                                    <div
                                        className='pb-10 w-full'
                                    >
                                        <div
                                            style={{ position: 'relative' }}
                                        >
                                            <img src={`/assets-v2/restaurants/banner/${value.restaurant}.png`} style={{ height: setSize('120px', '80px', '60px'), width: '100%', objectFit: 'cover', objectPosition: 'left', borderRadius: 8 }} />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: setSize(18, 10, 8),
                                                    left: setSize(30, 20, 15),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: setSize(30, 20, 10),
                                                    borderRadius: 6,
                                                    color: 'white',
                                                    fontWeight: 800,
                                                }}
                                            >
                                                <div
                                                    style={{ backgroundColor: '#ffffff', borderRadius: '100%', padding: setSize(12, 9, 7) }}
                                                >
                                                    <img src={`/assets/more-resto/${value.restaurant}.png`}  style={{ height: setSize('60px', '40px', '30px'), width: setSize('60px', '40px', '30px') }} />
                                                </div>
                                                <div
                                                    className='lg:text-[18px] md:text-[15px] text-[12px]'
                                                >
                                                    {value.restaurant}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: setSize(45, 25, 15),
                                                    right: setSize(30, 20, 15),
                                                }}
                                            >
                                                <ConfigProvider
                                                    theme={{
                                                        components: {
                                                            Select: {
                                                                colorBgContainer: '#FFFFFF',
                                                                colorTextPlaceholder: '#6B6B6B',
                                                                colorText: '#000000',
                                                                colorBorder: '#A5ABB3',
                                                                controlHeight: setSize(34, 28, 22),
                                                                fontSize: setSize(12, 10, 8),
                                                                borderRadius: 50,
                                                                colorBgElevated: '#FFFFFF',
                                                                optionSelectedBg: '#E83600',
                                                                optionSelectedColor: '#FFFFFF',
                                                                fontSizeIcon: setSize(12, 10, 8)
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
                                                        value={newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === currSelectedResto) ? currSelectedResto : (newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === selectedSubRestaurant) ? selectedSubRestaurant : undefined)}
                                                        defaultValue={newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === currSelectedResto) ? currSelectedResto : (newListSubRestaurant.some(item =>  item.restaurant.name === value.restaurant && item.id === selectedSubRestaurant) ? selectedSubRestaurant : undefined)}
                                                        onChange={(e) => {setSelectedSubRestaurant(e), getDetailSubRestaurant((e)), setCurrSelectedResto(e)}}
                                                        className='lg:w-[95%] md:w-[90%] w-[100%]'
                                                        style={{
                                                            width: setSize('200px', '180px', '120px')
                                                        }}
                                                    />
                                                </ConfigProvider>
                                            </div>
                                        </div>
                                        <div
                                            className='text-center lg:mt-5 md:mt-4 mt-3 text-[#818182] font-bold lg:text-[16px] md:text-[14px] text-[14px]'
                                        >
                                            Menu
                                        </div>
                                        <div
                                            style={{
                                                marginTop: setSize(20, 18, 16)
                                            }}
                                        >
                                            <Row
                                                justify={'center'}
                                                gutter={[16, 12]}
                                            >
                                                {
                                                    value.menu.map((value, key) => {
                                                        const parsedVariant = value.variant ? JSON.parse(value.variant) : [];

                                                        const basePrices = parsedVariant.flatMap(v => v.sizes.map(s => Number(s.base_price)));
                                                    
                                                        const minBasePrice = basePrices.length > 0 ? Math.min(...basePrices) : 0;
                                                        const maxBasePrice = basePrices.length > 0 ? Math.max(...basePrices) : 0;
                                                        return (
                                                            <>
                                                                <Col
                                                                    span={setSize(5, 6, 12)}
                                                                >
                                                                    <CardMenuHome 
                                                                        image={value.image}
                                                                        title={value.name}
                                                                        desc={value.description}
                                                                        restaurant={value.restaurant_name}
                                                                        price={value.price || (minBasePrice)}
                                                                        maxPrice={maxBasePrice || ''}
                                                                        stock={value.qty}
                                                                        showResto={false}
                                                                        addToCart={() => {addedToCart(value)}}
                                                                        isMenu={true}
                                                                        id_menu={value.id}
                                                                        detail={value}
                                                                        isParent={value.is_parent_menu}
                                                                    />
                                                                </Col>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                }
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
