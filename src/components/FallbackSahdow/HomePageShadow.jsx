import React from 'react'

function HomePageShadow() {

  let data = [1, 2, 3, 4]

  return (
    <>
      <div key="1" className="bg-gray-200 w-11/12 h-96 mx-auto my-4 rounded-lg animate-pulse"></div>
      <div key="2" className="w-3/4 sm:w-1/4 h-10 bg-gray-200 mx-auto my-12 rounded-lg animate-pulse "></div>
      <div key="3" className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
        {data.map((item, index) => (
          <div key={index} className="w-60 h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
        ))}
      </div>

    </>
  )
}

export default HomePageShadow