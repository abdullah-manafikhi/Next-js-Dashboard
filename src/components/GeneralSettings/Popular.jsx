import { useState, useEffect, useContext } from "react"
import ImagesContext from "@/src/context/ImagesContext"
import SectionHeader from "../Common/SectionHeader"
import { toast } from "react-toastify"
import Filter from "../Products/Filter"


function Popular() {

    const { dispatch } = useContext(ImagesContext)

    const [BRAND, setBRAND] = useState("")
    const [FAMILY, setFAMILY] = useState("")

    const onBRANDChange = (e) => {
        setBRAND(e.currentTarget.value)
    }

    const onFAMILYChange = (e) => {
        setFAMILY(e.currentTarget.value)
    }

    return (
        <div className='grid grid-cols-1 justify-items-center bg-neutral shadow-md rounded-xl mb-6 mx-auto w-10/12'>
            <h2 className='col-span-1 w-fit mb-4 mt-6 mx-6 text-primary border-b-2 border-tertiary text-xl px-4 font-bold'>POPULAR SECTION </h2>
            <Filter onBRANDChange={onBRANDChange} BRAND={BRAND} onFAMILYChange={onFAMILYChange} FAMILY={FAMILY} DISPLAY={null} />
        </div>)
}

export default Popular