import React, { useState, useEffect } from 'react';
import "./navbar.scss"
import logo from "../../assets/logo.png"
import flag from "../../assets/indianflag.png"
import teamicon from "../../assets/team.jpeg"
import missiontimeicon from "../../assets/missiontime.jpeg"
import missionstatusicon from "../../assets/missionstatus.jpeg"
import restartmissiontime from "../../assets/restartmissiontime.png"
import startmissiontime from "../../assets/startmissiontime.png"
import stopmissiontime from "../../assets/stopmissiontime.png"

const Navbar = () => {

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (num) => {
    return num.toString().padStart(2, '0');
  };

  // State and effect
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setElapsedTime(0);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img className="spriha" src={logo} alt="spriha logo" />
        </div>
        <div className="centerinfo">
          <div className="sprihatitle">
            <span><b>SPriha</b></span>
          </div>
          <div className="teaminfo">
            <div className="rectangle">
              <div className="teamId">
                <img src={teamicon} alt="team icon" className="teamicon"></img>
                <h1 className="teamid"># 010</h1>
              </div>
              <div className="missiontime">
                <img src={missiontimeicon} alt="missiontime icon" className="missiontimeicon" />
                <h1 className="teammissiontime">{formatTime(elapsedTime)}</h1>
              </div>
              <div className="missionstatus">
                <img src={missionstatusicon} alt="missionstatus icon" className="missionstatusicon"></img>
                <h1 className="teammissionstatus">Landed</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="icons">
          <div className="flag">
            <img src={flag} alt="" />
          </div>
          <div className="missiontimebuttons">
            <button className="restartbutton"><img src={restartmissiontime} alt="restart MT" className="restart" onClick={handleRestart}></img></button>
            <button className="startbutton"><img src={startmissiontime} alt="start MT" className="start" onClick={handleStart}></img></button>
            <button className="stopbutton"><img src={stopmissiontime} alt="stop MT" className="stop" onClick={handleStop}></img></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar