import React from 'react'
import { useAuth } from '../../../context/AuthContext'

export default function CardSummary({
    title,
    value
}) {

    const {
        setSize
    } = useAuth()

    const icons = {
        "Total Order": (
            <>
                <div
                    className='bg-[#FEC53D4D] lg:p-3 lg:rounded-[16px] md:p-2 md:rounded-[10px] p-1 rounded-[6px]' 
                >
                    <img src='./assets/icon/sum-1.png' width={setSize(22, 12, 10)} />
                </div>
            </>
        ),
        "Total Revenue": (
            <>
                <div
                    className='bg-[#4AD9914D] lg:p-3.5 lg:rounded-[16px] md:p-2 md:rounded-[10px] p-1 rounded-[6px]'
                >
                    <img src='./assets/icon/sum-2.png' width={setSize(18, 10, 8)} />
                </div>
            </>
        ),
        "Total User": (
            <>
                <div
                    className='bg-[#FF90664D] lg:py-3.5 lg:px-4 lg:rounded-[14px] md:py-2 md:px-2.5 md:rounded-[10px] p-1 rounded-[6px]'
                >
                    <img src='./assets/icon/sum-3.png' width={setSize(18, 10, 8)} />
                </div>
            </>
        ),
        "Total Visitor" : (
            <>
                <div
                    className='bg-[#8280FF4D] lg:py-4 lg:px-3.5 lg:rounded-[14px] md:py-2.5 md:px-2 md:rounded-[10px] py-1.5 px-1 rounded-[6px]'
                >
                    <img src='./assets/icon/sum-4.png' width={setSize(22, 12, 10)} />
                </div>
            </>
        )
    }

    return (
        <>
            <div
                className='flex justify-between items-center lg:rounded-2xl md:rounded-2xl rounded-xl bg-white lg:p-6 md:p-3 p-2'
            >
                <div>
                    <div className='text-[#6B6B6B] font-semibold lg:text-[16px] md:text-[10px] text-[8px]'>
                        {title}
                    </div>
                    <div
                        className='text-[#202224] font-bold lg:text-[24px] lg:pt-4 md:text-[12px] md:pt-2 text-[10px] mt-1'
                    >
                        {title === 'Total Revenue' && 'Rp. '} {value ? parseFloat(value).toLocaleString() : ''}
                    </div>
                </div>
                {icons[title]}
            </div>
        </>
    )
}
