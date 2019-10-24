import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => {

    return (
        <div style={{width : 800, height : 400}}>
            <Line data={{
                labels : ['red', "pink"],
                datasets : [{
                    label : "Color",
                    data : [
                        3,
                        1
                    ],
                    backgroundColor : [
                        "red",
                        "pink"
                    ]
                }]
            }} options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title : {
                    text : "Color",
                    fontSize : 25,
                }
            }} />
        </div>
    )
}


export default Chart;