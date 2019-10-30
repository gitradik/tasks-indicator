import React, { useState, useEffect } from 'react';
import './App.css';
import IndicatorTest from "./components/indicator.test/indicator.test";

function App() {
    const [counter, setCounter] = useState(0);
    const [to, setTo] = useState(0);

    useEffect(() => setTo(50), []);

    return (
        <div className="App">
            <IndicatorTest
                from={counter}
                to={to}
                radius={150}
            />
            <button
                style={{ width: '50px', height: '25px', cursor: 'pointer' }}
                onClick={() => setCounter(counter < to ? counter + 10 : 0)}
            >
                +
            </button>
        </div>
    );
}

export default App;
