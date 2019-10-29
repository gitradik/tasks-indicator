import React, { useState } from 'react';
import './App.css';
import Indicator from './components/indicator/indicator';

function App() {
    const [counter, setCounter] = useState(0);

    return (
        <div className="App">
            <Indicator
                from={counter}
                to={12}
            />
            <button
                style={{ width: '50px', height: '25px', cursor: 'pointer' }}
                onClick={() => setCounter(counter + 2)}
            >
                +
            </button>
        </div>
    );
}

export default App;
