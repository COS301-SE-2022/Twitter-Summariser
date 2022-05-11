import React from 'react'

const NavBar = () => {
    return (
        <div className="nav-bar">
            <nav className="navigation">
                <div className="nav-list">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">Explore</a>
                        </li>
                        <li>
                            <a href="/">Reports</a>
                        </li>
                        <li>
                            <a href="/">Cloned Reports</a>
                        </li>
                        <li>
                            <a href="/">Drafts</a>
                        </li>
                        <li>
                            <a href="/">Profile</a>
                        </li>
                    </ul>
                    <button id="btn-nav-summarise"> Summarize </button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
