import AnalyticsComp from "@/src/components/Analytics/AnalyticsComp"
import Head from 'next/head'

function analytics(props) {

    return (
        <>
            <Head>
                <title>Dashboard - Analytics</title>
            </Head>
            <AnalyticsComp />
        </>
    )
}

export default analytics