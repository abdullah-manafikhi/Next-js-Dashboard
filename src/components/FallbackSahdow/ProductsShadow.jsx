

function ProductsShadow() {

    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 8]

    return (
        <>
            <div className="w-3/4 sm:w-1/2 h-10 bg-gray-200 mx-auto mt-8 rounded-lg animate-pulse"></div>
            <div className="flex flex-wrap justify-center w-full mx-auto mb-12">
                <div key="1" className="w-3/4 sm:w-1/4 h-10 mx-auto mt-8 bg-gray-200 animate-pulse rounded-lg"></div>
                <div key="2" className="w-3/4 sm:w-1/4 h-10 mx-auto mt-8 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {data.map((item, index) => (
                        <div key={index} className="w-60 h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
            </div>
        </>
    )
}

export default ProductsShadow