// import React, { useState, useEffect } from 'react'
// import Plot from 'react-plotly.js';
// import Papa from 'papaparse';
// import axios from 'axios';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// // import socketIOClient from "socket.io-client"
// import "./graphs.scss"

// const Graphs = () => {

//     // const [data, setData] = useState([])

//     // useEffect(() => {
//     //     const socket = socketIOClient("http://127.0.0.1:4000/");
//     //     socket.on("message", (newData) => {
//     //         setData(newData);
//     //     });

//     //     return () => {
//     //         socket.disconnect();
//     //     };
//     // }, []);

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('C:\\Users\\SysAdmin\\Desktop\\CANSAT\\cansat-gui\\client\\data.csv');
//                 const parsedData = await new Promise((resolve) => {
//                     Papa.parse(response.data, {
//                         header: true,
//                         dynamicTyping: true,
//                         complete: (result) => resolve(result.data),
//                     });
//                 });
//                 setData(parsedData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     // Generate random points to plot on X-axis (sensor data)
//     const getData = () => {
//         // Points generated between 0 - 10
//         console.log(data)
//         return Math.round(Math.random() * 10);
//     };

//     // Create the Plot
//     const MyPlot = () => {
//         const maxDataPoints = 8; // Show max point on X-axis

//         // Initial Plot
//         const [trace1, setTrace1] = useState({
//             x: [0, 1, 2, 3, 4, 5],
//             y: [getData(), getData(), getData(), getData(), getData(), getData()],
//             type: 'line',
//             mode: 'lines+markers',
//         });

//         // Initial Layout
//         const [layout, setLayout] = useState({
//             width: 600,
//             height: 400,
//             title: 'My Plot',
//             xaxis: {
//                 range: [maxDataPoints - 8, maxDataPoints],
//             },
//         });

//         // Update the graph
//         useEffect(() => {

//             // Interval Logic
//             const intervalId = setInterval(() => {
//                 setTrace1((prevTrace) => {
//                     // Generate new data to plot further
//                     const newX = [...prevTrace.x, prevTrace.x.length];
//                     const newY = [...prevTrace.y, getData()];

//                     return { ...prevTrace, x: newX, y: newY };
//                 });

//                 setLayout((prevLayout) => {
//                     // Shift the layout further
//                     const newRange = [prevLayout.xaxis.range[0] + 1, prevLayout.xaxis.range[1] + 1];
//                     return { ...prevLayout, xaxis: { ...prevLayout.xaxis, range: newRange } };
//                 });
//             }, 1000);

//             return () => clearInterval(intervalId);
//         }, []);

//         const plotData = [trace1];

//         return (
//             <Plot
//                 data={plotData}
//                 layout={layout}
//             />
//         );
//     };

//     return (
//         <div className='graphs'>
//             <div className='plot heading'>
//                 <h1>Plots</h1>
//             </div>
//             <div className="plot p1">
//                 <MyPlot />
//                 {/* <LineChart
//                     width={600}
//                     height={300}
//                     data={data}
//                     margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                     }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" stroke='#EEEEEE' />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip
//                         contentStyle={{ background: "transparent" }}
//                         labelStyle={{ display: "none" }}
//                         position={{ x: 650, y: 80 }}
//                     />
//                     <Legend />
//                     <Line type="monotone" dot={false} dataKey="x" stroke="#8884d8" activeDot={{ r: 8 }} />
//                     <Line type="monotone" dot={false} dataKey="y" stroke="#82ca9d" />
//                 </LineChart> */}
//             </div>
//         </div>
//     )
// }

// export default Graphs

import React from 'react';
import MyPlot from './MyPlot';
import "./graphs.scss"

// Generate random points to plot on X-axis (sensor data)
// const getData = () => {
//     // Points generated between 0 - 10
//     return Math.round(Math.random() * 10);
// };

const Graphs = () => {

    return (
        <div class='graphs'>
            <div class="plot p1">
                <div class="heading">Graphs</div>
                <div class="plot-container">
                    <MyPlot id="0" title="Accelerometer" />
                    <MyPlot id="1" title="Descent Rate" />
                    <MyPlot id="2" title="Altitude" />
                    <MyPlot id="3" title="Pressure" />
                    <MyPlot id="4" title="Temperature" />
                    <MyPlot id="5" title="Vibrations" />
                    <MyPlot id="6" title="Gas Level" />

                </div>
            </div>
        </div>

    );
};

export default Graphs;