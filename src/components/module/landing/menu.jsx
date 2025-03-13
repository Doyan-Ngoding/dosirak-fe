import React, { useEffect, useState } from 'react'
import { useRestaurant } from '../../../context/RestaurantContext'
import { Alert, Button, Col, ConfigProvider, DatePicker, Input, Row, Select } from 'antd'
import { useAuth } from '../../../context/AuthContext';
import { IconCalendarWeek, IconChevronDown, IconChevronRight, IconClock, IconMapPinFilled, IconNotes, IconRosetteFilled, IconSearch, IconToolsKitchen2, IconX, IconXboxXFilled } from '@tabler/icons-react';
import { useMenu } from '../../../context/MenuContext';
import CardMenu from '../../global/menu/cardMenu';
import CardMenuHome from '../../global/menu/cardMenuHome';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useOrder } from '../../../context/OrderContext';
import PreviewMenu from '../../global/modal/previewMenu';

export default function MenuComp() {

    const {
        listNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
        selectedRestaurant, setSelectedRestaurant
    } = useRestaurant();

    const {
        setSize,
        isMobile
    } = useAuth()

    const {
        listMenu,
        listCategory,
        selectedCategory, setSelectedCategory,
    } = useMenu()

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        cart, setCart,
        setSelectedDate,
        selectedTempDate, setSelectedTempDate,
        selectedTempTime, setSelectedTempTime,
        selectedResto, setSelectedResto,
    } = useOrder()

    const navigate = useNavigate()

    const disabledDate = (current) => {
        return current && current < dayjs().add(1, 'day').endOf('day');
    };

    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);


    // const [selectedDate, setSelectedDate] = useState(null);

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

    const [filteredData, setFilteredData] = useState([]);

    const [searchTextResto, setSearchTextResto] = useState(null);
    const [filteredResto, setFilteredResto] = useState([]);

    useEffect(() => {
        setFilteredData(listMenu.filter((item) => 
            item.restaurant_name.includes(selectedRestaurant)
        ))
    }, [listMenu, selectedRestaurant]);

    const handleSearchResto = (e) => {
        const value = e.toLowerCase();
    
        if (!value || value === null) {
            setFilteredData(listMenu);
            return;
        }
        
        const filtered = listMenu.filter((item) => 
            item.restaurant_name.toLowerCase().includes(value)
        );
    
        setFilteredData(filtered);
    };

    useEffect(() => {
        setFilteredResto(listNearRestaurant)
    }, [listNearRestaurant]);

    const handleSearchRestos = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTextResto(value);
    
        if (!value || value === null) {
            setFilteredResto(listNearRestaurant);
            return;
        }
        
        const filtered = listNearRestaurant.filter((item) => 
            item.name.toLowerCase().includes(value)
        );
    
        setFilteredResto(filtered);
    };

    const handleSearchCatrgory = (e) => {
        if (!e || e === null ) {
            setFilteredData(listMenu);
            return;
        }
        const value = e.toLowerCase();

        const filtered = listMenu.filter((item) => 
            item.category_name.toLowerCase().includes(value)
            && item.restaurant_name.includes(selectedRestaurant)
        );
    
        setFilteredData(filtered);
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
                className='lg:py-[100px] md:py-[80px] py-[50px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    className='text-[#A5ABB3] leading-1 font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    OUR MENU
                </div>
                <div 
                    className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                >
                    EXPERIENCE THE TASTE OF
                </div>
                <div 
                    className='text-[#E83600] leading-3 bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                >
                    KOREA IN EVERY BITE
                </div>
                <div 
                    className='border-b border-[#A5ABB3] lg:my-10 md:my-8 my-5'
                />
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
                                controlHeight: setSize(38, 24, 10),
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
                                    listCategory.map(val => ({
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
                <div
                    className='text-[#858C94] bebas-neue-regular lg:text-[40px] md:text-[20px] text-[14px]'
                >
                    {selectedCategory && selectedCategory.toUpperCase()}
                </div>
                <div
                    className='flex justify-between items-center lg:gap-5 md:gap-5 gap-2'
                >
                    <div
                        className='lg:w-[25%] md:w-[30%] w-[50%]'
                    >
                        <Input
                            size={setSize('large', 'small', 'small')}
                            placeholder='Search your Favorite Restaurant here'
                            style={{
                                width: '100%',
                                borderRadius: '50px',
                                padding: setSize(10, 4, 3),
                                fontSize: setSize(16, 10, 8)
                            }}
                            suffix={
                                <IconSearch 
                                    style={{
                                        backgroundColor: '#6B6B6B',
                                        color: '#FFFFFF',
                                        borderRadius: 50,
                                        padding: setSize(4, 4, 2),
                                    }}
                                    size={setSize(30, 18, 13)}
                                />
                            }
                            value={searchTextResto}
                            onChange={handleSearchRestos}
                        />  
                    </div>
                    <div
                        className='flex gap-2 lg:w-[75%] md:w-[70%] w-[50%] overflow-x-auto no-scrollbar'
                    >
                        {
                            listNearRestaurant && filteredResto.map((value) => (
                                <Button
                                    size={setSize('large', 'small', 'small')}
                                    style={{
                                        borderRadius: 50,
                                        color: selectedRestaurant === value.name ? '#FFFFFF' : '#287D3C',
                                        borderColor: '#287D3C',
                                        padding: setSize('0px 25px', '0px 10px', '0px 8px'),
                                        backgroundColor: selectedRestaurant === value.name && '#287D3C',
                                        fontSize: setSize(18, 12, 8),
                                    }}
                                    onClick={() => {setSelectedRestaurant(value.name), handleSearchResto(value.name)}}
                                    icon={
                                        selectedRestaurant === value.name && <IconMapPinFilled size={setSize(24, 14, 14)} style={{ marginTop: 2}} />
                                    }
                                >
                                    {value.name}
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div
                    className='lg:mt-10 md:mt-8 mt-5'
                >
                    <Row
                        justify={'center'}
                        align={"center"}
                        gutter={[12, 12]}
                    >
                        {
                            filteredData && filteredData.slice(0, 4).map((value) => (
                                <Col
                                    span={setSize(5, 5, 8)}
                                >
                                    <CardMenuHome 
                                        image={value.image}
                                        restaurant={value.restaurant_name}
                                        title={value.name}
                                        desc={value.description}
                                        price={value.price}
                                        stock={value.qty}
                                        showResto={false}
                                        id_menu={value.id}
                                        addToCart={() => {addedToCart(value)}}
                                        detail={value}
                                    />
                                </Col>
                            ))
                        }
                        <Col
                            span={setSize(4, 4, 8)}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                className='relative w-[100%] lg:h-[200px] md:h-[100px] h-[100px]' 
                            >
                                <IconRosetteFilled 
                                    color='#E83600'
                                    size={setSize(180, 100, 100)}
                                    className='absolute'
                                    onClick={() => {navigate('/menu')}}
                                />
                               <div
                                    className='font-[Thunder] font-bold text-white lg:text-[36px] md:text-[24px] text-[24px] absolute lg:top-13 lg:left-14 md:top-6 top-6 md:left-6 left-6'
                                    onClick={() => navigate('/menu')}
                                >
                                    <div>SEE ALL</div>
                                    <div className='leading-[10px]'>MENU</div>
                               </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
