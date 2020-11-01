import React, { useReducer, useContext, createContext } from 'react'

// actions
const ADD_STATE_CUSTOMERS = "ADD_STATE_CUSTOMERS"
const ADD_STATE_TRANSACTIONS = "ADD_STATE_TRANSACTIONS"
// reducers
function reducer(state, action) {
    switch(action.type) {
        case ADD_STATE_CUSTOMERS:
            return {...state, customers: [...state.customers, ...action.customers]}
        case ADD_STATE_TRANSACTIONS:
            return {...state, transactions: [...state.transactions, ...action.transactions]}
        default:
            return state
    }
}

// const ADD_STATE_TRANSACTIONS = "ADD_STATE_TRANSACTIONS"
// // reducers
// function reducer(state, action) {
//     switch(action.type) {
//         case ADD_STATE_TRANSACTIONS:
//             return {...state, transactions: [...state.transactions, ...action.transactions]}
//         default:
//             return state
//     }
// }
// context
const StoreContext = createContext()
const { Provider } = StoreContext

function StoreProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, {customers: [], transactions:[]})
    return <Provider value={[state, dispatch]} {...props} />
}
const useStoreContext = () => useContext(StoreContext)

export { StoreProvider, useStoreContext, ADD_STATE_CUSTOMERS, ADD_STATE_TRANSACTIONS}