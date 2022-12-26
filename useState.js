/* 
Syntax for using useState.

Import useState from react.
useState returns two items. 
    1. tells about the current state of the it.
    2. helps us in setting the state of the item.

Ex:-
const [count, setCount] = React.useState(0)
*/

import React from 'react';

function Counter(){
    const [count, setCount] = React.useState(0) 
    const handleCount = () => {
        setCount (prevState => prevState + 1)
    }
    const resetCount = () => {
        setCount(0)
    }
    return (
        <>
        <div>
            <label htmlFor='count'>Count</label>
            <h3>{count}</h3>
        </div>
        <div>
            <button onClick={handleCount}>Inc Count</button>
            <button onClick={resetCount}>Reset</button>
        </div>
        </>
    )
}

export default Counter