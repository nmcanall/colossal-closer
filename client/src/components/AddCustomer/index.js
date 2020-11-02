import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {useMutation} from '@apollo/react-hooks';
import {ADD_CUSTOMER,} from '../../utils/mutations';
import Auth from '../../utils/auth';
import {Box, Collapse} from '@chakra-ui/core'
import { useStoreContext, ADD_STATE_CUSTOMERS } from '../../utils/GlobalState';

function AddCustomer(){
    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects, {});
    }, [])
    const [state, dispatch] = useStoreContext()
    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const [formState, setFormState] = useState({ businessName: '', contactName: '', phone: '', email: '', status: 'active'})

    const [addCustomer, { error }] = useMutation(ADD_CUSTOMER);

    const handleChange = (event) =>{
        const {name,value} = event.target

        setFormState({
            ...formState,
            [name]: value
        });
    };
    
    // Remove empty properties of formState
    const clean = function(form) {
        for(let propName in form) {
            if(!form[propName]) {
                delete form[propName];
            }
        }
        return form;
    }

    const handleAddCustomer = async (event) =>{
        event.preventDefault();
        
        // use try/catch instead of promises to handle errors
        try{
            //execute addUser mutation and pass in variable data from form
            const cleanForm = clean(formState);
            const { data } = await addCustomer({ variables: { ...cleanForm, } });
            dispatch({
                type: ADD_STATE_CUSTOMERS,
                customers: [{...data.addCustomer}]
            })
        } catch (e){
            if(e.message.includes("`businessName` is required")) {
                window.alert("You must input a business name");
            }
            else if(e.message.includes("Phone number must be in format")) {
                window.alert("Input phone number in format 123-456-7890");
            }
            console.error(e);
        }
        setFormState({
            businessName : '', 
            contactName: '',
            phone: '',
            email: '',
            status: 'active'
            
        })
    }
        
    
    return (
        <div className="row center ">
            <button 
            className=" btn right blue lighten-3 waves-effect waves-lightn new-customer " id=""
            onClick={handleToggle}
            >
            Add New Customer
            </button>
            <div className="row" id="form-wrapper">
                <Collapse mt={4} isOpen={show}>
                    <div className="col s12">
                        <div className="card " id="newCustomer">

                            <div className="card-content">
                                <div className="row">
                                    <form className="col s12" id="add-customer-form"  onSubmit={handleAddCustomer}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                id="businessName" 
                                                type="text" 
                                                name="businessName"
                                                value= {formState.businessName}
                                                onChange={handleChange}
                                                />
                                                <label htmlFor="businessName">Business Name (required)</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                id="contactName" 
                                                type="text" 
                                                name="contactName"
                                                value= {formState.contactName}
                                                onChange={handleChange}
                                                />
                                                <label htmlFor="contactName">Contact Name</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input
                                                    id="email" 
                                                    type="email"
                                                    name="email"
                                                    value= {formState.email}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input
                                                    id="phone" 
                                                    type="text"
                                                    name="phone"
                                                    value= {formState.phone}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="phone">Phone #</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            
                                                <select
                                                    id="status" 
                                                    name="status"
                                                    value={formState.status}
                                                    onChange={handleChange}
                                                >
                                                    <option name="status" value="active">active</option>
                                                    <option name="status" value="won">won</option>
                                                    <option name="status" value="lost">lost</option>
                                                </select>
                                                <label htmlFor="status">Status</label>
                                            </div>
                                        </div>
                                        <button className="blue lighten-3 waves-effect waves-light btn" type="submit" onClick={handleToggle}>Add Customer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Collapse>
            </div>
        </div>
    )
}

export default AddCustomer;