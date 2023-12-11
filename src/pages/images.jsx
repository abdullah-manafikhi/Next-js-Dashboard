import dynamic from "next/dynamic"
import Head from 'next/head'

function images() {

    const Images = dynamic(
        () => import('../components/Images/ImagesComp'),
        { ssr: false }
    )

    return (
        <>
            <Head>
                <title>Dashboard - Images</title>
            </Head>
            <Images />
        </>
    )
}


export default images