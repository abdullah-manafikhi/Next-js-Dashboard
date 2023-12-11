import AddProducts from "@/src/components/Products/AddProducts"
import Head from "next/head"

function addProducts() {

    return (
        <>
            <Head>
                <title>Dashboard - Add Product</title>
            </Head>
            <AddProducts />
        </>
    )
}

export default addProducts
