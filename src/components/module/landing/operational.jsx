import React from 'react'
import { IconAlarm, IconPaperBag } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function OperationalComp() {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='bg-[#E836001A] lg:py-[100px] md:py-[80px] py-[50px] lg:px-[50px] md:px-[30px] px-[20px] max-w-full w-full text-center'
            >
                <div
                    className='text-[#A5ABB3] font-[Plus Jakarta Sans] lg:text-[18px] md:text-[14px] text-[8px]'
                >
                    OPERATIONAL HOUR
                </div>
                <div 
                    className='text-[#E83600] font-[Thunder] font-bold lg:text-[60px] md:text-[30px] text-[18px]'
                >
                    COME & VISIT US
                </div>
                <div
                    className='flex justify-center lg:pt-10 md:pt-8 pt-5 text-left'
                >
                    <div
                        className='bg-white lg:w-[300px] md:w-[200px] w-[150px] lg:p-10 md:p-5 p-3 lg:h-[600px] md:h-[400px] h-[300px] rounded-xl font-[Plus Jakarta Sans]'
                    >
                        <IconPaperBag 
                            color='#6B6B6B'
                            size={setSize(60, 50, 30)}
                        />
                        <div className='lg:mt-5 md:mt-4 mt-2 text-[#6B6B6B] font-semibold lg:text-[18px] md:text-[14px] text-[11px]'>DELIVERY</div>
                        <div className='text-[#6B6B6B] font-semibold lg:text-[18px] md:text-[14px] text-[11px]'>INFORMATION</div>
                        <div
                            className='lg:mt-5 md:mt-4 mt-2'
                        >
                            <div className='border-b border-[#DADADA] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Monday: </span> 08.00 AM-00.00 AM</div>
                            <div className='border-b border-[#DADADA] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Tuesday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#DADADA] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Wednesday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#DADADA] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Thursday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#DADADA] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Friday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#DADADA] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Saturday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#DADADA] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Sunday: </span> 08.00 AM-23.00 PM</div>
                        </div>
                    </div>
                    <div
                        className='bg-[#E83600] lg:w-[300px] md:w-[200px] w-[150px] lg:p-10 md:p-5 p-3 lg:h-[600px] md:h-[400px] h-[300px] rounded-xl'
                    >
                        <IconAlarm 
                            color='#FEFFDD'
                            size={setSize(60, 50, 30)}
                        />
                        <div className='lg:mt-5 md:mt-4 mt-2 text-[#FEFFDD] font-semibold lg:text-[18px] md:text-[14px] text-[11px]'>OPERATIONAL</div>
                        <div className='text-[#FEFFDD] font-semibold lg:text-[18px] md:text-[14px] text-[11px]'>TIMES</div>
                        <div
                            className='lg:mt-5 md:mt-4 mt-2 text-[#FEFFDD]'
                        >
                            <div className='border-b border-[#FEFFDD] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Monday: </span> 08.00 AM-00.00 AM</div>
                            <div className='border-b border-[#FEFFDD] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Tuesday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#FEFFDD] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Wednesday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#FEFFDD] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Thursday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#FEFFDD] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Friday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#FEFFDD] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Saturday: </span> 08.00 AM-00.03 AM</div>
                            <div className='border-b border-[#FEFFDD] lg:py-3.5 lg:text-[14px] md:py-2 md:text-[10px] py-1.5 text-[8px]'><span className='font-bold'>Sunday: </span> 08.00 AM-23.00 PM</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
