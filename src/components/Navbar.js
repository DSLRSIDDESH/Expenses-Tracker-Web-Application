import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className='navbar-brand'>PocketPilot</Link>
            <ul>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/Events">Events</NavLink>
                <NavLink to="/Stats">Stats</NavLink>
                <NavLink to="/Profile">Profile</NavLink>
            </ul>
        </nav>
    )
}

function NavLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} >{children}</Link>
        </li>
    )
}