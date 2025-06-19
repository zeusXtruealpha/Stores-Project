
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Store, ChevronDown } from 'lucide-react';
import UserProfile from './UserProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path, isAdminLink = false) => {
    const baseClasses = "nav-link";
    const activeClasses = isAdminLink ? "nav-link-active-admin" : "nav-link-active";
    const inactiveClasses = isAdminLink ? "nav-link-inactive-admin" : "nav-link-inactive";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const dropdownTriggerClass = (paths) => {
    const isAnyActive = paths.some(path => isActive(path));
    const baseClasses = "nav-link flex items-center gap-1";
    const activeClasses = "nav-link-active";
    const inactiveClasses = "nav-link-inactive";
    
    return `${baseClasses} ${isAnyActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <Store className="navbar-logo-icon" />
              <span className="navbar-logo-text">Store Management</span>
            </Link>
            
            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="navbar-nav">
                <Link to="/" className={navLinkClass('/')}>
                  Home
                </Link>
                <Link to="/update-center" className={navLinkClass('/update-center')}>
                  Update Center
                </Link>
                
                {/* Stocks Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className={dropdownTriggerClass(['/inward', '/outward', '/stock-register', '/transaction-history'])}>
                    Stocks
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border shadow-lg z-50">
                    <DropdownMenuItem asChild>
                      <Link to="/inward" className="w-full px-4 py-2 hover:bg-gray-100">
                        Inward
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/outward" className="w-full px-4 py-2 hover:bg-gray-100">
                        Outward
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/stock-register" className="w-full px-4 py-2 hover:bg-gray-100">
                        Stock Register
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/transaction-history" className="w-full px-4 py-2 hover:bg-gray-100">
                        Transaction History
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Precision Tools Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className={dropdownTriggerClass(['/precision-update', '/precision-register', '/precision-history'])}>
                    PRECISION TOOLS
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border shadow-lg z-50">
                    <DropdownMenuItem asChild>
                      <Link to="/precision-update" className="w-full px-4 py-2 hover:bg-gray-100">
                        Precision Update
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/precision-register" className="w-full px-4 py-2 hover:bg-gray-100">
                        Precision Register
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/precision-history" className="w-full px-4 py-2 hover:bg-gray-100">
                        Precision History
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Admin Links */}
                {isAdmin && (
                  <>
                    <Link to="/request-approval" className={navLinkClass('/request-approval', true)}>
                      Request Approval
                    </Link>
                    <Link to="/update-data" className={navLinkClass('/update-data', true)}>
                      Update Data
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right side - User Profile */}
          <div className="navbar-right">
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="navbar-auth-login">
                  Login
                </Link>
                <Link to="/signup" className="navbar-auth-signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
