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

    // useEffect(() => {
    //     setFilteredData(listMenu.filter((item) => 
    //         item.restaurant_name.includes(selectedRestaurant)
    //     ))
    // }, [listMenu, selectedRestaurant]);

    // const handleSearchResto = (e) => {
    //     const value = e.toLowerCase();
    
    //     if (!value || value === null) {
    //         setFilteredData(listMenu);
    //         return;
    //     }
        
    //     const filtered = listMenu.filter((item) => 
    //         item.restaurant_name.toLowerCase().includes(value)
    //     );
    
    //     setFilteredData(filtered);
    // };

    // useEffect(() => {
    //     setFilteredResto(listNearRestaurant)
    // }, [listNearRestaurant]);

    // const handleSearchRestos = (e) => {
    //     const value = e.target.value.toLowerCase();
    //     setSearchTextResto(value);
    
    //     if (!value || value === null) {
    //         setFilteredResto(listNearRestaurant);
    //         return;
    //     }
        
    //     const filtered = listNearRestaurant.filter((item) => 
    //         item.name.toLowerCase().includes(value)
    //     );
    
    //     setFilteredResto(filtered);
    // };

    // const handleSearchCatrgory = (e) => {
    //     if (!e || e === null ) {
    //         setFilteredData(listMenu);
    //         return;
    //     }
    //     const value = e.toLowerCase();

    //     const filtered = listMenu.filter((item) => 
    //         item.category_name.toLowerCase().includes(value)
    //         && item.restaurant_name.includes(selectedRestaurant)
    //     );
    
    //     setFilteredData(filtered);
    // };

    
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
                className='lg:py-[50px] md:py-[40px] py-[30px] lg:px-[50px] md:px-[30px] px-[20px]'
            >   
                <div
                    className='text-[#818182] leading-1 font-[Noto Sans KR] font-semibold lg:text-[16px] md:text-[14px] text-[10px]'
                >
                    New Menu
                </div>
                <div 
                    className='text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px] lg:pt-5 md:pt-4 pt-3'
                >
                    View Our Menus
                </div>
                <div
                    className='lg:mt-10 md:mt-8 mt-5'
                >
                    <div
                        className='flex overflow-x-auto space-x-3 w-full no-scrollbar mt-10'
                    >
                        {
                            listMenu && listMenu.map((value) => {
                                const parsedVariant = value.variant ? JSON.parse(value.variant) : [];

                                const basePrices = parsedVariant.flatMap(v => v.sizes.map(s => Number(s.base_price)));
                            
                                const minBasePrice = basePrices.length > 0 ? Math.min(...basePrices) : 0;
                                const maxBasePrice = basePrices.length > 0 ? Math.max(...basePrices) : 0;
                                return (
                                    <Col
                                        span={setSize(4, 5, 8)}
                                    >
                                        <CardMenuHome 
                                            image={value.image}
                                            restaurant={value.restaurant_name}
                                            title={value.name}
                                            desc={value.description}
                                            price={value.price || (minBasePrice)}
                                            maxPrice={maxBasePrice || ''}
                                            stock={value.qty}
                                            showResto={false}
                                            id_menu={value.id}
                                            addToCart={() => {addedToCart(value)}}
                                            detail={value}
                                            isParent={value.is_parent_menu}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
