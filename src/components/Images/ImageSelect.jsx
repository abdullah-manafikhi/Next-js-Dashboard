import { useState, useEffect, useContext } from 'react';
import ImagesContext from '@/src/context/ImagesContext';
import { PropTypes } from 'prop-types';
import Image from 'next/image';
import { data } from '@/src/data/images';
import ImagesSearchForm from './ImagesSearchForm';
import ImagesSort from './ImagesSort';
import Pagination from '../Common/Pagination';


export default function ImageSelect({ defaultValue, choosenImg, isActive, title }) {

    const { state: { images, selectedImg, selectedHeroImage }, dispatch } = useContext(ImagesContext)
    
    const [selectedOne, setSelectedOne] = useState("");

    useEffect(() => {
        const sorted = data.sort((a, b) => b.time - a.time)
        dispatch({ type: "SET_IMAGES", payload: sorted })
    }, [])
    useEffect(() => {
        setSelectedOne(defaultValue);
    }, [defaultValue]);


    const [dataLimit, setdataLimit] = useState(20);
    const [displayedImgs, setDisplayedImgs] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let imgs = [...images];
        imgs = imgs.splice((page - 1) * dataLimit, dataLimit);
        setDisplayedImgs(imgs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, page, images]);

    const onImgSelect = (e) => {
        const choosen = images.find(img => img.name === e.currentTarget.id);
        dispatch({ type: "SET_SELECTED_IMG", payload: choosen })
        setSelectedOne(e.currentTarget.id);
        choosenImg(e.currentTarget.id);
    };

    
    const onPageChange = (e) => { setPage(Number(e.target.id)); };

    const closeModal = (e) => { document.getElementById('imageSelect').close(); };

    const show = (e) => {
        e.preventDefault();
        document.getElementById('imageSelect').showModal();
    };

    return (
        <>
            <div title={title} className="flex felx-auto my-4 mx-2 ">
                <button className={`btn btn-sm my-auto ${!isActive ? "btn-disabled" : ""} `} onClick={(e) => show(e)}>Image</button>
                <p className='mx-4 my-auto border-2 border-gray-400 border-opacity-20 px-8'>
                    {selectedOne !== "" ? selectedOne : selectedHeroImage.images}
                </p>
            </div>
            <dialog id="imageSelect" className="modal">
                <div className="modal-box max-w-3xl relative">
                    <button type="button" onClick={(e) => closeModal(e)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <ImagesSort />
                    <ImagesSearchForm setPage={(val) => setPage(val)} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center gap-6 mx-auto my-8">
                        {displayedImgs.map((image, index) => {
                            return (
                                <div
                                    key={index} id={image.name} onClick={(e) => onImgSelect(e)}
                                    className={`${defaultValue === image.name || selectedImg.name === image.name ? ("border-2 border-blue-500 ") : ""} mx-4 p-2 cursor-pointer text-xs w-auto break-all text-center`}>
                                    <Image priority={true} width={192} height={192} className='w-20 h-20' src={`https://zahabico.com/api/v1/assets/${image.name}` || test.src} alt='product' />
                                    <p>{image.name}</p>
                                </div>
                            );
                        })}
                    </div>
                    <Pagination onPageChange={(e) => onPageChange(e)} prodCount={images.length} dataLimit={dataLimit} page={page} />
                </div>
            </dialog>
        </>
    );
}
ImageSelect.defaultProps = {
    defaultValue: "",
    choosenImg: () => { },
    isActive: true,
};
ImageSelect.propTypes = {
    defaultValue: PropTypes.string,
    choosenImg: PropTypes.func,
    isActive: PropTypes.bool,
};
