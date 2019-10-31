import React from 'react';
import { Line } from 'react-chartjs-2';
import ReactToPrint from "react-to-print";

class Chart extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id="report" style={{width : 800, height : 400}}>
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
            </React.Fragment>
        )
    }
  }

const Report = () => {
    const componentRef = React.useRef();
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        <Chart ref={componentRef} />
      </div>
    );
  };

export default Report;