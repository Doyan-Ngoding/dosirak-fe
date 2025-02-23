export const optionSalesDetail = (data = [], size = 'small') => {
    return data && { 
        tooltip: {
            trigger: 'axis',
            formatter: '{c}%',
            backgroundColor: '#4C8CFF',
            borderRadius: size === 'large' ? 6 : (size === 'medium' ? 4 : 2),
            padding: size === 'large' ? 6 : (size === 'medium' ? 4 : 2),
            textStyle: {
                color: '#fff',
                fontSize: size === 'large' ? 12 : (size === 'medium' ? 8 : 7),
            },
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: size === 'large' ? '3%' : (size === 'medium' ? '0%' : '0%'),
            top: size === 'large' ? '10%' : (size === 'medium' ? '8%' : '5%'),
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: Array.from({ length: data.length }, (_, i) => `${(i + 1) * 5}k`),
            boundaryGap: false,
            axisLabel: {
                fontSize: size === 'large' ? 12 : (size === 'medium' ? 8 : 7),
                color: '#2B303466'
            },
            axisLine: {
                show: false,
            },  
            axisTick: {
                show: false,
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            data: ['3290', '8790', '28211', '12000', '30900', '20001', '9000'],
            axisLabel: {
                formatter: function (value) {
                    return value + "%"
                },
                fontSize: size === 'large' ? 12 : (size === 'medium' ? 8 : 7),
                color: '#2B303466',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#EAEAEA' 
                }
            },
            axisLine: {
                show: false,
            },  
            axisTick: {
                show: false,
            }
        },
        series: [
            {
                name: 'Percentage',
                type: 'line',
                smooth: false,
                showSymbol: true,
                symbol: 'circle',
                symbolSize: size === 'large' ? 10 : (size === 'medium' ? 6 : 5),
                data: data,
                lineStyle: {
                    color: '#4C8CFF',
                    width: 1
                },
                itemStyle: {
                    color: '#4C8CFF',
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(76, 140, 255, 0.6)' },
                            { offset: 1, color: 'rgba(76, 140, 255, 0.1)' },
                        ],
                    },
                },
            },
        ]
    }
}