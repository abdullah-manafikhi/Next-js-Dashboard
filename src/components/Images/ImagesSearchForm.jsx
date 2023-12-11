import { useState, useContext } from 'react'
import ImagesContext from '@/src/context/ImagesContext'
import { data } from '@/src/data/images'

function ImagesSearchForm({ setPage }) {

    const [searchVal, setSearchVal] = useState("")
    const { state: { images }, dispatch } = useContext(ImagesContext)

    const onSearch = (e) => {
        const value = e.target.value
        if (value.length === 0) {
            onReset()
            return;
        }
        setSearchVal(value)
        // setSearchInpt(value)
        let result = []
        let regex = new RegExp(value, "mig");

        images.forEach((image, index) => {
            if (regex.exec(image.name) === null) {
            }
            else if (typeof (regex.exec(image.name))) {
                result.push(image)
            }

        })
        setPage(1)
        dispatch({ type: "SET_IMAGES", payload: result })
        // setDisplayedImgs(result)
    }

    const onReset = () => {
        dispatch({ type: "SET_IMAGES", payload: data })
        setSearchVal("")
    }

    return (
        <div className="flex justify-center max-w-2xl mx-auto my-2 px-2 relative text-gray-800">
            <input type="text" onChange={(e) => onSearch(e)} value={searchVal} placeholder="Search" className="input input-bordered input-sm max-w-sm bg-neutral text-gray-800" />
            <button onClick={() => onReset()} type="button" className="btn btn-xs capitalize btn-ghost absolute top-1 right-6 sm:right-28 md:right-40 lg:right-60 bg-neutral text-gray-800">Reset</button>
        </div>
    )
}

export default ImagesSearchForm
