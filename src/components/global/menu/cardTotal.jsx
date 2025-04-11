import React from 'react'
import { 
    Button,
    Card, 
    ConfigProvider
} from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { IconChefHatOff } from '@tabler/icons-react'

export default function CardTotal({
    title,
    total,
    titleAction,
    action,
    qtyTemp,
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <Card
                style={{
                    margin: '20px 0px'
                }}
            >
                <div
                    className='text-black font-semibold lg:text-xl md:text-[16px] text-[16px]'
                >
                    {title}
                </div>
                <div
                    className='text-black font-semibold pt-2.5 lg:text-[32px] md:text-[22px] text-[22px]'
                >
                    Rp. {total ? parseFloat(total).toLocaleString() : '-'}
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorBgContainerDisabled: '#E836004D',
                                colorTextDisabled: "#FFFFFF"
                            }
                        }
                    }}
                >
                    {
                        qtyTemp < 15 && (
                            <>
                                <div
                                    style={{
                                        backgroundColor: '#A5ABB3',
                                        display: 'flex',
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        padding: '10px',
                                        borderRadius: 10,
                                        marginTop: 5
                                    }}
                                >
                                    <IconChefHatOff color='#394452' size={setSize(18, 14, 16)} /> <div style={{ color: '#394452', paddingLeft: 5, fontSize: setSize(14, 9, 10) }}>Order quantity less than {qtyTemp < 15 ? '15' : '200'} meals</div>
                                </div>
                            </>
                        )
                    }
                    <div>

                    </div>
                    <Button
                        type='primary'
                        style={{
                            width: '100%',
                            margin: '20px 5px 5px 5px',
                            borderRadius: 50,
                            height: setSize(50, 34, 34),
                            fontSize: setSize(16, 14, 14),
                            fontWeight: 600
                        }}
                        disabled={qtyTemp < 15 ? true : (qtyTemp > 200 ? true : false)}
                        onClick={action}
                    >
                        {titleAction}
                    </Button>
                </ConfigProvider>
            </Card>
        </>
    )
}
