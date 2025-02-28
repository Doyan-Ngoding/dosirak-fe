import React from 'react'
import LayoutComp from '../../global/layout'
import SlideComp from '../../global/slide'
import { Col, Row } from 'antd'
import CoverComp from './cover'
import HeaderComp from '../../global/layout/header'
import ConfigComp from '../../global/layout/configComp'
import SplitComp from '../../global/split'
import ServeComp from './serve'
import MenuComp from './menu'
import TestimoniComp from './testimoni'
import OperationalComp from './operational'
import LocationComp from './location'
import FooterComp from './footer'

export default function LandingComp() {
    return (
        <>
            <ConfigComp>
                <HeaderComp />
                <Row>
                    <Col
                        span={24}
                    >
                        <CoverComp />                    
                    </Col>
                    {/* <Col
                        span={24}
                    >
                        <SplitComp 
                            img={"./assets/cover/split.png"}
                        />                    
                    </Col> */}
                    <Col
                        span={24}
                    >
                        <SplitComp 
                            img={"./assets/cover/resto.png"}
                            type='resto'
                        />       
                    </Col>
                    <Col
                        span={24}
                    >
                        <ServeComp />
                    </Col>
                    <Col
                        span={24}
                    >
                        <MenuComp />
                    </Col>
                    {/* <Col
                        span={24}
                        className='lg:py-[100px] md:py-[50px] py-[30px] px-[1px]'
                    >
                        <SplitComp 
                            img={"./assets/cover/split.png"}
                            isRotate={true}
                        />                    
                    </Col> */}
                    {/* <Col
                        span={24}
                    >
                        <TestimoniComp />
                    </Col> */}
                    <Col
                        span={24}
                    >
                        <OperationalComp />
                    </Col>
                    <Col
                        span={24}
                    >
                        <LocationComp />
                    </Col>
                    {/* <Col
                        span={24}
                    >
                        <SplitComp 
                            img={"./assets/cover/split.png"}
                        />                    
                    </Col> */}
                    <Col
                        span={24}
                    >
                        <FooterComp />
                    </Col>
                </Row>
            </ConfigComp>
        </>
    )
}
