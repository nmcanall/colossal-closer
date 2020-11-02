import React, { useReducer, useContext, createContext } from 'react'

// actions
const ADD_STATE_CUSTOMERS = "ADD_STATE_CUSTOMERS"
const ADD_STATE_TRANSACTIONS = "ADD_STATE_TRANSACTIONS"
const UPDATE_STATE_CUSTOMER = "UPDATE_STATE_CUSTOMER"

// reducers
function reducer(state, action) {
    switch(action.type) {
        case ADD_STATE_CUSTOMERS:
            return {...state, customers: [...state.customers, ...action.customers]}
        case ADD_STATE_TRANSACTIONS:
            return {...state, transactions: {...state.transactions, ...action.transactions}}
        case UPDATE_STATE_CUSTOMER:
            return {...state, customers: state.customers.map( customer => {
                if (customer._id === action.customer._id) {
                    return {...customer, ...action.customer}
                }
                return {...customer}
            })}
        default:
            return state
    }
}


const StoreContext = createContext()
const { Provider } = StoreContext

function StoreProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, {customers: [], transactions:{}})
    return <Provider value={[state, dispatch]} {...props} />
}
const useStoreContext = () => useContext(StoreContext)

export { StoreProvider, useStoreContext, ADD_STATE_CUSTOMERS, ADD_STATE_TRANSACTIONS, UPDATE_STATE_CUSTOMER}