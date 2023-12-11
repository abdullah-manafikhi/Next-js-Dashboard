import { useState, useEffect, useRef, useContext } from 'react'
import ImagesContext from '@/src/context/ImagesContext'
import Image from 'next/image'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import { toast } from 'react-toastify'

function ImageDisplay() {

    const [inputDisabled, setInputDisabled] = useState(true)

    const { state: { images, selectedImg }, dispatch } = useContext(ImagesContext)

    const inputRef = useRef()

    const closeModal = (e) => {
        document.getElementById('imageDisplay').close()
    }

    const onSubmit = async (e) => {
        e.preventDefault()
    }

    const onDeleteClick = async () => {
        if (window.confirm(`Are you sure you want to delete ${selectedImg.name}`)) {
            const newImages = images.filter(img => img.name !== selectedImg.name)
            dispatch({ type: "SET_IMAGES", payload: newImages })
            toast.success("Deleted Successfully!")
        }
    }

    const onChange = (e) => {
        dispatch({ type: "SET_SELECTED_IMG", payload: { ...selectedImg, name: e.target.value } })
    }

    const onRenameClick = () => {
        setInputDisabled(prevState => !prevState)
        setTimeout(() => {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(0, inputRef.current.value.length - 4);
        }, 300);
    }

    return (
        <>
            {/* ================ MODAL =================== */}
            {/* this is the module that will display the image when clicking on the image name*/}
            {/* <button className="btn" onClick={() => document.getElementById('imageDisplay').showModal()}>open modal</button> */}
            <dialog id="imageDisplay" className="modal">
                <div className="modal-box">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={(e) => closeModal(e)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <Image className='h-72 w-72 mx-auto' width={500} height={500} src={selectedImg.url} alt="product" />
                    <p className='w-fit mx-auto text-xs font-sans'>{selectedImg.time}</p>
                    <div className="w-full flex flex-auto justify-center text-center my-10">
                        <form className='relative' onSubmit={(e) => onSubmit(e)}>
                            <input ref={inputRef} type="text" onChange={(e) => onChange(e)} value={selectedImg.name} className="input input-ghost w-full max-w-xs text-black-900" disabled={inputDisabled} />
                            <button type='submit' className={`btn btn-xs w-fit  top-3 right-1 ${inputDisabled ? 'hidden' : 'absolute'}`}>submit</button>
                        </form>
                        <span onClick={onRenameClick} className='btn btn-ghost'><MdDriveFileRenameOutline className='w-5 h-5' /></span>
                        <span onClick={onDeleteClick} className='btn btn-ghost'><BsTrash className='w-5 h-5' /></span>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default ImageDisplay