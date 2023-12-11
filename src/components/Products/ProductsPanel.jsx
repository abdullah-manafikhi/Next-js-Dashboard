import { useState, useEffect } from "react"
import Link from 'next/link'
import { BiHomeAlt, BiChevronRight } from 'react-icons/bi'
import VerticalNavbar from '@/src/components/Common/VerticalNavbar'
import YourProducts from "@/src/components/Products/YourProducts"


function ProductsPanel() {

  const [navbar, setNavbar] = useState(true)

  const handleClick = () => {
    setNavbar((prevState) => !prevState);
  }

  return (
    <div style={{ height: "100vh" }} dir='ltr' className='grid grid-cols-6 min-w-full bg-gray-100 h-fit text-gray-800'>
      <div className={`col-span-1 ${navbar ? "absolute" : " "} `} >
        <VerticalNavbar navbar={navbar} />
        <span
          className={`z-50 text-neutral rounded-r-2xl bg-primary text-3xl cursor-pointer block fixed top-32 ${!navbar ? 'left-56 ' : 'left-0'}`}
          onClick={() => handleClick()}
        >
          <BiChevronRight className={`${navbar ? 'rotate-0' : 'rotate-180'}`} />
        </span>
      </div>
      <div id="productTable" style={{ overflowY: "auto", maxHeight: "90%" }} className={`${!navbar ? 'col-span-5 ' : 'col-span-6 ml-7 mr-8'} w-auto relative left-0 h-full gap-0 bg-neutral rounded-xl shadow-md mr-4 my-8`}>
        <p className='text-start ml-8 mt-6 sm:ml-0 sm:mt-4 sm:text-center h-1 text-green text-xl  sm:text-3xl  font-bold '>Products</p>
        <Link href='/analytics' className="btn btn-ghost text-green text-lg absolute top-4 right-2 sm:right-6"><BiHomeAlt className='mr-1 mb-0.5 w-5 h-5' /> home</Link>
        <YourProducts page={true} />
      </div>
    </div>
  )
}

export default ProductsPanel
