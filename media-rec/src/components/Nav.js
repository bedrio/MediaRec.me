import React from 'react'
import { Link } from "react-router-dom"

function Nav() {
    return (
        <div>
            <ul>
                <Link to="/">
                    <li>Home Page</li>
                </Link>
                <Link to="friends">
                    <li>Friends Page</li>
                </Link>
                <Link to="notifications">
                    <li>Notifications Page</li>
                </Link>
            </ul>
        </div>
    )
}

export default Nav
