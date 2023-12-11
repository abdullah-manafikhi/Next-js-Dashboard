import { useState, useEffect, useContext } from 'react'
import ImagesContext from '@/src/context/ImagesContext'
import Slider from './Slider'
import ImageSelect from '../Images/ImageSelect'
import LinkChoose from './LinkChoose'
import { BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { data } from '@/src/data/heroImages'

function SliderSettings() {

    const [BRAND, setBRAND] = useState("");
    const [FAMILY, setFAMILY] = useState("")
    const [tabs, setTabs] = useState("single")

    const { state: { heroImages, selectedHeroImage }, dispatch } = useContext(ImagesContext)

    useEffect(() => { dispatch({ type: "SET_HERO_IMAGES", payload: data }) }, [])

    // HIGHLIGHTING THE SELECTED SLIDE & detecting the suitable tab in the link modal
    const onClick = (e) => {
        if (e.clickedSlide) {
            let tab = "single"
            const selectedSlide = heroImages.find(image => image.ID === Number(e.clickedSlide.id))
            if (/brand=[a-zA-z-]*&{1,}/mg.exec(selectedSlide.link)) {
                let brandValue = (/brand={1,}[a-zA-z-]*&{1,}/mg.exec(selectedSlide.link)[0])
                brandValue = brandValue.replace("brand=", "");
                brandValue = brandValue.replace("&", "")
                setBRAND(brandValue)
                tab = "group"
            }

            if (/family=[a-zA-z-]*&/mg.exec(selectedSlide.link)) {
                let classificationValue = (/family=[a-zA-z-]*&/mg.exec(selectedSlide.link)[0])
                classificationValue = classificationValue.replace(/family=/g, "");
                classificationValue = classificationValue.replace("&", "")
                setFAMILY(classificationValue)
                tab = "group"
            }
            setTabs(tab)
            dispatch({ type: "SET_SELECTED_HERO_IMAGE", payload: selectedSlide })
            dispatch({ type: "SET_SELECTED_IMG", payload: { name: selectedSlide.images } })
            const prevImg = document.getElementById(`${selectedHeroImage.ID}`)
            if (prevImg) {
                prevImg.classList.remove("selectedImg")
            }
            e.clickedSlide.classList.add("selectedImg")
        }
    }

    // ADDING NEW SLIDE
    const onAddClick = (e) => {
        dispatch({ type: "ADD_SLIDE", payload: heroImages[heroImages.length - 1].ID + 1 })
    }

    // CHANGING THE IMAGE IN A SLIDE
    const modifyingImages = async (param) => {
        let imgId = Number(selectedHeroImage.ID)
        let newData = { ...selectedHeroImage }
        newData = { ...newData, images: param }
        let newImages = [];
        heroImages.forEach((image, index) => {
            (image.ID === imgId) ? newImages.push(newData) : newImages.push(image)
        })
        dispatch({ type: "SET_HERO_IMAGES", payload: newImages })
        dispatch({ type: "SET_SELECTED_HERO_IMAGE", payload: newData })
    }

    // HANDLING DELETION OF A SLIDER
    const handleDelete = async (e) => {
        if (window.confirm(`Are you sure you want to remove ${selectedHeroImage.images}`)) {
            const ID = Number(selectedHeroImage.ID)
            let newImages = heroImages.filter(img => img.ID !== ID)
            dispatch({ type: "SET_HERO_IMAGES", payload: newImages })
            toast.success("Deleted Successfully!")
        }
    }

    const style = { height: "13rem", overflow: "hidden", margin: "2rem 0rem", padding: "3rem", borderLeft: "2px solid #F3F4F6", borderRight: "2px solid #F3F4F6" }

    if (heroImages.length > -1) {
        return (
            <div className='w-10/12 mx-auto py-1 px-4 my-6 bg-neutral rounded-xl shadow-md overflow-hidden'>
                <h2 className='col-span-1 w-fit mt-6 mb-8 mx-auto text-primary border-b-2 border-tertiary text-xl px-4 font-bold'>HOME PAGE SLIDER</h2>
                <Slider defaultValue={selectedHeroImage} onClick={(x) => onClick(x)} slidesPerView={3} autoPlay={true} navigation={true} style={style} images={heroImages} />
                <div className="flex flex-wrap justify-center mx-auto mb-4">
                    <ImageSelect
                        choosenImg={(param) => modifyingImages(param)}
                        isActive={selectedHeroImage.hasOwnProperty("ID") ? true : false}
                        title="choose an image from above"
                    />
                    <LinkChoose
                        BRAND={BRAND}
                        FAMILY={FAMILY}
                        tabs={tabs}
                        setTabs={(val => setTabs(val))}
                        setBRAND={(val => setBRAND(val))}
                        setFAMILY={(val) => setFAMILY(val)}
                    />
                    <span onClick={(e) => handleDelete(e)} className={`btn btn-sm ${selectedHeroImage.hasOwnProperty("ID") ? "bg-neutral text-red-700 border-none hover:bg-red-800 hover:text-neutral   " : "btn-disabled"}  p-1 font-normal my-auto`}>
                        <BiTrash className='w-4 h-4' />
                    </span>
                    <button onClick={(e) => onAddClick(e)} className={`btn btn-sm mx-2 my-auto btn-ghost text-success `}>
                        <span className='text-xl mx-2 mb-1'>+</span> ADD NEW
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (<h2>Loading...</h2>)
    }
}

export default SliderSettings