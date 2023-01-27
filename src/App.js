// Create a creat component that inputs a textarea message then performs a fetch request to localhost:3001 gets back a response as a data.message and displays that message in a box below
import React, { useState } from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>The TopG is here to motivate you !</h1>
        {/* <h3><em>Ask the TopG for his advice.</em></h3> */} 
      </header>
      {/* <h1>What colour is your Buggati ?</h1> */}
      <form onSubmit={handleSubmit}>
        <textarea
          className='input'
          value={message}
          placeholder="Request a response from the TopG"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div>
        <button className="button" type="submit">Submit</button>
        </div>
      </form>
      {response && <div><b>Andrew:</b> {response}</div>}
    </div>
  );
}

export default App;
