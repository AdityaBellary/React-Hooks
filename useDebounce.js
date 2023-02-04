/* Create a useDebounce() hook in React with the immediate flag as it
will behave normally as well depending upon the flag.
We will be using useRef() to track the timerId of setTimeout so that we
can reset it if a subsequent full call is made within the defined time.
Also, we will wrap the logic inside the useCallback() to avoid needless
re-renderings as the callback function returns a memoized function
that only changes when one of the dependencies changes. */
import { useCallback, useEffect, useRef } from 'react';

const useDebounce = (func, delay, immediate = false) => {
    const timerId = useRef();

    const debounce = useCallback(
        function () {
            let context = this
            const args = arguments

            const callNow = immediate && !timerId.current

            clearTimeout(timerId.current)
            timerId.current = setTimeout(() => {
                timerId.current = null
                if (!immediate) {
                    func.apply(context, args)
                }
            }, delay)
            if (callNow) {
                func.apply(context, args)
            }
        }, [func, delay, immediate]
    )
    return debounce
}

const Example = () => {
    const print = () => {
        console.log("hello")
    }
    const debounced = useDebounce(print, 500)
    useEffect(() => {
        window.addEventListener("mousemove", debounced, false)
        return function () {
            window.removeEventListener("mousemove", debounced, false)
        }
    })
}

export default Example