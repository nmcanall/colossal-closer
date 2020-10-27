import React, { useState } from 'react'
import {useMutation} from '@apollo/react-hooks';
import {LOGIN} from '../../utils/mutations';


import logo from '../../assets/colossal-logo.png';
import Auth from '../../utils/auth';



const Login = (props) => {
    const [formState, setFormState] = useState({ eamil: '', password: ''})

    const [login, {error}] = useMutation(LOGIN);

    const handleChange = (event) =>{
        const {name,value} = event.target

        setFormState({
            ...formState,
            [name]: value
        });
    };
    

    const handleLogin = async (event) =>{
        event.preventDefault();
        console.log('button clicked')
        console.log(formState)

        try{
            const {data}= await login({
                variables: {...formState}
            });
            Auth.login(data.login.token)
        }catch (e){
            console.error(e)
        }

        setFormState({
            email: '',
            password: ''
        })
    }
    return (
        <section id="login-page">
            <div className="container center ">
                
                <div className="row" id="form-wrapper">

                    <div className="col s12 m7 ">
                        <div className="card" id="login-card">

                            <div className="card-image">
                                <img src={logo} />
                            </div>

                            <div className="card-content">
                                <div className="row">
                                    <form className="col s12"  onSubmit={handleLogin}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    id="email" 
                                                    name="email" 
                                                    type="email"
                                                    value = {formState.email} 
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
                                        <button className="blue lighten-3 waves-effect waves-light btn" type="submit" >Login</button>
                                    </form>
                                    {error && <div>Login failed </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;