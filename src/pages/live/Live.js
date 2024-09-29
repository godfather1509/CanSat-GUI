import React, { useState } from 'react'; 
import "./live.scss";

const App = () => {
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
      
      <div>
        <form onSubmit={handleCommandSubmit}>
          <label>
            <input 
              type="text" 
              value={command} 
              onChange={handleInputChange} 
              placeholder='Enter Command' 
            />
          </label>
          <button className='cmd-btn' type="submit">Execute</button>
        </form>
      </div>
    </div>
  );
};

export default App;
