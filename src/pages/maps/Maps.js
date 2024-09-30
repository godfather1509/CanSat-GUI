import React, { useState } from 'react'; 
import "./maps.scss";
import mapImage from "../../assets/Maps.png";

const App = () => {
  return (
    <div>
      <div className='graph'>
        <img 
          src={mapImage}
          alt="Graph" 
          style={{ width: '600px', height: '300px', margin: '15px' }} 
        />
      </div>
    </div>
  );
};

export default App;
