import { useContext } from 'react'
import ProductsContext from '@/src/context/ProductsContext'
import Link from 'next/link'
import Image from 'next/image'

function LinksSearch({ selectedHeroImage, onLinkChoose }) {

  const { state: { autoComplete }, onSearchChange } = useContext(ProductsContext)

  const onChange = (e) => {
    // Determine which state to set the result in `products or search result`
    let isProds = false
    onSearchChange(e, isProds)
  }

  return (
    <>
      <div className='relative grid grid-cols-12 justify-evenly justify-items-center'>
        <input
          onChange={(e) => onChange(e)}
          placeholder="Type here"
          className="input col-span-12 input-bordered w-full max-w-lg"
          id='Tags'
          data-tooltip-id="Tags"
        />
      </div>
      <div className={`${autoComplete.length === 0 ? "hidden" : ""} w-10/12 h-80 mt-28 sm:mt-16 grid grid-cols-1 bg-stone-200 rounded-lg search-auto-complete overflow-y-scroll`}>
        {autoComplete.map((res, index) => {
          return (
            <label htmlFor="link-modal" onClick={(e) => onLinkChoose(e, res.ID, res.ar_classification)} key={index} id={index} className={`flex flex-auto justify-between w-full h-16 px-4 my-2 cursor-pointer hover:bg-stone-400 `}>
              <div className="grid" >
                <div className='text-base my-auto mx-2'>{res.FAMILY} <span className='text-tertiary text-xs'>{res.BRAND}</span> </div>
                <span className='text-xs my-auto mx-2'>{res.FAMILY} | {res.TYPE}</span>
              </div>
              <Image priority={true} width={192} height={192} className='w-16 h-16 rounded-3xl' src={`https://zahabico.com/api/v1/assets/${res.IMAGE}` || test.src} alt='product' />
            </label>
          )
        })}
      </div>
    </>
  )
}

export default LinksSearch
