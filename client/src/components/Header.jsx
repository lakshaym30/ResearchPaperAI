import { Link, NavLink, Outlet } from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

export function Header(props){    
    return (
        <div className="nav-header">
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem><NavigationMenuLink><NavLink to="/" >Upload</NavLink></NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink><NavLink to="chat" >Chat</NavLink></NavigationMenuLink></NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
        </div>
    
    )
}