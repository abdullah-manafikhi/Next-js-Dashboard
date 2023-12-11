import { useState, useEffect } from 'react'
import VerticalNavbar from "@/src/components/Common/VerticalNavbar"
import { BiChevronRight } from 'react-icons/bi'
import Chart from '@/src/components/Analytics/Chart'
import AnalyticsTable from '@/src/components/Analytics/AnalyticsTable'
import AnalyticsGraph from '@/src/components/Analytics/AnalyticsGraph'
import { demoData } from '@/src/data/analytics'


function AnalyticsComp() {

  const [navbar, setNavbar] = useState(false)
  const [duration, setDuration] = useState("week")

  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [sessionsAvg, setSessionsAvg] = useState(0)

  const [tableData, setTableData] = useState([])
  const [graphData, setGraphData] = useState({})

  const [deviceCategory, setDeviceCategory] = useState({ headers: [], values: [] })
  const [browser, setBrowser] = useState({ headers: [], values: [] })


  useEffect(() => {
    setTotalUsers(2300)
    setActiveUsers(53)
    setSessionsAvg(2.3)

    setBrowser({ headers: demoData.browser.headers, values: demoData.browser.values })
    setDeviceCategory({ headers: demoData.deviceCategory.headers, values: demoData.deviceCategory.values })
  }, [])

  useEffect(() => {
    setGraphData(demoData.session[duration])
    setTableData(demoData.tableData)
  }, [duration])


  const handleClick = () => {
    setNavbar((prevState) => !prevState);
  }

  const onDurationChange = (e) => {
    setDuration(e.target.value)
  }

  return (
    <div dir='ltr' className='grid grid-cols-10 items-center bg-gray-100 h-auto min-w-full text-gray-800' >
      <div className="col-span-2">
        <VerticalNavbar navbar={navbar} />
        <span
          className={`z-50 text-neutral rounded-r-2xl bg-primary text-3xl cursor-pointer fixed top-32 ${!navbar ? 'left-56 ' : 'left-0'}`}
          onClick={() => handleClick()}
        >
          <BiChevronRight className={`${navbar ? 'rotate-0' : 'rotate-180'}`} />
        </span>
      </div>
      <div className={` ${!navbar ? 'col-span-8 ' : 'col-span-10 '} h-auto pb-12 text-center`}>
        {/* <div className="rounded shadow-md mx-auto px-2 w-10/12 bg-neutral my-6 "> */}
        <div style={{ margin: "1.5rem auto", display: "grid !important" }} className="stats stats-vertical bg-neutral sm:stats-horizontal shadow justify-center w-10/12 text-primary">
          <div className="stat">
            <div className="stat-title">All Users</div>
            <div className="text-3xl font-bold text-center">{totalUsers}</div>
            <div className="stat-desc text-center">Distinct Users</div>
          </div>

          <div className="stat">
            <div className="stat-title">Active Users</div>
            <div className="text-3xl font-bold text-center">{activeUsers}</div>
            <div className="stat-desc text-center">Last 30 Mins</div>
          </div>

          <div className="stat">
            <div className="stat-title">Session Avg.</div>
            <div className="text-3xl font-bold text-center">{sessionsAvg}</div>
            <div className="stat-desc text-center">Minutes</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between w-10/12 mx-auto overflow-auto">
          <div className="w-80 mx-auto">
            <div className="w-80 h-96 mx-auto pb-4 pt-2 bg-neutral rounded-xl shadow-md">
              <h3 className='w-fit mx-auto text-primary text-lg '>Browser</h3>
              <Chart labels={browser.headers} values={browser.values} />
            </div>
          </div>
          <div className="w-80  mx-auto mt-6 lg:mt-0">
            <div className="w-80 h-96 mx-auto pb-4 pt-2 bg-neutral rounded-xl shadow-md">
              <h3 className='w-fit mx-auto text-primary text-lg '>Device Category</h3>
              <Chart labels={deviceCategory.headers} values={deviceCategory.values} />
            </div>
          </div>
        </div>

        <div className="bg-neutral rounded-xl shadow-md mx-auto my-6 py-4 w-10/12">
          <div className="w-full sm:w-1/2 mx-auto flex flex-wrap justify-center items-center">
            <span className='text-lg ml-4 sm:mx-4 col-span-5 sm:col-span-4 font-semibold'>Duration</span>
            <select onChange={e => onDurationChange(e)} value={duration} className=" col-span-7 sm:col-span-8 select select-bordered select-sm w-44 max-w-xs sm:ml-4 mx-6 my-1 bg-neutral">
              <option value='twoDays'>2 Days</option>
              <option value='week'>1 Week</option>
              <option value='twoWeeks'>2 Weeks</option>
              {/* <option value='365'>1 Year</option> */}
            </select>
          </div>
        </div>

        <div className="bg-neutral rounded-xl shadow-md my-6 mx-auto p-6 w-10/12 h-96 overflow-x-auto text-center">
          {/* <AnalyticsGraph graphData={graphData} /> */}
          <AnalyticsGraph graphData={graphData} />
        </div>

        <div className="bg-neutral rounded-xl shadow-md my-6 mx-auto p-6 w-10/12">
          <AnalyticsTable data={tableData} />
        </div>

      </div>
    </div>
    // </div>
  )
}

export default AnalyticsComp