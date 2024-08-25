import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleInputChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bajaj-q1-challenge.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });
      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedFilters(value);
  };

  const renderResponseData = () => {
    if (!responseData) return null;

    const filteredData = {};
    selectedFilters.forEach((filter) => {
      filteredData[filter] = responseData[filter];
    });

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonData}
          onChange={handleInputChange}
          placeholder='Enter JSON data here'
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <label htmlFor="filters">Select Filters:</label>
        <select
          id="filters"
          multiple
          onChange={handleFilterChange}
        >
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
          <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
        </select>
      </div>
      {renderResponseData()}
    </div>
  );
}

export default App;
