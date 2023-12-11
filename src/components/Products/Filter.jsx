import { useState, useEffect, useContext, useMemo } from "react";
import ProductsContext from "@/src/context/ProductsContext";
import PropTypes from 'prop-types'
import { data } from '@/src/data/products';


function Filter({ onBRANDChange, BRAND, onFAMILYChange, FAMILY, onDISPLAYChange, DISPLAY }) {

    const { state: { familys, brands }, dispatch } = useContext(ProductsContext)

    const test = useMemo(() => {
        if (BRAND.length === 0) {
            // I'm wrapping dispatches in setTimeout to avoide setting the context state before the provider is ready!
            setTimeout(() => dispatch({ type: "SET_FAMILYS", payload: { familys: data.familys } }), 0);

        } else {
            let filtFamilys = []
            data.brandsnfamilys.forEach((item) => {
                if (item.BRAND === BRAND) filtFamilys.push(item.FAMILY)
            })
            setTimeout(() => dispatch({ type: "SET_FAMILYS", payload: { familys: filtFamilys } }), 0);
        }

        if (FAMILY.length === 0) {
            setTimeout(() => dispatch({ type: "SET_BRANDS", payload: { brands: data.brands } }), 0);

        } else {
            let filtBrands = []
            data.brandsnfamilys.forEach((item) => {
                if (item.FAMILY === FAMILY) filtBrands.push(item.BRAND)
            })
            setTimeout(() => dispatch({ type: "SET_BRANDS", payload: { brands: filtBrands } }), 0);
        }
    }, [BRAND, FAMILY])

    return <>
        <div dir="ltr" className="flex flex-auto justify-around w-full sm:w-10/12 mx-auto mb-6">
            <form className='flex flex-col flex-auto justify-center lg:flex-row my-6 '>
                <div className={`grid grid-cols-12 justify-items-center items-center ${DISPLAY === null ? "basis-1/2" : "basis-1/3 "} `}>
                    <span className={`text-lg ml-4 sm:mx-4 col-span-5 sm:col-span-4 font-semibold`}>Brand</span>
                    <select onChange={e => onBRANDChange(e)} value={BRAND} className="en_font col-span-7 sm:col-span-8 select select-bordered select-sm w-44 max-w-xs sm:ml-4 mx-6  my-1 bg-neutral">
                        <option value="">All</option>
                        {
                            brands.map((brand, index) => (
                                <option key={index} value={brand}>{brand}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={`grid grid-cols-12 justify-items-center items-center ${DISPLAY === null ? "basis-1/2" : "basis-1/3 "} `}>
                    <span className={`text-lg col-span-5 sm:col-span-4 font-semibold ml-4 sm:mx-4`}>Family</span>
                    <select onChange={e => onFAMILYChange(e)} value={FAMILY} className="en_font col-span-7 sm:col-span-8 select select-bordered select-sm w-44 max-w-xs sm:ml-4 mx-6 my-1 bg-neutral">
                        <option value="">All</option>
                        {familys.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                {DISPLAY !== null && <div className={`grid grid-cols-12 justify-items-center items-center ${DISPLAY === null ? "basis-1/2" : "basis-1/3 "} `}>
                    <span className={`text-lg ml-4 sm:mx-4 col-span-5 sm:col-span-4 font-semibold`}>Status</span>
                    <select onChange={e => onDISPLAYChange(e)} value={DISPLAY} className=" col-span-7 sm:col-span-8 select select-bordered select-sm w-44 max-w-xs sm:ml-4 mx-6 my-1 bg-neutral">
                        <option value=''>All</option>
                        <option value='0'>Hidden</option>
                        <option value='1'>Shown</option>
                    </select>
                </div>}
            </form>
        </div>
    </>
}

Filter.defaultProps = {
    BRAND: "",
    FAMILY: "",

}

Filter.propTypes = {
    BRAND: PropTypes.string,
    FAMILY: PropTypes.string,
}

export default Filter