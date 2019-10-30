import React, { useState } from 'react';
import './App.css';
import IndicatorTest from "./components/indicator.test/indicator.test";

function App() {
    const [counter, setCounter] = useState(0);

    return (
        <div className="App">
            <IndicatorTest
                from={counter}
                to={50}
                radius={100}
            />
            <button
                style={{ width: '50px', height: '25px', cursor: 'pointer' }}
                onClick={() => setCounter(counter + 10)}
            >
                +
            </button>
        </div>
    );
}

export default App;
