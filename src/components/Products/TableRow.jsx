import { useState, useContext } from 'react'
import ProductsContext from '@/src/context/ProductsContext'
import Image from 'next/image'
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'
import { GrCheckboxSelected } from 'react-icons/gr'
import { BiTrash, BiEditAlt, BiDotsVerticalRounded } from 'react-icons/bi'
import Fade from '../Animation/Fade';
import Tools from '../../images/tools-4.svg'

function TableRow({ product, selected, displayedProds, onSelectedClick, onModify }) {

    const [imgSrc, setImgSrc] = useState(product.IMAGE === ".jpg" ? (Tools.src) : `https://zahabico.com/api/v1/assets/${product.IMAGE}`)

    const fallbackImg = () => setImgSrc(Tools.src)

    const { state: { products }, dispatch } = useContext(ProductsContext)

    const onHide = (e, isDisplayed) => {
        e.preventDefault()
        const ID = Number(e.currentTarget.id)
        let newProducts = [];
        displayedProds.forEach(prod => {
            if (prod.ID === ID) {
                newProducts.push({ ...prod, DISPLAY: !isDisplayed })
            }
            else {
                newProducts.push(prod)
            }
        })
        dispatch({ type: "SET_PRODUCTS", payload: { products: newProducts } })
    }

    const handleDelete = async (e) => {
        if (window.confirm(`Are you sure you want to delete the product with the ID: ${e.currentTarget.id}`)) {
            let newProducts = products.filter(prod => prod.ID !== Number(e.currentTarget.id))
            dispatch({ type: "DELETE", payload: { products: newProducts } })
        }
        // setRefresh(prevState => !prevState)
    }

    return (
        <>
            <tr id={product.ID} className={`text-center font-sans z-2 bg-neutral border-0`}>
                <th className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.ID}</th>
                <th className={`text-sm dash-tbl-cells mask mask-squircle ${!product.DISPLAY ? "opacity-50" : ''}`}>
                    <Image onError={() => fallbackImg()} priority={true} width={192} height={192} className='w-10 h-10' src={imgSrc} alt='product' />
                </th>
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.ar_classification}</td>
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.CLASSIFICATION}</td>
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.FAMILY}</td>
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.TYPE}</td>
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.DESCRIPTION}</td>
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.BRAND}</td>
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>{product.ORIGIN}</td>
                {/* THIS FORMAT FUNCTION IS FOR FORMATING THE PRICE IN A READABLE WAY */}
                <td className={`text-sm dash-tbl-cells ${!product.DISPLAY ? "opacity-50" : ''}`}>
                    {Intl.NumberFormat('en-US').format((product.PRICE))}
                </td>
                <td className="w-4 z-1 bg-neutral">
                    {selected.isActive ?
                        (
                            <input
                                className="checkbox checkbox-sm checkbox-info"
                                type="checkbox"
                                onChange={(e) => onSelectedClick(e, product.ID)}
                                checked={selected.data.includes(product.ID)}
                            />
                        ) :
                        (<div className="dropdown dropdown-end">
                            <Fade delay={0.6}>
                                <label tabIndex={0} className="btn btn-sm btn-ghost text-xl"><BiDotsVerticalRounded /></label>
                            </Fade>
                            <ul tabIndex={0} className="dropdown-content menu bg-neutral p-2 shadow rounded-box w-32 z-50">
                                <li className='h-fit'>
                                    <label htmlFor="my-modal-3" onClick={(e) => onModify(e)} id={product.ID} className="h-fit font-normal ">
                                        <BiEditAlt className='w-4 h-4' /> Edit
                                    </label>
                                </li>
                                <li className='h-fit'>
                                    <span onClick={(e) => onHide(e, product.DISPLAY)} id={product.ID} className="h-fit font-normal ">
                                        {product.DISPLAY ? (<><MdVisibilityOff className='w-4 h-4' /> <p>Hide</p></>) : (<><MdVisibility className='w-4 h-4' /> <p>Show</p></>)}
                                    </span>
                                </li>
                                <li className='h-fit'>
                                    <span onClick={(e) => onSelectedClick(e, product.ID)} className="h-fit font-normal ">
                                        <GrCheckboxSelected /> Select
                                    </span>
                                </li>
                                <li className='h-fit'>
                                    <span onClick={(e) => handleDelete(e)} id={product.ID} className=' h-fit bg-neutral text-red-700 border-none hover:bg-red-800 hover:text-neutral font-normal'>
                                        <BiTrash className='w-4 h-4' /> Delete
                                    </span>
                                </li>
                            </ul>
                        </div>
                        )}
                </td>
            </tr>
        </>
    )
}

export default TableRow