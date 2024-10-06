import React, { useState } from "react";
import './ChoosingOptionsChart.css'; // Import the CSS file for styling
import '../BackEnd/Accounts.ts'

type Option = {
  id: number;
  label: string;
};

const ChoosingOptionsChart: React.FC = () => {
  const options: Option[] = [
    { id: 1, label: "הוספת משתמש" },
    { id: 2, label: "הוספת פעילות" },
    { id: 3, label: "Option 3" },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleClick = (option: Option) => {
    setSelectedOption(option);

  };

  return (
    <div className="container">
      <h2 className="title">Choose an Option</h2>
      
      <div className="options-column">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option-box ${selectedOption?.id === option.id ? 'selected' : ''}`}
            onClick={() => handleClick(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoosingOptionsChart;
