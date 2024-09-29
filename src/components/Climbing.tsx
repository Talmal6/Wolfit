import React, { useState } from 'react';
import './OptionsChooser.css';
import Stopwatch from './Stopwatch';



const Climbing: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [OptionSelected, setOptionSelected] = useState<boolean>(false);
  const [namesSelected, setNamesSelected] = useState<string[]>([]);
  const [ReadyToPlay, setReadyToPlay] = useState<boolean>(false);

  // Handle the selection of the number of users
  const handleButtonClick = () => {
    if (['1', '2', '3', '4'].includes(selectedOption)) {
      setOptionSelected(true);
      setNamesSelected(Array(parseInt(selectedOption)).fill('')); // Initialize the names array with empty strings
    } else {
      alert('בחר מספר משתמשים');
    }
  };

  // Handle name input changes
  const handleNameChange = (index: number, value: string) => {
    const updatedNames = [...namesSelected];
    updatedNames[index] = value;
    setNamesSelected(updatedNames); // Update the state with the new name
  };

  // Handle submission of the names
  const handleNamesButtonClick = () => {
    // Redirect to another page with the names as query parameters
    const queryParams = new URLSearchParams();
    namesSelected.forEach((name, index) => {
      queryParams.append(`name${index + 1}`, name);
    });
    setReadyToPlay(true);
  };

  return (
    <div className="container">
      {ReadyToPlay ? 
         <Stopwatch names = {namesSelected}/>
      
      : OptionSelected ? (
          <div className="TextInsertion">
            <h1>הכנס את שמות המשתתפים</h1>
            {/* Dynamically create input fields based on the selected number of users */}
            {Array.from({ length: parseInt(selectedOption) }, (_, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder={`שחקן ${index + 1}`}
                  value={namesSelected[index] || ''}
                  onChange={(e) => handleNameChange(index, e.target.value)} // Update the name on change
                />
              </div>
            ))}
            <br />
            <br />
            <button className="custom-button" onClick={handleNamesButtonClick}>
              אישור
            </button>
          </div>
        ) : (
          <>
            <select
              className="custom-select"
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            >
              <option value="">--בחר מספר משתמשים--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <br />
            <button className="custom-button" onClick={handleButtonClick}>
              אישור
            </button>
          </>
        )
      }
    </div>
  );
};

export default Climbing;
