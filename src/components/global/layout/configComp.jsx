import React from 'react'
import { ConfigProvider } from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function ConfigComp(props) {

    const { setSize } = useAuth()

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#FF6B00',
                        fontFamily: 'Noto Sans KR'
                    },
                    components: {
                        Layout: {
                            headerBg: '#F9F9F9',
                            siderBg: '#F9F9F9',
                            triggerBg: '#F9F9F9',
                            bodyBg: '#FFFFFF',
                            footerBg: '#FFFFFF',
                            headerHeight: setSize(75, 65, 55),
                            footerPadding: '0',
                            headerPadding: setSize('10px 80px', '10px 50px', '10px 30px'), 
                        },
                        Menu: {
                            activeBarHeight: 0,
                            colorSplit: 'none',
                            itemPaddingInline: setSize(50, 20, 10),
                            fontSize: setSize(18, 16, 14),
                            colorText: '#6B6B6B',
                            itemBg: '#F9F9F9',
                            
                        },
                        Button: {
                            controlHeightSM: 26,
                            controlHeightLG: 50,
                            fontSize: setSize(16, 12, 12),
                        },
                        Select: {
                            colorBgContainer: '#FA5523',
                            colorTextPlaceholder: '#F9F9F9',
                            colorText: '#F9F9F9',
                            colorBorder: '#D9D9D9',
                            controlHeight: setSize(42, 32, 32),
                            fontSize: setSize(14, 12, 12),
                            borderRadius: 50,
                            colorBgElevated: '#FA5523',
                            optionSelectedBg: '#E53905'
                        },
                        Tabs: {
                            inkBarColor: '',
                            fontSize: setSize(18, 16, 14),
                            colorText: '#6B6B6B',
                            colorPrimary: '#000000',
                            horizontalItemPadding: setSize('20px 50px', '20px', '20px'),
                            itemHoverColor: '#000000'
                        },
                        Card: {
                            colorBgContainer: '#FFFFFF',
                            bodyPadding: '0.5em 1em'
                        },
                        Input: {
                            fontSize: setSize(16, 12, 12),
                            controlHeight: setSize(37, 25, 25),
                        },
                        Modal: {
                            padding: 25,
                            borderRadiusLG: 20,
                        },
                        Drawer: {
                            fontSizeLG: 14
                        },
                        Anchor: {
                            fontSize: setSize(18, 12, 10),
                            linkPaddingBlock: 0,
                            lineHeight: setSize('50px', '35px', '30px'),
                            colorText: '#5A5A5A',
                            colorPrimaryBg: 'green',
                            lineWidthFocus: setSize('200px', '150px', '100px' ),
                        }, 
                    }
                }}
            >
                {props.children}
            </ConfigProvider>
        </>
    )
}
