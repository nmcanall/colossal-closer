import React, {useEffect} from 'react'
import { idbPromise } from '../../utils/idb'
import {useStoreContext} from '../../utils/GlobalState'
import { useMutation } from '@apollo/react-hooks';
import { ADD_CUSTOMER, ADD_TRANSACTION} from '../../utils/mutations'

function OfflineHanlder(event) {
    useEffect(() => {
        window.addEventListener("online", handler);
        window.addEventListener("offline", handler);
        if (navigator && navigator.onLine) {
            console.log("online")
            handleOnline()
        }
    }, [])
    const [addSale] = useMutation(ADD_TRANSACTION)
    const [state, dispatch] = useStoreContext()
    const handler = event => console.log(event.type)
    const handleOnline = async () => {
        const pendingTransactions = await idbPromise("pendingTransactions", "get") || []
        for (const transaction of pendingTransactions) {
            delete transaction.pending
            transaction.dollars = parseFloat(transaction.dollars)
            transaction.units = parseInt(transaction.units)
            addSale({variables: {...transaction}})

        }
        idbPromise("pendingTransactions", "delete")
        
    }
    return <></>
}

export default OfflineHanlder