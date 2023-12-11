import React from 'react'

function AnalyticsTable({ data }) {

    const breakingLines = (str) => {
        let final = `${str.substring(0, 60)} ${str.length > 60 ? str.substring(60, str.length - 1) : ""}`
        return final
    }

    return (
        <>
            <div className="overflow-x-auto my-8 ">
                <table className="table table-xs mx-auto table-pin-rows table-pin-cols dashboard-table bg-neutral">
                    <thead className="bg-neutral" >
                        <tr className="text-center " >
                            <th className='text-sm bg-gray-100 '>ID</th>
                            <td className='text-sm bg-gray-100'>Landing Page</td>
                            <td className='text-sm bg-gray-100'  >Views</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            if (index < 50) {
                                return (
                                    <tr key={index}>
                                        <th className='dash-tbl-cells'>{index + 1}</th>
                                        <td className='dash-tbl-cells'>{breakingLines(item.dimensionValues[0].value)}</td>
                                        <td className='dash-tbl-cells'>{item.metricValues[0].value}</td>
                                    </tr>
                                )
                            }
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AnalyticsTable