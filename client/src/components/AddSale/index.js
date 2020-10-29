import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {ADD_TRANSACTION} from '../../utils/mutations';
import Auth from '../../utils/auth';


const AddSale = () => {
    const profile = Auth.getProfile().data.email
    const headers = Auth.getToken();
    const httpHeaders = profile + ' ' + headers
    console.log(httpHeaders)

    const [formState, setFormState] = useState({ product: '', dollars: '', units: ''})
    const [addSale, { error }] = useMutation(ADD_TRANSACTION);
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
        const { data } = await addSale({
            variables: { ...formState }
        });
        Auth.login(data.addSale.token);
        } catch (e){
        console.error(e);
        }
     
        setFormState({
            product : '', 
            dollars: '',
            units: ''
            
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
                                                    type="float" 
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
                                                    type="int"
                                                    name="units"
                                                    value= {formState.units}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="units"># of units</label>
                                            </div>
                                        </div>

                                        <button className="blue lighten-3 waves-effect waves-light btn" type="submit" >Add Sale</button>
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

export default AddSale;