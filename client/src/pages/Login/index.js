import React from 'react'
import logo from '../../assets/colossal-logo.png';

const Login = () => {

    const handleLogin = (event) =>{
        event.preventDefault();

        console.log('button clicked')
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
                                                <input id="username" type="text" />
                                                <label htmlFor="username">Username</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="password" type="text" />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                        <button className="blue lighten-3 waves-effect waves-light btn" type="submit" >Login</button>
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

export default Login;