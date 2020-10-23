
import React from "react";
import Nav from '../../components/navigation';
import '../../App.css';

function Header(props) {

  const {
    pageSelected,
    setPageSelected
  } = props;

  return (
    <header className="flex-row brown">
      <h2 id="header">
        <a data-testid="link" href="/">
          <span role="img" aria-label="name"></span>ColossalCloser
      </a>
      </h2>
      <Nav pageSelected={pageSelected}
        setPageSelected={setPageSelected} />
    </header>
  );
}

export default Header;