import React from 'react'
import ReactEcharts from "echarts-for-react";
import { optionSalesDetail } from "../../../global/consts/charts"
import { useAuth } from '../../../../context/AuthContext';

export default function SalesChartComp() {

    const data = [
        20, 30, 50, 45, 25, 40, 35, 55, 20, 50, 40, 30, 45, 60, 20, 30, 65, 40, 30, 55, 35, 25, 50, 40, 30,
    ];

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='bg-white w-full lg:my-5 lg:rounded-2xl lg:py-5 lg:px-5 md:my-3 md:rounded-xl md:py-3 md:px-3 my-2 rounded-xl py-2 px-2'
            >
                <span className='text-[#202224] font-bold lg:text-[24px] md:text-[16px] text-[12px]'>
                    Sales Detail
                </span>
                <ReactEcharts
                    option={
                        optionSalesDetail((data && data.length > 0) && data, setSize('large', 'medium', 'small'))
                    }
                    style={{ 
                        height: setSize("50vh", "20vh", "20vh"),
                        width: '100%',
                        padding: setSize('5px 10px', '3px 6px', '2px 4px'),
                    }}
                />
            </div>
        </>
    )
}
