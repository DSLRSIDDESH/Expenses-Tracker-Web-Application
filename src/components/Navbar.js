import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {

    const [showNavbar, setShowNavbar] = React.useState(false);
    function handleShowNavbar() {setShowNavbar(prevShow => !prevShow);}

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
        function watchWidth() {setWindowWidth(window.innerWidth)}
        window.addEventListener("resize", watchWidth)
        return function() {window.removeEventListener("resize", watchWidth)}
    }, [])

    return (
        <nav className="nav">
            <Link to="/" className='navbar-brand'>PocketPilot</Link>
            { windowWidth < 660 &&
                <div className='menu-icon menu-btn' onClick={handleShowNavbar}>
                    <div class="menu-btn-burger"></div>
                </div>
            }
            <div className={`nav-elements  ${showNavbar && 'ham-active'}`}>
                <ul>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Events">Events</NavLink>
                    <NavLink to="/Stats">Stats</NavLink>
                    <NavLink to="/Profile">Profile</NavLink>
                </ul>
            </div>
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