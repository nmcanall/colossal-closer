import React, {useEffect} from 'react'
import { idbPromise } from '../../utils/idb'
import {useStoreContext} from '../../utils/GlobalState'
function OfflineHanlder(event) {
    useEffect(() => {
        window.addEventListener("online", handler);
        window.addEventListener("offline", handler);
        if (navigator && navigator.onLine) {
            console.log("online")
            handleOnline()
        }
    }, [])
    const [state, dispatch] = useStoreContext()
    const handler = event => console.log(event.type)
    const handleOnline = async () => {
        const pendingTransactions = await idbPromise("pendingTransactions", "get")
        for (const transaction of pendingTransactions) {
            console.log("here's a transaction",transaction)
        }
        idbPromise("pendingTransactions", "delete")
    }
    return <></>
}

export default OfflineHanlder