import { useState, useRef, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import FormData from 'form-data'
import Upload from '../../images/Upload.svg'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'


function DragDrop() {
  const router = useRouter()

  const [files, setFiles] = useState([])

  // to insure that the uploaded files are images
  const regex = /image\/\w+/gm;

  const dragZone = useRef()

  const onSubmit = async (e) => {
    const id = toast.loading("Uploading...")
    e.preventDefault()
    if (files.length === 0) {
      toast.update(id, { render: "Please Select An Image", type: "error", isLoading: false })
      setTimeout(() => {
        router.reload()
      }, 700);
      return console.log("Please Select An Image")
    }
    toast.update(id, { render: "Uploaded Successfully!", type: "success", isLoading: false })
    setTimeout(() => {
      router.reload()
    }, 700);
  }

  const onChange = (e) => {
    const uploaded = [...e.target.files]
    filesSetter(uploaded)
  }

  const handleCloseBtn = (file) => {
    setFiles(prevState => prevState.filter(item => item !== file))
  }

  const onDragEnter = (e) => {
    e.preventDefault()
    dragZone.current.classList.add("dragOver")
  }
  const onDragLeave = (e) => {
    e.preventDefault()
    dragZone.current.classList.remove("dragOver")
  }

  const onDrop = (e) => {
    e.preventDefault()
    dragZone.current.classList.remove("dragOver")
    const uploaded = [...e.dataTransfer.files]
    filesSetter(uploaded)
  }

  const filesSetter = (uploaded) => {
    uploaded.forEach((file) => {
      if (!(file.type).match(regex)) {
        dragZone.current.classList.add("dropAreaFailed")
        setTimeout(() => {
          dragZone.current.classList.remove("dropAreaFailed")
        }, 2000);
        toast.error("You can only upload images !")

      }
      else {
        dragZone.current.classList.add("dropAreaSuccess")
        setTimeout(() => {
          dragZone.current.classList.remove("dropAreaSuccess")
        }, 2000);
        setFiles(prevState => {
          if (prevState) {
            return [...prevState, file]
          }
          else {
            return [...file]
          }
        })
      }
    })
  }

  return (
    <>
      <form
        className='text-right'
        encType="multipart/form-data"
        method="post"
        onSubmit={(e) => onSubmit(e)}
      >
        <div
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          ref={dragZone} className={`relative flex flex-col items-center justify-center text-center w-8/12 mx-auto px-4 h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100`}
        >
          <svg className="w-8 h-8 mb-4 mx-auto dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
          </svg>
          <p className="mb-2 text-xs sm:text-sm  dark:text-gray-400">Click to<span className="font-bold text-tertiary text-base sm:text-xl"> Upload</span> or drag and drop</p>
          <p className="text-xs  dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 1,920px x 1,080px)</p>
          <br />
          <input onChange={(e) => onChange(e)} id='myImage' name='myImage' className='absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer' type='file' multiple />
        </div>
        <div className={`uploadedFiles`}>
          {files.map((file, index) => (
            <span key={index} className="badge border-none text-primary flex-none bg-gray-100 flex justify-between w-fit">
              <span>{file.name}</span>
              <AiOutlineClose onClick={() => handleCloseBtn(file)} className='text-xs ml-4 cursor-pointer' />
            </span>
          ))}
        </div>
        <button type='submit' className='btn btn-ghost mr-4 text-gray-800'>Upload</button>
      </form>
    </>
  )
}

export default DragDrop
