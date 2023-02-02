import { useState, useRef, useEffect } from 'react';

const useIdle = (delay) => {
    const [isIdle, setisIdle] = useState(false);
    const timeoutId = useRef();

    useEffect(() => {
        setUp();
        return () => {
            cleanUp();
        }
    })

    const startTimer = () => {
        timeoutId.current = setTimeout(goInactive, delay);
    }

    const resetTimer = () => {
        clearTimeout(timeoutId.current)
        goActive();
    }

    const goActive = () => {
        setisIdle(false)
        startTimer()
    }

    const goInactive = () => {
        setisIdle(true)
    }

    const setUp = () => {
        document.addEventListener("mousemove", resetTimer, false)
        document.addEventListener("mousedown", resetTimer, false)
        document.addEventListener("keypress", resetTimer, false)
        document.addEventListener("DOMMouseScroll", resetTimer, false)
        document.addEventListener("mousewheel", resetTimer, false)
        document.addEventListener("touchmove", resetTimer, false)
        document.addEventListener("MSPointerMove", resetTimer, false)

        // blur and focus
        document.addEventListener("blur", startTimer, false)
        document.addEventListener("focus", resetTimer, false)
    }

    const cleanUp = () => {
        document.removeEventListener("mousemove", resetTimer, false)
        document.removeEventListener("mousedown", resetTimer, false)
        document.removeEventListener("keypress", resetTimer, false)
        document.removeEventListener("DOMMouseScroll", resetTimer, false)
        document.removeEventListener("mousewheel", resetTimer, false)
        document.removeEventListener("touchmove", resetTimer, false)
        document.removeEventListener("MSPointerMove", resetTimer, false)

        // blur and focus
        document.removeEventListener("blur", startTimer, false)
        document.removeEventListener("focus", resetTimer, false)

        //memory leak
        clearTimeout(timeoutId.current)
    }
    return isIdle;
}

const Example = () => {
    const isIdle = useIdle(2000)

    return (
        <div>
            <h1 style={{textAlign:center}}>  Idle:  {isIdle ? "true" : "false"}</h1>
        </div>
    )
}

export default Example;