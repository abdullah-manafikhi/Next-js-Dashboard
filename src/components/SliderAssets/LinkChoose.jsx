import { useContext } from 'react'
import ImagesContext from '@/src/context/ImagesContext'
import Link from 'next/link'
import Filter from '../Products/Filter'
import LinksSearch from './LinksSearch'
import { BsLink45Deg } from 'react-icons/bs'

function LinkChoose({ BRAND, setBRAND, FAMILY, setFAMILY, tabs, setTabs }) {


    const { state: { selectedHeroImage, heroImages }, dispatch } = useContext(ImagesContext)

    const onLinkChoose = async (e, id, ar_classification) => {
        const newData = { ...selectedHeroImage, link: `https://zahabico.com/products/${id}/${ar_classification}` }
        let newHeroImages = []
        heroImages.forEach(img => {
            (img.ID === newData.ID) ? newHeroImages.push(newData) : newHeroImages.push(img)
        })
        dispatch({ type: "SET_SELECTED_HERO_IMAGE", payload: newData })
        dispatch({ type: "SET_HERO_IMAGES", payload: newHeroImages })
    }

    const onBRANDChange = (e) => {
        const value = e.target.value
        setBRAND(value)
        let newHeroImages = []
        const newData = { ...selectedHeroImage, link: `https://zahabico.com/products?brand=${value}&family=${FAMILY}&page=1` }
        heroImages.forEach(img => {
            (img.ID === newData.ID) ? newHeroImages.push(newData) : newHeroImages.push(img)
        })
        dispatch({ type: "SET_SELECTED_HERO_IMAGE", payload: newData })
        dispatch({ type: "SET_HERO_IMAGES", payload: newHeroImages })
    }

    const onFAMILYChange = (e) => {
        const value = e.target.value
        setFAMILY(value)
        let newHeroImages = []
        const newData = { ...selectedHeroImage, link: `https://zahabico.com/products?brand=${BRAND}&family=${value}&page=1` }
        heroImages.forEach(img => {
            (img.ID === newData.ID) ? newHeroImages.push(newData) : newHeroImages.push(img)
        })
        dispatch({ type: "SET_SELECTED_HERO_IMAGE", payload: newData })
        dispatch({ type: "SET_HERO_IMAGES", payload: newHeroImages })
    }

    return (
        <>
            <button
                onClick={(e) => document.getElementById('link-modal').showModal()}
                className={`btn btn-sm btn-ghost my-auto mx-2   ${selectedHeroImage.hasOwnProperty("ID") ? " " : "btn-disabled"}`}
            >
                <BsLink45Deg className='w-4 h-4' />
            </button>
            <dialog id="link-modal" className="modal">
                <div style={{ height: "80vh" }} className="modal-box max-w-3xl text-center">
                    <button
                        onClick={(e) => document.getElementById('link-modal').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >✕</button>
                    <h3 className="font-bold text-xl w-fit mx-auto my-2 relative -top-4">Please Enter Your Desired Product Name</h3>
                    <div className="tabs w-fit mx-auto mb-4">
                        <span onClick={() => setTabs("group")} className={`tab tab-bordered ${tabs === "group" ? " tab-active " : ""}`}>Group</span>
                        <span onClick={() => setTabs("single")} className={`tab tab-bordered ${tabs === "single" ? " tab-active " : ""}`}>Single Product</span>
                    </div>
                    {tabs === "group" ?
                        (
                            <>
                                <Link target="_blank" href={`${selectedHeroImage.link}`} className="text-sm my-2 underline text-blue-400">{selectedHeroImage.link}</Link>
                                <Filter
                                    BRAND={BRAND}
                                    onBRANDChange={(e) => onBRANDChange(e)}
                                    FAMILY={FAMILY}
                                    onFAMILYChange={(e) => onFAMILYChange(e)}
                                    DISPLAY={null}
                                />
                            </>
                        ) :
                        (
                            <>
                                <Link target="_blank" href={`${selectedHeroImage.link}`} className="text-sm my-2 underline text-blue-400">{selectedHeroImage.link}</Link>
                                <LinksSearch selectedHeroImage={selectedHeroImage} onLinkChoose={onLinkChoose} />
                            </>
                        )
                    }
                </div>
            </dialog>
        </>
    )
}

export default LinkChoose
