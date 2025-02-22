import React from 'react'
import { 
    Button,
    Card 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function CardTotal({
    title,
    total,
    titleAction,
    action,
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
                    onClick={action}
                >
                    {titleAction}
                </Button>
            </Card>
        </>
    )
}
