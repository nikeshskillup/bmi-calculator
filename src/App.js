import React, { useState } from 'react';
import './App.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // Default to metric
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (unit === 'metric') {
      const bmiValue = (w / ((h / 100) * (h / 100))).toFixed(2);
      setBMI(bmiValue);
    } else if (unit === 'imperial') {
      // Convert height from feet to inches
      const heightInInches = h * 12;
      const bmiValue = ((w / (heightInInches * heightInInches)) * 703).toFixed(2);
      setBMI(bmiValue);
    }

    // Determine BMI category
    if (bmi <= 18.5) {
      setBMICategory('Underweight');
    } else if (bmi <= 24.9) {
      setBMICategory('Average');
    } else if (bmi <= 29.9) {
      setBMICategory('Overweight');
    } else if (bmi >= 30) {
      setBMICategory('Obese');
    } else {
      setBMICategory('BMI');
    }
  };

  const handleUnitChange = (e) => {
    // Handle unit change from the dropdown
    setUnit(e.target.value);
    setHeight(''); // Reset height input
    setWeight(''); // Reset weight input
    setBMI(null); // Reset BMI result
    setBMICategory(''); // Reset BMI category
  };

  return (
    <div className="container">
      <div className="appContainer">
        <h1 className="heading">BMI Calculator</h1>
        <div className="input-container">
          <label className="label">
            Height ({unit === 'metric' ? 'CM' : 'FT'}):
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input"
              placeholder={`Enter height (${unit === 'metric' ? 'CM' : 'FT'})`}
            />
          </label>
          <label className="label">
            Weight ({unit === 'metric' ? 'KG' : 'LB'}):
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input"
              placeholder={`Enter weight (${unit === 'metric' ? 'KG' : 'LB'})`}
            />
          </label>
          <div className="unit-select">
            <label className="label">Select Units:</label>
            <select
              value={unit}
              onChange={handleUnitChange}
              className="unit-dropdown"
            >
              <option value="metric" className='unit-option'>cm/kg</option>
              <option value="imperial">ft/lb</option>
            </select>
          </div>
        </div>
        <button
          onClick={calculateBMI}
          className={`button ${bmi ? 'buttonHover' : ''}`}
        >
          Calculate BMI
        </button>
        {bmi !== null && (
          <div className="result">
            <h2>Your BMI: {bmi}</h2>
            <p className={`bmi-category ${bmiCategory.toLowerCase()}`}>
              Your BMI Category: {bmiCategory}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
