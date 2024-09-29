import React, { useState, useEffect } from 'react'; // Import useState and useEffect
//import './home.css';
import "./home.scss"

const FlowchartBlock = ({ id, children, highlight }) => {
  const arrowStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: '#ffcc00',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div
      id={id}
      className={`block ${highlight ? 'highlight' : ''}`}
      style={{
        width: '120px',
        height: '60px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        textAlign: 'center',
        lineHeight: '60px',
        margin: '10px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {highlight && (
        <div
          style={{
            ...arrowStyle,
            right: '-25px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        ></div>
      )}
      {children}
    </div>
  );
};

const Flow = ({ title, blocks, interval, startImmediately }) => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let intervalId;

    if (startImmediately) {
      intervalId = setInterval(() => {
        if (!isCompleted) {
          setCurrentBlockIndex((prevIndex) => (prevIndex + 1) % blocks.length);
          if (currentBlockIndex === blocks.length - 1) {
            setIsCompleted(true);
          }
        }
      }, interval);
    }

    return () => clearInterval(intervalId);
  }, [
    currentBlockIndex,
    isCompleted,
    blocks.length,
    interval,
    startImmediately,
  ]);

  return (
    <div className='flow'>
      <h2>{title}</h2>
      {blocks.map((blockId, index) => (
        <FlowchartBlock
          key={blockId}
          id={blockId}
          highlight={index === currentBlockIndex}
        >
          {blockId.replace(/_/g, ' ')}
        </FlowchartBlock>
      ))}
    </div>
  );
};

const App = () => {

  // Show current Time

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  const [command, setCommand] = useState('');

  const handleInputChange = (event) => {
    setCommand(event.target.value);
  };

  const handleCommandSubmit = (event) => {
    // Handle the command submission logic here (e.g., send the command to the backend)
    console.log(`Command submitted: ${command}`);

    // Clear the input field after submitting the command
    setCommand('');

    // Prevent the default form submission behavior
    event.preventDefault();
  };

  return (
    <div>
      <div className='d_flex'>
        <div>
          <h2>Current IST Time: {formattedTime}</h2>
        </div>
        <div>
          <h2>Packet count: 5</h2>
        </div>
        <div>
          <h2>Packet type: X</h2>
        </div>
        <div>
          <h2>GPS(Lat, Long)=(0000,0000)</h2>
        </div>
      </div>

      <div className='d_flex'>
        <div>
          <div>
            <h2>GPS Time:00:15:43</h2>
          </div>
          <div>
            <h2>GPS Sets: S</h2>
          </div>
          <div>
            <h2>GPS Altitude: 350</h2>
          </div>
        </div>
        <div>
          <div>
            <h2>TP Released: R</h2>
          </div>
          <div>
            <h2>Pointing Error: 12</h2>
          </div>
          <div>
            <h2>CMD_echo: CMD, 1004, SIM, ACTIVE</h2>
          </div>
        </div>
        <div>
          <h2>Mode:S</h2>
          <div>
            <h2>No. of Satellite: 1</h2>
          </div>
          <div>
            <h2>GCS Battery: 96%</h2>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleCommandSubmit}>
          <label>
            <input type="text" value={command} onChange={handleInputChange} placeholder='Enter Command' />
          </label>
          <button className='cmd-btn' type="submit">Execute</button>
        </form>
      </div>
      <div className='flex_d'>
        <div
          className='graph'
          style={{
            width: '600px',
            height: '300px',
            backgroundColor: 'lightgray',
            margin: '15px',
          }}
        >
          {/* Set width, height, and background color for the graph */}
        </div>
        <div className='flow flex_d' style={{ marginLeft: '20px' }}>
          <Flow
            blocks={['boost', 'launch_wait', 'ascent', 'software_start']}
            interval={2000}
            startImmediately
          />
          <Flow blocks={['boost2', 'payload_release', 'end']} interval={2000} />
        </div>
      </div>
    </div>
  );
};

export default App;
// const Home = () => {
//   return (
//     <div className="home">
//     </div>
//   )
// }

// export default Home