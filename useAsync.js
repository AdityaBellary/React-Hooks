/* useAsync(asyncFn, immediate) takes an async function and an
immediate flag as input and it will provide an abstraction for complete
async operation (API calls) in React, in return it will give the status,
value, error, refetch.
*/

import {useEffect, useState, useCallback} from 'react';

const useAsync = (asyncFn, immediate = false) => {
    const [state, setState] = useState ({
        status: "idle",
        value: null,
        error: null
    })

    const refetch = useCallback(() => {
        setState({
            status: "pending",
            value: null,
            error: null
        })

        return asyncFn().then((response) => setState({
            status: "success",
            value: "success",
            error: null
        })).catch((error) => setState({
            status: "error",
            value: null,
            error: "error"
        }))
    }, [asyncFn])

    useEffect(() => {
        if (immediate) {
            refetch();
        }
    },[refetch, immediate])

    const {status, value, error} = state
    return { refetch, status, value, error}
}

const fakeApiCall = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rnd = Math.random() * 10;
            rnd < 5 ? resolve("success") : reject ("error")
        }, 1000)
    })
}

const Example = () => {
    const {status, value, error} = useAsync(fakeApiCall, true)

    return (
        <div>
            <div>status: {status}</div>
            <div>value: {value}</div>
            <div>error: {error}</div>
        </div>
    )
}