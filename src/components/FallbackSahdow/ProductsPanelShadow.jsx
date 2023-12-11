import React from 'react'

function ProductsPanelShadow() {

    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 8, 6, 7, 8, 9, 10, 11, 8]

    return (
        <div>
            <div className="flex flex-wrap justify-center w-full mx-auto mb-12">
                <div key="1" className="w-3/4 sm:w-1/4 h-10 mx-auto mt-8 bg-gray-200 animate-pulse rounded-lg"></div>
                <div key="2" className="w-3/4 sm:w-1/4 h-10 mx-auto mt-8 bg-gray-200 animate-pulse rounded-lg"></div>
                <div key="3" className="w-3/4 sm:w-1/4 h-10 mx-auto mt-8 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div className="w-3/4 sm:w-1/2 h-10 bg-gray-200 mx-auto mb-10 rounded-lg animate-pulse"></div>
            <div className='grid grid-cols-1 justify-items-cente gap-1'>
                {data.map((item, index) => (
                    <div key={index} className={`${index === 0 ? " rounded-t-xl " : ""} w-11/12 h-12 mx-auto bg-gray-200 animate-pulse`}></div>
                ))}
            </div>
        </div>
    )
}

export default ProductsPanelShadow