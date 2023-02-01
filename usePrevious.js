/* Use Previous hook will take the current value as input and hold it until a new value is given.
For initial render it gives undefined as there is no previous value.    
    1. We write this hook using useRef and useEffect hooks    
    2. While testing we will make use of a useState hook as well.
*/

import {useRef, useEffect, useState} from "react";

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}

const App = () => {
    const [count, setCount] = useState(0);
    const previousCount = usePrevious(count)
    return (
        <div>
            <h1>
                Now : {count} Previous : {previousCount}
            </h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}