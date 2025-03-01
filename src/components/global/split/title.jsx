import React from 'react'
import { IconRosetteFilled } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function SplitTitle({
    no, 
    title
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className={`bg-[#E83600] lg:h-[60px] md:h-[40px] h-[30px] w-full rounded-lg border border-[#E83600]`}
            >
                <div
                    className='lg:px-5 md:px-5 px-4 h-full flex justify-start items-center'
                >
                    <div
                        className='relative flex items-center'
                    >
                        <div 
                            className='relative flex items-center justify-center lg:pl-5 md:pl-1'
                        >
                            <IconRosetteFilled 
                                color='#FFFFFF'
                                size={setSize(50, 30, 24)}
                                className='absolute'
                            />
                            <div
                                className='absolute text-center font-extrabold text-[#E83600] lg:text-[24px] md:text-[16px] text-[14px]'
                                style={{
                                    fontFamily: 'Vina Sans'
                                }}
                            >
                                {no}
                            </div>
                        </div>
                    </div>
                    <div
                        className='lg:pl-8 md:pl-5 pl-4 text-white font-medium lg:text-[35px] md:text-[24px] text-[20px] mt-[-5px]'
                        style={{
                            fontFamily: 'Vina Sans'
                        }}
                    >
                        {title}
                    </div>
                </div>
            </div>
        </>
    )
}
