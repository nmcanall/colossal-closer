import React, {useEffect} from 'react'
import { idbPromise } from '../../utils/idb'
import {ADD_STATE_CUSTOMERS, useStoreContext} from '../../utils/GlobalState'
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
    const [addCustomer] = useMutation(ADD_CUSTOMER)
    const [state, dispatch] = useStoreContext()
    const handler = event => {
        console.log(event.type)
        if (event.type === 'online') {
            handleOnline()
        }
    }
    const handleOnline = async () => {
        const customerIdMapper = {}
        const pendingCustomers = await idbPromise("pendingCustomers", "get") || []
        for (const customer of pendingCustomers) {
            customer.dollarsSold = parseFloat(customer.dollarsSold)
            const { data } = await addCustomer({ variables: { ...customer } });
            customerIdMapper[customer.tempId] = data.addCustomer._id
            
        }
        const pendingTransactions = await idbPromise("pendingTransactions", "get") || []
        for (const transaction of pendingTransactions) {
            delete transaction.pending
            if (transaction.customerId.includes("temp:")) {
                transaction.customerId = customerIdMapper[transaction.customerId]
            }
            transaction.dollars = parseFloat(transaction.dollars)
            transaction.units = parseInt(transaction.units)
            addSale({variables: {...transaction}})

        }
        idbPromise("pendingTransactions", "delete")
        idbPromise("pendingCustomers", "delete")
    }
    return <></>
}

export default OfflineHanlder