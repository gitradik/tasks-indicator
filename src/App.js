import React, { useState } from 'react';
import './App.css';
import IndicatorTest from "./components/indicator.test/indicator.test";

function App() {
    const [counter, setCounter] = useState(8.2);

    return (
        <div className="App">
            <IndicatorTest
                from={13}
                to={50}
                radius={150}
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
