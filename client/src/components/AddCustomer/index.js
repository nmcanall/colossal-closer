import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {ADD_CUSTOMER} from '../../utils/mutations';
import Auth from '../../utils/auth';

const AddCustomer = () => {
    const profile = Auth.getProfile().data.email

    
    const headers = Auth.getToken();




    
    const [formState, setFormState] = useState({ businessName: '', contactName: '', phone: '', email: '', status: ''})

    const [addCustomer, { error }] = useMutation(ADD_CUSTOMER);

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
        <section id="login-page">
            <div className="container center ">
                
                <div className="row" id="form-wrapper">

                    <div className="col s12 m7 ">
                        <div className="card" id="signup-card">

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
                </div>
            </div>
        </section>
    )
}

export default AddCustomer;