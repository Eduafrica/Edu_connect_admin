import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    // Data for the chart
    const data = {
        labels: ['Value 1', 'Value 2', 'Value 3'],
        datasets: [
            {
                data: [20, 30, 50], // Values for the chart
                backgroundColor: [ '#00BF63', '#000000', '#8C52FF'], // Colors for each segment
                hoverBackgroundColor: ['#00BF63',  '#000000', '#8C52FF'], // Hover colors
                borderWidth: 0, // No border between segments
            },
        ],
    };

    // Options for the chart
    const options = {
        cutout: '50%', // Creates the hole in the middle
        plugins: {
            legend: {
                display: false, // Show/hide legend
                position: 'bottom', // Position of the legend
            },
        },
    };

    return (
        <div style={{ width: '200px', height: '200px', margin: '0 auto' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default PieChart;
