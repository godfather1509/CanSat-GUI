// const express = require("express")
// const http = require("http")
// const socketio = require("socket.io")

// const port = 4000

// const app = express()
// const httpServer = http.createServer(app)

// const server = new socketio.Server(httpServer, {
//     cors: {
//         origin: "*",
//     }
// })

// let timeChange
// const data = [
//     {
//         name: '1s',
//         x: 40,
//         y: 24,
//         amt: 24,
//     },
//     {
//         name: '2s',
//         x: 30,
//         y: 13,
//         amt: 22,
//     },
//     {
//         name: '3s',
//         x: 20,
//         y: 98,
//         amt: 22,
//     },
//     {
//         name: '4s',
//         x: 27,
//         y: 39,
//         amt: 20,
//     },
//     {
//         name: '5s',
//         x: 18,
//         y: 48,
//         amt: 21,
//     },
// ];

// server.on("connection", (socket) => {
//     console.log("Connected!!");
//     if (timeChange) clearInterval(timeChange);

//     function addNewDataPoint() {
//         if (data.length >= 6) {
//             data.shift();
//         }
//         data.push({ name: `${parseInt(data[data.length - 1].name[0]) + 1}s`, x: Math.round(Math.random() * 100), y: Math.round(Math.random() * 100) });
//         socket.emit("message", data);
//     }

//     addNewDataPoint();
//     const dataPushInterval = setInterval(addNewDataPoint, 3000);

//     socket.on("disconnect", () => {
//         clearInterval(dataPushInterval);
//     });
// });

// httpServer.listen(port)

const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const { parse } = require("csv-parse");//added this package
const fs = require("fs");//added this package
const path = "../sensorvalues.csv";
const outputvalues = []

fs.createReadStream(path)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    // executed for each row of data
    outputvalues.push(row)
    //console.log(row);
  })
  .on("error", function (error) {
    // Handle the errors
    console.log(error.message);
  })
  .on("end", function () {
    // executed when parsing is complete
    //console.log("File read successful");
  });
//
const port = 4000

const app = express()
const httpServer = http.createServer(app)

const server = new socketio.Server(httpServer, {
    cors: {
        origin: "*",
    }
})

let timeChange
const data = [
    // {
    //     name: '1s',
    //     x: 40,
    //     y: 24,
    //     amt: 24,
    // },
    // {
    //     name: '2s',
    //     x: 30,
    //     y: 13,
    //     amt: 22,
    // },
    // {
    //     name: '3s',
    //     x: 20,
    //     y: 98,
    //     amt: 22,
    // },
    // {
    //     name: '4s',
    //     x: 27,
    //     y: 39,
    //     amt: 20,
    // },
    // {
    //     name: '5s',
    //     x: 18,
    //     y: 48,
    //     amt: 21,
    // },
];

// Plotly.plot('chart',[{
//     y:[Math.random()],
//     type:'line'
// }]);
// var cnt = 0;
// setInterval(function(){
//     Plotly.extendTraces('chart',{y:[[getData()]]},[0])
//      cnt++;
//    if(cnt>500){
//     Plotly.relayout('chart',{
//         xaxis:{
//             range:[cnt-30,cnt]
//         }
//     })
//    }
// },200)


let i = 0
server.on("connection", (socket) => {
    console.log("Connected!!");
    if (timeChange) clearInterval(timeChange);

    function addNewDataPoint() {
        if (data.length >= 6) {
            data.shift();
        }
        //data.push({name: `23`,x:2, y:2})

        // if (outputvalues.length!=i){
        //     data.push({name: `${outputvalues[i][1]}`,x:5,y:outputvalues[i][2]})
        //     i+=1
        // }
        // else{
        // data.push({ name: `${parseInt(data[data.length - 1].name[0]) + 1}s`, x: Math.round(Math.random() * 100), y: Math.round(Math.random() * 100) });
        // }
        data.push(outputvalues)
        socket.emit("message", data);
    }

    addNewDataPoint();
    const dataPushInterval = setInterval(addNewDataPoint, 1000);

    socket.on("disconnect", () => {
        clearInterval(dataPushInterval);
    });
});

httpServer.listen(port,function(){
    console.log("Server listening on port "+port)
})