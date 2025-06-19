
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, ChevronDown, Shield, UserIcon, Briefcase } from 'lucide-react';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 ring-2 ring-white/50">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-gray-900 truncate max-w-24">
            {user.fullName.split(' ')[0]}
          </p>
          <p className="text-xs text-gray-500 truncate max-w-24">
            {user.designation}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 animate-fade-in">
            {/* Header Section */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg ring-4 ring-blue-100/50">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate">
                    {user.fullName}
                  </h3>
                  {user.role === 'admin' && (
                    <div className="flex items-center space-x-2 mt-1">
                      <Shield className="w-4 h-4 text-red-600" />
                      <span className="inline-block px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">
                        Administrator
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* User Details Section */}
            <div className="px-6 py-4 space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Full Name</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200/50">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Position</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{user.designation}</p>
                </div>
              </div>
            </div>
            
            {/* Actions Section */}
            <div className="px-3 pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 text-red-600 transition-all duration-200 rounded-xl group"
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Sign out</p>
                  <p className="text-xs text-red-500">End your current session</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
