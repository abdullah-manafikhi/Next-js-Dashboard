import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'


function CurrencyPrice({ price, isSuccess }) {

  // const { price } = useSelector(store => store.products)

  // const dispatch = useDispatch()
  const [tempPrice, setTempPrice] = useState(0)
  const [toggle, setToggle] = useState(true)
  // const [currentPrice, setCurrentPrice] = useState(price)

  useEffect(() =>  {
    const inpt = document.getElementById("inputToggle")
    if(price === -1){
      inpt.checked = false
    }
    else{
      inpt.checked = true
    }
  }, [price])


  useEffect(() => {
    if(price !== -1){
      setTempPrice(price)
    }
    else{
      setTempPrice(0)
    }
  }, [price])


  const onPriceChange = (e) => {
    setTempPrice(e.currentTarget.value)
    // dispatch(priceUpdate(e.currentTarget.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(priceUpdate(tempPrice))
  }

  const onToggle = (e) => {
    const val = e.target.checked
    if(!val){
      dispatch(priceUpdate(-1))
    }
    else{
      dispatch(priceUpdate(0))
    }
  }

  return (
    <div dir="ltr" className="bg-neutral shadow-md rounded-xl pt-6 mb-6 mx-auto px-2 w-10/12">
      <h2 className='w-fit mb-12 mx-auto text-primary border-b-2 border-tertiary text-xl font-bold '>PRICE SETTINGS</h2>

      <div className="grid grid-cols-3 justify-items-start my-8">
        <h2 className="col-span-1 w-fit mx-6 text-primary sm:text-xl font-bold mx-auto">Price</h2>
        <label className="am_switch col-span-2 place-items-start">
          <input onChange={(e) => onToggle(e)} id="inputToggle" type="checkbox" />
          <span className="am_slider am_round"></span>
        </label>
      </div>

      <div className='grid grid-cols-3 justify-items-center'>
        <h2 className='col-span-1 w-fit mx-6 text-primary sm:text-xl font-bold'>Currency </h2>
        <form className='col-span-2 h-fit w-full my-auto' onSubmit={(e) => onSubmit(e)}>
          <input
            disabled={price === -1 ? true : false}
            type="number" step="100"
            onChange={(e) => onPriceChange(e)}
            value={tempPrice}
            placeholder="$ Price" className="input input-sm input-bordered text-black bg-neutral font-extrabold inline w-full mx-auto my-auto max-w-xs"
          />
          <div className="text-end">
            <button className={`btn btn-ghost ${price === -1 ? "btn-disabled" : ""}`}>submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CurrencyPrice