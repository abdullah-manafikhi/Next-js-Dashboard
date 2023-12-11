import React from 'react'

function SingleProductShadow() {

    let data = [1, 2, 3, 4]

    return (
        <>
            <div className='grid grid-cols-1 justify-items-center items-center gap-6 sm:grid-cols-2 my-24'>
                <div className="bg-gray-200 h-80 w-80 rounded-lg"></div>
                <div className="grid grid-cols-1 w-full mx-auto">
                    <div key="1" className="w-2/4 h-10 mx-auto my-1 bg-gray-200 rounded-lg animate-pulse "></div>
                    <div key="2" className="w-2/4 h-10 mx-auto my-1 bg-gray-200 rounded-lg animate-pulse "></div>
                    <div key="3" className="w-2/4 h-10 mx-auto my-1 bg-gray-200 rounded-lg animate-pulse "></div>
                    <div key="4" className="w-2/4 h-10 mx-auto my-1 bg-gray-200 rounded-lg animate-pulse "></div>
                    <div key="5" className="w-2/4 h-10 mx-auto my-1 bg-gray-200 rounded-lg animate-pulse "></div>
                    <div key="6" className="w-2/4 h-10 mx-auto my-1 bg-gray-200 rounded-lg animate-pulse "></div>
                    <div key="7" className="w-2/4 h-10 mx-auto my-1 bg-gray-200 rounded-lg animate-pulse "></div>
                </div>
            </div>
            <div className="w-3/4 sm:w-1/4 h-10 bg-gray-200 mx-auto my-12 rounded-lg animate-pulse "></div>
            <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
                {data.map((item, index) => (
                        <div key={index} className="w-60 h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
            </div>
        </>
    )
}

export default SingleProductShadow