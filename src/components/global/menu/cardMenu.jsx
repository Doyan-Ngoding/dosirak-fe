import { IconChefHat, IconShoppingBagPlus } from '@tabler/icons-react'
import React from 'react'

export default function CardMenu({
    image,
    restaurant,
    title,
    desc,
    price,
    stock,
    addToCart
}) {
    return (
        <>
            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    border: '1.5px solid #D5D5D5'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '15px 15px 0px 0px',
                        height: 200,
                        display: 'flex',
                        alignItems: 'end'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(250, 85, 35, 0.9)',
                            width: '100%',
                            padding: '10px 15px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            <IconChefHat 
                                color='#FFFFFF'
                                size={24}
                            />
                        </div>
                        <div
                            style={{
                                paddingLeft: 10,
                                fontSize: 15,
                            }}
                        >
                            <div
                                style={{
                                    color: '#FFF948',
                                    lineHeight: 0.7
                                }}
                            >
                                Available At
                            </div>
                            <div
                                style={{
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    lineHeight: "1.5em",
                                    height: "1em", 
                                }}
                            >
                                {restaurant} 
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='menu-title'
                >
                    {title}
                </div>
                <div
                    style={{
                        color: '#6B6B6B',
                        fontSize: 18,
                        fontWeight: 300,
                        padding: '0px 15px 15px 15px',
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        lineHeight: "1.5em",
                        height: "3em", 
                        overflow: "hidden",
                    }}
                >
                    {desc}
                </div>
                <div
                    style={{
                        padding: '30px 15px 30px 15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div
                        className='menu-price-1'
                    >
                        Rp. {price ? parseFloat(price).toLocaleString() : '-'}
                    </div>
                    <div
                        style={{
                            paddingRight: 20
                        }}
                    >
                        <IconShoppingBagPlus 
                            size={45}
                            style={{
                                color: '#FFFFFF',
                                borderRadius: 50,
                                padding: 10,
                                cursor: stock && parseInt(stock) > 0 ? 'pointer' : 'not-allowed'
                            }}
                            onClick={addToCart}
                            className='icon-hover-3'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
