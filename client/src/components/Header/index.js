import React from "react";

function Header(props) {

    const {
        setPageSelected,
        pageSelected
    } = props;

    return (
       
        <nav className="blue lighten-3">

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
        </nav>

    );
}
export default Header;