import React, { useState } from 'react';
import './OptionsChooser.css';
import Stopwatch from './Stopwatch';

// API Function to start the game
const startGameAPI = async (players: string[]) => {
  try {
    const response = await fetch('http://localhost:5173/api/start-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ players }),
    });
    if (!response.ok) {
      throw new Error('Failed to start game');
      alert('error: ' + response);
    }
    return await response.json();
  } catch (error) {
    console.error('Error starting game:', error);
  }
};

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

  // Handle submission of the names and start the game via API
  const handleNamesButtonClick = async () => {
    // Start the game by calling the API
    const result = await startGameAPI(namesSelected);
    if (result) {
      setReadyToPlay(true); // Only set this if the API call was successful
    }
    else{
      alert('error: ' + result);
    }
  };

  return (
    <div className="container">
      {ReadyToPlay ? 
         <Stopwatch names={namesSelected} /> 
      
      : OptionSelected ? (
          <div className="TextInsertion">
            <h1>הכנס את שמות המשתתפים</h1>
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
