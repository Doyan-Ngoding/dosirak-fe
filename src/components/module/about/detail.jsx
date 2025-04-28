import React from 'react'
import { useAuth } from '../../../context/AuthContext'

export default function DetailComp() {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='lg:pt-[100px] md:pt-[80px] pt-[70px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    style={{
                        margin: '0 auto',
                        textAlign: 'center'
                    }}
                >   
                    <img src="/assets-v2/banner/about-1.png" alt="about-1" style={{ height: '100%', maxWidth: '100%', width: setSize('80%', '80%', '80%'), display: 'inline-block' }} />
                    <img src="/assets-v2/banner/about-2.png" alt="about-2" style={{ height: '100%', maxWidth: '100%', width: setSize('80%', '80%', '80%'), display: 'inline-block' }} className='lg:mt-8 md:mt-5 mt-3'/>
                </div>
            </div>
            <div
                className='fixed bottom-0 w-full'
            >
                <div
                    className='bg-[#FF6B00] font-[Noto Sans KR] text-white flex justify-center space-x-5 lg:p-2 md:p-1 p-1 lg:text-[12px] md:text-[10px] text-[8px]'
                >
                    <div>
                        © 2025
                    </div>
                    <div>
                        KDOSIRAK
                    </div>
                    <div>
                        ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>
        </>
    )
}
