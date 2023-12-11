import { useContext } from 'react'
import ProductsContext from '@/src/context/ProductsContext'
import { AiOutlineSearch } from 'react-icons/ai'

function SearchForm({ setRefresh }) {

    const { onSearchChange, onReset } = useContext(ProductsContext)

    const onChange = (e) => {
        // Determine which state to set the result to `products or search result` state
        let isProds = true
        onSearchChange(e, isProds)
    }

    const onClick = () => {
        const searchInput = document.getElementById("dashSearchInpt")
        onReset(searchInput)
        setRefresh(prev => !prev)
    }

    return (
        <form dir="ltr" className={`relative flex top-2 mb-4 justify-center mx-4 sm:mx-auto max-w-2xl`} onSubmit={(e) => e.preventDefault()}>
            <input type="text" onChange={(e) => onChange(e)} placeholder="Search..." id="dashSearchInpt" className="input input-bordered input-md w-full text-black mx-auto bg-neutral " />
            <button className="btn btn-ghost absolute right-0 w-18 rounded-l-none">
                <AiOutlineSearch className='w-8 h-8' />
            </button>
            <button onClick={(e) => onClick(e)} className='btn btn-ghost absolute -right-20' >Reset</button>
        </form>
    )
}

export default SearchForm
