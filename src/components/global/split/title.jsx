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
                            className='relative flex items-center justify-center lg:pl-2 md:pl-1'
                        >
                            <IconRosetteFilled 
                                color='#FFFFFF'
                                size={setSize(50, 30, 24)}
                                className='absolute'
                            />
                            {/* {typeof no === 'string' ? (
                                <div
                                    className='absolute text-center font-extrabold text-[#E83600] lg:text-[24px] md:text-[16px] text-[14px]'
                                    style={{ fontFamily: 'Bebas Neue' }}
                                >
                                    {no}
                                </div>
                            ) : ( */}
                                <div className="realtive z-1 flex items-center justify-center">
                                    {/* {no}s */}
                                    <img src={`${import.meta.env.VITE_URL_BE}/${no}`} style={{ width: setSize(28, 18, 14) }}  />
                                    {/* {
                                        title && (
                                            title.toLowerCase() === "paik's noodle" ? (
                                                <img src='/assets/icon/resto-1.png' style={{ width: setSize(28, 18, 14) }}  />
                                            ) : (
                                                title.toLowerCase() === "smile kimbab" ? (
                                                    <img src='/assets/icon/resto-2.png' style={{ width: setSize(28, 18, 14) }}  />
                                                ) : (
                                                    title.toLowerCase() === "xin xin corn dog" ? (
                                                        <img src='/assets/icon/resto-3.png' style={{ width: setSize(28, 18, 14) }}  />
                                                    ) : (
                                                        title.toLowerCase() === "boom chicken" ? (
                                                            <img src='/assets/icon/resto-4.png' style={{ width: setSize(26, 16, 12) }}  />
                                                        ) : (
                                                            title.toLowerCase() === "hongkong banjum" ? (
                                                                <img src='/assets/icon/resto-5.png' style={{ width: setSize(28, 18, 14) }}  />
                                                            ) : (
                                                                no
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    } */}
                                    {/* {no} */}
                                </div>
                            {/* )} */}
                        </div>
                    </div>
                    <div
                        className='lg:pl-8 md:pl-5 pl-4 text-white font-medium lg:text-[35px] md:text-[24px] text-[20px] mt-[5px]'
                        style={{
                            fontFamily: 'Bebas Neue'
                        }}
                    >
                        {title}
                    </div>
                </div>
            </div>
        </>
    )
}
