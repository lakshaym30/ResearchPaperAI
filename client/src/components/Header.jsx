import { Link, NavLink, Outlet } from 'react-router-dom'

export function Header(props){


    
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" >Upload</NavLink>
                        </li>
                        <li>
                            <NavLink to="chat">Chat</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
}