import React, { useState } from 'react';
import './OptionsChooser.css'; // Import the CSS file
import Climbing from './Climbing'; // Import the Climbing component

const OptionsChooser: React.FC = () => {
  // Step 1: Set up state for the selected option and whether the Climbing component is active
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showClimbing, setShowClimbing] = useState<boolean>(false);

  // Step 2: Handle option change with the correct event type
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Step 3: Handle button click
  const handleButtonClick = () => {
    if (selectedOption === 'option1') {
      setShowClimbing(true); // Activate Climbing component
    } else {
      alert('בחר אחת מהפעילויות ברשימה');
    }
  };

  return (
    <div className="container">
      {/* Step 4: Conditional rendering */}
      {showClimbing ?  <Climbing /> 
       
      
      :(
        <>
          <h2>בחר סוג פעילות</h2>
          <select className="custom-select" value={selectedOption} onChange={handleOptionChange}>
            <option value="">--בחר סוג פעילות--</option>
            <option value="option1">טיפוס</option>
          </select>
          <br />
          <button className="custom-button" onClick={handleButtonClick}>
            אישור
          </button>
        </>
      ) }
    </div>
  );
};

export default OptionsChooser;
