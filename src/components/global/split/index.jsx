import React from 'react'

export default function SplitComp({
    img,
    isRotate = false
}) {
    return (
        <>
            <div
                className={`lg:h-[100px] md:h-[50px] h-[30px] overflow-hidden w-full max-w-full ${isRotate && 'rotate-5 w-[99%]'}`}
            >
                <img
                    src={img}
                    alt="splt"
                    className={`w-full h-full object-cover`}
                    style={{
                        backgroundRepeat: 'repeat',
                    }}
                />
            </div>
        </>
    )
}
