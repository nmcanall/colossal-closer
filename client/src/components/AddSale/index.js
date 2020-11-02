import React, {useState, useEffect} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {ADD_TRANSACTION} from '../../utils/mutations';
import Auth from '../../utils/auth';
import {Box, Collapse, Select} from '@chakra-ui/core'
import { useStoreContext, ADD_STATE_TRANSACTIONS } from '../../utils/GlobalState';
import M from 'materialize-css/dist/js/materialize.min.js'
import { idbPromise } from '../../utils/idb'
import moment from 'moment'

const AddSale = ({ customerId }) => {
    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects, {});
    }, [])
    const [state, dispatch] = useStoreContext();

    const [show, setShow] = React.useState(false);

    const handleToggle = () => setShow(!show);
    
    const [formState, setFormState] = useState({ product: 'print', dollars: 0, units: 0})
    const clearFormState = () => {setFormState({ product: 'print', dollars: 0, units: 0})}

    const [addSale, { error }] = useMutation(ADD_TRANSACTION, {onError: error => {
        console.log("Could not write to mongo db, writing to indexedDB instead")
        const createdAt = Date.now()
        const newTransaction = {...formState, pending: true, createdAt, customerId}
        idbPromise("pendingTransactions", "put", {...newTransaction}).then(() => {
            dispatch({
                type: ADD_STATE_TRANSACTIONS,
                transactions: { [customerId]: state.transactions[customerId] ? [...state.transactions[customerId], newTransaction] : [newTransaction]}
            })
            clearFormState()
        }).catch(e => console.log(e))
        
    }
    });
    
    
    const handleChange =  (event) =>{
        const {name,value} = event.target
        console.log("old", formState)
        setFormState({
            ...formState,
            [name]: value
        });
        console.log("new",formState)
    };
    function log(event) {
        event.preventDefault()
        console.log(formState)
    }
    const handleAddSale = async (event) =>{
        event.preventDefault();
        
        const dollars = Number(formState.dollars);
        const units = Number(formState.units);
        const product = formState.product;

        
        // console.log('button clicked', formState, customerId)
        // use try/catch instead of promises to handle errors

        try{
        //execute addUser mutation and pass in variable data from form
        const { data } = await addSale({
            
            variables: { product, dollars, units, customerId}
        });
        const newTransData = data.addTransaction.transactions.pop()
        dispatch({
            type: ADD_STATE_TRANSACTIONS,
            transactions: { [customerId]: state.transactions[customerId] ? [...state.transactions[customerId], newTransData] : [newTransData]}
        })
        } catch (e){
        console.error(e);

        }
        clearFormState()
        
    }
    
    return (
                
                <div className=" center" id="form-wrapper">
                    <button 
                    
                    className=" col s5 btn right blue lighten-3 waves-effect waves-lightn new-customer " id=""
                    onClick={handleToggle}
                    >
                        New Sale
                    </button>
                    <div className="col s12 m7 ">
                        <Collapse mt={4} isOpen={show}>
                            <div className="card" id="signup-card">

                                <div className="card-content">
                                    <div className="row">
                                        <form className="col s12" id="add-sale"  onSubmit={handleAddSale}>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <select
                                                    id="product" 
                                                    // type="text" 
                                                    name="product"
                                                    value= {formState.product}
                                                    onChange={event => {
                                                        setFormState({...formState, product: event.target.value})
                                                    }}
                                                    >
                                                        <option name="product" value="print">print</option>
                                                        <option name="product" value="card">card</option>
                                                        <option name="product" value="glossy">glossy</option>
                                                    </select>
                                                    <label htmlFor="product">Product Name</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input 
                                                    id="dollars" 
                                                    type="number" 
                                                    name="dollars"
                                                    value= {formState.dollars}
                                                    onChange={handleChange}
                                                    />
                                                    <label htmlFor="dollars">Dollar amount:</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input
                                                        id="units" 
                                                        type="number"
                                                        name="units"
                                                        value= {formState.units}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="units"># of units</label>
                                                </div>
                                            </div>
                                            {/* <Select placeholder="Select option">
                                                <option value="option1">Option 1</option>
                                                <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option>
                                            </Select> */}


                                            <button className="blue lighten-3 waves-effect waves-light btn" type="submit" onClick={handleToggle} >Add Sale</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
    )
}

export default AddSale;