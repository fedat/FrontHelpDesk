import React from 'react';
import { Pie, defaults } from 'react-chartjs-2';

const ChartsPie = ({ chartData }) => {
    return (
        <div>
            <Pie
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Estado de solicitudes"
                    },
                    legend: {
                      display: true,
                      position: "bottom"
                   }
                  }
                }}
            />
        </div>
    )
}
export default ChartsPie;