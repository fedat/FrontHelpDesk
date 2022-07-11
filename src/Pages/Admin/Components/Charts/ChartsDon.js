import React from 'react';
import { Doughnut } from 'react-chartjs-2'

const ChartsDon = ({ chartData }) => {
    return (
        <div>
            <Doughnut
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
export default ChartsDon;