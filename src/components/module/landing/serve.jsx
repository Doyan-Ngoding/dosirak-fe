import React from 'react'

export default function ServeComp() {

    return (
        <>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] text-center'
            >
                <div
                    className='text-[#A5ABB3] font-[Plus Jakarta Sans] lg:text-[18px] md:text-[14px] text-[8px]'
                >
                    WHAT WE SERVE
                </div>
                <div 
                    className='text-[#E83600] font-[Thunder] font-bold lg:text-[60px] md:text-[30px] text-[18px]'
                >
                    YOUR REALIABLE KOREAN FOOD DELIVERY
                </div>
                <div 
                    className='flex justify-center items-center lg:pt-10 md:pt-8 pt-3'
                >
                    <img src="./assets/cover/serve.png" width={"70%"} alt="serve" />
                </div>
            </div>
        </>
    )
}
