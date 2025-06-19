import React, { useState, useEffect } from 'react';
import { Check, User, Clock, Mail, Briefcase, Calendar } from 'lucide-react';

const RequestApproval = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call to Spring Boot backend
    // const fetchPendingUsers = async () => {
    //   const response = await fetch('/api/admin/pending-users');
    //   const data = await response.json();
    //   setPendingUsers(data);
    // };
    // fetchPendingUsers();

    // Mock data - replace with actual backend call
    const mockPendingUsers = [
      {
        id: '3',
        email: 'alice@example.com',
        fullName: 'Alice Johnson',
        designation: 'Inventory Specialist',
        requestDate: '2024-01-18 09:30:00'
      },
      {
        id: '4',
        email: 'bob@example.com',
        fullName: 'Bob Wilson',
        designation: 'Store Assistant',
        requestDate: '2024-01-19 14:15:00'
      }
    ];
    setPendingUsers(mockPendingUsers);
  }, []);

  const handleApproval = async (userId, action) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call to Spring Boot backend
      // const response = await fetch(`/api/admin/users/${userId}/${action}`, {
      //   method: 'PUT'
      // });

      console.log(`${action} user ${userId}`);
      
      // Remove user from pending list
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      
      // Show success message (you might want to add a toast notification here)
      alert(`User ${action}ed successfully!`);
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      alert(`Failed to ${action} user. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 font-display">
            User Request Approval
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Review and manage user registration requests with ease
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Approved Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">148</p>
              </div>
            </div>
          </div>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-display">All Caught Up!</h3>
            <p className="text-xl text-gray-500 max-w-md mx-auto leading-relaxed">
              No pending user requests at this time. Great job staying on top of things!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingUsers.map((user, index) => (
              <div 
                key={user.id} 
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">{user.fullName}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
                          <span className="text-sm font-medium">{user.designation}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-4 h-4 mr-2 text-green-500" />
                          <span className="text-sm">
                            Requested on {new Date(user.requestDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:min-w-fit">
                    <button
                      onClick={() => handleApproval(user.id, 'approve')}
                      disabled={isLoading}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(user.id, 'reject')}
                      disabled={isLoading}
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestApproval;
