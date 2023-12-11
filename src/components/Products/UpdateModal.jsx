import { useState, useEffect, useContext } from 'react'
import ProductsContext from '@/src/context/ProductsContext'
import ImageSelect from '../Images/ImageSelect'
import { toast } from 'react-toastify'


function UpdateModal({ data, test }) {

    const [formData, setFormData] = useState({
        IMAGE: "",
        ar_classification: "",
        CLASSIFICATION: "",
        FAMILY: "",
        TYPE: "",
        DESCRIPTION: "",
        BRAND: "",
        ORIGIN: "",
        PRICE: 0
    })

    const { state: { products }, dispatch } = useContext(ProductsContext)

    useEffect(() => {
        setFormData(data)
    }, [data])


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(data.ID)
        let prodIndex = products.findIndex((obj => obj.ID === data.ID));
        let newProducts = products
        newProducts[prodIndex] = { ...formData, ID: data.ID }
        console.log(newProducts)
        dispatch({ type: "SET_PRODUCTS", payload: { products: newProducts } })
        toast.success("Updated Successfully!")
        test()
    }


    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-3xl relative h-5/6 overflow-y-scroll text-right">
                    {/* ================== CLOSE BUTTON =================  */}
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle sticky right-2 top-2">✕</label>
                    <div className="text-center">
                        <h2 className='text-xl font-bold'>Modify</h2>
                    </div>
                    {/* ============== FORM FOR MODIFYING PRODUCT ================  */}
                    <form onSubmit={(e => onSubmit(e))} className='mt-8 grid grid-cols-1 text-sm justify-items-center '>
                        <ImageSelect defaultValue={formData.IMAGE} choosenImg={(img) => setFormData(prevState => ({ ...prevState, IMAGE: img }))} />

                        <label className='relative right-24 top-3 bg-white px-2' htmlFor="name"> ar_classification </label>
                        <input
                            type="text"
                            onChange={(e) => setFormData(prevState => { return { ...prevState, ar_classification: e.target.value } })}
                            defaultValue={formData.ar_classification || ""}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <label className='relative right-24 top-3 bg-white px-2' htmlFor="name"> Classification </label>
                        <input
                            type='text'
                            onChange={(e) => setFormData(prevState => { return { ...prevState, CLASSIFICATION: e.target.value } })}
                            defaultValue={formData.CLASSIFICATION || ""}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <label className='relative right-24 top-3 bg-white px-2' htmlFor="name"> Family </label>
                        <input
                            type='text'
                            onChange={(e) => setFormData(prevState => { return { ...prevState, FAMILY: e.target.value } })}
                            defaultValue={formData.FAMILY || ""}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <label className='relative right-24 top-3 bg-white px-2' htmlFor="name"> Type </label>
                        <input
                            type='text'
                            onChange={(e) => setFormData(prevState => { return { ...prevState, TYPE: e.target.value } })}
                            defaultValue={formData.TYPE || ""}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <label className='relative right-24 top-3 bg-white px-2' htmlFor="name"> Description </label>
                        <input
                            type='text'
                            onChange={(e) => setFormData(prevState => { return { ...prevState, DESCRIPTION: e.target.value } })}
                            defaultValue={formData.DESCRIPTION || ""}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <label className='relative right-24 top-3 bg-white px-2' htmlFor="name"> Brand </label>
                        <input
                            type='text'
                            onChange={(e) => setFormData(prevState => { return { ...prevState, BRAND: e.target.value } })}
                            defaultValue={formData.BRAND || ""}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <label className='relative right-24 top-3 bg-white px-2' htmlFor="name"> Origin </label>
                        <input
                            type='text'
                            onChange={(e) => setFormData(prevState => { return { ...prevState, ORIGIN: e.target.value } })}
                            defaultValue={formData.ORIGIN || ""}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Price </label>
                        <input
                            type='text'
                            onChange={(e) => setFormData(prevState => { return { ...prevState, PRICE: e.target.value } })}
                            defaultValue={formData.PRICE || ""}
                            className="input input-bordered border-beige w-full max-w-xs"
                        />
                        <div className="text-end w-8/12 my-6">
                            <button type='submit' className="btn bg-green">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default UpdateModal