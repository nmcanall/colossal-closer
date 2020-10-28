import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {ADD_EMPLOYEE} from '../../utils/mutations';

import Auth from '../../utils/auth';

import logo from '../../assets/colossal-logo.png';

const Signup = () => {
    const [formState, setFormState] = useState({ firstName : '', lastName: '', email: '', password: ''})

    const [addEmployee, { error }] = useMutation(ADD_EMPLOYEE);

    
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
        const { data } = await addEmployee({
            variables: { ...formState }
        });
        Auth.login(data.addEmployee.token);
        } catch (e){
        console.error(e);
        }

        setFormState({
            firstName : '', 
            lastName: '',
            email: '',
            password: ''
            
        })
        
    }
    return (
        <section id="login-page">
            <div className="container center ">
                
                <div className="row" id="form-wrapper">

                    <div className="col s12 m7 ">
                        <div className="card" id="signup-card">

                            <div className="card-image">
                                <img id="colossal-logo" src={logo} />
                            </div>

                            <div className="card-content">
                                <div className="row">
                                    <form className="col s12" id="signup-form"  onSubmit={handleSignup}>
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input 
                                                id="firstName" 
                                                type="text" 
                                                name="firstName"
                                                value= {formState.firstName}
                                                onChange={handleChange}
                                                />
                                                <label htmlFor="firstName">First Name</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input 
                                                id="lastName" 
                                                type="text" 
                                                name="lastName"
                                                value= {formState.lastName}
                                                onChange={handleChange}
                                                />
                                                <label htmlFor="lastName">Last Name</label>
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
                                                    id="password" 
                                                    type="password" 
                                                    name="password"
                                                    value= {formState.password}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                        <button className="blue lighten-3 waves-effect waves-light btn" type="submit" >Signup</button>
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

export default Signup;