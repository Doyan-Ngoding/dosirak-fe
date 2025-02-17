import React from 'react'
import { 
    Button,
    Card 
} from 'antd'

export default function CardTotal({
    title,
    total,
    titleAction,
    action,
}) {
    return (
        <>
            <Card
                style={{
                    margin: '20px 0px'
                }}
            >
                <div
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: '#000000'
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: '#000000',
                        paddingTop: 10
                    }}
                >
                    Rp. {total ? parseFloat(total).toLocaleString() : '-'}
                </div>
                <Button
                    type='primary'
                    style={{
                        width: '100%',
                        margin: '20px 5px 5px 5px',
                        borderRadius: 50,
                        height: 50,
                        fontSize: 16,
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
