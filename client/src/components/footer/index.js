import React from "react";

function Footer() {
    return (
        <section id="footer">
            <nav className= "blue lighten-3">
                {/* <ul id="nav-mobile" class="left hide-on-med-and-down"> */}
                    <ul id="external links">
                        <li>
                            <a href="/" target="blank"><i className="fal fa-copyright"></i></a>
                        </li>
                        {/* <li>
                            <a href="https://www.linkedin.com/in/marlon-f-guandique-1067775/"
                                target="blank"><i className="fab fa-linkedin"></i></a>
                        </li> */}
                    </ul>
                {/* </ul> */}
            </nav>
        </section>
    );
}

export default Footer;