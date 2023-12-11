import { PropTypes } from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function AnalyticsGraph({ graphData }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );


    const options = {
        responsive: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Users Sessions',
            },
        },
        maintainAspectRatio: false
    };
    

    const data = {
        labels: graphData.labels,
        datasets: [
            {
                fill: true,
                label: 'manafikhi.com',
                data: graphData.zahabico,
                borderColor: 'rgba(141,208,186, 0.6)',
                backgroundColor: 'rgba(141,208,186, 0)',
            },
            {
                fill: true,
                label: 'demo.manafikhi.com',
                data: graphData.www,
                borderColor: 'rgba(231,176,8,0.6)',
                backgroundColor: 'rgba(231,176,8,0)',
            },
        ],
    };

    return (
        <div className="w-fit mx-auto">
            <Line width={800} height={300} options={options} data={data} />
        </div>
    )
}

AnalyticsGraph.propTypes = {
    graphData: PropTypes.object,
};
AnalyticsGraph.defaultProps = {
    graphData: {
        labels: ['11-6', '11-7'],
        www: ['87', '14'],
        zahabico: ['97', '24']
      }
}


export default AnalyticsGraph