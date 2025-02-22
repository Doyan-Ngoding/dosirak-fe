import React from 'react'
import { 
    IconBasket, 
    IconRosetteFilled 
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function CardTitle({
    title,
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='bg-[#FA5523E5] rounded-2xl lg:p-3.5 md:p-1 p-1 flex items-center mb-5'
            >
                <div
                    className='relative lg:w-14 md:w-10 w-10 lg:h-14 md:h-10 h-10'
                >
                    <IconRosetteFilled 
                        color='#FFFFFF'
                        size={setSize(54, 40, 40)}
                        className='absolute'
                    />
                    <IconBasket 
                        color='#E83600'
                        size={setSize(34, 20, 20)}
                        className='absolute top-2.5 left-2.5'
                    />
                </div>
                <div
                    style={{
                        fontFamily: 'Vina Sans',
                        fontSize: setSize(48, 30, 30),
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
