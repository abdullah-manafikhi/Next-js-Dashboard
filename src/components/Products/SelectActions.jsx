import { useState, useEffect, useContext } from 'react'
import ProductsContext from '@/src/context/ProductsContext'
import { PropTypes } from 'prop-types'
import PopUp from '../Animation/PopUp'
import { BiTrash } from 'react-icons/bi'
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'
import { toast } from 'react-toastify'

function SelectActions({ data, dataChange }) {

    const [selected, setSelected] = useState(data)
    const [isSelected, setIsSelected] = useState(false)

    const { state: { products }, dispatch } = useContext(ProductsContext)

    useEffect(() => {
        setSelected(data)
    }, [data])

    const handleDelete = (e) => {
        if (window.confirm(`Are you sure you want to delete the SELECETED PRODUCTS ?`)) {
            const selectedMap = new Map()
            selected.data.forEach(product => {
                selectedMap.set(product, 1)
            });
            const newProducts = products.filter(prod => selectedMap.get(prod.ID) === undefined)
            dispatch({ type: "SET_PRODUCTS", payload: { products: newProducts } })
            dataChange({ isActive: false, data: [] })
            setIsSelected(false)
            toast.success("Deleted Successfully!")
        }
    }

    const onDisplayChange = (e, action) => {
        e.preventDefault()
        let updatedProds = [];
        selected.data.forEach(product => {
            updatedProds.push({ id: product, display: action })
        })
        dispatch({ type: "SET_PRODUCTS", payload: { products: updatedProds } })

        // THIS IS BETTER APPROACH THAN NESTING TWO LOOPS 
        const selectedMap = new Map()
        selected.data.forEach(product => {
            selectedMap.set(product, 1)
        })

        let newProducts = [];
        products.forEach(prod => {
            if (selectedMap.get(prod.ID) !== undefined) {
                newProducts.push({ ...prod, DISPLAY: action })
            }
            else {
                newProducts.push(prod)
            }
        })

        dispatch({ type: "SET_PRODUCTS", payload: { products: newProducts } })
        dataChange({ isActive: false, data: [] })
        setIsSelected(false)
    }

    const onSelectAllChange = (e) => {
        setIsSelected(prevState => {
            if (!prevState) {
                // -1 means that select all flag is activated
                dataChange({ isActive: true, data: [-1] })
            }
            else {
                dataChange({ isActive: true, data: [] })
            }
            return !prevState
        })
    }

    const onCancel = (e) => {
        dataChange({ isActive: false, data: [] })
        setIsSelected(false)
    }


    if (selected.isActive) {
        return (
            <div className="sticky top-0">

                <PopUp>
                    <div className='flex flex-row  justify-evenly w-max sm:w-3/4 mx-auto my-2'>
                        <button>
                            <span onClick={(e) => handleDelete(e)} className=' h-fit flex flex-wrap p-1 bg-neutral rounded-lg text-red-700 border-none hover:bg-red-800 hover:text-neutral font-normal'>
                                <BiTrash className='w-4 h-4 mt-1 mx-1' /> Delete
                            </span>
                        </button>
                        <button className='btn btn-ghost capitalize'>
                            <span onClick={(e) => onDisplayChange(e, false)} className="flex flex-wrap h-fit font-normal ">
                                <MdVisibilityOff className='w-4 h-4 mx-1 ' /> <p>Hide</p>
                            </span>
                        </button>
                        <button className='btn btn-ghost capitalize'>
                            <span onClick={(e) => onDisplayChange(e, true)} className="flex flex-wrap h-fit font-normal ">
                                <MdVisibility className='w-4 h-4 mx-1 ' /> <p>Show</p>
                            </span>
                        </button>
                        <button onClick={(e) => onCancel(e)} className="btn btn-ghost capitalize">
                            <span>cancel</span>
                        </button>
                        <div className="form-control w-28 mt-1 font-semibold">
                            <label className="cursor-pointer label">
                                <span className="label-text">Select All</span>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => onSelectAllChange(e)}
                                    className="checkbox checkbox-sm checkbox-info ml-1"
                                />
                            </label>
                        </div>
                    </div>
                </PopUp>
            </div>
        )
    }
}

SelectActions.defaultProps = {
    data: {},
}

SelectActions.propTypes = {
    data: PropTypes.object,
}

export default SelectActions