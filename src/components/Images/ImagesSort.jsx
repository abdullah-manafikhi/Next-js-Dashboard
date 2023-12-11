import { useContext } from 'react'
import ImagesContext from '@/src/context/ImagesContext'
import { BiChevronDown } from 'react-icons/bi'


function ImagesSort() {

    const { state: { images, sortByValue, ascending }, dispatch } = useContext(ImagesContext)

    const sortFunc = (sortBy, ascend) => {
        if (sortBy === "name") {
            if (ascend) {
                const test = images.slice(0).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                dispatch({ type: "SET_IMAGES", payload: test })
                sortByValue !== sortBy ? dispatch({ type: "SET_SORT_VALUE", payload: sortBy }) : ""
                ascending !== ascend ? dispatch({ type: "SET_ASCENDING", payload: ascend }) : ""
            }
            else {
                const test = images.slice(0).sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
                dispatch({ type: "SET_IMAGES", payload: test })
                sortByValue !== sortBy ? dispatch({ type: "SET_SORT_VALUE", payload: sortBy }) : ""
                ascending !== ascend ? dispatch({ type: "SET_ASCENDING", payload: ascend }) : ""
            }
        }
        else if (sortBy === "createdAt") {
            if (ascend) {
                const test = images.slice(0).sort((a, b) => a.time - b.time)
                dispatch({ type: "SET_IMAGES", payload: test })
                sortByValue !== sortBy ? dispatch({ type: "SET_SORT_VALUE", payload: sortBy }) : ""
                ascending !== ascend ? dispatch({ type: "SET_ASCENDING", payload: ascend }) : ""
            }
            else {
                const test = images.slice(0).sort((a, b) => b.time - a.time)
                dispatch({ type: "SET_IMAGES", payload: test })
                sortByValue !== sortBy ? dispatch({ type: "SET_SORT_VALUE", payload: sortBy }) : ""
                ascending !== ascend ? dispatch({ type: "SET_ASCENDING", payload: ascend }) : ""
            }
        }
    }

    const onSortChange = (e) => {
        sortFunc(e.target.value, ascending)
    }

    const onArrowClick = (e) => {
        sortFunc(sortByValue, !ascending)
    }


    return (
        <div className="flex flex-auto justify-center">
            <select onChange={(e) => onSortChange(e)} value={sortByValue} className="select select-bordered select-xs text-gray-800 w-36 max-w-xs sm:ml-4 mb-2 bg-neutral">
                <option disabled>Sort BY</option>
                <option value='createdAt'>Created At</option>
                <option value='name'>Name</option>
            </select>
            <BiChevronDown onClick={(e) => onArrowClick(e)} className={` ${ascending ? "rotate-180" : "rotate-0"} w-6 h-6 cursor-pointer`} />
        </div>
    )
}

export default ImagesSort
