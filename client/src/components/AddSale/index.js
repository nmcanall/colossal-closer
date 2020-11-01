import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {ADD_TRANSACTION} from '../../utils/mutations';
import Auth from '../../utils/auth';
import {Box, Collapse, Select} from '@chakra-ui/core'
import { useStoreContext, ADD_STATE_TRANSACTIONS } from '../../utils/GlobalState';


const AddSale = (id) => {
    // console.log('top of form', id)
    const [state, dispatch] = useStoreContext();

    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);
    const [formState, setFormState] = useState({ product: '', dollars: 0, units: 0})

    const [addSale, { error }] = useMutation(ADD_TRANSACTION, {
        update(cache, {data: {addSale} } ){
            console.log('addddddd sale', addSale)
            // dispatch({
            //     type: ADD_STATE_TRANSACTIONS,
            //     transactions: [{...addSale}]
            // })
        }
    });
    
    
    const handleChange = (event) =>{
        const {name,value} = event.target

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleAddSale = async (event) =>{
        event.preventDefault();
        
        const dollars = Number(formState.dollars);
        const units = Number(formState.units);
        const product = formState.product;

        const { _id } = id
        console.log('button clicked', formState, _id)
        // use try/catch instead of promises to handle errors

        try{
        //execute addUser mutation and pass in variable data from form
        const { data } = await addSale({
            
            variables: { product, dollars, units, customerId:_id}
        });
        console.log('fulldata',data)
        const newTransData = data.addTransaction.transactions[0]
        dispatch({
            type: ADD_STATE_TRANSACTIONS,
            transactions: [{...newTransData}]
        })
        
        
        } catch (e){
        console.error(e);

        }
    
        setFormState({
            product : '', 
            dollars: 0,
            units: 0
            
        })
        
    }
    return (
                
                <div className="row center" id="form-wrapper">
                    <button 
                    className=" btn right blue lighten-3 waves-effect waves-lightn new-customer " id=""
                    onClick={handleToggle}
                    >
                        Add A transaction
                    </button>
                    <div className="col s12 m7 ">
                        <Collapse mt={4} isOpen={show}>
                            <div className="card" id="signup-card">

                                <div className="card-content">
                                    <div className="row">
                                        <form className="col s12" id="signup-form"  onSubmit={handleAddSale}>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input 
                                                    id="product" 
                                                    type="text" 
                                                    name="product"
                                                    value= {formState.product}
                                                    onChange={handleChange}
                                                    />
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