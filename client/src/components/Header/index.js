import React from "react";
// import profileImage from "../../assets/colossal-logo.png";
import {Link} from 'react-router-dom';
import auth from "../../utils/auth";
import Auth from '../../utils/auth';


function Header(props) {
    const logout = event =>{
        event.preventDefault();
        Auth.logout()
    }

    const {
        setPageSelected,
        pageSelected
    } = props;

    return (

        <nav className="nav-extended blue lighten-3">
            <div className="nav-wrapper">
                <Link to="/"  className="brand-logo">
                    <h5>Colossal Closer</h5>
                </Link>
                {/* <img src={profileImage} className="my-2" style={{ maxWidth: "8%", width: "40%" }} alt="Colossal Closer" /> */}

                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right ">
                    {auth.loggedIn() ? (
                        <>
                        <li><a href="" onClick={logout}>Logout</a></li>
                        </>
                    ):(
                         // <li><a href="sign.html">Login</a></li>
                    <li>
                        <Link to ="/signup"
                            href="/signup">Signup
                        </Link>
                    </li>
                    )
                    }
                
                    
                </ul>
            </div>
            <div className="nav-content">
                <ul className="tabs tabs-transparent">
                    <ul className="flex-row">
                        <li className={`mx-2 ${(pageSelected === "dashboard") ? 'active' : ''}`}>
                            <a data-testid="dashboard" href="#dashboard" onClick={() => setPageSelected("dashboard")}>
                                Dashboard
                                </a>
                        </li>
                        <li className={`mx-2 ${(pageSelected === "customers") ? 'active' : ''}`}>
                            <a data-testid="customers" href="#customers" onClick={() => setPageSelected("customers")}>
                                Customers
                                </a>
                        </li>
                        <li className="mx-2">
                            <a data-testid="sales" href="#sales" onClick={() => setPageSelected("sales")}>
                                Sales
                            </a>
                        </li>
                        <li className="mx-2">
                            <a data-testid="customerGraphs" href="#customerGraphs" onClick={() => setPageSelected("customerGraphs")}>
                                Customers Graph
                            </a>
                        </li>
                        <li className="mx-2">
                            <a data-testid="salesGraph" href="#salesGraph" onClick={() => setPageSelected("salesGraph")}>
                                Sales Graph
                            </a>
                        </li>
                    </ul>
                </ul>
            </div>
        </nav>

    );
}
export default Header;