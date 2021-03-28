import React, {useState, useEffect} from 'react';
// this will give us the line component
import { Line } from 'react-chartjs-2';
import numeral from "numeral";


const options = {
    legend: {
        display: false,
    },
    elements: {
        point:{
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips:{
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0.0");
            },
        },
    },
    // scales are very important
    scales:{
        xAxes: [
            {   // the type is the time we want
                type: "time",
                // the time should be in a format
                time: {
                    format: "MM/DD/YY",
                    tooltipformat: "ll",
                },
            },
        ],
        yAxes:[
            {
                // dont show the Y axis gridlines
                gridLines:{
                    display: false,
                },
                ticks: {
                    //Include a dollar sign in the ticks
                    callback: function (value,index,values){
                        return numeral(value).format("0a");
                    },

                },
            },
        ],
    },
};



// return the number of cases in last 30 days.
// /v3/covid-19/historical/all
// and the url for it it
// https://disease.sh/v3/covid-19/historical/all?lastdays=30


// Take the data that we got and transform it into x and y.
// https://www.chartjs.org/docs/latest/charts/line.html
// data: [{
//     x: 10,
//     y: 20
// }, {
//     x: 15,
//     y: 10
// }]
// x for us is the date and 
//y is the total cases 
//that we get from data requested from URL below
const buildCharData = (data, caseType = "cases") => {
    const charData = [];
    let lastDataPoint;  // this is to hold the new cases
    for (let date in data.cases) {
        if (lastDataPoint){
            let newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint // that will take the cases at current date and subtract with the cases in the previous date.
            }
            charData.push(newDataPoint);    // append it to the array
        }
        lastDataPoint = data[caseType][date];
        console.log(lastDataPoint);
    }
    return charData;
};

function LineGraph({caseType}) {
    const [data, setdata] = useState({});

    useEffect(() => {
        const fetchData = async() => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            // Carefull json has a (). If we miss that then we get an error.
            .then((responce) => responce.json())
            .then((data) => {
                console.log("the data is : ",data);
                const charData = buildCharData(data, caseType);
                setdata(charData);
            });
        };
        
        fetchData();
    }, [caseType]);

    return (
        <div>
        {/* in order to render line graph we need line data and options */}
        {/* data is to be fetched adn option is like CSS property  */}
        
        {/* careful with that data?.length > 0 */}
        {/* There is a point in  the begining where data is not populated so we got to check that */}
        {/* careful with line syntax */}
        {data?.length > 0 && (
            <Line
                data = {
                    {
                        datasets: [{
                            backgroundColor: "rgba(204,16,52,0.5)",
                            borderColor: "#CC1034", 
                            data: data,
                            }]
                    }
                }
                options = {options}
            />

        )}     
        </div>
    );
}

export default LineGraph;
