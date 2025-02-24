import React, { useEffect, useState } from 'react'
import { Carousel, Col, Row } from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function TestimoniComp() {

    const {
        setSize,
    } = useAuth()

    const testimonials = [
        { name: 'Thomas Arya', role: 'Karawaci Office Park Employee', review: 'I ordered catering for my office event, and everyone loved it! The food was fresh, delicious, and beautifully packed. Will definitely order again.' },
        { name: 'Davia Belinda', role: 'Housewife With 2 Kids', review: 'Dosirak’s meals are a game-changer! The flavors are authentic, portions are perfect, and delivery is always on time. Highly recommend!' },
        { name: 'Auliya Salsablia', role: 'University Student', review: 'Dosirak makes lunch so much easier! The meals are tasty, healthy, and always arrive fresh. Perfect for busy school days!' },
        { name: 'John Doe', role: 'Freelancer', review: 'Great service and amazing taste! Will definitely order again for my next project deadline.' }
    ];

    const [slidesToShow, setSlidesToShow] = useState(3);

    const handleResize = () => {
        if (window.innerWidth <= 451) {
            setSlidesToShow(1);
        } else if (window.innerWidth <= 768) {
            setSlidesToShow(2);
        } else {
            setSlidesToShow(3);
        }
    };
    
    useEffect(() => { 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
        handleResize(); 
        window.scrollTo(0, 0)
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [slidesToShow]);
    

    return (
        <>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] lg:px-[50px] md:px-[30px] px-[20px] max-w-full w-full text-center'
            >
                <div
                    className='text-[#A5ABB3] font-[Plus Jakarta Sans] lg:text-[18px] md:text-[14px] text-[8px]'
                >
                    TESTIMONIALS
                </div>
                <div 
                    className='text-[#E83600] font-[Thunder] font-bold lg:text-[60px] md:text-[30px] text-[18px] lg:pb-10 md:pb-8 pb-2'
                >
                    WHAT THEY SAID ABOUT US
                </div>
                <div className="overflow-hidden">
                    <Carousel
                        autoplay
                        dots={true}
                        slidesToShow={slidesToShow}
                    >
                        {testimonials.map((item, index) => (
                            <div key={index} className="lg:p-7 md:p-5 p-5 font-[Plus Jakarta Sans]">
                                <div className="border rounded-lg lg:p-5 md:p-3 p-3  text-center shadow-sm lg:h-[200px] md:h-[160px] h-[130px]">
                                    <p className="lg:mb-4 md:mb-2 text-gray-600 lg:text-[14px] md:text-[12px] text-[10px]">"{item.review}"</p>
                                    <div className="lg:mt-4 md:mt-2 mt-2">
                                        <div className="text-orange-500 lg:text-lg md:text-md text-sm">★★★★★</div>
                                        <h3 className="font-semibold mt-2 lg:text-[14px] md:text-[13px] text-[12px]">{item.name}</h3>
                                        <p className="lg:text-sm md:text-[11px] text-[10px] text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    )
}
