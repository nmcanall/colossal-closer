import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {ADD_CUSTOMER} from '../../utils/mutations';
import Auth from '../../utils/auth';
import { QUERY_CUSTOMERS } from '../../utils/queries';
import {Box, Collapse} from '@chakra-ui/core'

function AddCustomer(){
    
    const [formState, setFormState] = useState({ businessName: '', contactName: '', phone: '', email: '', status: ''})

    //to hide and unhide form
    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const [addCustomer, { error }] = useMutation(ADD_CUSTOMER, {
        update(cache, {data: {addCustomer} } ){
            try{
                const { customers } = cache.readQuery({ query: QUERY_CUSTOMERS});

                cache.writeQuery({
                    query: QUERY_CUSTOMERS,
                    data: { customers: [addCustomer, ...customers]}
                });
            }catch(e){
                console.error(e)
            }
        }
    });


    const handleChange = (event) =>{
        const {name,value} = event.target

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSignup = async (event) =>{
        event.preventDefault();
        console.log('button clicked', formState)
        
        // use try/catch instead of promises to handle errors
        try{
        //execute addUser mutation and pass in variable data from form
        const { data } = await addCustomer({
            variables: { ...formState, },
        });
        Auth.getToken(data.addCustomer.token);
        } catch (e){
        console.error(e);
        }
    
        setFormState({
            businessName : '', 
            contactName: '',
            phone: '',
            email: '',
            status: ''
            
        })

        
        
    }
        
    
    return (
        <div className="container center ">
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
                                    <form className="col s12" id="signup-form"  onSubmit={handleSignup}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                id="businessName" 
                                                type="text" 
                                                name="businessName"
                                                value= {formState.businessName}
                                                onChange={handleChange}
                                                />
                                                <label htmlFor="businessName">Business Name</label>
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
                                            
                                                <input
                                                    id="status" 
                                                    type="text"
                                                    name="status"
                                                    value= {formState.status}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="status">Status</label>
                                            </div>
                                        </div>

                                        <button className="blue lighten-3 waves-effect waves-light btn" type="submit" >Add Customer</button>
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