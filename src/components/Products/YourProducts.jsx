import { useState, useEffect, useContext } from 'react'
import ProductsContext from '@/src/context/ProductsContext';
import { useRouter } from 'next/router';
import ProductsPanelShadow from '../FallbackSahdow/ProductsPanelShadow';
import UpdateModal from './UpdateModal';
import SearchForm from './SearchForm';
import Pagination from '../Common/Pagination'
import SelectActions from './SelectActions';
import ProductsTable from './ProductsTable';
import Filter from './Filter';
import { data } from '@/src/data/products';

function YourProducts() {

    // Refresh State
    const [refresh, setRefresh] = useState(false)
    const [displayedProds, setDisplayedProds] = useState([])
    const [formData, setFormData] = useState({})
    const [dataLimit, setDataLimit] = useState(15)
    const [DISPLAY, setDISPLAY] = useState("")
    const [selected, setSelected] = useState({ isActive: false, data: [] })

    const { state: { products, prodCount, isLoading, searchVal }, dispatch } = useContext(ProductsContext)

    const router = useRouter()
    const { query, pathname } = router

    useEffect(() => {
        if (pathname === "/products-panel") {
            if (query.brand !== undefined && query.family !== undefined && query.page !== undefined) {
                let filtered = []
                let brand = false
                let family = false

                if (query.brand.length === 0 && query.family.length === 0) return dispatch({ type: "SET_PRODUCTS", payload: { products: data.products } })

                if (query.brand.length > 0) brand = true
                if (query.family.length > 0) family = true

                data.products.forEach((prod) => {
                    if (brand && family) {
                        if (query.brand === prod.BRAND && query.family === prod.FAMILY) filtered.push.prod
                    }
                    else if (brand) {
                        if (query.brand === prod.BRAND) filtered.push(prod)
                    }
                    else if (family) {
                        if (query.family === prod.FAMILY) filtered.push(prod)
                    }
                })
                dispatch({ payload: { products: filtered }, type: "SET_PRODUCTS" })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.brand, query.family, DISPLAY, dataLimit])

    useEffect(() => {
        let prods = [...products]
        if (searchVal.length < 2) {
            prods = prods.splice((query.page - 1) * dataLimit, dataLimit)
        }
        setDisplayedProds(prods)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, query.page, refresh])

    const onBRANDChange = (e) => window.location.assign(`https://demo.manafikhi.com/products-panel?brand=${e.target.value}&family=${query.family}&page=${1}`)

    const onFAMILYChange = (e) => window.location.assign(`https://demo.manafikhi.com/products-panel?brand=${query.brand}&family=${e.target.value}&page=${1}`)

    const onPageChange = (e) => window.location.assign(`https://demo.manafikhi.com/products-panel?brand=${query.brand}&family=${query.family}&page=${Number(e.target.id)}`)

    const onDISPLAYChange = (e) => setDISPLAY(e.target.value)


    const onModify = (e) => {
        const prod = displayedProds.find((product) => product.ID === Number(e.currentTarget.id))
        setFormData({ ...prod })
    }

    const onSelectedClick = (e, id) => {
        if (!selected.data.includes(id))
            setSelected(prevState => { return { isActive: true, data: [...prevState.data, id] } })
        else
            setSelected(prevState => { return { ...prevState, data: prevState.data.filter(ID => ID !== id) } })
    }

    // THIS FUNCTION IS FOR THE `SelectActions` COMPONENT
    const dataChange = (param) => {
        // -1 means that select all flag is activated
        if (param.data[0] === -1) {
            let newSelected = [];
            displayedProds.forEach(product => {
                newSelected.push(product.ID)
            })
            setSelected({ isActive: true, data: newSelected })
        }
        else {
            setSelected(param)
        }
    }

    return (
        <div id="productsPanel" dir='ltr' className="mt-10 pt-6 text-center pb-4 bg-neutral">
            {isLoading ? (<ProductsPanelShadow />) : (
                <>
                    {/* ======= SEARCH INPUT ====== */}
                    <SearchForm setRefresh={(prev) => setRefresh(!prev)} />
                    <Filter onBRANDChange={onBRANDChange} BRAND={query.brand} onFAMILYChange={onFAMILYChange} FAMILY={query.family} onDISPLAYChange={onDISPLAYChange} DISPLAY={DISPLAY} />
                    {/* ====== UPDATE FORM IN A MODAL ===== */}
                    <UpdateModal data={formData} test={() => { setRefresh(prevState => !prevState) }} pageData={{ dataLimit: dataLimit, offset: (query.page - 1) * dataLimit }} />
                    <SelectActions data={selected} dataChange={dataChange} />
                    <ProductsTable
                        products={products}
                        selected={selected}
                        displayedProds={displayedProds}
                        onSelectedClick={(e, ID) => onSelectedClick(e, ID)}
                        onModify={(e) => onModify(e)}
                    />
                    {searchVal.length === 0 ? <Pagination onPageChange={(e) => onPageChange(e)} prodCount={prodCount} dataLimit={dataLimit} page={Number(query.page)} /> : null}
                </>
            )
            }
        </div>
    )
}

export default YourProducts
