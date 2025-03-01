import React from 'react'

export default function ServeComp() {

    return (
        <>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] text-center'
            >
                <div
                    className='text-[#A5ABB3] leading-1 font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    WHAT WE SERVE
                </div>
                <div 
                    className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                >
                    YOUR REALIABLE KOREAN FOOD DELIVERY
                </div>
                <div 
                    className='flex justify-center items-center lg:pt-10 md:pt-8 pt-3'
                >
                    <img src="/assets/cover/serve.png" width={"70%"} alt="serve" />
                </div>
            </div>
        </>
    )
}
