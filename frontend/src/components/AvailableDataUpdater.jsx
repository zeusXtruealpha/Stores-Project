
import React, { useState } from 'react';
import { Search, Edit3, Save, X, CheckCircle, AlertCircle, Layers, Calendar, MapPin, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const AvailableDataUpdater = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  // Mock data - replace with actual API call
  const mockAvailableData = [
    { 
      itemCode: 'ITM001', 
      description: 'Laptop Dell Inspiron', 
      availableQuantity: 15, 
      status: 'InStore',
      importDate: '2024-01-15',
      storageLocation: 'Warehouse A, Shelf 3',
      remarks: 'Latest model with warranty'
    },
    { 
      itemCode: 'ITM002', 
      description: 'Wireless Mouse', 
      availableQuantity: 25, 
      status: 'InStore',
      importDate: '2024-01-20',
      storageLocation: 'Warehouse B, Shelf 1',
      remarks: 'Logitech brand, bulk purchase'
    },
    { 
      itemCode: 'ITM003', 
      description: 'USB Cable Type-C', 
      availableQuantity: 50, 
      status: 'InStore',
      importDate: '2024-01-18',
      storageLocation: 'Storage Room C',
      remarks: 'Premium quality cables'
    },
    { 
      itemCode: 'ITM004', 
      description: 'Monitor 24 inch', 
      availableQuantity: 8, 
      status: 'InStore',
      importDate: '2024-01-22',
      storageLocation: 'Warehouse A, Shelf 5',
      remarks: '4K resolution displays'
    },
    { 
      itemCode: 'ITM005', 
      description: 'USB Keyboard', 
      availableQuantity: 12, 
      status: 'InStore',
      importDate: '2024-01-25',
      storageLocation: 'Warehouse B, Shelf 2',
      remarks: 'Mechanical keyboards with RGB'
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage('Please enter an item code or name to search');
      setMessageType('error');
      return;
    }

    setIsSearching(true);
    setMessage('');

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/items/search?query=${searchTerm}`);
      // const data = await response.json();

      // Mock search logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const results = mockAvailableData.filter(item =>
        item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(results);
      
      if (results.length === 0) {
        setMessage('No items found matching your search criteria');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to search items. Please try again.');
      setMessageType('error');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setMessage('');
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setIsUpdating(true);
    setMessage('');

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/items/${editingItem.itemCode}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editingItem)
      // });

      // Mock save logic
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Updating item:', {
        ...editingItem,
        updatedBy: user?.fullName,
        lastUpdated: new Date().toISOString()
      });

      // Update the search results
      setSearchResults(prev => 
        prev.map(item => 
          item.itemCode === editingItem.itemCode ? editingItem : item
        )
      );

      setMessage(`Item ${editingItem.itemCode} updated successfully!`);
      setMessageType('success');
      setEditingItem(null);
    } catch (error) {
      setMessage('Failed to update item. Please try again.');
      setMessageType('error');
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setMessage('');
  };

  const getStatusBadge = (status) => {
    return `px-3 py-1 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/30">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center font-display">
          <Layers className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 mr-3" />
          Available Data Update
        </h2>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center font-display">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-3" />
            Search & Update Items
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Search for items by code or name, then update their availability information directly.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="searchInput" className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              Search by Item Code or Name
            </label>
            <input
              id="searchInput"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter item code or description..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchTerm.trim()}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isSearching || !searchTerm.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSearching ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${
            messageType === 'error'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-green-50 text-green-700 border-green-200'
          } animate-fade-in`}>
            <div className="flex items-center">
              {messageType === 'error' ? (
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              ) : (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              )}
              <span className="font-medium text-sm sm:text-base">{message}</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-orange-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3" />
              Search Results ({searchResults.length} items found)
            </h3>
            
            <div className="space-y-4">
              {searchResults.map((item) => (
                <div key={item.itemCode} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                  {editingItem && editingItem.itemCode === item.itemCode ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Item Code</label>
                          <input
                            type="text"
                            value={editingItem.itemCode}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <input
                            type="text"
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity</label>
                          <input
                            type="number"
                            value={editingItem.availableQuantity}
                            onChange={(e) => setEditingItem({...editingItem, availableQuantity: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Import Date</label>
                          <input
                            type="date"
                            value={editingItem.importDate}
                            onChange={(e) => setEditingItem({...editingItem, importDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                          <input
                            type="text"
                            value={editingItem.storageLocation}
                            onChange={(e) => setEditingItem({...editingItem, storageLocation: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="e.g., Warehouse A, Shelf 3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={editingItem.status}
                            onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="InStore">InStore</option>
                          </select>
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                          <textarea
                            value={editingItem.remarks}
                            onChange={(e) => setEditingItem({...editingItem, remarks: e.target.value})}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            placeholder="Enter any additional remarks or notes"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isUpdating}
                          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                            isUpdating
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {isUpdating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Updating...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-blue-600">{item.itemCode}</h4>
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Description</p>
                          <p className="font-medium text-gray-900">{item.description}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Available Quantity</p>
                          <p className="font-semibold text-lg text-gray-900">{item.availableQuantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Status</p>
                          <span className={getStatusBadge(item.status)}>{item.status}</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Import Date
                          </p>
                          <p className="font-medium text-gray-900">
                            {format(new Date(item.importDate), 'PPP')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Storage Location
                          </p>
                          <p className="font-medium text-gray-900">{item.storageLocation}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Remarks
                          </p>
                          <p className="font-medium text-gray-900 text-sm">{item.remarks}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableDataUpdater;
