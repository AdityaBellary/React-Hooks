/*
useEffect 
Tell React that your component needs to do something after render. 
React will remember the function you passed (we’ll refer to it as our “effect”), 
and call it later after performing the DOM updates

Syntax:- 1. takes two parameters function and dependencies.
useEffect(() => {
    <operations>;
  },<dependencies>);

useReducer, useImperatuvehandle, useRef, useMemo, useCallback, useContext
*/

import React, { useEffect } from 'react';

function Counter() {
    const [count, setCount] = React.useState(0)
    const [display, setDisplay] = React.useState('')
    useEffect(() => {
        setDisplay(prevState => prevState + 1)
    }, [count])

    const handleCount = (event) => {
        if(event.target.id == 'inc'){
        setCount (prevState => prevState + 1)
    }
    if(event.target.id == 'dec'){
        setCount (prevState => prevState - 1)
    }
    }

    return (
        <>
            <div>
                <label htmlFor='count'>Count</label>
                <h3>{count}</h3>
            </div>
            <div>
                <button id='inc' onClick={handleCount}>Inc Count</button>
                <button id='dec' onClick={handleCount}>Dec Count</button>
            </div>
            <br></br>
            <h3>You clicked different buttons {display} times</h3>
        </>
    )
}

export default Counter