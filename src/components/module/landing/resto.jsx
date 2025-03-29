import React from 'react'
import { useRestaurant } from '../../../context/RestaurantContext'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';

export default function RestoComp() {

    const navigate = useNavigate();

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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    padding: '20px 10px 10px 10px',
                    overflowX: 'auto', 
                    whiteSpace: 'nowrap', 
                    gap: '20px' 
                }}
            >
                {
                    listNearRestaurant && listNearRestaurant.map((value, key) => (
                        <>
                            <div
                               key={key}
                               style={{
                                   width: setSize('180px', '150px', '120px'),
                                   height: setSize('80px', '50px', '40px'),
                                   display: 'flex',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   overflow: 'hidden',
                                   cursor: 'pointer'
                               }} 
                               onClick={() => (setSelectedResto(value.name), navigate(`/menu?s=${value.name}`))}
                            >
                                <img 
                                    src={`/assets${value.image}`} 
                                    style={{
                                        width: '100%', 
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                    alt={`Restaurant ${key}`}
                                />
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}
