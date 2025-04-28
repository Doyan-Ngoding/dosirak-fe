import React from 'react'
import { Button, Carousel, ConfigProvider, Input } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IconChevronRight, IconCurrentLocation, IconHeartFilled, IconMapPin, IconToolsKitchen2 } from '@tabler/icons-react'
import { useOrder } from '../../../context/OrderContext'

export default function CoverComp() {

    const { setSize } = useAuth()
    const navigate = useNavigate()

    const {
        addressUserCurr,
        validAddress2
    } = useOrder()

    const showPosition = (pos) => {
        const crd = pos.coords;
        validAddress2(crd.longitude, crd.latitude)
    }

    const clickedMap = () => {
        navigator.geolocation.getCurrentPosition(showPosition)
    }

    const ChildCompOne = () => (
        <div
            className='text-center flex justify-center'  
        >
            <div
                className='absolute lg:bottom-25 md:bottom-25 bottom-15'
            >
                <div>
                    <div className='lg:mb-[10px] md:mb-[10px] mb-[10px] lg:text-[14px] md:text-[12px] text-[10px] text-white flex justify-center items-center border border-[white] max-w-fit m-auto lg:px-5 md:px-3 px-2 lg:py-2 md:py-1 py-1 rounded-[50px] bg-white/30'>Cook & Delivered with Love <IconHeartFilled size={setSize(12, 10, 8)} color='white' style={{ marginLeft: 3 }}/></div>
                    <div className='text-[#FFFFFF] font-[Montserrat] font-bold lg:text-[30px] md:text-[20px] text-[14px]'>A Korean Mother's Touch to Your Desk</div>
                </div>
            </div>
            <div
                className='absolute lg:bottom-10 md:bottom-10 bottom-5 font-[Noto Sans KR]'
            >
                <ConfigProvider
                    theme={{
                        components: {
                            Input: {
                                borderRadius: 50,
                                borderRadiusSM: 50,
                                paddingBlock: 8,
                                paddingBlockSM: 5,
                                fontSize: setSize(11, 10, 8),
                                colorTextPlaceholder: '#838383'
                            }
                        }
                    }}
                >
                    <Input 
                        size={setSize('medium', 'medium', 'small')}
                        style={{
                            width: setSize(400, 300, 200)
                        }}
                        placeholder='Enter delivery address'
                        prefix={
                            <IconMapPin 
                                size={setSize(14, 12, 10)}
                                color='#838383'
                                style={{
                                    marginRight: setSize(5, 3, 0),
                                    marginTop: '-2px'
                                }}
                            />
                        }
                        suffix={
                            <IconCurrentLocation 
                                size={setSize(20, 18, 16)}
                                color='#FFFFFF'
                                style={{
                                    backgroundColor: '#FF6B00',
                                    padding: 3,
                                    borderRadius: 50,
                                    cursor: 'pointer'
                                }}
                                onClick={clickedMap}
                            />
                        }
                        defaultValue={(addressUserCurr && addressUserCurr.address) ? addressUserCurr.address : ''}
                    />
                </ConfigProvider>
            </div>
        </div>
    )

    return (
        <>
            <Carousel 
                autoplay
            >
                <div
                    className={`bg-[url(/assets-v2/banner/main-1.png)] bg-cover ${setSize('bg-left', 'bg-left', 'bg-left')} bg-no-repeat ${setSize('h-[80vh]', 'h-[400px]', 'h-[250px]')} w-full max-w-full xl:w-[100%]`}
                >
                   <ChildCompOne />
                </div> 
                <div
                    className={`bg-[url(/assets-v2/banner/main-2.png)] bg-cover bg-center bg-no-repeat ${setSize('h-[80vh]', 'h-[400px]', 'h-[250px]')} w-full max-w-full xl:w-[100%]`}
                >
                   <ChildCompOne />
                </div> 
            </Carousel>
        </>
    )
}
