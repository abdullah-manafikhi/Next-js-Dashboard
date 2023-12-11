import { useState } from 'react'
import ImageSelect from '@/src/components/Images/ImageSelect'
import VerticalNavbar from '@/src/components/Common/VerticalNavbar'
import { BiChevronRight } from 'react-icons/bi'
import { toast } from 'react-toastify'

function AddProducts() {

    const [navbar, setNavbar] = useState(false)

    const [formData, setFormData] = useState({
        image: "",
        ar_classification: "",
        CLASSIFICATION: "",
        FAMILY: "",
        TYPE: "",
        DESCRIPTION: "",
        BRAND: "",
        ORIGIN: "",
        ORIGIN: ""
    })

    const onSubmit = async (e) => {
        e.preventDefault()

    }

    const handleClick = () => {
        setNavbar((prevState) => !prevState);
    }

    return (
        <div dir='ltr' className='grid grid-cols-10 min-w-full bg-gray-100 text-gray-800'>
            <div className='col-span-2'>
                <VerticalNavbar navbar={navbar} />
                <span
                    className={`z-50 text-neutral rounded-r-2xl bg-primary text-3xl block cursor-pointer fixed top-32 ${!navbar ? 'left-56 ' : 'left-0'}`}
                    onClick={() => handleClick()}
                >
                    <BiChevronRight className={`${navbar ? 'rotate-0' : 'rotate-180'}`} />
                </span>
            </div>
            {formData === null ? (<h2 className='mx-auto'>Loading....</h2>) :
                <form onSubmit={(e) => onSubmit(e)} className={` ${!navbar ? 'col-span-8 ' : 'col-span-10 '} my-6 grid grid-cols-1 justify-items-center w-4/5 px-4 mx-auto bg-neutral rounded-xl shadow-md`}>
                    <h2 className='w-fit mt-6 mb-8 mx-auto text-primary border-b-2 border-tertiary text-2xl px-6 font-bold '>ADD PRODUCTS</h2>
                    <ImageSelect choosenImg={(img) => setFormData(prevState => ({ ...prevState, image: img }))} />
                    <label className='relative right-16 top-3 text-beige bg-white px-2' htmlFor="name"> ar_classification </label>
                    <input
                        type="text"
                        onChange={(e) => setFormData({ ...formData, ar_classification: e.target.value })}
                        defaultValue={formData.ar_classification || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <label className='relative right-16 top-3 text-beige bg-white px-2' htmlFor="name"> Classification </label>
                    <input
                        type='text'
                        onChange={(e) => setFormData({ ...formData, CLASSIFICATION: e.target.value })}
                        defaultValue={formData.CLASSIFICATION || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Family </label>
                    <input
                        type='text'
                        onChange={(e) => setFormData({ ...formData, FAMILY: e.target.value })}
                        defaultValue={formData.FAMILY || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Type </label>
                    <input
                        type='text'
                        onChange={(e) => setFormData({ ...formData, TYPE: e.target.value })}
                        defaultValue={formData.TYPE || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <label className='relative right-16 top-3 text-beige bg-white px-2' htmlFor="name"> Description </label>
                    <input
                        type='text'
                        onChange={(e) => setFormData({ ...formData, DESCRIPTION: e.target.value })}
                        defaultValue={formData.DESCRIPTION || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Brand </label>
                    <input
                        type='text'
                        onChange={(e) => setFormData({ ...formData, BRAND: e.target.value })}
                        defaultValue={formData.BRAND || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Origin </label>
                    <input
                        type='text'
                        onChange={(e) => setFormData({ ...formData, ORIGIN: e.target.value })}
                        defaultValue={formData.ORIGIN || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Price </label>
                    <input
                        type='text'
                        onChange={(e) => setFormData({ ...formData, PRICE: e.target.value })}
                        defaultValue={formData.PRICE || ""}
                        className="input input-bordered bg-neutral border-beige w-full max-w-xs"
                    />
                    <div className="text-end w-8/12 my-6 ">
                        <button className="btn">submit</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default AddProducts
