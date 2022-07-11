import React from 'react';
import { Bar } from 'react-chartjs-2'

const ChartsBar = ({ chartData }) => {
    return (
        <div>
            <Bar
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
export default ChartsBar;