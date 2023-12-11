import { useState, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import ProductsContext from '@/src/context/ProductsContext'
import { useRouter } from 'next/router'
import ChangePassword from "@/src/components/GeneralSettings/ChangePassword"
import VerticalNavbar from "@/src/components/Common/VerticalNavbar"
import SliderSettings from '@/src/components/SliderAssets/SliderSettings'
import Popular from '@/src/components/GeneralSettings/Popular'
import CurrencyPrice from '@/src/components/GeneralSettings/CurrencyPrice'
import { BiChevronRight } from 'react-icons/bi'


function GeneralSettings() {

    const [navbar, setNavbar] = useState(false)
    const router = useRouter()

    const { state: { autoComplete, familys, brands }, dispatch } = useContext(ProductsContext)

    const handleClick = () => {
        setNavbar((prevState) => !prevState);
    }

    return (
        <div dir='ltr' className='grid grid-cols-10 items-center bg-gray-100 h-auto min-w-full' >
            <div className="col-span-2">
                <VerticalNavbar navbar={navbar} />
                <span
                    className={`z-50 text-neutral rounded-r-2xl bg-primary text-3xl cursor-pointer fixed top-32 ${!navbar ? 'left-56 ' : 'left-0'}`}
                    onClick={() => handleClick()}
                >
                    <BiChevronRight className={`${navbar ? 'rotate-0' : 'rotate-180'}`} />
                </span>
            </div>
            <div className={` ${!navbar ? 'col-span-8 ' : 'col-span-10 '} h-auto`}>
                <SliderSettings autoComplete={autoComplete} />
                <Popular />
                <ChangePassword />
            </div>
        </div>
    )
}

export default GeneralSettings