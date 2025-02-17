import React from 'react'
import { 
    IconBasket, 
    IconRosetteFilled 
} from '@tabler/icons-react'

export default function CardTitle({
    title,
}) {
    return (
        <>
            <div
                style={{
                    backgroundColor: 'rgba(232, 54, 0, 0.9)',
                    borderRadius: 16,
                    padding: 14,
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        position: 'relative', 
                        width: '56px', 
                        height: '56px'
                    }}
                >
                    <IconRosetteFilled 
                        color='#FFFFFF'
                        size={56}
                        style={{
                            position: 'absolute'
                        }}
                    />
                    <IconBasket 
                        color='#E83600'
                        size={36}
                        style={{
                            position: 'absolute',
                            top: '10px', 
                            left: '10px',
                        }}
                    />
                </div>
                <div
                    style={{
                        fontFamily: 'Vina Sans',
                        fontSize: 48,
                        paddingLeft: 10,
                        paddingBottom: 5,
                        color: '#FFFFFF'   
                    }}
                >
                    {title}
                </div>
            </div>
        </>
    )
}
