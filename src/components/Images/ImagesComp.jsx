import { useState, useEffect, useRef, useContext } from 'react'
import ImagesContext from '@/src/context/ImagesContext'
import { useRouter } from 'next/router'
import Image from 'next/image'
import VerticalNavbar from "../Common/VerticalNavbar"
import SectionHeader from '../Common/SectionHeader'
import DragDrop from './DragDrop'
import ImagesSort from '@/src/components/Images/ImagesSort'
import ImagesSearchForm from '@/src/components/Images/ImagesSearchForm'
import Pagination from '../Common/Pagination'
import { BiChevronRight, BiImage } from 'react-icons/bi'
import ImageDisplay from './ImageDisplay'
import { data } from '@/src/data/images'


function Images() {
    // for openning and closing the navbar
    const [navbar, setNavbar] = useState(false)

    const [dataLimit, setdataLimit] = useState(50)
    const [displayedImgs, setDisplayedImgs] = useState([])
    const [page, setPage] = useState(1)

    const { state: { images, selectedImg }, dispatch } = useContext(ImagesContext)

    const handleClick = () => {
        setNavbar((prevState) => !prevState);
    }

    useEffect(() => {
        const sortedData = data.sort((a, b) => b.time - a.time)
        dispatch({ type: "SET_IMAGES", payload: sortedData })
    }, [])

    // Dividing images into pages, only "datalimit" images will be displayed
    useEffect(() => {
        let imgs = [...images]
        imgs = imgs.splice((page - 1) * dataLimit, dataLimit)
        setDisplayedImgs([])
        setTimeout(() => {
            setDisplayedImgs(imgs)
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, page])

    // we are getting the selected image data
    const imageClick = (image) => {
        const date = new Date(image.time).toLocaleString()
        dispatch({ type: "SET_SELECTED_IMG", payload: { name: image.name, url: `https://zahabico.com/api/v1/assets/${image.name}` } })
        document.getElementById('imageDisplay').showModal()
    }

    const onPageChange = (e) => {
        setPage(Number(e.target.id))
    }

    return (
        <div style={{ height: "fit-content" }} dir='ltr' className='grid grid-cols-10 w-full pb-8 bg-gray-100 text-gary-100'>
            <div className='col-span-2' >
                <VerticalNavbar navbar={navbar} />
                <span
                    className={`z-50 text-neutral rounded-r-2xl bg-primary text-3xl cursor-pointer block fixed top-32 ${!navbar ? 'left-56' : 'left-0'}`}
                    onClick={() => handleClick()}
                >
                    <BiChevronRight className={`${navbar ? 'rotate-0' : 'rotate-180'}`} />
                </span>
            </div>
            <div className={`${!navbar ? 'col-span-8' : 'col-span-10'} bg-neutral rounded-xl shadow-md h-full w-auto my-6 mx-6 sm:mx-12 `}>
                <h2 className='w-fit mt-6 mb-12 mx-auto text-primary border-b-2 border-tertiary text-2xl px-6 font-bold '>UPLOAD IMAGES</h2>
                <DragDrop />
                <ImageDisplay selectedImg={selectedImg} />
                <ImagesSort />
                <ImagesSearchForm setPage={(val) => setPage(val)} />
                <div className='grid gap-x-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-start mx-auto mt-4 w-10/12'>
                    {images.length === undefined ? (<h2 className='col-span-4'>No Images Yet ....!</h2>) : displayedImgs.map((image, index) => (
                        <label onClick={() => imageClick(image)} htmlFor="my-modal-3" className='m-auto text-xs hover:text-blue-500 hover:cursor-pointer grid py-1' id="my-modal-3" key={index}>
                            <figure className='w-20 max-h-20 sm:w-24 sm:h-24 py-1 border border-gray-100 rounded-lg m-auto' >
                                <Image
                                    priority={index === 0 ? true : false}
                                    width={380}
                                    height={360}
                                    className='mx-auto w-16 max-h-16 sm:w-20 sm:max-h-20 my-auto'
                                    // id={`${firstPart}-lg.${ext}`}
                                    src={`https://zahabico.com/api/v1/assets/${image.name}`}
                                    alt='product'
                                />
                            </figure>
                            <p className='mt-1 ml-1'>{image.name}</p>
                            {/* <BiImage className='w-6 h-6' alt='image icon' />
                             */}
                        </label>
                    ))}
                </div>
                <Pagination onPageChange={(e) => onPageChange(e)} prodCount={images.length} dataLimit={dataLimit} page={page} />
            </div>

        </div >

    )
}

export default Images