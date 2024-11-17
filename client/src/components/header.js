import React from 'react';

function Header() {
    return (
        <div className="header">
            <div>
                <h1>Employee Management Database System</h1>
            </div>
            <div>
                <nav className="navigation">
                    <ul className="nav">
                        <li><a href="/">Sign Out</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;