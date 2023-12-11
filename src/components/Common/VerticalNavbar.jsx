import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BiCart, BiImages, BiHeart, BiStats } from 'react-icons/bi'
import {SiGoogleanalytics} from 'react-icons/si'
import {AiOutlineAppstoreAdd} from 'react-icons/ai'
import { AiFillSetting } from 'react-icons/ai'
import zahabiLogo from '../../images/zahabiLogo.png'
import Image from 'next/image'


function VerticalNavbar({ navbar }) {

  const router = useRouter()
  const pathname = router.pathname

  return (
    <div dir='ltr' className={`${navbar ? 'hidden' : 'fixed'} font-sans top-0 z-50 h-screen shadow-xl `}>
      <div className={`grid align-middle w-60 h-screen bg-neutral text-primary text-center pt-6`}>
        
        {/* ====== Logo ===== */}
        <Link href='/' className='flex justify-start ml-4 h-fit mt-8'>
          <h1 className="text-3xl font-bold text-primary ml-4 mt-3">BRAND CO.</h1>
        </Link>

        <div className="text-start mt-10 px-3">
          {/* <h2 className={`${navbar ? 'hidden' : 'block'} text-2xl w-fit mx-auto`}>Dashboard</h2> */}
          <Link
            href='/analytics'
            className={`${pathname === '/analytics' ? 'bg-secondary rounded-md py-2' : ''} flex justify-start btn btn-ghost text-lg h-16 my-2 pl-4   `}
          >
            <SiGoogleanalytics className='my-auto h-6 w-6' />
            <p className='ml-4 my-auto'>Analytics</p>
          </Link>
          <Link
            href='/products-panel?brand=&family=&page=1'
            className={`${pathname === '/products-panel' ? 'bg-secondary rounded-md py-2' : ''} flex justify-start btn btn-ghost text-lg h-16 my-2 pl-4   `}
          >
            <BiCart className='my-auto h-6 w-6' />
            <p className='ml-4 my-auto'>Products</p>
          </Link>
          <Link
            href='/add-products'
            className={`${pathname === '/add-products' ? 'bg-secondary rounded-md py-2' : ''} flex justify-start btn btn-ghost text-lg h-16 my-2 pl-4 `}
          >
            <AiOutlineAppstoreAdd className='my-auto h-6 w-6' />
            <p className='ml-4 my-auto' >Add product</p>
          </Link>
          <Link
            href='/images'
            className={`${pathname === '/images' ? 'bg-secondary rounded-md py-2' : ''} flex justify-start btn btn-ghost text-lg h-16 my-2 pl-4 `}
          >
            <BiImages className='my-auto h-6 w-6' />
            <p className='ml-4 my-auto'>Images</p>
          </Link>
          <Link
            href='/general-settings'
            className={`${pathname === '/general-settings' ? 'bg-secondary rounded-md py-1 transition-all duration-500 my-auto' : ''} flex justify-start btn btn-ghost text-lg h-16 my-2 pl-4  `}
          >
            <AiFillSetting className='my-auto h-6 w-6' />
            <p className='w-28 my-auto'>General </p>
          </Link>
        </div>
        <div className="text-sm ">
          Developed with <BiHeart className="inline text-tertiary" /> By <br /> Abdullah Manafikhi
        </div>
      </div>
    </div>
  )
}

export default VerticalNavbar