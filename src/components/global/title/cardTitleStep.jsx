import React from 'react'
import { 
    Col,
    Row, 
    Steps
} from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { IconCheck } from '@tabler/icons-react'

export default function CardTitleStep({
    step,
    title,
    subTitle
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <Row
                justify={"space-between"}
                align={"middle"}
                className='bg-[#E83600] lg:p-8 md:p-5 p-5 rounded-2xl'
            >
                <Col
                    span={setSize('', '', 24)}
                >
                    <div
                        className='text-[#FFFFFF80] lg:text-xl md:text-[16px] text-sm font-semibold'
                    >
                        {subTitle}
                    </div>
                    <div
                        style={{
                            fontFamily: 'Vina Sans',
                            fontSize: setSize(56, 42, 40),
                            lineHeight: 1,
                            color: '#FFFFFF'
                        }}
                    >
                        {title}
                    </div>
                </Col>
                <Col
                    span={setSize('', '', 24)}
                    style={{
                        paddingTop: setSize(0, 0, 10)
                    }}
                >
                    <div
                        className={`flex justify-end`}
                    >
                       <div className="flex items-center justify-between">
                            {[
                                { title: 'Step 1' },
                                { title: 'Step 2' },
                                { title: 'Step 3' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className={`lg:w-8 md:w-8 w-6 lg:h-8 md:h-8 h-6 flex items-center justify-center rounded-full ${
                                            index < step ? 'bg-white text-[#FA5523E5]' : index === step ? 'border border-white text-white' : 'border border-[#f4a48c] text-[#f4a48c]'
                                        }`}
                                    >
                                        {index < step ? <IconCheck size={setSize(18, 14, 14)} /> : index + 1}
                                    </div>
                                    {index < 2 && <div className="border border-[#f4a48c] w-10 md:w-12 lg:w-14"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
