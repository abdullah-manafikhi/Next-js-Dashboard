import TableRow from "./TableRow"

function ProductsTable({ products, displayedProds, selected, onSelectedClick, onModify }) {

    return (
        <table className="table table-compact table-pin-rows dashboard-table w-11/12 mx-auto bg-neutral">
            {/*-- head -- */}
            <thead className='bg-neutral'>
                <tr style={{ position: "sticky", top: "0px" }} className='text-center text-base font-sans z-40 bg-gray-100'>
                    <th className='bg-gray-100'>ID</th>
                    <th className='bg-gray-100'>Image</th>
                    <th className='bg-gray-100'>تصينف</th>
                    <th className='bg-gray-100'>Classification</th>
                    <th className='bg-gray-100'>Family</th>
                    <th className='bg-gray-100'>Type</th>
                    <th className='bg-gray-100'>Description</th>
                    <th className='bg-gray-100'>Brand</th>
                    <th className='bg-gray-100'>Origin</th>
                    <th className='bg-gray-100'>Price</th>
                    <th className='bg-gray-100'></th>
                </tr>
            </thead>
            <tbody className='overflow-x-scroll' >{
                (products.length > 0) ?
                    (displayedProds).map((product, index) => (
                        <TableRow
                            key={index}
                            product={product}
                            index={index}
                            selected={selected}
                            displayedProds={displayedProds}
                            onSelectedClick={(e) => onSelectedClick(e, product.ID)}
                            onModify={(e) => onModify(e)}
                        />
                    )) : null
            }
            </tbody>
        </table>
    )
}

export default ProductsTable
