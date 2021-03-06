import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import {ADD_EMPLOYEE} from '../../utils/mutations';

import Auth from '../../utils/auth';

import logo from '../../assets/colossal-logo.png';

const Signup = () => {

    const [formState, setFormState] = useState({ firstName : '', lastName: '', email: '', password: ''})

    const [addEmployee, { error }] = useMutation(ADD_EMPLOYEE);
    const loggedIn = Auth.loggedIn()

    if (loggedIn) {
        return window.location.assign('/')
    }

    const handleChange = (event) =>{
        const {name, value} = event.target

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSignup = async (event) =>{
        event.preventDefault();
        
        // use try/catch instead of promises to handle errors
        try{
            //execute addUser mutation and pass in variable data from form
            const { data } = await addEmployee({
                variables: { ...formState }
            });
            Auth.login(data.addEmployee.token);

            // If everything went well, reset the form
            setFormState({
                firstName : '', 
                lastName: '',
                email: '',
                password: ''
            });
        } catch (e){
            // Ensure user input all fields
            if(e.message.includes("is required")) {
                window.alert("You must complete all fields.");
                setFormState({
                    password: ''
                });
            }
            
            // Ensure user used a @colossalcloser email
            if(e.message.includes("valid Colossal Closer email")) {
                window.alert("You must use a valid Colossal Closer email address.");
                setFormState({
                    password: ''
                });
            }
            console.error(e);
        }
    }
    return (
        <section id="signup-page" className="main-container">
            <div className="container center " id="content-wrap">
                
                <div className="row" id="signup-form">

                    <div className="col s12 m7 ">
                        <div className="card" id="">

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