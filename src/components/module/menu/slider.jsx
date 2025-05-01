import React from 'react'
import { Button, Carousel, ConfigProvider, Input } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import { IconChevronRight, IconCurrentLocation, IconMapPin, IconRosetteDiscount } from '@tabler/icons-react';
import { useOrder } from '../../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../../context/MenuContext';
import LoginStandard from '../../global/modal/loginStandard';
import ForgotStandard from '../../global/modal/forgotStandard';
import VerifyStandard from '../../global/modal/verifyStandard';
import ResetStandard from '../../global/modal/resetStandard';
import SignupStandard from '../../global/modal/signupStandard';
import LoginMobile from '../../global/modal/loginMobile';
import ForgotMobile from '../../global/modal/forgotMobile';
import VerifyMobile from '../../global/modal/verifyMobile';
import ResetMobile from '../../global/modal/resetMobile';
import SignupMobile from '../../global/modal/signupMobile';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


export default function SliderComp() {

    const {
        modalLogin, setModalLogin,
        modalSignup, setModalSignup,
        modalOtp, setModalOtp,
        modalReset, setModalReset,
        modalForgot, setModalForgot,
        setSize,
        isMobile,
        handleLogin,
        isLoading,
        token
    } = useAuth()

    const {
        addressUserCurr,
        validAddress2
    } = useOrder()

    const { 
        showHistory, setShowHistory
    } = useMenu()

    const showPosition = (pos) => {
        const crd = pos.coords;
        validAddress2(crd.longitude, crd.latitude)
    }

    const clickedMap = () => {
        navigator.geolocation.getCurrentPosition(showPosition)
    }

    const navigate = useNavigate();

    const ChildCompOne = () => (
        <div
            className='text-center flex justify-center'  
        >
            <div
                className='absolute lg:bottom-25 md:bottom-25 bottom-15'
            >
                <div>
                    {/* <div className='lg:mb-[10px] md:mb-[10px] mb-[10px] lg:text-[14px] md:text-[12px] text-[10px] text-white flex justify-center items-center border border-[white] max-w-fit m-auto lg:px-5 md:px-3 px-2 lg:py-2 md:py-1 py-1 rounded-[50px] bg-white/30'>Cook & Delivered with Love <IconHeartFilled size={setSize(12, 10, 8)} color='white' style={{ marginLeft: 3 }}/></div> */}
                    <div className='text-[#FFFFFF] font-[Montserrat] font-bold lg:text-[30px] md:text-[20px] text-[14px]'>Explore Our Menu Here</div>
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
                            },
                            Button: {
                                borderRadius: 50,
                                borderRadiusSM: 50,
                                fontSize: setSize(11, 10, 8),
                                colorBgContainer: '#FF6B00',
                                colorText: '#FFFFFF',
                                defaultBorderColor: '#FF6B00',
                            }
                        }
                    }}
                >
                    <div 
                        className='flex justify-around'
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
                        <Button
                            size={setSize('medium', 'medium', 'small')}
                            style={{
                                marginLeft: setSize(20, 8, 5),
                                height: 'auto'
                            }}
                            onClick={() => {(token ? navigate('/history') : (setModalLogin(true)))}}
                        >
                            See Order History
                        </Button>
                    </div>
                </ConfigProvider>
            </div>
        </div>
    )


    return (
        <>
            <Carousel 
                autoplay={{ dotDuration: true }}
                autoplaySpeed={10000}
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
                {
                    !isMobile ? (
                        <>
                            <LoginStandard 
                                isOpen={modalLogin}
                                setIsOpen={setModalLogin}
                                action={handleLogin}
                                loading={isLoading}
                            />
                            <ForgotStandard 
                                isOpen={modalForgot}
                                setIsOpen={setModalForgot}
                            />
                            <VerifyStandard 
                                isOpen={modalOtp}
                                setIsOpen={setModalOtp}
                            />
                            <ResetStandard 
                                isOpen={modalReset}
                                setIsOpen={setModalReset}
                            />
                            <SignupStandard 
                                isOpen={modalSignup}
                                setIsOpen={setModalSignup}
                            />
                        </>
                    ) : (
                        <>
                            <LoginMobile 
                                isOpen={modalLogin}
                                setIsOpen={setModalLogin}
                                action={handleLogin}
                                loading={isLoading}
                            />
                            <ForgotMobile 
                                isOpen={modalForgot}
                                setIsOpen={setModalForgot}
                            />
                            <VerifyMobile 
                                isOpen={modalOtp}
                                setIsOpen={setModalOtp}
                            />
                            <ResetMobile 
                                isOpen={modalReset}
                                setIsOpen={setModalReset}
                            />
                            <SignupMobile 
                                isOpen={modalSignup}
                                setIsOpen={setModalSignup}
                            />
                        </>
                    )
                }
        </>
    )
}