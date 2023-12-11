import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function Chart({labels, values}) {

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Users',
                data: values,
                backgroundColor: [
                    'rgba(141,208,186, 1)',
                    'rgba(34,53,100, 1)',
                    'rgba(231,176,8,1)',
                    "rgba(163, 208, 141, 1)"
                ],
                borderColor: [
                    'rgba(141,208,186, 1)',
                    'rgba(34,53,100, 1)',
                    'rgba(231,176,8,1)',
                    "rgba(163, 208, 141, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={data} />
    )
}

export default Chart