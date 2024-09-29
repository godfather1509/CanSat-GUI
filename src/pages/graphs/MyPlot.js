import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import "./graphs.scss"
import socketIOClient from "socket.io-client"

const MyPlot = (props) => {
    const maxDataPoints = 8; // Show max point on X-axis

    const [data, setData] = useState([])
    console.log(data)
    let iRef = useRef(0);
    useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:4000/");
        socket.on("message", (newData) => {
            if (newData !== undefined && newData[0] !== undefined && newData[0][iRef.current] !== undefined) {

                const newValue = newData[0][iRef.current][props.id]; // Assuming newValue is ['22']
                // console.log("New Value:", newValue);

                const numericValue = parseFloat(newValue, 10);
                // data.push(numericValue)
                setData((prevData) => [...prevData, numericValue])
            } else {
                // data.push(Math.random() * 10)
                setData((prevData) => [...prevData, Math.random() * 10])
            }
            // console.log(data)
            iRef.current += 1;
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    // Initial Plot
    const [trace1, setTrace1] = useState({
        x: [0, 1, 2, 3, 4, 5],
        y: [0, 0, 0, 0, 0, 0],
        type: 'line',
        mode: 'lines+markers',
    });

    // Initial Layout
    const [layout, setLayout] = useState({
        width: 450,
        height: 300,
        title: props.title,
        xaxis: {
            range: [maxDataPoints - 8, maxDataPoints],
        },
    });

    // Update the graph
    useEffect(() => {

        // Interval Logic
        const intervalId = setInterval(() => {
            setTrace1((prevTrace) => {
                // Generate new data to plot further
                const newX = [...prevTrace.x, prevTrace.x.length];
                const newY = [...prevTrace.y, data[data.length - 1]];

                return { ...prevTrace, x: newX, y: newY };
            });
            // setData((prevData) => {
            //     var i =0;
            //     const newX = [...prevData, prevData[0][i].length];
            //     const newY = [...prevData,prevData[0][i].length];
            //     i+=1
            //     return { ...prevData, x: newX, y: newY };
            // });

            setLayout((prevLayout) => {
                // Shift the layout further
                const newRange = [prevLayout.xaxis.range[0] + 1, prevLayout.xaxis.range[1] + 1];
                return { ...prevLayout, xaxis: { ...prevLayout.xaxis, range: newRange } };
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [data]);

    const data1 = [trace1];
    //   const data1 = [data]

    return (
        <Plot
            data={data1}
            layout={layout}
        />
    );
};

export default MyPlot
