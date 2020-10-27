import React from "react";
import profileImage from "../../assets/colossal-logo.png";

function Header(props) {

    const {
        setPageSelected,
        pageSelected
    } = props;

    return (

        <nav className="nav-extended blue lighten-3">
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">CC</a>
                <img src={profileImage} className="my-2" style={{ maxWidth: "8%", width: "40%" }} alt="Colossal Closer" />

                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="sign.html">Login</a></li>
                    <li><a href="badges.html">Signup</a></li>
                    <li><a href="collapsible.html">Exit</a></li>
                </ul>
            </div>
            <div class="nav-content">
                <ul class="tabs tabs-transparent">
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