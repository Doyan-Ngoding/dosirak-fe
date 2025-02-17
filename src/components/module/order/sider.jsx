import React, { useEffect } from 'react'
import CardTitle from '../../global/title/cardTitle'
import CardMenuCart from '../../global/menu/cardMenuCart'
import CardTotal from '../../global/menu/cardTotal'
import { useOrder } from '../../../context/OrderContext'
import { useAuth } from '../../../context/AuthContext'

export default function SiderOrder() {

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
    } = useOrder();

    const {
        isLogin,
        modalLogin, setModalLogin
    } = useAuth();

    const addQty = (id) => {
        setSelectedMenu((prevCart) => 
            prevCart.map((item) => 
                item.id === id
                    ? { ...item, qty: item.qty + 1, subTotal: (item.qty + 1) * item.price }
                    : item
            )
        );
    };

    const subQty = (id) => {
        setSelectedMenu((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id
                    ? { ...item, qty: item.qty - 1, subTotal: (item.qty - 1) * item.price }
                    : item
            ).filter((item) => item.qty > 0); 
            return updatedCart;
        });
    };

    const onCheckout = () => {
        isLogin ? console.log('yes') : console.log('no')
        
    }

    useEffect(() => {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        localStorage.getItem('cart') ? localStorage.removeItem('cart') : localStorage.setItem('cart', JSON.stringify(selectedMenu));
    }, [selectedMenu]);

    return (
        <>
            <div
                style={{
                    backgroundColor: '#F4F6F9',
                    height: '100%',
                    padding: 16
                }}
            >
                <CardTitle 
                    title={'ORDER LIST'}
                />
                {
                    selectedMenu.length > 0 && (
                        selectedMenu.map(value => (
                            <CardMenuCart 
                                image={value.image}
                                title={value.name}
                                price={value.price}
                                qty={value.qty}
                                addQty={() => addQty(value.id)}
                                subQty={() => subQty(value.id)}
                            />
                        ))
                    )
                }
                <CardTotal 
                    title={'Subtotal'}
                    total={subTotal}
                    titleAction={'Checkout'}
                    action={onCheckout}
                />
            </div>
        </>
    )
}
