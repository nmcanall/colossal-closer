import React from "react";

function Footer() {
    return (
        <section id="footer">
            <nav className= "blue lighten-3">
                    <ul id="external links">
                        <li>
                            <a href="copyright.html" target="blank"><i className="fas fa-copyright"></i> 2020 Copyright - Colossal-Closer</a>
                        </li>
                        {/* <li>
                            <a href="/"
                                target="blank"><i className="fab"></i></a>
                        </li> */}
                    </ul>
            </nav>
        </section>
    );
}

export default Footer;